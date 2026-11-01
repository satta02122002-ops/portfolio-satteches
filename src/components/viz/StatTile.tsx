import { Icon, type IconName } from "../Icon";

/** Stat tile: label · value · delta · status chip (icon + text, never colour alone). */
export function StatTile({
  label,
  value,
  delta,
  status,
  icon,
  compact = false,
}: {
  label: string;
  value: string;
  delta?: string;
  status?: string;
  icon?: IconName;
  compact?: boolean;
}) {
  return (
    <div className={`panel flex h-full flex-col ${compact ? "p-3" : "p-4"}`}>
      <div className="flex items-start justify-between gap-2">
        <p className={`text-muted ${compact ? "text-[0.78rem] leading-tight" : "text-[0.88rem]"}`}>{label}</p>
        {icon && !compact && (
          <span aria-hidden="true" className="text-muted">
            <Icon name={icon} size={18} />
          </span>
        )}
      </div>
      <p className={`font-display font-bold tracking-tight ${compact ? "mt-1 text-xl" : "mt-2 text-[1.85rem] leading-none"}`}>{value}</p>
      {(delta || status) && (
        <div className={`mt-auto flex flex-wrap items-center gap-2 ${compact ? "pt-1.5" : "pt-3"}`}>
          {status && (
            <span className={`chip chip-ok ${compact ? "!px-1.5 !py-0 !text-[0.58rem]" : ""}`}>
              <Icon name="check" size={compact ? 10 : 12} />
              {status}
            </span>
          )}
          {delta && !compact && <span className="text-[0.82rem] text-muted">{delta}</span>}
        </div>
      )}
    </div>
  );
}
