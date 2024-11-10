// -- ./src/template/ui/skeleton.tsx
import { cn } from "src/lib/utils";

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("animate-pulse rounded-md bg-default-200", className)}
      {...props}
    />
  );
}

export { Skeleton };
