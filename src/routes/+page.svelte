<script>
  // --- ÉTAT GLOBAL ---
  let geoBalance = 6157.92;
  let isElite = true; 
  let logs = "Système GEO EMPIRE connecté. En attente de minuit...";

  // --- DONNÉES DES FILIALES ---
  let filiales = [
    { 
      id: 1, 
      nom: "Acier 1", 
      holding: "La Tour Sucrée",
      marketing: 3, // Excellent (Vert)
      treso: 12500,
      vueActive: 'business', 
      biens: [
        { id: 101, nom: "Entrepôt Forge", valeurBase: 85000, type: "LOCATION", marge: 10, statut: "Actif" }
      ]
    },
    { 
      id: 2, 
      nom: "Centrakor", 
      holding: "MARIGNANT",
      marketing: 2, // Moyen (Jaune)
      treso: 45200,
      vueActive: 'situation',
      biens: [
        { id: 201, nom: "Magasin Limoges", valeurBase: 120000, type: "VENTE", marge: -5, statut: "En stock" }
      ]
    }
  ];

  // Configuration Marketing
  const mktConfig = {
    1: { label: "Médiocre", color: "#e74c3c", multi: 0.8 },
    2: { label: "Correct", color: "#f1c40f", multi: 1.0 },
    3: { label: "Excellent", color: "#2ecc71", multi: 1.3 }
  };

  // Calcul dynamique selon les règles du DOX
  function calculerPrix(bien, niveauMkt) {
    let base = bien.valeurBase * (1 + bien.marge / 100);
    let avecMkt = base * mktConfig[niveauMkt].multi;
    if (isElite) avecMkt *= 1.20; // Bonus Élite +20%
    return Math.floor(avecMkt);
  }

  function toggleVue(id, vue) {
    filiales = filiales.map(f => f.id === id ? {...f, vueActive: vue} : f);
  }
</script>

<main class="app-dark">
  <header class="topbar">
    <div class="brand">👑 GEO EMPIRE</div>
    <div class="wallet">
      <span class="gold-text">{geoBalance.toLocaleString()} $ ∅</span>
      {#if isElite}<span class="badge-elite">ÉLITE</span>{/if}
    </div>
  </header>

  <div class="dashboard">
    {#each filiales as fil}
      <article class="enterprise-card">
        <header class="card-header">
          <div class="title-group">
            <h3>{fil.nom}</h3>
            <small class="holding-name">{fil.holding}</small>
          </div>
          <div class="mkt-indicator" style="background: {mktConfig[fil.marketing].color}">
            {mktConfig[fil.marketing].label}
          </div>
        </header>

        <nav class="inner-nav">
          <button class:active={fil.vueActive === 'situation'} on:click={() => toggleVue(fil.id, 'situation')}>
            📉 SITUATION
          </button>
          <button class:active={fil.vueActive === 'business'} on:click={() => toggleVue(fil.id, 'business')}>
            💼 BUSINESS
          </button>
        </nav>

        <section class="card-body">
          {#if fil.vueActive === 'situation'}
            <div class="situation-view">
              <div class="data-row"><span>Trésorerie filiale :</span> <span class="white">{fil.treso.toLocaleString()} $</span></div>
              <div class="data-row"><span>Résultat prévisionnel :</span> <span class="green">+1 430.50 $</span></div>
              <div class="data-row"><span>Prochaine MAJ :</span> <span class="yellow">00:00 (Minuit)</span></div>
            </div>
          {:else}
            <div class="business-view">
              {#each fil.biens as bien}
                <div class="asset-box">
                  <div class="asset-top">
                    <span class="asset-name">{bien.nom}</span>
                    <span class="asset-type">{bien.type}</span>
                  </div>
                  
                  <div class="negotiation">
                    <div class="label-group">
                      <label>Négociation molette</label>
                      <span class="marge-val" class:plus={bien.marge > 0}>{bien.marge}%</span>
                    </div>
                    <input type="range" min="-20" max="20" bind:value={bien.marge}>
                  </div>

                  <div class="asset-bottom">
                    <div class="price-box">
                      <small>Estimation minuit :</small>
                      <span class="price">{calculerPrix(bien, fil.marketing).toLocaleString()} $</span>
                    </div>
                    <button class="action-btn" on:click={() => logs = `Ordre de ${bien.type} enregistré.`}>
                      {bien.type === 'LOCATION' ? 'LOUER' : 'VENDRE'}
                    </button>
                  </div>
                </div>
              {/each}
            </div>
          {/if}
        </section>
      </article>
    {/each}
  </div>

  <footer class="terminal">> {logs}</footer>
</main>

<style>
  :global(body) { margin:0; background:#000; color:#eee; font-family:'Inter', sans-serif; }
  
  .app-dark { display: flex; flex-direction: column; height: 100vh; }
  .topbar { background:#111; padding:15px; display:flex; justify-content:space-between; border-bottom:1px solid #f1c40f; }
  .gold-text { color:#f1c40f; font-weight:bold; font-size:1.1rem; }
  .badge-elite { background:#f1c40f; color:#000; font-size:0.6rem; padding:2px 5px; font-weight:bold; margin-left:10px; border-radius:3px; }

  .dashboard { padding:15px; overflow-y:auto; flex-grow:1; }

  .enterprise-card { background:#0d0d0d; border:1px solid #222; border-radius:10px; margin-bottom:20px; overflow:hidden; }
  .card-header { padding:15px; display:flex; justify-content:space-between; align-items:center; background:#151515; }
  .title-group h3 { margin:0; color:#f1c40f; font-size:1rem; }
  .holding-name { color:#666; font-size:0.75rem; }
  .mkt-indicator { font-size:0.6rem; padding:3px 8px; border-radius:20px; color:#000; font-weight:bold; text-transform:uppercase; }

  .inner-nav { display:flex; background:#080808; border-bottom:1px solid #1a1a1a; }
  .inner-nav button { flex:1; background:none; border:none; color:#555; padding:12px; cursor:pointer; font-weight:bold; font-size:0.75rem; transition:0.3s; }
  .inner-nav button.active { color:#f1c40f; background:#111; border-bottom:2px solid #f1c40f; }

  .card-body { padding:15px; }
  .data-row { display:flex; justify-content:space-between; padding:8px 0; border-bottom:1px solid #151515; font-size:0.85rem; }
  .white { color:#fff; } .green { color:#2ecc71; } .yellow { color:#f1c40f; }

  .asset-box { background:#151515; border:1px solid #222; padding:12px; border-radius:6px; margin-bottom:10px; }
  .asset-top { display:flex; justify-content:space-between; margin-bottom:15px; }
  .asset-name { font-weight:bold; font-size:0.9rem; }
  .asset-type { font-size:0.6rem; color:#f1c40f; border:1px solid #f1c40f; padding:1px 4px; border-radius:3px; }

  .negotiation { margin-bottom:15px; }
  .label-group { display:flex; justify-content:space-between; font-size:0.7rem; color:#888; margin-bottom:5px; }
  .marge-val.plus { color:#2ecc71; }
  input[type=range] { width:100%; accent-color:#f1c40f; }

  .asset-bottom { display:flex; justify-content:space-between; align-items:center; }
  .price { display:block; color:#f1c40f; font-size:1rem; font-weight:bold; }
  .action-btn { background:#f1c40f; color:#000; border:none; padding:8px 16px; border-radius:4px; font-weight:bold; cursor:pointer; font-size:0.75rem; }

  .terminal { background:#000; color:#2ecc71; padding:8px; font-family:monospace; font-size:0.7rem; border-top:1px solid #222; }
</style>