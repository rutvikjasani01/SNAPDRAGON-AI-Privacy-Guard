interface StatusIndicatorProps {
  status: 'active' | 'inactive' | 'processing' | 'error';
  text?: string;
}

export function StatusIndicator({ status, text }: StatusIndicatorProps) {
  const colors = {
    active: 'bg-green-500',
    inactive: 'bg-gray-500',
    processing: 'bg-blue-500 animate-pulse',
    error: 'bg-red-500',
  };

  return (
    <div className="flex items-center space-x-2">
      <span className="relative flex h-3 w-3">
        {status === 'processing' && (
          <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${colors[status]}`}></span>
        )}
        <span className={`relative inline-flex rounded-full h-3 w-3 ${colors[status]}`}></span>
      </span>
      {text && <span className="text-sm font-medium text-text-secondary">{text}</span>}
    </div>
  );
}
