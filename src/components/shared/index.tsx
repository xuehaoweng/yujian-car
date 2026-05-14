interface LoadingSkeletonProps {
  count: number;
  type: 'card' | 'detail' | 'table-row';
}

export function LoadingSkeleton({ count, type }: LoadingSkeletonProps) {
  if (type === 'card') {
    return (
      <div className="grid grid-loading" data-testid="loading-skeleton">
        {Array.from({ length: count }, (_, i) => (
          <div key={i} className="skeleton-card">
            <div className="skeleton-img" />
            <div className="skeleton-line skeleton-title" />
            <div className="skeleton-line skeleton-subtitle" />
            <div className="skeleton-line skeleton-price" />
          </div>
        ))}
      </div>
    );
  }
  if (type === 'detail') {
    return (
      <div className="skeleton-detail" data-testid="loading-detail">
        <div className="skeleton-line skeleton-title" />
        <div className="skeleton-line" />
        <div className="skeleton-line" />
        <div className="skeleton-line" />
      </div>
    );
  }
  return (
    <div className="skeleton-table" data-testid="loading-table">
      {Array.from({ length: count }, (_, i) => (
        <div key={i} className="skeleton-row">
          <div className="skeleton-line" />
        </div>
      ))}
    </div>
  );
}

interface EmptyStateProps {
  title: string;
  suggestions: string[];
  onClearFilters: () => void;
}

export function EmptyState({
  title,
  suggestions,
  onClearFilters,
}: EmptyStateProps) {
  return (
    <div className="empty-state" data-testid="empty-state">
      <div className="empty-state-icon">🔍</div>
      <h3 className="empty-state-title">{title}</h3>
      <ul className="empty-state-suggestions">
        {suggestions.map((s, i) => (
          <li key={i}>{s}</li>
        ))}
      </ul>
      <button className="btn btn-primary" onClick={onClearFilters}>
        清除所有筛选条件
      </button>
    </div>
  );
}

interface ErrorStateProps {
  message: string;
  onRetry: () => void;
}

export function ErrorState({ message, onRetry }: ErrorStateProps) {
  return (
    <div className="error-state" data-testid="error-state">
      <div className="error-state-icon">⚠️</div>
      <h3 className="error-state-title">加载失败</h3>
      <p className="error-state-message">{message}</p>
      <button className="btn btn-primary" onClick={onRetry}>
        重试
      </button>
    </div>
  );
}
