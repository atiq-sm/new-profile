import { parseGithubRepo, useGithubRepo } from '../hooks/useGithubRepo.js';

function formatRelative(iso) {
  const then = new Date(iso).getTime();
  if (Number.isNaN(then)) return null;
  const days = Math.max(0, Math.round((Date.now() - then) / 86_400_000));
  if (days === 0) return 'updated today';
  if (days === 1) return 'updated yesterday';
  if (days < 30) return `updated ${days}d ago`;
  const months = Math.round(days / 30);
  if (months < 12) return `updated ${months}mo ago`;
  const years = Math.round(days / 365);
  return `updated ${years}y ago`;
}

export default function RepoMeta({ href }) {
  const parsed = parseGithubRepo(href);
  const { data } = useGithubRepo(parsed?.owner, parsed?.repo);
  if (!data) return null;

  const pieces = [];
  if (data.language) pieces.push({ key: 'lang', node: <span>{data.language}</span> });
  if (typeof data.stars === 'number' && data.stars > 0) {
    pieces.push({
      key: 'stars',
      node: (
        <span aria-label={`${data.stars} stars`}>
          ★ {data.stars.toLocaleString()}
        </span>
      ),
    });
  }
  const rel = data.pushedAt && formatRelative(data.pushedAt);
  if (rel) pieces.push({ key: 'rel', node: <span>{rel}</span> });
  if (!pieces.length) return null;

  return (
    <div className="repo-meta">
      {pieces.map((p, i) => (
        <span key={p.key} className="repo-meta-item">
          {i > 0 && <span className="repo-meta-sep" aria-hidden="true">·</span>}
          {p.node}
        </span>
      ))}
    </div>
  );
}
