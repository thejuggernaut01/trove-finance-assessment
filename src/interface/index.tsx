import { Currency, TxStatus, TxType } from '@/types';

export interface User {
  name: string;
  accountId: string;
  lastUpdated: string;
}

export interface Summary {
  totalPortfolioValue: number;
  totalInvested: number;
  currency: Currency;
}

export interface Holding {
  id: string;
  ticker: string;
  name: string;
  sector: string;
  shares: number;
  avgCost: number;
  currentPrice: number;
  currency: Currency;
}

export interface Transaction {
  id: string;
  type: TxType;
  ticker: string;
  name: string;
  shares: number;
  pricePerShare: number;
  totalAmount: number;
  date: string;
  status: TxStatus;
}

export interface PortfolioData {
  user: User;
  summary: Summary;
  holdings: Holding[];
  transactions: Transaction[];
}

export interface HoldingDerived extends Holding {
  marketValue: number | null; // null when price unknown (NVDA priceless)
  gainLoss: number | null;
  gainLossPct: number | null;
  hasPrice: boolean;
  isActive: boolean; // shares > 0
}

export interface AllocationSlice {
  sector: string;
  value: number;
  pct: number;
}
