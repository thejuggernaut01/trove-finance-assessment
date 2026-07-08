import { Currency } from '@/types';
import { Holding, HoldingDerived, AllocationSlice } from '@/interface';

export class BaseHelper {
  static deriveHolding(h: Holding): HoldingDerived {
    const hasPrice = h.currentPrice > 0;
    const isActive = h.shares > 0;
    const marketValue = hasPrice ? h.shares * h.currentPrice : null;
    const costBasis = h.shares * h.avgCost;
    const gainLoss = marketValue !== null ? marketValue - costBasis : null;
    const gainLossPct =
      marketValue !== null && costBasis > 0
        ? (gainLoss! / costBasis) * 100
        : null;
    return { ...h, marketValue, gainLoss, gainLossPct, hasPrice, isActive };
  }

  static computeAllocation(holdings: Holding[]): AllocationSlice[] {
    // Only priced, active holdings contribute
    const active = holdings
      .map(this.deriveHolding)
      .filter((h) => h.isActive && h.hasPrice);
    const bySector = new Map<string, number>();
    for (const h of active) {
      bySector.set(
        h.sector,
        (bySector.get(h.sector) ?? 0) + (h.marketValue ?? 0)
      );
    }
    const total = [...bySector.values()].reduce((a, b) => a + b, 0);
    return [...bySector.entries()]
      .map(([sector, value]) => ({
        sector,
        value,
        pct: total > 0 ? (value / total) * 100 : 0,
      }))
      .sort((a, b) => b.value - a.value);
  }

  static formatCurrency(
    value: number | null,
    currency: Currency = 'USD'
  ): string {
    if (value === null || Number.isNaN(value)) return '—';
    const symbol = currency === 'NGN' ? '₦' : '$';
    return `${symbol}${value.toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  }

  static formatSignedCurrency(
    value: number | null,
    currency: Currency = 'USD'
  ): string {
    if (value === null) return '—';
    const sign = value > 0 ? '+' : value < 0 ? '-' : '';
    return `${sign}${this.formatCurrency(Math.abs(value), currency)}`;
  }

  static formatSignedPct(value: number | null): string {
    if (value === null) return '—';
    const sign = value > 0 ? '+' : value < 0 ? '' : '';
    return `${sign}${value.toFixed(1)}%`;
  }
}
