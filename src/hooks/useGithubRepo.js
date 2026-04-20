import { useEffect, useState } from 'react';

const CACHE_PREFIX = 'gh-repo:';
const CACHE_TTL_MS = 10 * 60 * 1000;

export function parseGithubRepo(url) {
  if (typeof url !== 'string') return null;
  const m = url.match(/^https?:\/\/github\.com\/([^/]+)\/([^/#?]+)/i);
  if (!m) return null;
  return { owner: m[1], repo: m[2].replace(/\.git$/, '') };
}

function readCache(key) {
  try {
    const raw = sessionStorage.getItem(key);
    if (!raw) return null;
    const { at, data } = JSON.parse(raw);
    if (Date.now() - at > CACHE_TTL_MS) return null;
    return data;
  } catch {
    return null;
  }
}

function writeCache(key, data) {
  try {
    sessionStorage.setItem(key, JSON.stringify({ at: Date.now(), data }));
  } catch {}
}

export function useGithubRepo(owner, repo) {
  const [state, setState] = useState({ data: null, error: null });

  useEffect(() => {
    if (!owner || !repo) {
      setState({ data: null, error: null });
      return;
    }
    const key = `${CACHE_PREFIX}${owner}/${repo}`;
    const cached = readCache(key);
    if (cached) {
      setState({ data: cached, error: null });
      return;
    }
    setState({ data: null, error: null });
    const controller = new AbortController();
    fetch(`https://api.github.com/repos/${owner}/${repo}`, {
      signal: controller.signal,
      headers: { Accept: 'application/vnd.github+json' },
    })
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error(`HTTP ${r.status}`))))
      .then((json) => {
        const data = {
          stars: json.stargazers_count ?? 0,
          language: json.language ?? null,
          pushedAt: json.pushed_at ?? null,
          htmlUrl: json.html_url ?? null,
        };
        writeCache(key, data);
        setState({ data, error: null });
      })
      .catch((err) => {
        if (err.name === 'AbortError') return;
        setState({ data: null, error: err });
      });
    return () => controller.abort();
  }, [owner, repo]);

  return state;
}
