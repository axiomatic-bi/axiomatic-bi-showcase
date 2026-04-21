import { Bot, Gauge, ShieldCheck } from "lucide-react";
import IconCardGrid, { type IconCardItem } from "./IconCardGrid";

const items: IconCardItem[] = [
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
  return <IconCardGrid items={items} />;
}
