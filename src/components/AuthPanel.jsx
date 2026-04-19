export default function AuthPanel() {
  return (
    <section className="auth-grid" aria-labelledby="auth-title">
      <div>
        <p className="eyebrow">Planowanie bez chaosu</p>
        <h1 id="auth-title">Znajdz termin, ktory pasuje wszystkim.</h1>
        <p className="lead">
          Utworz wydarzenie, zapros uczestnikow i zbierz dni, ktore odpadaja.
          Aplikacja wybierze najwczesniejsze wspolne terminy.
        </p>
      </div>

      <form className="panel form-panel">
        <h2>Logowanie</h2>
        <label>
          Login
          <input type="text" defaultValue="ania" />
        </label>
        <label>
          Haslo
          <input type="password" defaultValue="demo" />
        </label>
        <button type="button">Przejdz do panelu</button>
        <p className="muted">Na razie widok korzysta z danych demonstracyjnych.</p>
      </form>
    </section>
  );
}
