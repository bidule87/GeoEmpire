<script>
  let geo = 39259;
  let tickets = 10;
  let crowns = 0;
  let gTokens = 5000;
  let isElite = false;
  let activeTab = 'SHOP';
  let logs = "Empire prêt.";

  function buy(type) {
    if (type === 'ELITE') isElite = true;
    if (type === 'PRESTIGE') { tickets += 100; gTokens += 5000; }
    if (type === 'CROWN') crowns += 10;
    logs = "Achat effectué !";
  }
</script>

<main>
  <div class="header">
    <div class="logo">👑 GEO EMPIRE {isElite ? '★ ELITE' : ''}</div>
    <div class="stats">
      <span>🟡 {geo.toLocaleString()}</span> | <span>🎫 {tickets}</span> | <span>👑 {crowns}</span>
    </div>
  </div>

  <nav>
    <button class:active={activeTab === 'MAP'} on:click={() => activeTab = 'MAP'}>📍 RADAR</button>
    <button class:active={activeTab === 'SHOP'} on:click={() => activeTab = 'SHOP'}>🛒 SHOP</button>
    <button class:active={activeTab === 'RAID'} on:click={() => activeTab = 'RAID'}>🏴‍☠️ RAID</button>
  </nav>

  <div class="view">
    {#if activeTab === 'SHOP'}
      <div class="shop">
        <div class="card elite" on:click={() => buy('ELITE')}>
          <span>📂 PACK ÉLITE</span> <b>9.99 €</b>
        </div>
        <div class="card prestige" on:click={() => buy('PRESTIGE')}>
          <span>📦 PRESTIGE (100🎫)</span> <b>7.99 €</b>
        </div>
        <div class="card crown" on:click={() => buy('CROWN')}>
          <span>👑 CROWNS (10)</span> <b>4.99 €</b>
        </div>
      </div>
    {/if}

    {#if activeTab === 'MAP'}
      <div class="radar">
        <div class="circle"></div>
        <p>RECHERCHE EN COURS...</p>
      </div>
    {/if}

    {#if activeTab === 'RAID'}
      <div class="raid">
        <h2>BANQUE CENTRALE</h2>
        <button class="btn-r" on:click={() => logs = "Infiltration..."}>LANCER RAID</button>
      </div>
    {/if}
  </div>

  <div class="console">> {logs}</div>
</main>

<style>
  :global(body) { margin:0; background:#000; color:#fff; font-family:sans-serif; }
  .header { padding:15px; border-bottom:1px solid #222; text-align:center; }
  .logo { color:#f1c40f; font-weight:bold; }
  .stats { font-size:0.75rem; color:#aaa; margin-top:5px; }
  nav { display:flex; border-bottom:2px solid #f1c40f; }
  nav button { flex:1; padding:15px; background:none; border:none; color:#555; font-weight:bold; }
  nav button.active { color:#f1c40f; background:rgba(241,196,15,0.1); }
  .view { padding:20px; }
  .card { display:flex; justify-content:space-between; background:#111; padding:15px; border-radius:10px; margin-bottom:10px; border:1px solid #333; }
  .card b { background:#f1c40f; color:#000; padding:5px; border-radius:5px; font-size:0.7rem; }
  .elite { border-color:#fff; }
  .radar { text-align:center;
