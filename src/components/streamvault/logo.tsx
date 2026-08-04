import { cn } from "@/lib/utils";
import { Play } from "lucide-react";

export function Logo({ className, size = 22 }: { className?: string; size?: number }) {
  return (
    <span className={cn("flex items-center gap-2", className)}>
      <span
        className="gradient-primary shadow-glow grid shrink-0 place-items-center rounded-xl"
        style={{ width: size + 10, height: size + 10 }}
      >
        <Play size={size * 0.6} className="fill-primary-foreground text-primary-foreground" />
      </span>
      <span className="text-base font-semibold tracking-tight">StreamVault</span>
    </span>
  );
}
