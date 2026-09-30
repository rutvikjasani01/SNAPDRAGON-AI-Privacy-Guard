import { Badge } from './Badge';

interface RiskBadgeProps {
  level: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
}

export function RiskBadge({ level }: RiskBadgeProps) {
  const mapping = {
    LOW: 'success',
    MEDIUM: 'warning',
    HIGH: 'error',
    CRITICAL: 'error',
  } as const;

  return (
    <Badge variant={mapping[level]} className={level === 'CRITICAL' ? 'animate-pulse border-red-500' : ''}>
      {level} RISK
    </Badge>
  );
}
