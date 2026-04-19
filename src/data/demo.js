export const initialUser = {
  id: "user-1",
  login: "ania",
  name: "Ania",
};

export const initialEvents = [
  {
    id: "event-1",
    uuid: "b5c4f796-32b7-4f1b-93f0-22d3220bd462",
    title: "Majowy wyjazd w góry",
    ownerId: "user-1",
    durationDays: 4,
    dateFrom: "2026-05-01",
    dateTo: "2026-05-16",
    expectedParticipantsCount: 4,
    createdAt: "2026-04-19",
  },
];

export const initialParticipants = [
  {
    id: "participant-1",
    eventId: "event-1",
    userId: "user-1",
    name: "Ania",
    isOwner: true,
    editToken: "ania-demo-token",
    isConfirmed: true,
    unavailableDates: ["2026-05-03", "2026-05-04", "2026-05-11"],
  },
  {
    id: "participant-2",
    eventId: "event-1",
    userId: null,
    name: "Marek",
    isOwner: false,
    editToken: "marek-demo-token",
    isConfirmed: true,
    unavailableDates: ["2026-05-07", "2026-05-08"],
  },
  {
    id: "participant-3",
    eventId: "event-1",
    userId: null,
    name: "Ola",
    isOwner: false,
    editToken: "ola-demo-token",
    isConfirmed: false,
    unavailableDates: ["2026-05-02", "2026-05-09"],
  },
];
