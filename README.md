# Relayboard

Relayboard is a local-first handoff workspace for small operations teams. It keeps the next owner, urgency, checklist progress, and acknowledgement state visible without requiring an account or external service.

## Product principles

- Make the next action obvious.
- Preserve context when work changes hands.
- Keep bulk actions deliberate and reversible.
- Support mouse, keyboard, touch, and assistive technology equally.
- Store demo changes locally so the repository remains self-contained.

## Requirements

- Node.js 20
- npm 10+

## Development

```bash
npm ci
npm run dev
```

## Quality checks

```bash
npm test
npm run lint
npm run typecheck
npm run build
```

All tests run locally with Vitest and jsdom. The application does not require credentials, network access, or machine-specific files.
