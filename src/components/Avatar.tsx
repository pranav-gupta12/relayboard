import type { Person } from "../domain/handoff";

interface AvatarProps {
  person: Person;
  showName?: boolean;
  size?: "small" | "medium";
}

export function Avatar({ person, showName = false, size = "medium" }: AvatarProps) {
  return (
    <span className="person">
      <span className={`avatar avatar--${person.color} avatar--${size}`} aria-hidden="true">
        {person.initials}
      </span>
      {showName && (
        <span className="person__copy">
          <strong>{person.name}</strong>
          <small>{person.role}</small>
        </span>
      )}
      {!showName && <span className="sr-only">{person.name}</span>}
    </span>
  );
}
