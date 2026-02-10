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
          <button class:active={fil.ongletActif === 'business'} on:click={() => fil.ongletActif = 'business'}>BUSINESS</button>
        </nav>

        <div class="body">
          {#if fil.ongletActif === 'business'}
            {#each fil.biens as bien}
              <div class="asset-row">
                <div class="asset-info">
                  <b>{bien.nom}</b>
                  <span>Est. Minuit: <b class="gold">{calculerRapport(bien).toLocaleString()} $</b></span>
                </div>
                <input type="range" min="-20" max="20" bind:value={bien.marge}>
                <div class="marge-val">Molette Négociation: {bien.marge}%</div>
              </div>
            {/each}
          {:else}
            <div class="view">
              <p>Trésorerie Filiale: {fil.treso.toLocaleString()} $</p>
              <p>Impact Marketing: {marketingConfigs[marketingGlobalNiveau].label}</p>
            </div>
          {/if}
        </div>
      </section>
    {/each}
  </div>

  <footer class="console">> {logs}</footer>
</main>

<style>
  :global(body) { background: #000; color: #eee; font-family: 'Inter', sans-serif; margin: 0; }
  
  .holding-panel { background: #111; padding: 20px; border-bottom: 2px solid #f1c40f; }
  .top-row { display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; }
  .capital span { color: #f1c40f; font-weight: bold; font-size: 1.3rem; }

  .marketing-center { background: #1a1a1a; padding: 15px; border-radius: 8px; border: 1px solid #333; }
  .marketing-center h3 { font-size: 0.65rem; color: #666; margin: 0 0 10px 0; letter-spacing: 1.5px; text-transform: uppercase; }
  
  .mkt-options { display: flex; gap: 8px; }
  .mkt-options button { flex: 1; background: #222; border: 1px solid #444; color: #666; padding: 10px 5px; border-radius: 4px; cursor: pointer; transition: 0.2s; display: flex; flex-direction: column; align-items: center; }
  .mkt-options button.active { border-color: var(--brand-color); color: var(--brand-color); background: #000; box-shadow: 0 0 10px rgba(0,0,0,0.5); }
  .lvl { font-size: 0.6rem; opacity: 0.5; }
  .name { font-size: 0.8rem; font-weight: bold; margin: 2px 0; }
  .mkt-options button small { font-size: 0.6rem; }

  .content { padding: 20px; padding-bottom: 60px; }
  .filiale-node { background: #0a0a0a; border: 1px solid #222; border-radius: 8px; margin-bottom: 20px; overflow: hidden; }
  .node-header { padding: 15px; display: flex; justify-content: space-between; align-items: center; background: #151515; }
  .mkt-status { font-size: 0.7rem; font-weight: bold; }

  .tabs { display: flex; background: #080808; border-bottom: 1px solid #1a1a1a; }
  .tabs button { flex: 1; padding: 12px; background: none; border: none; color: #555; cursor: pointer; font-weight: bold; font-size: 0.75rem; }
  .tabs button.active { color: #f1c40f; background: #111; border-bottom: 2px solid #f1c40f; }

  .body { padding: 15px; }
  .asset-row { background: #111; padding: 15px; border-radius: 6px; margin-bottom: 10px; border-left: 3px solid #f1c40f; }
  .asset-info { display: flex; justify-content: space-between; margin-bottom: 10px; }
  .gold { color: #f1c40f; }
  input[type=range] { width: 100%; accent-color: #f1c40f; cursor: pointer; }
  .marge-val { font-size: 0.7rem; color: #666; margin-top: 5px; text-align: right; }

  .console { position: fixed; bottom: 0; width: 100%; padding: 10px; background: #000; color: #2ecc71; border-top: 1px solid #222; font-family: monospace; font-size: 0.8rem; z-index: 100; }
</style>
