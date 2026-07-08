const LoadingState = () => {
  return (
    <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
      <div className="h-72 animate-pulse rounded-2xl bg-bg-surface lg:col-span-2" />
      <div className="h-72 animate-pulse rounded-2xl bg-bg-surface" />
      <div className="h-24 animate-pulse rounded-2xl bg-bg-surface lg:col-span-3" />
    </div>
  );
};

export default LoadingState;
