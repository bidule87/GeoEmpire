<script>
  let cap = 6157.92, mktIdx = 1, logs = "GEO EMPIRE : Connecté.";
  const cfgs = {
    1: { lab: "Local", c: "#2C3E50", m: 1.0 }, 
    2: { lab: "National", c: "#2980B9", m: 1.15 },
    3: { lab: "International", c: "#3498DB", m: 1.3 }, 
    4: { lab: "Viral", c: "#5DADE2", m: 1.5 }
  };
  let filiales = [{ id: 1, nom: "Acier 1", treso: 12500, tab: 'biz', biens: [{ n: "Entrepôt Forge", v: 85000, m: 10 }] }];
  
  $: active = cfgs[mktIdx];
  // Calcul propre du boost pour éviter les 30.0000000004%
  $: boostAffiche = Math.round((active.m - 1) * 100);
</script>

<main style="--theme: {active.c}; background: #000; color: #eee; font-family: sans-serif; min-height: 100vh; margin: 0;">
  <header style="background: #111; padding: 20px; border-bottom: 2px solid var(--theme); display: flex; justify-content: space-between;">
    <h1 style="margin:0; font-size: 1.2rem; color: var(--theme);">🏦 HOLDING</h1>
    <div style="font-weight: bold; font-size: 1.4rem;">{cap.toLocaleString()} $ ∅</div>
  </header>

  <div style="padding: 15px;">
    <div style="background: #0a0a0a; padding: 15px; border: 1px solid #222; border-radius: 8px;">
      <p style="font-size: 0.7rem; color: #666; margin: 0 0 10px; font-weight: bold;">MARKETING GLOBAL (4 NIVEAUX)</p>
      <div style="display: flex; gap: 5px;">
        {#each [1, 2, 3, 4] as i}
          <button on:click={() => mktIdx = i} style="flex: 1; padding: 12px 2px; border: 1px solid {mktIdx === i ? active.c : '#333'}; background: {mktIdx === i ? active.c : '#111'}; color: #fff; cursor: pointer; font-size: 0.7rem; font-weight: bold; transition: 0.3s;">{cfgs[i].lab}</button>
        {/each}
      </div>
    </div>

    {#each filiales as f}
      <div style="background: #0a0a0a; margin-top: 20px; border-radius: 8px; border: 1px solid #222; overflow: hidden;">
        <div style="background: #151515; padding: 15px; border-left: 4px solid var(--theme); display: flex; justify-content: space-between;">
          <h3 style="margin:0; color: var(--theme);">{f.nom}</h3>
          <span style="font-size: 0.6rem; color: #666; font-weight: bold;">MODE {active.lab.toUpperCase()}</span>
        </div>
        
        <nav style="display: flex; background: #050505; border-bottom: 1px solid #222;">
          <button on:click={() => f.tab = 'sit'} style="flex: 1; padding: 12px; border: none; background: {f.tab === 'sit' ? '#111' : 'none'}; color: {f.tab === 'sit' ? active.c : '#555'}; font-weight: bold; font-size: 0.7rem; cursor: pointer;">SITUATION</button>
          <button on:click={() => f.tab = 'biz'} style="flex: 1; padding: 12px; border: none; background: {f.tab === 'biz' ? '#111' : 'none'}; color: {f.tab === 'biz' ? active.c : '#555'}; font-weight: bold; font-size: 0.7rem; cursor: pointer;">BUSINESS</button>
          <button on:click={() => f.tab = 'mkt'} style="flex: 1; padding: 12px; border: none; background: {f.tab === 'mkt' ? '#111' : 'none'}; color: {f.tab === 'mkt' ? active.c : '#555'}; font-weight: bold; font-size: 0.7rem; cursor: pointer;">MARKETING</button>
        </nav>

        <div style="padding: 20px; min-height: 120px;">
          {#if f.tab === 'sit'}
            <p>Trésorerie Filiale : <b style="color: #2ecc71;">{f.treso.toLocaleString()} $</b></p>
            <p style="font-size: 0.8rem; color: #666;">Frais de gestion Holding : Calculés à minuit.</p>
          {:else if f.tab === 'biz'}
            {#each f.biens as b}
              <div style="background: #111; padding: 15px; border-radius: 6px; border: 1px solid #222; margin-bottom: 10px;">
                <b style="display: block; margin-bottom: 10px;">{b.n}</b>
                <input type="range" min="-20" max="20" bind:value={b.m} style="width: 100%; accent-color: var(--theme); cursor: pointer;">
                <div style="display: flex; justify-content: space-between; margin-top: 10px; font-size: 0.9rem;">
                  <span style="color: #666;">Marge: {b.m}%</span>
                  <span style="font-weight: bold; color: var(--theme);">EST. MINUIT: {Math.floor(b.v * (1 + b.m/100) * active.m).toLocaleString()} $</span>
                </div>
              </div>
            {/each}
          {:else if f.tab === 'mkt'}
            <div style="text-align: center; padding: 20px;">
              <h2 style="color: var(--theme); font-size: 3.5rem; margin: 0; text-shadow: 0 0 15px rgba(0,0,0,0.5);">+{boostAffiche}%</h2>
              <p style="color: #888; text-transform: uppercase; letter-spacing: 1px; font-size: 0.8rem; margin-top: 10px;">Boost de rentabilité Holding actif</p>
              <div style="margin-top: 20px; font-size: 0.7rem; color: #444;">Niveau de visibilité : {active.lab}</div>
            </div>
          {/if}
        </div>
      </div>
    {/each}
  </div>
  <footer style="position: fixed; bottom: 0; width: 100%; background: #000; color: #2ecc71; padding: 10px; font-family: monospace; font-size: 0.7rem; border-top: 1px solid #222;">> {logs}</footer>
</main>
