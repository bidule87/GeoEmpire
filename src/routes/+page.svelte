<script>
  let cap = 6157.92, mktIdx = 1, logs = "Système GEO EMPIRE actif.";
  const cfgs = {
    1: { lab: "Local", c: "#D6EAF8", m: 1.0 }, 2: { lab: "National", c: "#85C1E9", m: 1.15 },
    3: { lab: "International", c: "#3498DB", m: 1.3 }, 4: { lab: "Viral", c: "#1A5276", m: 1.5 }
  };
  let filiales = [{ id: 1, nom: "Acier 1", treso: 12500, tab: 'biz', biens: [{ n: "Entrepôt Forge", v: 85000, m: 10 }] }];
  $: active = cfgs[mktIdx];
</script>

<main style="--theme: {active.c}; font-family: sans-serif; background: #f0f2f5; margin: 0; min-height: 100vh;">
  <header style="background: white; padding: 20px; border-bottom: 4px solid var(--theme); display: flex; justify-content: space-between; align-items: center;">
    <h1 style="margin:0; font-size: 1.2rem;">🏦 HOLDING</h1>
    <div style="font-weight: bold; font-size: 1.4rem; color: var(--theme);">{cap.toLocaleString()} $ ∅</div>
  </header>

  <section style="padding: 20px;">
    <div style="background: white; padding: 15px; border-radius: 8px; border: 1px solid #ddd;">
      <p style="font-size: 0.7rem; font-weight: bold; color: #999; margin: 0 0 10px 0;">MARKETING GLOBAL</p>
      <div style="display: flex; gap: 8px;">
        {#each [1, 2, 3, 4] as i}
          <button on:click={() => mktIdx = i} style="flex: 1; padding: 10px; border: 1px solid {mktIdx === i ? active.c : '#ccc'}; background: {mktIdx === i ? '#f0faff' : 'white'}; color: {mktIdx === i ? active.c : '#777'}; cursor: pointer; border-radius: 4px; font-weight: bold;">{cfgs[i].lab}</button>
        {/each}
      </div>
    </div>

    {#each filiales as f}
      <div style="background: white; margin-top: 20px; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 10px rgba(0,0,0,0.1); border-left: 5px solid var(--theme);">
        <div style="background: var(--theme); color: white; padding: 15px; display: flex; justify-content: space-between; align-items: center;">
          <h3 style="margin:0;">{f.nom}</h3>
          <span style="font-size: 0.7rem; font-weight: bold; opacity: 0.8;">MODE {active.lab}</span>
        </div>
        <nav style="display: flex; background: #eee;">
          {#each [['SITUATION', 'sit'], ['BUSINESS', 'biz'], ['MARKETING', 'mkt']] as [l, t]}
            <button on:click={() => f.tab = t} style="flex: 1; padding: 12px; border: none; background: {f.tab === t ? 'white' : 'transparent'}; font-weight: bold; font-size: 0.7rem; cursor: pointer;">{l}</button>
          {/each}
        </nav>
        <div style="padding: 20px;">
          {#if f.tab === 'sit'}
            <p>Trésorerie : <b>{f.treso.toLocaleString()} $</b></p>
          {:else if f.tab === 'biz'}
            {#each f.biens as b}
              <div style="background: #f9f9f9; padding: 10px; border-radius: 4px;">
                <b>{b.n}</b>
                <input type="range" min="-20" max="20" bind:value={b.m} style="width: 100%; margin: 10px 0; accent-color: var(--theme);">
                <div style="text-align: right; font-weight: bold; color: var(--theme);">Est: {Math.floor(b.v * (1 + b.m/100) * active.m).toLocaleString()} $</div>
              </div>
            {/each}
          {:else}
            <div style="text-align: center;">
              <h2 style="color: var(--theme); font-size: 3rem; margin: 0;">+{(active.m - 1) * 100}%</h2>
              <p>Boost de rentabilité actif</p>
            </div>
          {/if}
        </div>
      </div>
    {/each}
  </section>
  <footer style="position: fixed; bottom: 0; width: 100%; background: #2c3e50; color: white; padding: 8px; font-family: monospace; font-size: 0.7rem;">> {logs}</footer>
</main>
