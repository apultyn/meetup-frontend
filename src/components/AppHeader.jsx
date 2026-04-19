export default function AppHeader({ user }) {
  return (
    <header className="app-header">
      <a className="brand" href="#dashboard" aria-label="Meetup Planner">
        <span className="brand-mark">MP</span>
        <span>Meetup Planner</span>
      </a>
      <div className="user-chip">
        <span>Zalogowano jako</span>
        <strong>{user.name}</strong>
      </div>
    </header>
  );
}
