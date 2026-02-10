<script>
  let tickets = 10;
  let activeTab = 'SHOP';
  let log = "Empire prêt.";

  function buy(pack) {
    if (pack === 'PRESTIGE') tickets += 100;
    log = "Achat " + pack + " validé !";
  }
</script>

<main>
  <div class="hdr">
    <div class="logo">👑 GEO EMPIRE</div>
    <div class="st">🎫 Tickets: {tickets}</div>
  </div>

  <nav>
    <button class:act={activeTab === 'MAP'} on:click={() => activeTab = 'MAP'}>RADAR</button>
    <button class:act={activeTab === 'SHOP'} on:click={() => activeTab = 'SHOP'}>SHOP</button>
  </nav>

  <div class="cnt">
    {#if activeTab === 'SHOP'}
      <div class="card" on:click={() => buy('ELITE')}>
        <span>📂 PACK ÉLITE</span> <b>9.99 €</b>
      </div>
      <div class="card" on:click={() => buy('PRESTIGE')}>
        <span>📦 PACK PRESTIGE</span> <b>7.99 €</b>
      </div>
    {:else}
      <div class="radar">
        <div class="circle"></div>
        <p>RECHERCHE GPS...</p>
      </div>
    {/if}
  </div>

  <div class="cons">> {log}</div>
</main>

<style>
  :global(body) { margin: 0; background: #000; color: #fff; font-family: sans-serif; }
  .hdr { padding: 15px; border-bottom: 1px solid #333; text-align: center; }
  .logo { color: #f1c40f; font-weight: bold; font-size: 1.2rem; }
  .st { font-size: 0.8rem; color: #aaa; }
  nav { display: flex; border-bottom: 2px solid #f1c40f; }
  nav button { flex: 1; padding: 15px; background: #0a0a0a; border: none; color: #666; font-weight: bold; }
  nav button.act { color: #f1c40f; }
  .cnt { padding: 20px; }
  .card { display: flex; justify-content: space-between; background: #111; padding: 15px; border-radius: 8px; margin-bottom: 10px; border: 1px solid #333; }
  .card b { background: #f1c40f; color: #000; padding: 3px 8px; border-radius: 4px; font-size: 0.8rem; }
  .radar { text-align: center; margin-top: 50px; }
  .circle { width: 80px; height: 80px; border: 2px solid #f1c40f; border-radius: 50%; margin: 0 auto; opacity: 0.5; }
  .cons { position: fixed; bottom: 0; width: 100%; padding: 10px; background: #000; color: #2ecc71; border-top: 1px solid #222; font-size: 0.7rem; font-family: monospace; }
</style>
