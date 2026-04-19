import { useMemo, useState } from "react";
import AppHeader from "./components/AppHeader.jsx";
import AuthPanel from "./components/AuthPanel.jsx";
import AvailabilityEditor from "./components/AvailabilityEditor.jsx";
import Dashboard from "./components/Dashboard.jsx";
import EventDetails from "./components/EventDetails.jsx";
import EventForm from "./components/EventForm.jsx";
import JoinEvent from "./components/JoinEvent.jsx";
import ResultsPanel from "./components/ResultsPanel.jsx";
import { initialEvents, initialParticipants, initialUser } from "./data/demo.js";
import { findDateSuggestions } from "./lib/schedule.js";

function createId(prefix) {
  return `${prefix}-${crypto.randomUUID()}`;
}

function createEditToken() {
  return crypto.randomUUID().replaceAll("-", "");
}

export default function App() {
  const [user] = useState(initialUser);
  const [events, setEvents] = useState(initialEvents);
  const [participants, setParticipants] = useState(initialParticipants);
  const [selectedEventId, setSelectedEventId] = useState(initialEvents[0].id);
  const [selectedParticipantId, setSelectedParticipantId] = useState(initialParticipants[0].id);

  const selectedEvent = events.find((event) => event.id === selectedEventId);
  const eventParticipants = participants.filter(
    (participant) => participant.eventId === selectedEventId,
  );
  const selectedParticipant =
    eventParticipants.find((participant) => participant.id === selectedParticipantId) ||
    eventParticipants[0];

  const result = useMemo(
    () => findDateSuggestions(selectedEvent, eventParticipants),
    [selectedEvent, eventParticipants],
  );

  function createEvent(form) {
    const eventId = createId("event");
    const newEvent = {
      id: eventId,
      uuid: crypto.randomUUID(),
      title: form.title,
      ownerId: user.id,
      durationDays: form.durationDays,
      dateFrom: form.dateFrom,
      dateTo: form.dateTo,
      expectedParticipantsCount: form.expectedParticipantsCount,
      createdAt: new Date().toISOString().slice(0, 10),
    };
    const ownerParticipant = {
      id: createId("participant"),
      eventId,
      userId: user.id,
      name: form.creatorName,
      isOwner: true,
      editToken: createEditToken(),
      isConfirmed: false,
      unavailableDates: [],
    };

    setEvents((current) => [newEvent, ...current]);
    setParticipants((current) => [ownerParticipant, ...current]);
    setSelectedEventId(eventId);
    setSelectedParticipantId(ownerParticipant.id);
  }

  function joinEvent(name) {
    const participant = {
      id: createId("participant"),
      eventId: selectedEvent.id,
      userId: null,
      name,
      isOwner: false,
      editToken: createEditToken(),
      isConfirmed: false,
      unavailableDates: [],
    };

    setParticipants((current) => [...current, participant]);
    setSelectedParticipantId(participant.id);
  }

  function toggleUnavailableDate(participantId, date) {
    setParticipants((current) =>
      current.map((participant) => {
        if (participant.id !== participantId) {
          return participant;
        }

        const dates = new Set(participant.unavailableDates);
        if (dates.has(date)) {
          dates.delete(date);
        } else {
          dates.add(date);
        }

        return {
          ...participant,
          isConfirmed: false,
          unavailableDates: [...dates].sort(),
        };
      }),
    );
  }

  function confirmParticipant(participantId) {
    setParticipants((current) =>
      current.map((participant) =>
        participant.id === participantId ? { ...participant, isConfirmed: true } : participant,
      ),
    );
  }

  return (
    <div className="app-shell">
      <AppHeader user={user} />
      <main>
        <AuthPanel />
        <Dashboard
          events={events}
          selectedEventId={selectedEventId}
          onSelectEvent={setSelectedEventId}
        />
        <EventForm user={user} onCreateEvent={createEvent} />
        <EventDetails event={selectedEvent} participants={eventParticipants} />
        <JoinEvent event={selectedEvent} participants={eventParticipants} onJoin={joinEvent} />
        {selectedParticipant && (
          <AvailabilityEditor
            event={selectedEvent}
            participant={selectedParticipant}
            onToggleDate={toggleUnavailableDate}
            onConfirm={confirmParticipant}
          />
        )}
        <ResultsPanel event={selectedEvent} result={result} />
      </main>
    </div>
  );
}
