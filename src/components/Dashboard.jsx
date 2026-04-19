import { formatDate } from "../lib/schedule.js";

export default function Dashboard({ events, selectedEventId, onSelectEvent }) {
  return (
    <section className="section" aria-labelledby="dashboard-title">
      <div className="section-heading">
        <div>
          <p className="eyebrow">Panel organizatora</p>
          <h2 id="dashboard-title">Twoje wydarzenia</h2>
        </div>
        <a className="ghost-button" href="#new-event">
          Nowe wydarzenie
        </a>
      </div>

      <div className="event-list">
        {events.map((event) => (
          <button
            className={`event-card ${event.id === selectedEventId ? "is-selected" : ""}`}
            key={event.id}
            onClick={() => onSelectEvent(event.id)}
            type="button"
          >
            <span>{event.title}</span>
            <strong>
              {formatDate(event.dateFrom)} - {formatDate(event.dateTo)}
            </strong>
            <small>
              {event.durationDays} dni, {event.expectedParticipantsCount} uczestnikow
            </small>
          </button>
        ))}
      </div>
    </section>
  );
}
