import { Link } from "@tanstack/react-router";
import { MoreVertical } from "lucide-react";
import { cn } from "@/lib/utils";

type Props = {
  title: string;
  subtitle?: string | undefined;
  meta?: string | undefined;
  thumb?: string | undefined;
  badge?: string | undefined;
  badgeAccent?: boolean | undefined;
  icon?: React.ReactNode | undefined;
  to?: string | undefined;
  action?: React.ReactNode | undefined;
  children?: React.ReactNode | undefined;
  className?: string | undefined;
};

export function MediaCard({
  title,
  subtitle,
  meta,
  thumb,
  badge,
  badgeAccent,
  icon,
  to,
  action,
  children,
  className,
}: Props) {
  const body = (
    <div
      className={cn(
        "bg-surface shadow-card flex gap-3 rounded-2xl p-2.5 transition-colors hover:bg-surface-alt",
        className,
      )}
    >
      <div className="bg-surface-alt relative h-16 w-28 shrink-0 overflow-hidden rounded-xl">
        {thumb ? (
          <img
            src={thumb}
            alt={title}
            loading="lazy"
            width={768}
            height={512}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="grid h-full w-full place-items-center text-muted-foreground">{icon}</div>
        )}
        {badge ? (
          <span
            className={cn(
              "absolute right-1 bottom-1 rounded-md px-1.5 py-0.5 text-[10px] font-semibold",
              badgeAccent
                ? "bg-accent text-accent-foreground"
                : "bg-background/80 text-foreground",
            )}
          >
            {badge}
          </span>
        ) : null}
      </div>
      <div className="flex min-w-0 flex-1 flex-col justify-center">
        <p className="line-clamp-2 text-[13px] leading-tight font-medium">{title}</p>
        {subtitle ? (
          <p className="text-muted-foreground mt-1 truncate text-[11px]">{subtitle}</p>
        ) : null}
        {meta ? <p className="text-muted-foreground truncate text-[11px]">{meta}</p> : null}
        {children}
      </div>
      <div className="flex shrink-0 items-start">
        {action ?? <MoreVertical size={16} className="text-muted-foreground mt-1" />}
      </div>
    </div>
  );

  if (to) {
    return (
      <Link to={to} className="block">
        {body}
      </Link>
    );
  }
  return body;
}
