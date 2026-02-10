<script>
  // --- ÉTAT DE LA HOLDING ---
  let capitalHolding = 150000;
  let marketingGlobalNiveau = 2; 
  let logs = "Système Holding : 4 niveaux de Marketing détectés.";

  // LES 4 NIVEAUX DE TON SCRIPT
  const marketingConfigs = {
    1: { label: "Local", prix: 100, multi: 1.0, color: "#95a5a6" },
    2: { label: "National", prix: 500, multi: 1.15, color: "#3498db" },
    3: { label: "International", prix: 1500, multi: 1.30, color: "#9b59b6" },
    4: { label: "Viral / Expert", prix: 3000, multi: 1.50, color: "#f1c40f" }
  };

  // --- FILIALES ---
  let filiales = [
    { 
      id: 1, 
      nom: "Acier 1", 
      treso: 12500,
      ongletActif: 'business',
      biens: [{ id: 101, nom: "Entrepôt Forge", valeur: 85000, type: "LOCATION", marge: 10 }]
    }
  ];

  function calculerRapport(bien) {
    let base = bien.valeur * (1 + bien.marge / 100);
    let final = base * marketingConfigs[marketingGlobalNiveau].multi;
    return Math.floor(final);
  }

  function changerMarketing(niveau) {
    marketingGlobalNiveau = niveau;
    logs = `Marketing Global : Mode ${marketingConfigs[niveau].label} (+${(marketingConfigs[niveau].multi - 1) * 100}%).`;
  }
</script>

<main>
  <header class="holding-panel">
    <div class="top-row">
      <h1>🏦 HOLDING CONTROL</h1>
      <div class="capital">CAPITAL: <span>{capitalHolding.toLocaleString()} $</span></div>
    </div>

    <div class="marketing-center">
      <h3>📢 STRATÉGIE MARKETING GLOBALE (4 NIVEAUX)</h3>
      <div class="mkt-options">
        {#each [1, 2, 3, 4] as niv}
          <button 
            class:active={marketingGlobalNiveau === niv} 
            style="--brand-color: {marketingConfigs[niv].color}"
            on:click={() => changerMarketing(niv)}>
            <span class="lvl">LVL {niv}</span>
            <span class="name">{marketingConfigs[niv].label}</span>
            <small>{marketingConfigs[niv].prix}$/j</small>
          </button>
        {/each}
      </div>
    </div>
  </header>

  <div class="content">
    {#each filiales as fil}
      <section class="filiale-node">
        <div class="node-header">
          <h2>{fil.nom}</h2>
          <div class="mkt-status">Boost Global: <span style="color:{marketingConfigs[marketingGlobalNiveau].color}">x{marketingConfigs[marketingGlobalNiveau].multi}</span></div>
        </div>

        <nav class="tabs">
          <button class:active={fil.ongletActif === 'situation'} on:click={() => fil.ongletActif = 'situation'}>SITUATION</button>
          <button class:active={fil.
