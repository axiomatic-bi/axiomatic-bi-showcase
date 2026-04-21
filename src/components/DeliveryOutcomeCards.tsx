import { BarChart3, Database, Handshake } from "lucide-react";
import IconCardGrid, { type IconCardItem } from "./IconCardGrid";

const items: IconCardItem[] = [
  {
    title: "Reporting-ready models",
    description: "Clear star schemas built for fast dashboarding and simpler SQL/DAX work.",
    Icon: BarChart3
  },
  {
    title: "Flexible data foundation",
    description: "Source and warehouse agnostic delivery, with DuckDB/MotherDuck as the default recommendation.",
    Icon: Database
  },
  {
    title: "Ownership and handover",
    description: "Documentation and operating guidance so your team can run and evolve the stack independently.",
    Icon: Handshake
  }
];

export default function DeliveryOutcomeCards() {
  return <IconCardGrid items={items} />;
}
