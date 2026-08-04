import { cn } from "@/lib/utils";

export function ProgressBar({
  value,
  left,
  right,
  className,
}: {
  value: number;
  left?: string;
  right?: string;
  className?: string;
}) {
  return (
    <div className={cn("w-full", className)}>
      <div className="flex items-center gap-2">
        {left ? (
          <span className="text-muted-foreground shrink-0 text-[10px] tabular-nums">{left}</span>
        ) : null}
        <div className="bg-surface-alt relative h-1.5 min-w-0 flex-1 overflow-hidden rounded-full">
          <div
            className="gradient-primary absolute inset-y-0 left-0 rounded-full"
            style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
          />
        </div>
        {right ? (
          <span className="text-muted-foreground shrink-0 text-[10px] tabular-nums">{right}</span>
        ) : null}
      </div>
    </div>
  );
}
