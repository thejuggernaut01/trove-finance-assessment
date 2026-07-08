import { Holding, Transaction } from '@/interface';
import { RANGES } from '.';
import { useMemo, useState } from 'react';
import { BaseHelper } from '@/utils/helper';
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { CHART_DATA, SUB_PORTFOLIOS_DATA } from '@/data';
import { Eye, ArrowUpRight, EyeOff } from 'lucide-react';
import TickerIcon from '@/components/custom/ticker-icon';
import TransactionRow from './transaction-row';
import SubPortfolioCard from './sub-portfolio-card';
import { ValueType } from 'recharts/types/component/DefaultTooltipContent';
import { cn } from '@/lib/utils';

type DashboardContentProps = {
  holdings: Holding[];
  transactions: Transaction[];
  totalValue: number;
  range: (typeof RANGES)[number];
  onRange: (r: (typeof RANGES)[number]) => void;
};

const DashboardContent = ({
  holdings,
  transactions,
  totalValue,
  range,
  onRange,
}: DashboardContentProps) => {
  const [showBalance, setShowBalance] = useState(false);

  const allocation = useMemo(
    () => BaseHelper.computeAllocation(holdings),
    [holdings]
  );
  const derivedHoldings = useMemo(
    () => holdings.map(BaseHelper.deriveHolding).filter((h) => h.isActive),
    [holdings]
  );

  return (
    <div className="space-y-5">
      <div className="space-y-5 md:space-y-0 md:flex md:gap-5">
        {/* Net worth */}
        <div className="flex-1">
          <div className="rounded-2xl border border-border bg-bg-surface p-5 sm:p-6">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <div className="flex items-center gap-2 text-sm text-text-neutral">
                  <span>Total Net Worth</span>
                  <button
                    type="button"
                    onClick={() => setShowBalance((prev) => !prev)}
                  >
                    {showBalance ? <Eye size={14} /> : <EyeOff size={14} />}
                  </button>
                </div>
                <div className="mt-2 flex flex-wrap items-baseline gap-3">
                  <button
                    type="button"
                    onClick={() => setShowBalance((prev) => !prev)}
                    className={cn(
                      'text-[26px] font-semibold tracking-tight text-text-default sm:text-[28px]',
                      !showBalance && 'blur-[6px]'
                    )}
                  >
                    {BaseHelper.formatCurrency(totalValue)}
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowBalance((prev) => !prev)}
                    className={cn(
                      'inline-flex items-center gap-1 text-sm font-medium text-success',
                      !showBalance && 'blur-[6px]'
                    )}
                  >
                    <ArrowUpRight size={14} /> +4.2%
                  </button>
                </div>
              </div>

              <div className="inline-flex rounded-full bg-bg-default p-1 text-xs">
                {RANGES.map((r) => (
                  <button
                    key={r}
                    onClick={() => onRange(r)}
                    className={`rounded-full px-3 py-1.5 transition-colors ${
                      r === range
                        ? 'bg-primary-light text-primary'
                        : 'text-text-neutral hover:text-text-default'
                    }`}
                  >
                    {r}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-4 h-48 sm:h-56">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={CHART_DATA}
                  margin={{ top: 10, right: 0, left: 0, bottom: 0 }}
                >
                  <defs>
                    <linearGradient id="netFill" x1="0" y1="0" x2="0" y2="1">
                      <stop
                        offset="0%"
                        stopColor="#059A83"
                        stopOpacity={0.25}
                      />
                      <stop offset="100%" stopColor="#059A83" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="d" hide />
                  <YAxis hide domain={['dataMin - 500', 'dataMax + 500']} />
                  <Tooltip
                    cursor={{ stroke: '#059A83', strokeOpacity: 0.2 }}
                    contentStyle={{
                      borderRadius: 12,
                      border: '1px solid #DBDFDF',
                      fontSize: 12,
                    }}
                    formatter={(v: ValueType | undefined) => [
                      BaseHelper.formatCurrency(Number(v?.toString())),
                      'Value',
                    ]}
                  />
                  <Area
                    type="monotone"
                    dataKey="v"
                    stroke="#059A83"
                    strokeWidth={2.5}
                    fill="url(#netFill)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Allocation */}
        <div className="md:w-[40%] xl:w-[30%] rounded-2xl border border-border bg-bg-surface p-5 sm:p-6">
          <h3 className="text-base font-semibold text-text-default">
            Asset Allocation
          </h3>
          <div className="mt-4 flex h-3 w-full overflow-hidden rounded-full bg-bg-default">
            {allocation.map((slice) => (
              <div
                key={slice.sector}
                style={{
                  width: `${slice.pct}%`,
                  backgroundColor: SECTOR_COLORS[slice.sector] ?? '#687D7A',
                }}
              />
            ))}
          </div>
          <div className="mt-5 grid grid-cols-2 gap-x-4 gap-y-4">
            {allocation.map((slice) => (
              <div key={slice.sector} className="flex items-start gap-2">
                <span
                  className="mt-1.5 h-2 w-2 shrink-0 rounded-full"
                  style={{
                    backgroundColor: SECTOR_COLORS[slice.sector] ?? '#687D7A',
                  }}
                />
                <div className="min-w-0">
                  <p className="truncate text-xs text-text-neutral">
                    {slice.sector}
                  </p>
                  <p className="text-sm font-medium text-text-default">
                    {slice.pct.toFixed(0)}%
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Sub-portfolios */}
      <div className="grid md:grid-cols-2 gap-4 lg:grid-cols-4">
        {SUB_PORTFOLIOS_DATA.map((data) => {
          return (
            <SubPortfolioCard
              key={data.id}
              label={data.label}
              value={data.value}
              change={data.change}
            />
          );
        })}
      </div>

      <div className="space-y-5 md:space-y-0 md:flex gap-5 col-span-3">
        {/* Holdings */}
        <div className="flex-1">
          <div className="mb-3 flex items-center justify-between">
            <h3 className="text-base font-semibold text-text-default">
              Holdings
            </h3>
            <button className="text-xs font-medium text-primary hover:underline">
              View All
            </button>
          </div>
          <div className="space-y-3">
            {derivedHoldings.map((h) => (
              <div
                key={h.id}
                className="rounded-2xl border border-border bg-bg-surface p-4"
              >
                <div className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 sm:grid-cols-[auto_minmax(0,1.4fr)_minmax(0,1fr)_auto]">
                  <TickerIcon ticker={h.ticker} />
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-text-default">
                      {h.ticker}
                    </p>
                    <p className="truncate text-xs text-text-neutral">
                      {h.name}
                    </p>
                  </div>
                  <div className="hidden text-center sm:block">
                    <p className="text-xs text-text-neutral">Shares</p>
                    <p className="text-sm font-medium text-text-default">
                      {h.shares.toFixed(2)}
                    </p>
                  </div>
                  <div className="text-right">
                    {h.hasPrice ? (
                      <>
                        <p className="text-sm font-semibold text-text-default">
                          {BaseHelper.formatCurrency(h.marketValue)}
                        </p>
                        <p
                          className={`text-xs font-medium ${
                            (h.gainLoss ?? 0) >= 0
                              ? 'text-success'
                              : 'text-error'
                          }`}
                        >
                          {BaseHelper.formatSignedCurrency(h.gainLoss)} (
                          {BaseHelper.formatSignedPct(h.gainLossPct)})
                        </p>
                      </>
                    ) : (
                      <>
                        <p className="text-sm font-medium text-text-disabled">
                          Price unavailable
                        </p>
                        <p className="text-xs text-text-neutral">
                          {h.shares.toFixed(2)} shares
                        </p>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Transactions */}
        <div className="flex-1">
          <div className="mb-3 flex items-center justify-between">
            <h3 className="text-base font-semibold text-text-default">
              Recent Transactions
            </h3>
            <button className="text-xs font-medium text-primary hover:underline">
              View All
            </button>
          </div>
          <div className="space-y-3">
            {transactions.map((t) => (
              <TransactionRow key={t.id} tx={t} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardContent;

const SECTOR_COLORS: Record<string, string> = {
  Technology: '#0F5F53',
  Automotive: '#2A8B95',
  Healthcare: '#BFE4C6',
  Finance: '#7B79C9',
  Entertainment: '#F2C891',
};
