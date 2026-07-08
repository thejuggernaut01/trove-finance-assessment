import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { Search, Bell, HelpCircle, Menu } from 'lucide-react';
import { portfolioService } from '@/services/portfolio.service';
import { Sidebar, SidebarInner } from '@/components/partials/sidebar';
import LoadingState from '@/components/custom/loading-state';
import ErrorState from '@/components/custom/error-state';
import DashboardContent from './dashboard-content';

export const RANGES = ['1D', '1W', '1M', 'ALL'] as const;

const Dashboard = () => {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [range, setRange] = useState<(typeof RANGES)[number]>('1D');

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ['portfolio'],
    queryFn: () => portfolioService.getPortfolio(),
  });

  return (
    <div className="min-h-screen bg-bg-canvas">
      <div className="flex">
        {/* Sidebar - desktop */}
        <Sidebar
          userName={data?.user.name}
          setMobileNavOpen={setMobileNavOpen}
        />

        {/* Mobile sidebar */}
        {mobileNavOpen && (
          <div className="fixed inset-0 z-40 lg:hidden">
            <div
              className="absolute inset-0 bg-black/40"
              onClick={() => setMobileNavOpen(false)}
            />
            <div className="absolute inset-y-0 left-0 w-72 bg-bg-surface p-4">
              <SidebarInner
                userName={data?.user.name}
                setMobileNavOpen={setMobileNavOpen}
                mobileNavOpen={mobileNavOpen}
              />
            </div>
          </div>
        )}

        {/* Main */}
        <main className="flex min-h-screen w-full flex-1 flex-col">
          {/* Top bar */}
          <header className="sticky top-0 z-30 flex items-center gap-3 border-b border-border bg-bg-canvas/80 px-4 py-4 backdrop-blur lg:px-8">
            <button
              className="rounded-lg p-2 text-text-default hover:bg-bg-default lg:hidden"
              onClick={() => setMobileNavOpen(true)}
            >
              <Menu size={20} />
            </button>

            <div className="relative flex-1 max-w-xl">
              <Search
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-text-disabled"
              />
              <input
                type="text"
                placeholder="Search stocks, crypto..."
                className="w-full rounded-full bg-bg-default py-2.5 pl-9 pr-4 text-sm text-text-default placeholder:text-text-disabled focus:outline-none focus:ring-2 focus:ring-primary/30"
              />
            </div>

            <div className="flex items-center gap-2">
              <button className="grid h-9 w-9 place-items-center rounded-full text-text-default hover:bg-bg-default">
                <Bell size={18} />
              </button>
              <button className="grid h-9 w-9 place-items-center rounded-full text-text-default hover:bg-bg-default">
                <HelpCircle size={18} />
              </button>
            </div>
          </header>

          <div className="flex-1 px-4 py-6 lg:px-8">
            {isLoading && <LoadingState />}
            {isError && <ErrorState onRetry={() => refetch()} />}
            {data && (
              <DashboardContent
                holdings={data.holdings}
                transactions={data.transactions}
                totalValue={data.summary.totalPortfolioValue}
                range={range}
                onRange={setRange}
              />
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
