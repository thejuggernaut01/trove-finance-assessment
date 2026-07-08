import data from '@/data/portfolio_data.json';
import {
  Holding,
  PortfolioData,
  Summary,
  Transaction,
  User,
} from '@/interface';

const delay = (ms: number) => new Promise((r) => setTimeout(r, ms));

async function getData<T>(payload: T, ms = 50): Promise<T> {
  await delay(ms);
  return JSON.parse(JSON.stringify(payload)) as T;
}

export const portfolioService = {
  async getPortfolio(): Promise<PortfolioData> {
    return getData(data as PortfolioData);
  },
  async getUser(): Promise<User> {
    return getData((data as PortfolioData).user);
  },
  async getSummary(): Promise<Summary> {
    return getData((data as PortfolioData).summary);
  },
  async getHoldings(): Promise<Holding[]> {
    return getData((data as PortfolioData).holdings);
  },
  async getTransactions(): Promise<Transaction[]> {
    return getData((data as PortfolioData).transactions);
  },
};
