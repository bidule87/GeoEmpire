<script>
  // --- ÉCONOMIE ---
  let geo = 39259;
  let tpCards = 10;
  let crowns = 0;
  let gTokens = 5000;
  let jumps = 0;
  let isElite = false;
  
  let activeTab = 'RAID';
  let logs = "Empire Initialisé";

  // --- BOUTIQUE ---
  function buy(type, qty, price) {
    if (type === 'ELITE') isElite = true;
    if (type === 'TICKET') tpCards += qty;
    if (type === 'CROWN') crowns += qty;
    if (type === 'GTOKEN') gTokens += qty;
    if (type === 'JUMP') jumps += qty;
    logs = "Achat : " + qty + " unités effectuées.";
  }
</script>

<main>
  <div class="header">
    <div class="brand">👑 GEO EMPIRE {isElite ? '★' : ''}</div>
    <div class="stats">
      <span>🟡 {geo}</span> | <span>🎫 {tpCards}</span> | <span>👑 {crowns}</span> | <span>🧱 {gTokens}</span>
    </div>
  </div>

  <div class="nav">
    <button on:click={() => activeTab = 'MAP'}>📍 RADAR</button>
    <button on:click={() => activeTab = 'SHOP'}>🛒 SHOP</button>
    <button on:click={() => activeTab = 'RAID'}>🏴‍☠️ RAID</button>
  </div>

  <div class="content">
    {#if activeTab === 'MAP'}
      <div class="view-center">
        <div class="radar-circle"></div>
        <p>SCAN GPS (PORTÉE 5KM)</p>
        {#if jumps > 0}
          <button class="btn-jump" on:click={() => {jumps--; logs="Saut GPS effectué";}}>UTILISER SAUT ({jumps})</button>
        {/if}
      </div>
    {/if}

    {#if activeTab === 'SHOP'}
      <div class="shop-list">
        <h2 class="section">BOUTIQUE PREMIUM (€)</h2>
        
        <div class="item elite" on:click={() => buy('ELITE', 1, 9.99)}>
          <b>📂 PACK ELITE (Full Gestion)</b> <span>9.99 €</span>
        </div>

        <div class="item prestige" on:click={() => buy('TICKET', 100, 7.99)}>
          <b>📦 PRESTIGE (100 Tickets)</b> <span>7.99 €</span>
        </div>

        <div class="item crown" on:click={() => buy('CROWN', 10, 4.99)}>
          <b>👑 CROWNS (10 Jetons)</b> <span>4.99 €</span>
        </div>

        <div class="item gtoken" on:click={() => buy('GTOKEN', 10000, 4.99)}>
          <b>🧱 G-TOKENS (