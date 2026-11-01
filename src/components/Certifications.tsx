import { certifications, education, sections } from "@/content";
import { Icon } from "./Icon";
import { Section } from "./Section";

/** Module 08 · Certifications as a document register. */
export function Certifications() {
  return (
    <Section module={sections.certs} title="Compliance register" intro="Certifications and formal education.">
      <div className="panel overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[560px] text-left text-[0.93rem]">
            <caption className="sr-only">Certifications and education</caption>
            <thead className="bg-surface-2">
              <tr className="label text-muted">
                <th scope="col" className="px-5 py-3 font-normal">Ref</th>
                <th scope="col" className="px-5 py-3 font-normal">Certificate</th>
                <th scope="col" className="px-5 py-3 font-normal">Issuer</th>
                <th scope="col" className="px-5 py-3 font-normal">Status</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t border-line">
                <td className="px-5 py-3 font-mono text-[0.8rem] text-muted">EDU-01</td>
                <td className="px-5 py-3 font-semibold">
                  {education.name}
                  <span className="block text-[0.85rem] font-normal text-muted">
                    {education.grade} · {education.date}
                  </span>
                </td>
                <td className="px-5 py-3 text-muted">{education.school}</td>
                <td className="px-5 py-3">
                  <span className="chip chip-ok">
                    <Icon name="grad" size={12} />
                    Awarded
                  </span>
                </td>
              </tr>
              {certifications.map((c, i) => (
                <tr key={c.name} className="border-t border-line">
                  <td className="px-5 py-3 font-mono text-[0.8rem] text-muted">CRT-{String(i + 1).padStart(2, "0")}</td>
                  <td className="px-5 py-3 font-semibold">{c.name}</td>
                  <td className="px-5 py-3 text-muted">{c.issuer}</td>
                  <td className="px-5 py-3">
                    <span className="chip chip-ok">
                      <Icon name="check" size={12} />
                      Completed
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Section>
  );
}
