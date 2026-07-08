import { BaseHelper } from '@/utils/helper';
import { Minus, Plus } from 'lucide-react';
import { Transaction } from '@/interface';

type TransactionRowProps = {
  tx: Transaction;
};

const TransactionRow = ({ tx }: TransactionRowProps) => {
  const isBuy = tx.type === 'BUY';
  const isFailed = tx.status === 'FAILED';
  const isPending = tx.status === 'PENDING';
  const amountPrefix = isBuy ? '-' : '+';
  const amountClass = isFailed
    ? 'text-text-disabled line-through'
    : isBuy
      ? 'text-text-default'
      : 'text-success';

  const statusBadge =
    tx.status === 'COMPLETED'
      ? 'bg-primary-light text-primary'
      : tx.status === 'PENDING'
        ? 'bg-cream/40 text-[#8A5A1A]'
        : 'bg-[#FEE2E2] text-error';

  return (
    <div
      className={`rounded-2xl border border-border bg-bg-surface p-4 ${
        isFailed ? 'opacity-90' : ''
      }`}
    >
      <div className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3">
        <div
          className={`grid h-10 w-10 shrink-0 place-items-center rounded-full ${
            isBuy
              ? 'bg-primary-light text-primary'
              : 'bg-bg-default text-text-neutral'
          }`}
        >
          {isBuy ? <Plus size={16} /> : <Minus size={16} />}
        </div>
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold text-text-default">
            {isBuy ? 'Buy' : 'Sell'} {tx.name}
          </p>
          <p className="truncate text-xs text-text-neutral">
            {new Date(tx.date).toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
              year: 'numeric',
            })}{' '}
            • {tx.shares.toFixed(2)} Shares
          </p>
        </div>
        <div className="text-right">
          <p className={`text-sm font-semibold ${amountClass}`}>
            {isPending ? (
              <span className="text-text-disabled">Price unavailable</span>
            ) : (
              <>
                {amountPrefix}
                {BaseHelper.formatCurrency(tx.totalAmount)}
              </>
            )}
          </p>
          <span
            className={`mt-1 inline-flex rounded-md px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide ${statusBadge}`}
          >
            {tx.status}
          </span>
        </div>
      </div>
    </div>
  );
};

export default TransactionRow;
