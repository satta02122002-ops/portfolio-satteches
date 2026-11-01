import { sections, skills } from "@/content";
import { FocusOrder } from "./HiringFocus";
import { Icon, type IconName } from "./Icon";
import { Section } from "./Section";

const groupIcons: Record<string, IconName> = {
  "Freight and customs": "ship",
  "Warehouse and inventory": "warehouse",
  "ERP and WMS": "barcode",
  "Data and automation": "cpu",
  "Process and quality": "gauge",
  Office: "doc",
};

/** Module 06 · Skills laid out like a warehouse rack: one aisle per group, one bin per skill. */
export function Skills() {
  return (
    <Section module={sections.skills} title="Capability rack" intro="Skills and systems, slotted by aisle like a WMS location map.">
      <FocusOrder
        className="grid gap-4 md:grid-cols-2 xl:grid-cols-3"
        items={skills.map((g, gi) => {
          const aisle = String.fromCharCode(65 + gi);
          return {
            key: g.group,
            pillars: g.pillars,
            node: (
              <div className="panel overflow-hidden">
                <div className="panel-head">
                  <h3 className="flex items-center gap-2 font-semibold">
                    <span aria-hidden="true" className="text-primary">
                      <Icon name={groupIcons[g.group] ?? "boxes"} size={17} />
                    </span>
                    {g.group}
                  </h3>
                  <span className="font-mono text-[0.75rem] text-muted" aria-label={`Aisle ${aisle}`}>
                    AISLE {aisle}
                  </span>
                </div>
                <ul className="grid grid-cols-2 gap-px bg-line">
                  {g.items.map((s, si) => (
                    <li key={s} className="flex min-h-[64px] flex-col justify-between bg-surface px-3 py-2.5">
                      <span aria-hidden="true" className="font-mono text-[0.62rem] text-muted">
                        {aisle}-{String(si + 1).padStart(2, "0")}
                      </span>
                      <span className="text-[0.88rem] font-semibold leading-snug">{s}</span>
                    </li>
                  ))}
                  {g.items.length % 2 === 1 && <li aria-hidden="true" className="bg-surface-2" />}
                </ul>
              </div>
            ),
          };
        })}
      />
    </Section>
  );
}
