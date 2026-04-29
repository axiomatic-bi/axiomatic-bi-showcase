import type { LucideIcon } from "lucide-react";

export interface IconCardItem {
  title: string;
  description: string;
  Icon: LucideIcon;
}

interface Props {
  items: IconCardItem[];
}

export default function IconCardGrid({ items }: Props) {
  return (
    <div className="icon-card-grid" role="list">
      {items.map(({ title, description, Icon }) => (
        <article className="icon-card" role="listitem" key={title}>
          <span className="icon-card-icon" aria-hidden="true">
            <Icon size={20} strokeWidth={2} />
          </span>
          <h3>{title}</h3>
          <p>{description}</p>
        </article>
      ))}
    </div>
  );
}
