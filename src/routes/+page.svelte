<script>
  let cap = 6157.92, mktIdx = 1, logs = "GEO EMPIRE : Connecté.";
  const cfgs = {
    1: { lab: "Local", c: "#2C3E50", m: 1.0 }, 2: { lab: "National", c: "#2980B9", m: 1.15 },
    3: { lab: "International", c: "#3498DB", m: 1.3 }, 4: { lab: "Viral", c: "#5DADE2", m: 1.5 }
  };
  let filiales = [{ id: 1, nom: "Acier 1", treso: 12500, tab: 'biz', biens: [{ n: "Entrepôt Forge", v: 85000, m: 10 }] }];
  $: active = cfgs[mktIdx];
</script>

<main style="--theme: {active.c}; background: #000; color: #eee; font-family: sans-serif; min-height: 100vh; margin: 0;">
  <header style="background: #111; padding: 20px; border-bottom: 2px solid var(--theme); display: flex; justify-content: space-between;">
    <h1 style="margin:0; font-size: 1.2rem; color: var(--theme);">🏦 HOLDING</h1>
    <div style="font-weight: bold; font-size: 1.4rem;">{cap.toLocaleString()} $ ∅</div>
  </header>

  <div style="padding: 15px;">
    <div style="background: #0a0a0a; padding: 15px; border: 1px solid #222; border-radius: 8px;">
      <p style="font-size: 0.7rem; color: #666; margin: 0 0 10px;">MARKETING GLOBAL (4 NIVEAUX)</p>
      <div style="display: flex; gap: 5px;">
        {#each [1, 2, 3, 4] as i}
          <button on:click={() => mktIdx = i} style="flex: 1; padding: 10px 2px; border: 1px solid {mktIdx === i ? active.c : '#333'}; background: {mktIdx === i ? active.c : '#111'}; color: #fff; cursor: pointer; font-size: 0.7rem; font-weight: bold;">{cfgs[i].lab}</button>
        {/each}
      </div>
    </div>

    {#each filiales as f}
      <div style="background: #0a0a0a; margin-top: 20px; border-radius: 8px; border: 1px solid #222; overflow: hidden;">
        <div style="background: #151515; padding: 15px; border-left: 4px solid var(--theme); display: flex; justify-content: space-between;">
          <h3 style="margin:0; color: var(--theme);">{f.nom}</h3>
          <span style="font-size: 0.6rem; color: #666;">MODE {active.lab}</span>
        </div>
        
        <nav style="display: flex; background: #050505; border-bottom: 1px solid #222;">
          <button on:click={() => f.tab = 'sit'} style="flex: 1; padding: 12px; border: none; background: {f.tab === 'sit' ? '#111' : 'none'}; color: {f.tab === 'sit' ? active.c : '#555'}; font-weight: bold; font-size: 0.7rem;">SITUATION</button>
          <button on:click={() => f.tab = 'biz'} style="flex: 1; padding: 12px; border: none; background: {f.tab === 'biz' ? '#111' : 'none'}; color: {f.tab === 'biz' ? active.c : '#555'}; font-weight: bold; font-size: 0.7rem;">BUSINESS</button>
          <button on:click={() => f.tab = 'mkt'} style="flex: 1; padding: 12px; border: none; background: {f.tab === 'mkt' ? '#111' : 'none'}; color: {f.tab === 'mkt' ? active.c : '#555'}; font-weight: bold; font-size: 0.7rem;">MARKETING</button>
        </nav>

        <div style="padding: 15px;">
          {#if f.tab === 'sit'}
            <p>Trésorerie Filiale : <b style="color: #2ecc71;">{f.treso.toLocaleString()} $</b></p>
          {:else if f.tab === 'biz'}
            {#each f.biens as b}
              <div style="background: #111; padding: 10px; border-radius: 4px; border: 1px solid #222;">
                <b>{b.n}</b>
                <input type="range" min="-20" max="20" bind:value={b.m} style="width: 100%; margin: 10px 0; accent-color: var(--theme);">
                <div style="text-align: right; font-weight: bold; color: var(--theme);">EST. MINUIT: {Math.floor(b.v * (1 + b.m/100) * active.m).toLocaleString()} $</div>
              </div>
            {/each}
          {:else if f.tab === 'mkt'}
            <div style="text-align: center; padding: 10px;">
              <h2 style="color: var(--theme); font-size: 2.5rem; margin: 0;">+{(active.m - 1) * 100}%</h2>
              <p style="color: #666;">Boost de rentabilité Holding actif</p>
            </div>
          {/if}
        </div>
      </div>
    {/each}
  </div>
  <footer style="position: fixed; bottom: 0; width: 100%; background: #000; color: #2ecc71; padding: 8px; font-family: monospace; font-size: 0.7rem; border-top: 1px solid #222;">> {logs}</footer>
</main>
