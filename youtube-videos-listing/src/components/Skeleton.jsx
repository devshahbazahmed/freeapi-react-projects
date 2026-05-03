const Skeleton = ({ count = 8 }) => (
  <div className="grid grid-cols-1 gap-x-5 gap-y-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
    {Array.from({ length: count }).map((_, index) => (
      <div key={index} className="animate-pulse">
        <div className="aspect-video rounded-xl bg-neutral-800" />
        <div className="mt-3 flex gap-3">
          <div className="h-10 w-10 shrink-0 rounded-full bg-neutral-800" />
          <div className="w-full space-y-2">
            <div className="h-4 w-5/6 rounded bg-neutral-800" />
            <div className="h-4 w-2/3 rounded bg-neutral-800" />
            <div className="h-3 w-1/2 rounded bg-neutral-900" />
          </div>
        </div>
      </div>
    ))}
  </div>
);

export default Skeleton;
