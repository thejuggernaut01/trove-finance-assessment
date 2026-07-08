type ErrorStateProps = {
  onRetry: () => void;
};

const ErrorState = ({ onRetry }: ErrorStateProps) => {
  return (
    <div className="rounded-2xl border border-border bg-bg-surface p-8 text-center">
      <p className="text-sm text-text-default">Couldn't load your portfolio.</p>
      <button
        onClick={onRetry}
        className="mt-4 rounded-xl bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary/90"
      >
        Try again
      </button>
    </div>
  );
};

export default ErrorState;
