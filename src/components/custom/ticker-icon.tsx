import {
  Apple,
  Car,
  Cross,
  Building2,
  Grid3x3,
  ShoppingCart,
  Cpu,
  CreditCard,
  Clapperboard,
} from 'lucide-react';

const TickerIcon = ({ ticker }: { ticker: string }) => {
  const map: Record<
    string,
    {
      Icon: typeof Grid3x3;
      bg: string;
      fg: string;
    }
  > = {
    AAPL: { Icon: Grid3x3, bg: 'bg-bg-default', fg: 'text-text-default' },
    GOOGL: { Icon: Apple, bg: 'bg-bg-default', fg: 'text-text-default' },
    TSLA: { Icon: Car, bg: 'bg-[#FEE2E2]', fg: 'text-error' },
    JNJ: { Icon: Cross, bg: 'bg-primary-light', fg: 'text-primary' },
    JPM: { Icon: Building2, bg: 'bg-bg-default', fg: 'text-text-default' },
    AMZN: { Icon: ShoppingCart, bg: 'bg-bg-default', fg: 'text-text-default' },
    NVDA: { Icon: Cpu, bg: 'bg-bg-default', fg: 'text-text-default' },
    PFE: { Icon: Cross, bg: 'bg-primary-light', fg: 'text-primary' },
    DIS: { Icon: Clapperboard, bg: 'bg-bg-default', fg: 'text-text-default' },
    V: { Icon: CreditCard, bg: 'bg-bg-default', fg: 'text-text-default' },
  };
  const entry = map[ticker] ?? {
    Icon: Grid3x3,
    bg: 'bg-bg-default',
    fg: 'text-text-default',
  };
  const { Icon, bg, fg } = entry;

  return (
    <div
      className={`grid h-10 w-10 shrink-0 place-items-center rounded-xl ${bg}`}
    >
      <Icon size={18} className={fg} />
    </div>
  );
};

export default TickerIcon;
