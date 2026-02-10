<script>
  let cap = 6157.92; // Capital Holding
  let mktIdx = 1; // Niveau 1 par défaut
  let logs = "Système GEO EMPIRE : Liaison Holding/Filiales établie.";

  // Config Marketing : Niveau, Label, Coût par filiale, Multiplicateur, Couleur
  const mkt = {
    1: { lab: "Local", prix: 100, m: 1.0, c: "#2C3E50" }, // Gris-Bleu
    2: { lab: "National", prix: 300, m: 1.15, c: "#2980B9" }, // Bleu
    3: { lab: "International", prix: 800, m: 1.3, c: "#3498DB" }, // Bleu Clair
    4: { lab: "Viral / Expert", prix: 2000, m: 1.5, c: "#5DADE2" } // Bleu Cyan
  };

  let filiales = [
    { id: 1, nom: "Acier 1", treso: 12500, tab: 'biz', biens: [{ n: "Entrepôt Forge", v: 85000, m: 10 }] }
  ];

  // Calculs automatiques
  $: active = mkt[mktIdx];
  $: nbFil = filiales.length;
  $: totalMktCost = active.prix * nbFil; // Le calcul dont parle le script
  $: boostPercent = Math.round((active.m - 1) * 100);
</script>

<main style="background: #000; color: #eee; font-family: sans-serif; min-height: 100vh; margin: 0; --theme: {active.c};">
  
  <header style="background: #111; padding: 20px; border-bottom: 3px solid var(--theme); display: flex; justify-content: space-between; align-items: center;">
    <h1 style="margin:0; font-size: 1.2rem; color: var(--theme);">🏦 HOLDING CONTROL</h1>
    <div style="font-weight: bold; font-size: 1.4rem;">{cap.toLocaleString()} $ ∅</div>
  </header>

  <div style="padding: 15px;">
    <div style="background: #0a0a0a; padding: 15px; border: 1px solid #222; border-radius: 8px; margin-bottom: 20px;">
      <p style="font-size: 0.7rem; color: #666; margin: 0 0 10px; font-weight: bold; text-transform: uppercase;">Calculateur Marketing Global</p>
      <div style="display: flex; gap: 5px;">
        {#each [1, 2, 3, 4] as i}
          <button on:click={() => mktIdx = i} style="flex: 1; padding: 12px 2px; border: 1px solid {mktIdx === i ? active.c : '#333'}; background: {mktIdx === i ? active.c : '#111'}; color: #fff; cursor: pointer; font-size: 0.7rem; font-weight: bold; transition: 0.3s;">
            {mkt[i].lab}
          </button>
        {/each}
      </div>
      <p style="font-size: 0.75rem; color: #888; margin: 10px 0 0;">
        Frais Holding : {active.prix}$ x {nbFil} filiale(s) = <b style="color: var(--theme);">{totalMktCost}$/jour</b>
      </p>
    </div>

    {#each filiales as f}
      <div style="background: #0a0a0a; border: 1px solid #222; border-radius: 8px; overflow: hidden; margin-bottom: 20px;">
        <div style="background: #151515; padding: 15px; border-left: 5px solid var(--theme); display: flex; justify-content: space-between;">
          <h3 style="margin:0; color: var(--theme);">{f.nom}</h3>
          <span style="font-size: 0.6rem; color: #666; font-weight: bold;">STRATÉGIE: {active.lab.toUpperCase()}</span>
        </div>
        
        <nav style="display: flex; background: #050505; border-bottom: 1px solid #222;">
          <button on:click={() => f.tab = 'sit'} style="flex: 1; padding: 12px; border: none; background: {f.tab === 'sit' ? '#111' : 'none'}; color: {f.tab === 'sit' ? active.c : '#555'}; font-weight: bold; font-size: 0.7rem; cursor: pointer;">SITUATION</button>
          <button on:click={() => f.tab = 'biz'} style="flex: 1; padding: 12px; border: none; background: {f.tab === 'biz' ? '#111' : 'none'}; color: {f.tab === 'biz' ? active.c : '#555'}; font-weight: bold; font-size: 0.7rem; cursor: pointer;">BUSINESS</button>
          <button on:click={() => f.tab = 'mkt'} style="flex: 1; padding: 12px; border: none; background: {f.tab === 'mkt' ? '#111' : 'none'}; color: {f.tab === 'mkt' ? active.c : '#555'}; font-weight: bold; font-size: 0.7rem; cursor: pointer;">MARKETING</button>
        </nav>

        <div style="padding: 20px; min-height: 100px;">
          {#if f.tab === 'sit'}
            <p>Trésorerie Filiale : <b style="color: #2ecc71;">{f.treso.toLocaleString()} $</b></p>
            <p style="font-size: 0.8rem; color: #666;">Les frais de gestion sont prélevés par la Holding à minuit.</p>
          
          {:else if f.tab === 'biz'}
            {#each f.biens as b}
              <div style="background: #111; padding: 15px; border: 1px solid #222; border-radius: 6px;">
                <b style="display: block; margin-bottom: 10px;">{b.n}</b>
                <input type="range" min="-20" max="20" bind:value={b.m} style="width: 100%; accent-color: var(--theme);">
                <div style="display: flex; justify-content: space-between; margin-top: 10px; font-size: 0.85rem;">
                  <span style="color: #666;">Négociation: {b.m}%</span>
                  <span style="font-weight: bold; color: var(--theme);">EST. MINUIT: {Math.floor(b.v * (1 + b.m/100) * active.m).toLocaleString()} $</span>
                </div>
              </div>
            {/each}

          {:else if f.tab === 'mkt'}
            <div style="text-align: center; padding: 10px;">
              <h2 style="color: var(--theme); font-size: 3rem; margin: 0;">+{boostPercent}%</h2>
              <p style="color: #666; font-size: 0.8rem; text-transform: uppercase;">Impact Marketing Global</p>
              <div style="margin-top: 15px; font-size: 0.7rem; color: #444; border-top: 1px solid #222; padding-top: 10px;">
                Ce multiplicateur de <b>x{active.m}</b> est appliqué par la Holding.
              </div>
            </div>
          {/if}
        </div>
      </div>
    {/each}
  </div>

  <footer style="position: fixed; bottom: 0; width: 100%; background: #000; color: #2ecc71; padding: 10px; font-family: monospace; font-size: 0.7rem; border-top: 1px solid #222;">> {logs}</footer>
</main>
