import { formatDate } from "../lib/schedule.js";

export default function ResultsPanel({ event, result }) {
  return (
    <section className="section" aria-labelledby="results-title">
      <div className="section-heading">
        <div>
          <p className="eyebrow">Wyniki</p>
          <h2 id="results-title">Proponowane terminy</h2>
        </div>
      </div>

      <div className="panel results-panel">
        {result.status === "waiting" && (
          <p>
            Wyniki pojawia sie, gdy dolaczy {event.expectedParticipantsCount} uczestnikow i kazdy
            potwierdzi swoje daty.
          </p>
        )}

        {result.status === "empty" && (
          <p>Nie udalo sie znalezc wspolnego terminu nawet po skroceniu wydarzenia.</p>
        )}

        {result.status === "ready" && (
          <>
            {result.wasShortened && (
              <p className="notice">
                Nie znaleziono terminu na {result.originalDurationDays} dni, wiec proponujemy
                krotsze wydarzenie: {result.usedDurationDays} dni.
              </p>
            )}
            <div className="suggestion-list">
              {result.suggestions.map((suggestion) => (
                <article className="suggestion-card" key={suggestion.startDate}>
                  <span>
                    {formatDate(suggestion.startDate)} - {formatDate(suggestion.endDate)}
                  </span>
                  <small>
                    Wolny blok trwa do {formatDate(suggestion.availableBlockEndDate)}
                  </small>
                </article>
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
}
