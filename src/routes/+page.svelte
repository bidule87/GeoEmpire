<script>
  // Variables d'état
  let geo = 39259;
  let tix = 10;
  let crn = 0;
  let gtk = 5000;
  let jmp = 0;
  let isElite = false;
  let activeTab = 'SHOP';
  let log = "Système Empire prêt.";

  // Fonctions
  function buy(type) {
    if (type === 'ELITE') isElite = true;
    if (type === 'PRESTIGE') { tix += 100; gtk += 5000; }
    if (type === 'CROWN') crn += 10;
    if (type === 'GTOKEN') gtk += 10000;
    if (type === 'JUMP') jmp += 3;
    log = `Pack ${type} activé !`;
  }

  function useJump() {
    if (jmp > 0) { jmp--; log = "Téléportation effectuée."; }
  }
</script>

<main>
  <div class="header">
    <div class="logo">👑 GEO EMPIRE {isElite ? '★ ELITE' : ''}</div>
    <div class="stats">
      <span>🟡 {geo.toLocaleString()}</span>
      <span>🎫 {tix}</span>
      <span>👑 {crn}</span>
      <span>🧱 {gtk.toLocaleString()}</span>
    </div>
  </div>

  <nav>
    <button class:active={activeTab === 'MAP'} on:click={() => activeTab = 'MAP'}>📍 RADAR</button>
    <button class:active={activeTab === 'SHOP'} on:click={() => activeTab = 'SHOP'}>🛒 SHOP</button>
    <button class:active={activeTab === 'RAID'} on:click={() => activeTab = 'RAID'}>🏴‍☠️ RAID</button>
  </nav>

  <div class="content">
    {#if activeTab === 'MAP'}
      <div class="center">
        <div class="radar-disc"><div class="sweep"></div></div>
        <p>SCAN GPS EN COURS...</p>
        {#if jmp > 0}
          <button class="btn-p" on:click={useJump}>UTILISER SAUT ({jmp})</button>
        {/if}
      </div>
    {:else if activeTab === 'SHOP'}
      <div class="shop">
        <h3>💎 PRIVILÈGES PRÉREQUIS (€)</h3>
        <div class="card elite" on:click={() => buy('ELITE')}>
          <span>📂 PACK ÉLITE</span> <b>9.99 €</b>
        </div>
        <div class="card prestige" on:click={() => buy('PRESTIGE')}>
          <span>📦 PRESTIGE (100🎫)</span> <b>7.99 €</b>
        </div>
        <div class="card crown" on:click={() => buy('CROWN')}>
          <span>👑 CROWNS (10 jetons)</span> <b>4.99 €</b>
        </div>
        <div class="card gtoken" on:click={() => buy('GTOKEN')}>
          <span>🧱 G-TOKEN (10k)</span> <b>4.99 €</b>
        </div>
        <div class="card jump" on:click={() => buy('JUMP')}>
          <span>🌀 TÉLÉPORT (3 sauts)</span> <b>5.99 €</b>
        </div>
      </div>
    {:else if activeTab === 'RAID'}
      <div class="raid-card">
        <h2>BANQUE CENTRALE</h2>
        <div class="loot">42,500 G</div>
        <button class="btn-r" on:click={() => log = "Infiltration..."}>BRAQUER (1 🎫)</button>
      </div>
    {/if}
  </div>

  <div class="console">> {log}</div>
</main>

<style>
  :global(body) { margin:0; background:#000; color:#fff; font-family:sans-serif; }
  .header { padding:15px; border-bottom:1px solid #222; background:#050505; text-align:center; }
  .logo { color:#f1c40f
