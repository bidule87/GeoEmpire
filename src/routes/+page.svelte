<script>
  // --- ÉTAT DE LA HOLDING ---
  let capitalHolding = 6157.92;
  let mktIdx = 1; // Niveau sélectionné
  let logs = "Système GEO EMPIRE : Prêt pour extension.";

  // CONFIGURATION STRATÉGIQUE (Source de vérité)
  const mkt = {
    1: { lab: "Local", prix: 100, m: 1.0, c: "#3498db" },    // BLEU
    2: { lab: "National", prix: 300, m: 1.15, c: "#2ecc71" }, // VERT
    3: { lab: "International", prix: 800, m: 1.3, c: "#e67e22" }, // ORANGE
    4: { lab: "Viral / Expert", prix: 2000, m: 1.5, c: "#e74c3c" } // ROUGE
  };

  // --- FILIALES ENREGISTRÉES ---
  let filiales = [
    { 
      id: 1, 
      nom: "Acier 1", 
      treso: 12500, 
      tab: 'biz', 
      biens: [{ n: "Entrepôt Forge", v: 85000, m: 10 }] 
    }
  ];

  // LOGIQUE DYNAMIQUE
  $: active = mkt[mktIdx];
  $: nbFil = filiales.length;
  $: fraisTotal = active.prix * nbFil; // Calcul automatique des frais holding
</script>

<main style="background: #000; color: #eee; min-height: 100vh; font-family: 'Segoe UI', sans-serif; margin: 0;">
  
  <header style="background: #111; padding: 20px; border-bottom: 3px solid {active.c}; display: flex; justify-content: space-between; align-items: center;">
    <div>
      <h1 style="margin:0; font-size: 0.8rem; color: #555; text-transform: uppercase; letter-spacing: 1px;">Holding Control</h1>
      <div style="font-size: 1.6rem; font-weight: bold; color: {active.c};">{capitalHolding.toLocaleString()} $ ∅</div>
    </div>
    <div style="text-align: right;">
      <p style="font-size: 0.6rem; color: #666; margin: 0;">FRAIS À RECEVOIR</p>
      <div style="font-size: 1.1rem; font-weight: bold; color: #f1c40f;">+ {fraisTotal} $</div>
    </div>
  </header>

  <div style="padding: 15px; padding-bottom: 60px;">
    
    <div style="background: #0a0a0a; padding: 15px; border: 1px solid #222; border-radius: 8px; margin-bottom: 20px;">
      <p style="font-size: 0.7rem; color: #888; margin: 0 0 10px; font-weight: bold;">STRATÉGIE MARKETING GLOBALE</p>
      <div style="display: flex; gap: 5px;">
        {#each [1, 2, 3, 4] as i}
          <button 
            on:click={() => mktIdx = i} 
            style="flex: 1; padding: 12px 2px; cursor: pointer; border: 1px solid {mktIdx === i ? mkt[i].c : '#333'}; background: {mktIdx === i ? mkt[i].c : '#111'}; color: {mktIdx === i ? '#000' : '#fff'}; font-weight: bold; font-size: 0.7rem; border-radius: 4px; transition: 0.2s;">
            {mkt[i].lab}
          </button>
        {#/each}
      </div>
    </div>

    {#each filiales as f}
      <div style="background: #0a0a0a; border: 1px solid #222; border-radius: 8px; overflow: hidden; margin-bottom: 20px;">
        <div style="background: #151515; padding: 15px; border-left: 5px solid {active.c}; display: flex; justify-content: space-between; align-items: center;">
          <h3 style="margin:0; color: {active.c}; font-size: 1rem;">{f.nom}</h3>
          <span style="font-size: 0.6rem; color: #555; font-weight: bold; border: 1px solid #333; padding: 2px 6px;">MODE {active.lab.toUpperCase()}</span>
        </div>

        <nav style="display: flex; background: #050505; border-bottom: 1px solid #222;">
          <button on:click={() => f.tab = 'sit'} style="flex: 1; padding: 12px; border: none; background: {f.tab === 'sit' ? '#111' : 'none'}; color: {f.tab === 'sit' ? active.c : '#555'}; font-weight: bold; font-size: 0.7rem; cursor: pointer;">SITUATION</button>
          <button on:click={() => f.tab = 'biz'} style="flex: 1; padding: 12px; border: none; background: {f.tab === 'biz' ? '#111' : 'none'}; color: {f.tab === 'biz' ? active.c : '#555'}; font-weight: bold; font-size: 0.7rem; cursor: pointer;">BUSINESS</button>
          <button on:click={() => f.tab = 'mkt'} style="flex: 1; padding: 12px; border: none; background: {f.tab === 'mkt' ? '#111' : 'none'}; color: {f.tab === 'mkt' ? active.c : '#555'}; font-weight: bold; font-size: 0.7rem; cursor: pointer;">MARKETING</button>
        </nav>

        <div style="padding: 20px;">
          {#if f.tab === 'sit'}
            <div style="display:flex; justify-content:space-between; margin-bottom:10px;">
              <span>Trésorerie filiale :</span> <b style="color: #2ecc71;">{f.treso.toLocaleString()} $</b>
            </div>
            <div style="display:flex; justify-content:space-between; font-size: 0.8rem; color: #666;">
              <span>Frais de gestion :</span> <b>{active.prix} $</b>
            </div>
          
          {:else if f.tab === 'biz'}
            {#each f.biens as b}
              <div style="background: #111; padding: 15px; border: 1px solid #222; border-radius: 6px;">
                <b style="display: block; margin-bottom: 10px; font-size: 0.9rem;">{b.n}</b>
                <input type="range" min="-20" max="20" bind:value={b.m} style="width: 100%; accent-color: {active.c}; cursor: pointer;">
                <div style="display: flex; justify-content: space-between; margin-top: 10px; font-size: 0.85rem;">
                  <span style="color: #666;">Marge: {b.m}%</span>
                  <span style="font-weight: bold; color: {active.c};">EST. MINUIT: {Math.floor(b.v * (1 + b.m/100) * active.m).toLocaleString()} $</span>
                </div>
              </div>
            {/each}

          {:else if f.tab === 'mkt'}
            <div style="text-align: center; padding: 10px;">
              <h2 style="color: {active.c}; font-size: 3.5rem; margin: 0;">+{Math.round((active.m - 1) * 100)}%</h2>
              <p style="color: #666; font-size: 0.8rem; text-transform: uppercase; margin-top: 5px;">Impact Rentabilité</p>
              <div style="margin-top: 15px; font-size: 0.7rem; color: #444; border-top: 1px solid #222; padding-top: 10px;">
                Coût de gestion Holding : {active.prix} $ / jour
              </div>
            </div>
          {/if}
        </div>
      </div>
    {/each}
  </div>

  <footer style="position: fixed; bottom: 0; width: 100%; background: #000; color: #2ecc71; padding: 10px; font-family: monospace; font-size: 0.7rem; border-top: 1px solid #222;">> {logs}</footer>
</main>
