import type { Person } from "../domain/handoff";

export const PEOPLE: Person[] = [
  {
    id: "maya",
    name: "Maya Chen",
    initials: "MC",
    role: "Operations lead",
    color: "coral",
  },
  {
    id: "theo",
    name: "Theo Brooks",
    initials: "TB",
    role: "Customer systems",
    color: "moss",
  },
  {
    id: "ines",
    name: "Ines Martins",
    initials: "IM",
    role: "Fulfilment",
    color: "violet",
  },
  {
    id: "omar",
    name: "Omar El-Sayed",
    initials: "OE",
    role: "Incident response",
    color: "amber",
  },
];

export const PEOPLE_BY_ID = Object.fromEntries(
  PEOPLE.map((person) => [person.id, person]),
) as Record<string, Person>;
