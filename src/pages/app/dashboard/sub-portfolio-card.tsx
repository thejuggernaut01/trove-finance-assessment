import { ArrowDownRight, ArrowUpRight } from 'lucide-react';

const SubPortfolioCard = ({
  label,
  value,
  change,
}: {
  label: string;
  value: string;
  change: number;
}) => {
  const positive = change >= 0;
  return (
    <div className="rounded-2xl border border-border bg-bg-surface p-4">
      <p className="text-xs text-text-neutral">{label}</p>
      <p className="mt-2 text-sm font-semibold text-text-default sm:text-base">
        {value}
      </p>
      <p
        className={`mt-3 inline-flex items-center gap-1 text-xs font-medium ${
          positive ? 'text-success' : 'text-error'
        }`}
      >
        {positive ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
        {positive ? '+' : ''}
        {change.toFixed(1)}%
      </p>
    </div>
  );
};

export default SubPortfolioCard;
