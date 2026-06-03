/**
 * Placeholder reveal card shown when a user wins a Booger pull.
 *
 * TODO: Wallet connect before showing claim UI.
 * TODO: Fetch real NFT metadata and image from chain or backend.
 * TODO: Trigger mint / transfer transaction on claim.
 * TODO: Save claim status to backend.
 */
export function BoogerReveal() {
  return (
    <div className="booger-reveal">
      <div className="booger-reveal__image" aria-hidden="true">
        <span className="booger-reveal__placeholder-label">Booger NFT Placeholder</span>
      </div>
      <div className="booger-reveal__copy">
        <h3 className="booger-reveal__title">Fresh Booger Found</h3>
        <p className="booger-reveal__description">
          A weird little collectible crawled out of the box.
        </p>
      </div>
    </div>
  );
}
