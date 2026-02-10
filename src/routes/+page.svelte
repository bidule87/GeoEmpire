<script>
  // --- ÉCONOMIE DU JOUEUR ---
  let geo = 39259;
  let tickets = 10;
  let crowns = 0;
  let gTokens = 5000;
  let jumps = 0;
  let isElite = false;
  
  let activeTab = 'SHOP';
  let logs = "Système Geo Empire prêt.";

  // --- LOGIQUE DES ACHATS ---
  function buy(type) {
    if (type === 'ELITE') isElite = true;
    if (type === 'PRESTIGE') { tickets += 100; gTokens += 5000; }
    if (type === 'CROWN') crowns += 10;
    if (type === 'GTOKEN') gTokens += 10000;
    if (type === 'JUMP') jumps += 3;
    logs = `Pack ${type} activé avec succès !`;
  }
</script>

<main>
  <div class="header">
    <div class="logo">👑 GEO EMPIRE {isElite ? '★ ELITE' : ''}</div>
    <div class="stats">
      <span>🟡 {geo.toLocaleString()}</span>
      <span>🎫 {tickets}</span>
      <span>👑 {crowns}</span>
      <span>🧱 {gTokens.toLocaleString()}</span>
    </div>
  </div>

  <nav>
    <button class:atv={activeTab === 'MAP'} on:click={() => activeTab = 'MAP'}>📍 RADAR</button>
    <button class:atv={activeTab === 'SHOP'} on:click={() => activeTab = 'SHOP'}>🛒 SHOP</button>
    <button class:atv={activeTab === 'RAID'} on:click={() => activeTab = 'RAID'}>🏴‍☠️ RAID</button>
  </nav>

  <div class="view">
    {#if activeTab === 'MAP'}
      <div class="center-content">
        <div class="radar-circle"><div class="sweep"></div></div>
        <p>SCAN GPS EN COURS...</p>
        {#if jumps > 0}
          <button class="jump-btn" on:click={() => {jumps--; logs="Saut GPS utilisé";}}>SAUTER ({jumps})</button>
        {/if}
      </div>

    {:else if activeTab === 'SHOP'}
      <div class="shop-list">
        <h3 class="stitle">💎 EXCLUSIVITÉS RÉELLES (€)</h3>
        
        <div class="p-card elite" on:click={() => buy('ELITE')}>
          <div class="p-info"><b>📂 PACK ÉLITE</b><small>Gestion Full + Export Excel</small></div>
          <span class="price">9.99 €</span>
        </div>

        <div class="p-card prestige" on:click={() => buy('PRESTIGE')}>
          <div class="p-info"><b>📦 PACK PRESTIGE</b><small>100 Tickets + 5k G-Tokens</small></div>
          <span class="price">7.99 €</span>
        </div>

        <div class="p-card crown" on:click={() => buy('CROWN')}>
          <div class="p-info"><b>👑 PACK CROWNS</b><small>10 Jetons Loterie Royale</small></div>
          <span class="price">4.99 €</span>
        </div>

        <div class="p-card gtoken" on:click={() => buy('GTOKEN')}>
          <div class="p-info"><b>🧱 PACK G-TOKEN</b><small>10 000 Lingots de Boost</small></div>
          <span class="price">4.99 €</span>
        </div>

        <div class="p-card jump" on:click={() => buy('JUMP')}>
          <div class="p-info"><b>🌀 TÉLÉPORTATION</b><small>3 Sauts GPS Immédiats</small></div>
          <span class="price">5.99 €</span>
        </div>
      </div>

    {:else if activeTab === 'RAID'}
      <div class="raid-box">
        <div class="target">🏛️ BANQUE CENTRALE</div>
        <div class="loot">42,500 G</div>
        <button class="raid-btn" on:click={() => logs = "Tentative d'infiltration..."}>BRAQUER (1 🎫)</button>
      </div>
    {/if}
  </div>

  <div class="console">> {logs}</div>
</main>

<style>
  :global(body) { margin:0; background:#000; color:#fff; font-family:sans-serif; overflow:hidden; }
  .header { padding:15px; border-bottom:1px solid #222; background:#050505; text-align:center; }
  .logo { color:#f1c40f; font-weight:bold; font-size:1.1rem; }
  .stats { display:flex; justify-content:center; gap:10px; font-size:0.7rem; color:#aaa; margin-top:5px; }
  
  nav { display:flex; border-bottom:2px solid #f1c40
