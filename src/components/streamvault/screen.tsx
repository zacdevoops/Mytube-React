import { cn } from "@/lib/utils";

export function Screen({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className="relative min-h-screen">
      <div className="glow-top pointer-events-none absolute inset-x-0 top-0 h-72" />
      <main className={cn("relative mx-auto max-w-md px-4 pt-4 pb-28", className)}>{children}</main>
    </div>
  );
}
