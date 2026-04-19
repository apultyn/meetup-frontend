import { useState } from "react";

export default function EventForm({ user, onCreateEvent }) {
  const [form, setForm] = useState({
    title: "",
    durationDays: 3,
    dateFrom: "2026-06-01",
    dateTo: "2026-06-14",
    expectedParticipantsCount: 4,
  });

  function updateField(field, value) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  function submit(event) {
    event.preventDefault();
    onCreateEvent({
      ...form,
      durationDays: Number(form.durationDays),
      expectedParticipantsCount: Number(form.expectedParticipantsCount),
      creatorName: user.name,
    });
    setForm((current) => ({ ...current, title: "" }));
  }

  return (
    <section className="section" id="new-event" aria-labelledby="new-event-title">
      <div className="section-heading">
        <div>
          <p className="eyebrow">Organizacja</p>
          <h2 id="new-event-title">Utworz wydarzenie</h2>
        </div>
      </div>

      <form className="panel form-grid" onSubmit={submit}>
        <label className="span-2">
          Nazwa
          <input
            required
            type="text"
            value={form.title}
            onChange={(event) => updateField("title", event.target.value)}
            placeholder="Np. weekend nad jeziorem"
          />
        </label>
        <label>
          Dlugosc w dniach
          <input
            min="1"
            required
            type="number"
            value={form.durationDays}
            onChange={(event) => updateField("durationDays", event.target.value)}
          />
        </label>
        <label>
          Liczba uczestnikow
          <input
            min="1"
            required
            type="number"
            value={form.expectedParticipantsCount}
            onChange={(event) => updateField("expectedParticipantsCount", event.target.value)}
          />
        </label>
        <label>
          Od
          <input
            required
            type="date"
            value={form.dateFrom}
            onChange={(event) => updateField("dateFrom", event.target.value)}
          />
        </label>
        <label>
          Do
          <input
            required
            type="date"
            value={form.dateTo}
            onChange={(event) => updateField("dateTo", event.target.value)}
          />
        </label>
        <button className="span-2" type="submit">
          Utworz i dodaj mnie jako uczestnika
        </button>
      </form>
    </section>
  );
}
