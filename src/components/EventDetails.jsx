import { formatDate } from "../lib/schedule.js";

export default function EventDetails({ event, participants }) {
  const joinedCount = participants.length;
  const confirmedCount = participants.filter((participant) => participant.isConfirmed).length;
  const publicUrl = `${window.location.origin}/events/${event.uuid}`;

  return (
    <section className="section" aria-labelledby="event-details-title">
      <div className="section-heading">
        <div>
          <p className="eyebrow">Wybrane wydarzenie</p>
          <h2 id="event-details-title">{event.title}</h2>
        </div>
      </div>

      <div className="details-layout">
        <article className="panel event-overview">
          <dl>
            <div>
              <dt>Termin do sprawdzenia</dt>
              <dd>
                {formatDate(event.dateFrom)} - {formatDate(event.dateTo)}
              </dd>
            </div>
            <div>
              <dt>Dlugosc</dt>
              <dd>{event.durationDays} dni</dd>
            </div>
            <div>
              <dt>Uczestnicy</dt>
              <dd>
                {joinedCount} z {event.expectedParticipantsCount}
              </dd>
            </div>
            <div>
              <dt>Potwierdzenia</dt>
              <dd>
                {confirmedCount} z {event.expectedParticipantsCount}
              </dd>
            </div>
          </dl>
          <label>
            Link do zaproszenia
            <input readOnly value={publicUrl} />
          </label>
        </article>

        <article className="panel participant-list">
          <h3>Uczestnicy</h3>
          {participants.map((participant) => (
            <div className="participant-row" key={participant.id}>
              <span>
                {participant.name}
                {participant.isOwner && <small> organizator</small>}
              </span>
              <strong className={participant.isConfirmed ? "status-ok" : "status-waiting"}>
                {participant.isConfirmed ? "Gotowe" : "Czeka"}
              </strong>
            </div>
          ))}
        </article>
      </div>
    </section>
  );
}
