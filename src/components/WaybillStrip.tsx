import { waybill } from "@/content";

export function WaybillStrip() {
  return (
    <div className="border-b border-line bg-ink text-paper print:hidden">
      <p className="label mx-auto max-w-[1120px] truncate px-4 py-2 text-[0.6875rem] sm:px-6">
        <span aria-hidden="true" className="mr-2 inline-block h-2 w-2 rounded-full bg-[#2dd4bf] align-middle" />
        <span className="sm:hidden">{waybill.short}</span>
        <span className="hidden sm:inline">{waybill.full}</span>
      </p>
    </div>
  );
}
