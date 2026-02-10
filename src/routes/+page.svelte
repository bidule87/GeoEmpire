<script>
  // 1. FINANCES GLOBALES (HOLDING)
  let geoBalance = 39259;
  let isElite = false; // Bonus +20%
  let logs = "Système de gestion initialisé...";

  // 2. BIENS DÉTENUS EN DIRECT PAR LA HOLDING
  let biensHolding = [
    { id: 'h1', nom: "Siège Social Limoges", valeurBase: 150000, type: "LOCATION", marge: 0, ordre: null },
    { id: 'h2', nom: "Entrepôt A1", valeurBase: 45000, type: "VENTE", marge: 0, ordre: null }
  ];

  // 3. TES FILIALES (ENTREPRISES)
  let filiales = [
    {
      nom: "SCI ALPHA",
      marketing: 2, // 1:Rouge, 2:Jaune, 3:Vert
      biens: [
        { id: 'f1', nom: "Appartement T2", valeurBase: 65000, type: "LOCATION", marge: 0, ordre: null }
      ]
    }
  ];

  const mkt = {
    1: { lab: "Médiocre", col: "#e74c3c", multi: 0.8 },
    2: { lab: "Correct", col: "#f1c40f", multi: 1.0 },
    3: { lab: "Excellent", col: "#2ecc71", multi: 1.3 }
  };

  function calculerPrix(bien, niveauMkt = 2) {
    let prix = bien.valeurBase * (1 + bien.marge / 100) * mkt[niveauMkt].multi;
    if (isElite) prix *= 1.20;
    return Math.floor(prix);
  }

  function placerOrdre(bien, type) {
    bien.ordre = type;
    logs = `Ordre de ${type} enregistré pour minuit : ${bien.nom}`;
    // Force la mise à jour visuelle Svelte
    biensHolding = [...biensHolding];
    filiales = [...filiales];
  }
</script>

<main>
  <div class="header">
    <div class="brand">👑 GEO EMPIRE {isElite ? '★ ELITE' : ''}</div>
    <div class="balance">🟡 {geoBalance.toLocaleString()} G</div>
  </div>

  <div class="container">
    <section class="group">
      <h2 class="section-title">🏢 EXPLOITATION DIRECTE (HOLDING)</h2>
      {#each biensHolding as bien}
        <div class="asset-card">
          <div class="asset-info">
            <b>{bien.nom}</b>
            <span class="tag">{bien.type}</span>
          </div>
          
          <div class="slider-box">
            <input type="range" min="-20" max="20" bind:value={bien.marge}>
            <span>Marge: {bien.marge}%</span>
          </div>

          <div class="footer">
            <div class="price">Prévu minuit: <b>{calculerPrix(bien)} G</b></div>
            {#if bien.ordre}
              <div class="pending">⏳ {bien.ordre} EN ATTENTE</div>
            {:else}
              <button class="btn-l" on:click={() => placerOrdre(bien, 'LOCATION')}>LOCATION</button>
              <button class="btn-v" on:click={() => placerOrdre(bien, 'VENTE')}>VENTE</button>
            {/if}
          </div>
        </div>
      {/each}
    </section>

    {#each filiales as fil}
      <section class="group">
        <div class="group-header">
          <h2 class="section-title">🏭 FILIALE : {fil.nom}</h2>
          <span class="mkt-badge" style="background:{mkt[fil.marketing].col}">{mkt[fil.marketing].lab}</span>
        </div>

        {#each fil.biens as bien}
          <div class="asset-card filiale">
            <div class="asset-info">
              <b>{bien.nom}</b>
              <span class="tag">{bien.type}</span>
            </div>
            
            <div class="slider-box">
              <input type="range" min="-20" max="20" bind:value={bien.marge}>
              <span>Marge: {bien.marge}%</span>
            </div>

            <div class="footer">
              <div class="price">Prévu minuit: <b>{calculerPrix(bien, fil.marketing)} G</b></div>
              {#if bien.ordre}
                <div class="pending">⏳ {bien.ordre} EN ATTENTE</div>
              {:else}
                <button class="btn-l" on:click={() => placerOrdre(bien, 'LOCATION')}>LOCATION</button>
                <button class="btn-v" on:click={() => placerOrdre(bien, 'VENTE')}>VENTE</button>
              {/if}
            </div>
          </div>
        {/each}
      </section>
    {/each}
  </div>

  <div class="terminal">> {logs}</div>
</main>

<style>
  :global(body) { margin:0; background:#000; color:#fff; font-family:sans-serif; }
  .header { padding:15px; background:#111; border-bottom:2px solid #f1c40f; display:flex; justify-content:space-between; }
  .container { padding:10px; padding-bottom:60px; height:85vh; overflow-y:auto; }
  
  .section-title { color:#f1c40f; font-size:0.75rem; letter-spacing:1px; margin:20px 0 10px; border-bottom:1px solid #222; }
  .group-header { display:flex; justify-content:space-between; align-items:center; }
  .mkt-badge { font-size:0.6rem; padding:2px 6px; border-radius:3px; color:#000; font-weight:bold; }

  .asset-card { background:#0a0a0a; border:1px solid #333; border-radius:8px; padding:12px; margin-bottom:12px; }
  .asset-card.filiale { border-left: 3px solid #3498db; }
  
  .asset-info { display:flex; justify-content:space-between; margin-bottom:10px; }
  .tag { font-size:0.6rem; background:#222; padding:2px 5px; border-radius:3px; }

  .slider-box { background:#111; padding:8px; border-radius:5px; margin:10px 0; display:flex; justify-content:space-between; align-items:center; font-size:0.7rem; }
  input[type=range] { width:60%; accent-color:#f1c40f; }

  .footer { display:flex; justify-content:space-between; align-items:center; margin-top:10px; border-top:1px solid #222; padding-top:10px; }
  .price { font-size:0.7rem; }
  .price b { color:#f1c40f; font-size:0.9rem; }

  .pending { font-size:0.65rem; color:#f1c40f; font-weight:bold; background:rgba(241,196,15,0.1); padding:5px; border-radius:4px; }

  .btn-l, .btn-v { border:none; padding:6px 10px; border-radius:4px; font-weight:bold; font-size:0.65rem; color:#fff; cursor:pointer; margin-left:5px; }
  .btn-l { background:#27ae60; }
  .btn-v { background:#c0392b; }

  .terminal { position:fixed; bottom:0; width:100%; padding:10px; background:#000; color:#2ecc71; border-top:1px solid #222; font-family:monospace; font-size:0.65rem; }
</style>
