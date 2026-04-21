import { Bot, Gauge, ShieldCheck } from "lucide-react";

const items = [
  {
    title: "Fragile manual operations",
    description: "Replace brittle hand-run jobs with reliable automation through GitHub Actions.",
    Icon: Gauge
  },
  {
    title: "Inconsistent and low-trust outputs",
    description: "Turn noisy source data into consistent, testable analytical models your team can trust.",
    Icon: ShieldCheck
  },
  {
    title: "Lock-in and poor AI readiness",
    description: "Deliver a client-owned stack with AI-ready and analyst-ready star schemas built for reuse.",
    Icon: Bot
  }
];

export default function ClientPainPoints() {
  return (
    <div className="pain-point-grid" role="list">
      {items.map(({ title, description, Icon }) => (
        <article className="pain-point-card" role="listitem" key={title}>
          <span className="pain-point-icon" aria-hidden="true">
            <Icon size={20} strokeWidth={2} />
          </span>
          <h3>{title}</h3>
          <p>{description}</p>
        </article>
      ))}
    </div>
  );
}
