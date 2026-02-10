<script>
  let geoBalance = 39259;
  let isElite = false;
  let log = "Prêt pour la négociation.";

  const mktConfig = {
    1: { label: "Médiocre", color: "#e74c3c" },
    2: { label: "Correct", color: "#f1c40f" },
    3: { label: "Excellent", color: "#2ecc71" }
  };

  let holdings = [
    {
      nom: "LIMOGES INVEST",
      entreprises: [
        {
          nom: "Immo Prestige",
          marketingNiveau: 2, 
          biens: [
            { id: 1, nom: "Appartement Centre", type: "LOCATION", valeurBase: 600, marge: 0 },
            { id: 2, nom: "Local Commercial", type: "VENTE", valeurBase: 85000, marge: 0 }
          ]
        }
      ]
    }
  ];

  // Calcul dynamique : (Base + Marge %) + Bonus Elite
  function getPrixFinal(bien) {
    let avecMarge = bien.valeurBase * (1 + (bien.marge / 100));
    if (isElite) avecMarge *= 1.20; 
    return Math.floor(avecMarge);
  }

  function toggleMarketing(ent) {
    ent.marketingNiveau = ent.marketingNiveau >= 3 ? 1 : ent.marketingNiveau + 1;
    holdings = [...holdings];
  }
</script>

<main>
  <div class="header">
    <div class="brand">👑 EMPIRE GESTION</div>
    <div class="balance">🟡 {geoBalance.toLocaleString()} G</div>
  </div>

  <div class="container">
    {#each holdings as holding}
      <div class="holding-group">
        <h2 class="h-title">{holding.nom}</h2>

        {#each holding.entreprises as ent}
          <div class="ent-card">
            <div class="ent-header">
              <h3>{ent.nom}</h3>
              <button 
                class="mkt-badge" 
                style="background: {mktConfig[ent.marketingNiveau].color}"
                on:click={() => toggleMarketing(ent)}>
                Qualité Clients: {mktConfig[ent.marketingNiveau].label}
              </button>
            </div>

            <div class="asset-list">
              {#each ent.biens as bien}
                <div class="asset-item">
                  <div class="asset-top">
                    <span class="a-name">{bien.nom}</span>
                    <span class="a-tag" class:loc={bien.type === 'LOCATION'}>{bien.type}</span>
                  </div>

                  <div class="slider-zone">
                    <div class="slider-labels">
                      <span>-20%</span>
                      <span class="current-marge" class:plus={bien.marge > 0} class:minus={bien.marge < 0}>
                        {bien.marge > 0 ? '+' : ''}{bien.marge}%
                      </span>
                      <span>+20%</span>
                    </div>
                    <input type="range" min="-20" max="20" step="1" bind:value={bien.marge} class="marge-slider">
                  </div>

                  <div class="asset-footer">
                    <div class="price-display">
                      <small>{bien.type === 'VENTE' ? 'Prix de vente' : 'Loyer'}</small>
                      <b>{getPrixFinal(bien).toLocaleString()} G</b>
                    </div>
                    <button class="action-btn" class:sell={bien.type==='VENTE'} class:rent={bien.type==='LOCATION'}>
                      {bien.type === 'VENTE' ? 'VENDRE' : 'RÉCOLTER'}
                    </button>
                  </div>
                </div>
              {/each}
            </div>
          </div>
        {/each}
      </div>
    {/each}
  </div>

  <div class="terminal">> {log}</div>
</main>

<style>
  :global(body) { margin:0; background:#000; color:#fff; font-family:sans-serif; }
  .header { padding:15px; background:#111; border-bottom:2px solid #f1c40f; display:flex; justify-content:space-between; }
  .balance { color:#f1c40f; font-weight:bold; }
  .container { padding: 10px; padding-bottom: 80px; height: 85vh; overflow-y: auto; }
  
  .h-title { color: #f1c40f; font-size: 0.7rem; letter-spacing: 2px; border-bottom: 1px solid #222; margin: 15px 0 10px; }
  .ent-card { background: #0a0a0a; border: 1px solid #333; border-radius: 10px; padding: 15px; margin-bottom: 20px; }
  .ent-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px; }
  .mkt-badge { border: none; padding: 4px 8px; border-radius: 4px; font-weight: bold; font-size: 0.65rem; color: #000; cursor: pointer; }

  .asset-item { background: #151515; border-radius: 8px; padding: 12px; margin-bottom: 10px; border: 1px solid #222; }
  .asset-top { display: flex; justify-content: space-between; margin-bottom: 10px; }
  .a-name { font-weight: bold; font-size: 0.9rem; }
  .a-tag { font-size: 0.6rem; font-weight: bold; color: #e74c3c; border: 1px solid #e74c3c; padding: 1px 4px; border-radius: 3px; }
  .a-tag.loc { color: #3498db; border-color: #3498db; }

  /* STYLE DU SLIDER (MOLETTE) */
  .slider-zone { margin: 15px 0; background: #000; padding: 10px; border-radius: 6px; }
  .slider-labels { display: flex; justify-content: space-between; font-size: 0.65rem; color: #666; margin-bottom: 5px; }
  .current-marge { font-weight: bold; font-size: 0.8rem; }
  .current-marge.plus { color: #2ecc71; }
  .current-marge.minus { color: #e74c3c; }

  .marge-slider { width: 100%; cursor: pointer; accent-color: #f1c40f; }

  .asset-footer { display: flex; justify-content: space-between; align-items: center; margin-top: 10px; border-top: 1px solid #222; padding-top: 10px; }
  .price-display b { color: #f1c40f; font-size: 1rem; }
  .price-display small { display: block; font-size: 0.6rem; color: #777; }

  .action-btn { border: none; padding: 8px 15px; border-radius: 5px; font-weight: bold; font-size: 0.75rem; color: #fff; cursor: pointer; }
  .sell { background: #c0392b; }
  .rent { background: #27ae60; }

  .terminal { position:fixed; bottom:0; width:100%; padding:10px; background:#000; color:#2ecc71; border-top:1px solid #222; font-family:monospace; font-size:0.65rem; }
</style>
