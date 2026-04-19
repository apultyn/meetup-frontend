# Meetup Planner API Contract

This file is shared context for the frontend and backend Codex sessions. Keep it
in sync with the backend implementation.

## Base URL

Frontend reads the API base URL from:

```text
VITE_API_URL
```

Local default:

```text
http://localhost:8000
```

All endpoints below are relative to `/api`.

## Data Shapes

### Event

```json
{
  "id": 1,
  "uuid": "b5c4f796-32b7-4f1b-93f0-22d3220bd462",
  "title": "Majowy wyjazd w góry",
  "duration_days": 4,
  "date_from": "2026-05-01",
  "date_to": "2026-05-16",
  "expected_participants_count": 4,
  "participants": [],
  "created_at": "2026-04-19T17:00:00Z"
}
```

### Participant

```json
{
  "id": 1,
  "name": "Ania",
  "edit_token": "413bbdd3-0bd2-4f09-a50a-b3ebea82762b",
  "is_owner": true,
  "is_confirmed": false,
  "unavailable_dates": ["2026-05-03", "2026-05-04"]
}
```

`edit_token` is secret. It may be returned when a participant is created or when
the private token URL is used, but the frontend must not display other users'
tokens in public event views.

### Result

```json
{
  "status": "ready",
  "original_duration_days": 4,
  "used_duration_days": 3,
  "was_shortened": true,
  "suggestions": [
    {
      "start_date": "2026-05-09",
      "end_date": "2026-05-11",
      "available_block_end_date": "2026-05-13"
    }
  ]
}
```

Possible result statuses:

- `waiting` - not enough participants or not everyone confirmed.
- `ready` - suggestions were found.
- `empty` - no possible dates were found, even after shortening duration.

## Endpoints

### Register

```http
POST /api/auth/register/
```

Request:

```json
{
  "username": "ania",
  "password": "very-secret-password"
}
```

Response: created user data.

### List Own Events

```http
GET /api/events/
```

Requires authenticated user session.

Response:

```json
[
  {
    "id": 1,
    "uuid": "b5c4f796-32b7-4f1b-93f0-22d3220bd462",
    "title": "Majowy wyjazd w góry",
    "duration_days": 4,
    "date_from": "2026-05-01",
    "date_to": "2026-05-16",
    "expected_participants_count": 4,
    "participants": [],
    "created_at": "2026-04-19T17:00:00Z"
  }
]
```

### Create Event

```http
POST /api/events/
```

Requires authenticated user session.

Request:

```json
{
  "title": "Majowy wyjazd w góry",
  "duration_days": 4,
  "date_from": "2026-05-01",
  "date_to": "2026-05-16",
  "expected_participants_count": 4
}
```

Backend behavior:

- Creates the event.
- Automatically creates a participant for the creator.
- The creator is included in `expected_participants_count`.

Response: created event, including participants.

### Get Public Event

```http
GET /api/events/{uuid}/
```

Does not require login.

Response: event data with participants. Public views should not reveal edit
tokens for participants other than the current private-token participant.

### Join Event

```http
POST /api/events/{uuid}/participants/
```

Does not require login.

Request:

```json
{
  "name": "Marek"
}
```

Response:

```json
{
  "id": 2,
  "name": "Marek",
  "edit_token": "ca708da4-2ce9-4b74-a742-bce0a3382731",
  "is_owner": false,
  "is_confirmed": false,
  "unavailable_dates": []
}
```

If the event already has `expected_participants_count` participants, return
`400 Bad Request`.

### Update Availability

```http
PATCH /api/participants/{edit_token}/availability/
```

Does not require login. The edit token authorizes the update.

Request:

```json
{
  "unavailable_dates": ["2026-05-03", "2026-05-04"]
}
```

Backend behavior:

- Replaces all unavailable dates for this participant.
- Validates that every date is within the event range.
- Sets `is_confirmed` to `false`.

Response: participant.

### Confirm Availability

```http
POST /api/participants/{edit_token}/confirm/
```

Does not require login. The edit token authorizes the update.

Response: participant with `is_confirmed: true`.

### Get Results

```http
GET /api/events/{uuid}/results/
```

Does not require login.

Response: result object.

## Algorithm Rules

The backend is the source of truth for results.

- Build the set of unavailable dates from all confirmed participants.
- Search continuous blocks of available days inside `[date_from, date_to]`.
- A block is valid when its length is at least `duration_days`.
- A valid block contributes one suggestion starting at the first day of the
  block.
- Return the earliest 3 suggestions.
- If no suggestions exist for the original duration, retry with shorter
  durations down to 1 day.
- If nothing is found, return `status: "empty"`.
