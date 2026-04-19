# Codex Project Guide

## Repository Role

This repository contains the React frontend for Meetup Planner. Treat the Django
backend as a separate repository and communicate with it only through the API
contract documented in `docs/API_CONTRACT.md`.

Sibling backend repository during local development:

```text
../backend
```

Expected GitHub repository name:

```text
meetup-frontend
```

## Product Context

Meetup Planner helps a group agree on a date range for a meeting or trip.

Core rules:

- An authenticated creator creates an event.
- The creator counts toward `expected_participants_count`.
- The creator is automatically added as the first participant.
- Every participant has a private edit token for updating availability.
- Guests can join by public event UUID without logging in.
- Participants mark dates that do not work for them.
- Results are available only when the expected number of participants joined and
  every participant confirmed availability.
- The app returns up to 3 earliest possible date suggestions.
- A longer free block counts as one suggestion.
- If the original duration does not fit, the system tries shorter durations.

## Frontend Responsibilities

- Keep user-facing state and UI in React components.
- Read backend base URL from `VITE_API_URL`.
- Do not hard-code production backend URLs.
- Use the response/request shapes in `docs/API_CONTRACT.md`.
- Preserve the public event flow and private availability-edit flow.
- Keep route names aligned with the backend concepts:
  - public event: `/events/:uuid`
  - private availability editor: `/events/:uuid/availability/:editToken`

## Development Commands

```bash
npm install
npm run dev
npm run build
```

If dependencies are unavailable in the environment, still keep changes
compatible with Vite and React.

## Integration Notes

- Backend dates are ISO strings in `YYYY-MM-DD` format.
- Backend fields are snake_case. Frontend components may use camelCase
  internally, but API adapters should convert explicitly.
- Never expose edit tokens in public lists unless the current view is the private
  availability editor or the event-creation response for the current user.
- Treat `edit_token` as a secret bearer token.

## Useful Next Tasks

- Replace `src/data/demo.js` with an API client.
- Add routing with React Router.
- Add forms for registration and login.
- Add deployment config for GitHub Pages.
