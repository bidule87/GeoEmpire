<script>
  // Variables de test pour la simulation en direct
  let patrimoine = 75000;
  let tresorerie = 12000;
  let loyerTotal = 5200;
  let dette = 0;
  
  let bienNiveau = "Basique";
  let microPretDisponible = true;

  function renover() {
    if (tresorerie >= 5000) {
      tresorerie -= 5000;
      bienNiveau = "Premium";
      loyerTotal += 1200;
      patrimoine += 10000;
      alert("Rénovation terminée ! Patrimoine +10k, Loyers +1.2k");
    } else {
      alert("Trésorerie insuffisante (5 000 Ø requis)");
    }
  }

  function emprunter() {
    if (microPretDisponible) {
      tresorerie += 15000;
      dette += 16500; // 10% d'intérêts
      microPretDisponible = false;
      alert("15 000 Ø ajoutés. Remboursement prévu : 16 500 Ø");
    }
  }
</script>

<main style="background: #000000; color: #ffffff; padding: 20px; font-family: 'Courier New', monospace; min-height: 100vh; max-width: 400px; margin: auto; border: 1px solid #1a1a1a;">

  <header style="border-bottom: 2px solid #3498db; padding-bottom: 10px; margin-bottom: 20px;">
    <div style="display: flex; justify-content: space-between; align-items: center;">
      <h2 style="font-size: 0.8rem; color: #3498db; margin: 0;">NIVEAU 3 : OPTIMISATION</h2>
      <span style="font-size: 0.6rem; background: #333; padding: 2px 5px;">JOUEUR_ID: 001</span>
    </div>
  </header>

  <section style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-bottom: 20px;">
    <div style="border: 1px solid #222; padding: 10px;">
      <p style="font-size: 0.5rem; color: #888; margin: 0;">PATRIMOINE</p>
      <p style="font-size: 0.8rem; color: #f1c40f; margin: 5px 0;">{patrimoine} Ø</p>
    </div>
    <div style="border: 1px solid #222; padding: 10px;">
      <p style="font-size: 0.5rem; color: #888; margin: 0;">TRÉSORERIE</p>
      <p style="font-size: 0.8rem; color: #2ecc71; margin: 5px 0;">{tresorerie} Ø</p>
    </div>
  </section>

  <div style="border: 1px solid #1a1a1a; padding: 15px; margin-bottom: 15px;">
    <h3 style="font-size: 0.7rem; color: #f1c40f; margin-top: 0;">🛠️ CATALOGUE : AMÉLIORATION</h3>
    <div style="display: flex; justify-content: space-between; align-items: center; background: #050505; padding: 10px; border: 1px solid #333;">
      <div>
        <p style="font-size: 0.65rem; margin: 0;">Boulangerie Gare</p>
        <p style="font-size: 0.55rem; color: #888;">Qualité : {bienNiveau}</p>
      </div>
      {#if bienNiveau === "Basique"}
        <button on:click={renover} style="background: #2ecc71; color: #000; border: none; padding: 5px; font-size: 0.6rem; font-weight: bold; cursor: pointer;">
          RÉNOVER (5k)
        </button>
      {:else}
        <span style="color: #f1c40f; font-size: 0.6rem;">MAX</span>
      {/if}
    </div>
  </div>

  <div style="border: 1px solid #e74c3c; padding: 15px; margin-bottom: 15px;">
    <h3 style="font-size: 0.7rem; color: #e74c3c; margin-top: 0;">🏦 CRÉDIT BANCAIRE</h3>
    {#if microPretDisponible}
      <p style="font-size: 0.55rem; color: #888;">Disponible : 15 000 Ø (Taux 10%)</p>
      <button on:click={emprunter} style="width: 100%; background: #000; border: 1px solid #e74c3c; color: #e74c3c; padding: 8px; font-size: 0.6rem; cursor: pointer; margin-top: 5px;">
        CONTRACTER MICRO-PRÊT
      </button>
    {:else}
      <p style="font-size: 0.6rem; color: #e74c3c;">DETTE À RÉGLER : {dette} Ø</p>
      <p style="font-size: 0.5rem; color: #555;">(Prélèvement automatique à Minuit)</p>
    {/if}
  </div>

  <div style="border: 1px solid #1a1a1a; padding: 15px;">
    <h3 style="font-size: 0.7rem; color: #3498db; margin-top: 0;">📡 RADAR VOISINAGE (5KM)</h3>
    <div style="font-size: 0.55rem; color: #666;">
      <div style="display: flex; justify-content: space-between; margin-bottom: 5px;">
        <span>User_X (Pharmacie)</span>
        <span style="color: #fff;">Loyer : 180 Ø</span>
      </div>
      <div style="display: flex; justify-content: space-between;">
        <span>User_Y (Hangar)</span>
        <span style="color: #fff;">Loyer : 450 Ø</span>
      </div>
    </div>
  </div>

  <footer style="margin-top: 20px; border-top: 1px solid #1a1a1a; padding-top: 10px;">
    <p style="font-size: 0.6rem; color: {bienNiveau === 'Premium' ? '#2ecc71' : '#444'};">
      {bienNiveau === 'Premium' ? '✅' : '🔘'} Mission Rénovation
    </p>
    <p style="font-size: 0.6rem; color: {!microPretDisponible ? '#2ecc71' : '#444'};">
      {!microPretDisponible ? '✅' : '🔘'} Mission Crédit
    </p>
  </footer>

</main>
