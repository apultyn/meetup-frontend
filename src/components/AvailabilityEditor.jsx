import { dateRange, formatDate } from "../lib/schedule.js";

export default function AvailabilityEditor({ event, participant, onToggleDate, onConfirm }) {
  const dates = dateRange(event.dateFrom, event.dateTo);
  const unavailableDates = new Set(participant.unavailableDates);
  const editUrl = `${window.location.origin}/events/${event.uuid}/availability/${participant.editToken}`;

  return (
    <section className="section" aria-labelledby="availability-title">
      <div className="section-heading">
        <div>
          <p className="eyebrow">Prywatna edycja</p>
          <h2 id="availability-title">Dostepnosc: {participant.name}</h2>
        </div>
        <button className="ghost-button" type="button" onClick={() => onConfirm(participant.id)}>
          Potwierdz daty
        </button>
      </div>

      <div className="panel availability-panel">
        <label>
          Link edycyjny
          <input readOnly value={editUrl} />
        </label>
        <div className="date-grid" role="list" aria-label="Daty w zakresie wydarzenia">
          {dates.map((date) => {
            const isUnavailable = unavailableDates.has(date);
            return (
              <button
                className={`date-pill ${isUnavailable ? "is-unavailable" : ""}`}
                key={date}
                type="button"
                onClick={() => onToggleDate(participant.id, date)}
              >
                <span>{formatDate(date)}</span>
                <strong>{isUnavailable ? "Nie pasuje" : "Pasuje"}</strong>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
