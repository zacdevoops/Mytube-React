import { cn } from "@/lib/utils";

type BtnProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

export function PrimaryButton({ className, ...props }: BtnProps) {
  return (
    <button
      {...props}
      className={cn(
        "gradient-primary text-primary-foreground shadow-glow inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition-opacity hover:opacity-90 active:opacity-80",
        className,
      )}
    />
  );
}

export function SecondaryButton({ className, ...props }: BtnProps) {
  return (
    <button
      {...props}
      className={cn(
        "border-border text-foreground hover:bg-surface-alt inline-flex items-center justify-center gap-2 rounded-full border px-5 py-2.5 text-sm font-medium transition-colors",
        className,
      )}
    />
  );
}
