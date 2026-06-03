import { TissueBoxExperience } from "./components/TissueBoxExperience";

function App() {
  return (
    <div className="app">
      <main className="app__main">
        <header className="hero">
          <p className="hero__eyebrow">Interactive collectible experience</p>
          <h1 className="hero__title">Toph&apos;s Tissues</h1>
          <p className="hero__subtitle">
            Pull a tissue. Maybe it&apos;s clean. Maybe it&apos;s cursed. Maybe
            there&apos;s a Booger waiting inside.
          </p>
        </header>

        <TissueBoxExperience />

        <section className="coming-soon">
          <p className="coming-soon__text">
            Free Booger claims, wallet checks, cooldowns, and holder perks coming
            soon.
          </p>
          {/* TODO: Wallet connect button */}
          {/* TODO: Claim cooldown timer display */}
          {/* TODO: Holder perks section */}
        </section>
      </main>
    </div>
  );
}

export default App;
