<script>
  let geo = 39259;
  let tpCards = 10;
  let crowns = 0;
  let gTokens = 5000;
  let jumps = 0;
  let isElite = false;
  let activeTab = 'RAID';
  let logs = "Système Empire Prêt";

  function buyPack(type, qty, label) {
    if (type === 'ELITE') isElite = true;
    if (type === 'TICKET') tpCards += qty;
    if (type === 'CROWN') crowns += qty;
    if (type === 'GTOKEN') gTokens += qty;
    if (type === 'JUMP') jumps += qty;
    logs = "Achat : " + label;
  }
</script>

<main>
  <div class="header">
    <div class="top">👑 GEO EMPIRE {isElite ? 'ELITE' : ''}</div>
    <div class="stats">
      <span>🟡 {geo}</span>
      <span>🎫 {tpCards}</span>
      <span>👑 {crowns}</span>
      <span>🧱 {gTokens}</span>
    </div>
  </div>

  <div class="nav">
    <button on:click={() => activeTab = 'MAP'}>📍 RADAR</button>
    <button on:click={() => activeTab = 'SHOP'}>🛒 SHOP</button>
    <button on:click={() => activeTab = 'RAID'}>🏴‍☠️ RAID</button>
  </div>

  <div class="view">
    {#if activeTab === 'MAP'}
      <div class="page">
        <div class="radar-circle"></div>
        <p>RECHERCHE GPS (5KM)...</p>
        {#if jumps > 0}
          <button class="btn-p" on:click={() => {jumps--; logs="Saut utilisé";}}>SAUTER ({jumps})</button>
        {/if}
      </div>
    {/if}

    {#if activeTab === 'SHOP'}
      <div class="page">
        <h2 class="title">BOUTIQUE (€)</h2>
        
        <div class="card elite" on:click={() => buyPack('ELITE', 1, 'PACK ELITE')}>
          <b>📂 PACK ELITE</b> <span>9.99 €</span>
        </div>

        <div class="card prestige" on:click={() => buyPack('TICKET', 100, 'PRESTIGE')}>
          <b>📦 PRESTIGE (100🎫)</b> <span>7.99 €</span>
        </div>

        <div class="card crown" on:click={() => buyPack('CROWN', 10, 'CROWNS')}>
          <b>👑 CROWNS (10 jetons)</b> <span>4.99 €</span>
        </div>

        <div class="card gtoken" on:click={() => buyPack('GTOKEN', 10000, 'G-TOKENS')}>
          <b>🧱 G-TOKENS (10k)</b> <span>4.99 €</span>
        </div>

        <div class="card jump" on:click={() => buyPack('JUMP', 3, 'TELEPORT')}>
          <b>🌀 TELEPORT (3 sauts)</b> <span>5.99 €</span>
        </div>
      </div>
    {/if}

    {#if activeTab === 'RAID'}
      <div class="page">
        <div class="raid-box">
          <div class="bank">BANQUE CENTRALE</div>
          <button class="btn-r" on:click={() => logs = "Raid Infiltré"}>LANCER LE RAID</button>
        </div>
      </div>
    {/if}
  </div>

  <div class="footer">> {logs}</div>
</main>

<style>
  :global(body) { margin:0; background:#000; color:#fff; font-family:sans-serif; }
  .header { padding:15px; border-bottom:1px solid #222; }
  .top { color:#f1c40f; font-weight:bold; font-size:1.2rem; }
  .stats { display:flex; gap:10px; font-size:0.8rem; margin-top:5px; color:#aaa; }
  .nav { display:flex; background:#111; }
  .nav button { flex:1; padding:15px; background:none; border:none; color:#fff; font-weight:bold; border-bottom:2px solid #333; }
  .view { padding:15px; height:70vh; overflow-y:auto; }
  .title { color:#f1c40f; font-size:0.9rem; }
  .card { display:flex; justify-content:space-between; align-items:center; background:#111; padding:15px; border-radius:10px; margin-bottom:10px; border:1px solid #333; }
  .card span { background:#f1c40f; color:#000; padding:5px 8px; border-radius:5px; font-weight:bold; font-size:0.8rem; }
  .elite { border-color:#fff; }
  .prestige { border-color:#00d4ff; }
  .crown { border-color:#f1c40f; }
  .jump { border-color:#9b59b6; }
  .gtoken { border-color:#e67e22; }
  .radar-circle { width:120px; height:120px; border:2px solid #f1c40f; border-radius:50%; margin:20px auto; }
  .btn-p { background:#9b59b6; color:#fff; border:none; padding:10px 20px; border-radius:20px; width:100%; }
  .btn-r { background:#e74c3c; color:#fff; border:none; padding:20px; border-radius:10px; width:100%; font-weight:bold; }
  .footer { position:fixed; bottom:0; width:100%; padding:10px; background:#000; color:#2ecc71; border-top:1px solid #222; font-size:0.7rem; }
</style>