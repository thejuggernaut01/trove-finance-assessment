import {
  LayoutGrid,
  Receipt,
  Settings,
  TrendingUp,
  Wallet,
  X,
} from 'lucide-react';
import React from 'react';
import { Link } from 'react-router-dom';

type SideBarProps = {
  userName?: string;
  setMobileNavOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const Sidebar = ({ userName, setMobileNavOpen }: SideBarProps) => {
  return (
    <aside className="sticky top-0 hidden h-screen w-64 shrink-0 flex-col justify-between border-r border-border bg-bg-canvas p-6 lg:flex">
      <SidebarInner userName={userName} setMobileNavOpen={setMobileNavOpen} />
    </aside>
  );
};

const SidebarInner = ({ userName, setMobileNavOpen }: SideBarProps) => {
  const nav = [
    { icon: LayoutGrid, label: 'Dashboard', active: true },
    { icon: Wallet, label: 'Portfolio' },
    { icon: Receipt, label: 'Transactions' },
    { icon: TrendingUp, label: 'Markets' },
    { icon: Settings, label: 'Settings' },
  ];
  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center justify-between mb-7">
        <Link
          to="/dashboard"
          className="block px-2 text-lg font-semibold text-primary"
        >
          Trove
        </Link>

        <button
          className="rounded-lg p-2 hover:bg-bg-default"
          onClick={() => setMobileNavOpen(false)}
        >
          <X size={20} />
        </button>
      </div>
      <nav className="flex-1 space-y-1">
        {nav.map(({ icon: Icon, label, active }) => (
          <button
            key={label}
            className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-colors ${
              active
                ? 'bg-primary-light font-medium text-text-default'
                : 'text-text-neutral hover:bg-bg-default hover:text-text-default'
            }`}
          >
            <Icon size={18} />
            <span>{label}</span>
          </button>
        ))}
      </nav>

      <div className="mt-6 border-t border-border pt-6">
        <div className="flex items-center gap-3 px-2">
          <div className="grid h-10 w-10 shrink-0 place-items-center overflow-hidden rounded-full bg-primary-light text-sm font-semibold text-primary">
            {userName?.[0] ?? 'A'}
          </div>
          <div className="min-w-0">
            <p className="truncate text-sm font-medium text-text-default">
              {userName ?? '—'}
            </p>
            <p className="text-xs text-text-neutral">Premium Member</p>
          </div>
        </div>
        <button className="mt-4 w-full rounded-xl bg-primary py-3 text-sm font-medium text-white transition-colors hover:bg-primary/90">
          Add Funds
        </button>
      </div>
    </div>
  );
};

export { Sidebar, SidebarInner };
