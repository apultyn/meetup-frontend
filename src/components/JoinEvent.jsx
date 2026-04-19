import { useState } from "react";

export default function JoinEvent({ event, participants, onJoin }) {
  const [name, setName] = useState("");
  const isFull = participants.length >= event.expectedParticipantsCount;

  function submit(event) {
    event.preventDefault();
    if (!name.trim() || isFull) {
      return;
    }
    onJoin(name.trim());
    setName("");
  }

  return (
    <section className="section" aria-labelledby="join-event-title">
      <div className="section-heading">
        <div>
          <p className="eyebrow">Publiczny link</p>
          <h2 id="join-event-title">Dolacz do wydarzenia</h2>
        </div>
      </div>

      <form className="panel inline-form" onSubmit={submit}>
        <label>
          Imie uczestnika
          <input
            disabled={isFull}
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="Wpisz imie"
          />
        </label>
        <button disabled={isFull} type="submit">
          Dolacz
        </button>
        {isFull && <p className="muted">Lista uczestnikow jest juz pelna.</p>}
      </form>
    </section>
  );
}
