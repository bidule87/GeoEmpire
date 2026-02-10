<script>
  let geo = 39259;
  let tpCards = 10;
  let crowns = 0;
  let activeTab = 'RAID';
  let logs = "Système Opérationnel";

  function buy(price) {
    logs = "Achat effectué : " + price + "€";
  }
</script>

<main>
  <div class="hdr">
    <b>👑 EMPIRE</b>
    <span>🟡 {geo} | 🎫 {tpCards} | 👑 {crowns}</span>
  </div>

  <nav>
    <button on:click={() => activeTab = 'MAP'}>MAP</button>
    <button on:click={() => activeTab = 'SHOP'}>SHOP</button>
    <button on:click={() => activeTab = 'RAID'}>RAID</button>
  </nav>

  <div class="cnt">
    {#if activeTab === 'MAP'}
      <div class="radar">🛰️ SCAN GPS EN COURS...</div>
    {/if}

    {#if activeTab === 'SHOP'}
      <div class="shop">
        <div class="box" on:click={() => buy(9.99)}>📂 PACK ELITE - 9.99€</div>
        <div class="box" on:click={() => buy(7.99)}>📦 PRESTIGE - 7.99€</div>
        <div class="box" on:click={() => buy(4.99)}>👑 CROWNS - 4.99€</div>
        <div class="box" on:click={() => buy(4.99)}>🧱 G-TOKENS - 4.99€</div>
        <div class="box" on:click={() => buy(5.99)}>🌀 TELEPORT - 5.99€</div>
      </div>
    {/if}

    {#if activeTab === 'RAID'}
      <div class="raid">
        <h2>BANQUE CENTRALE</h2>
        <button class="btn" on:click={() => logs = "Raid lancé !"}>LANCER RAID</button>
      </div>
    {/if}
  </div>

  <div class="log">> {logs}</div>
</main>

<style>
  :global(body) { margin: 0; background: #000; color: #fff; font-family: sans-serif; }
  .hdr { padding: 15px; border-bottom: 1px solid #333; display: flex; justify-content: space-between; font-size: 0.8rem; }
  nav { display: flex; border-bottom: 2px solid #f1c40f; }
  nav button { flex: 1; padding: 15px; background: #111; color: #fff; border: none; font-weight: bold; }
  .cnt { padding: 20px; height: 60vh; }
  .box { background: #111; padding: 15px; margin-bottom: 10px; border: 1px solid #f1c40f; border-radius: 8px; text-align: center; }
  .radar { text-align: center; padding-top: 50px; color: #f1c40f; }
  .btn { width: 100%; padding: 20px; background: #e74c3c; border: none; color: #fff; font-weight: bold; border-radius: 10px; }
  .log { position: fixed; bottom: 0; width: 100%; padding: 10px; background: #000; color: #2ecc71; font-family: monospace; font-size: 0.7rem; border-top: 1px solid #222; }
</style>