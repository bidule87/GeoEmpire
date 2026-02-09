<script>
  // Données de ton script
  let geo = 50000;
  let tpCards = 0;
  let activeTab = 'GPS';
  let logs = ["Système Geo Empire chargé."];
  let loots = [{id: 1, x: 30, y: 40}]; // Une carte apparaît direct pour tester

  function buyPack() {
    tpCards += 10;
    logs = ["Pack 10 Cartes TP acheté (4.99€) !", ...logs];
  }

  function collect(id) {
    tpCards++;
    loots = [];
    logs = ["Carte TP ramassée !", ...logs];
    setTimeout(() => { loots = [{id: Date.now(), x: Math.random()*70+10, y: Math.random()*70+10}]; }, 10000);
  }
</script>

<main>
  <div class="bg"></div>

  <header>
    <div class="logo">👑 GEO EMPIRE</div>
    <div class="stats">
      <span>GEO: <b>{geo}</b></span>
      <span>TP: <b style="color:#2ecc71">{tpCards}</b></span>
    </div>
    <button class="shop-btn" on:click={buyPack}>PACK 10x 🎫 (4.99€)</button>
  </header>

  <div class="layout">
    <nav>
      <button class:atv={activeTab==='GPS'} on:click={()=>activeTab='GPS'}>📍 RADAR</button>
      <button class:atv={activeTab==='Braquages'} on:click={()=>activeTab='Braquages'}>🏴‍☠️ BRAQUAGES</button>
    </nav>

    <div class="black-panel">
      {#if activeTab === 'GPS'}
        <h2>ZONE LIMOGES (5KM)</h2>
        <div class="radar">
          <div class="line"></div>
          {#each loots as l}
            <button class="loot" style="top:{l.y}%; left:{l.x}%;" on:click={()=>collect(l.id)}>🎫</button>
          {/each}
        </div>
        <p><i>Les cartes TP apparaissent aléatoirement...</i></p>
      {:else}
        <h2>BRAQUAGES</h2>
        <p style="color: #666;">Cadenas en cours de synchronisation...</p>
      {/if}
    </div>
  </div>

  <footer>
    {#each logs.slice(0, 1) as log}<p>> {log}</p>{/each}
  </footer>
</main>

<style>
  :global(body) { margin: 0; background: #000; color: white; font-family: sans-serif; }
  .bg { position: fixed; inset: 0; background: url('https://images.unsplash.com/photo-1514924013411-cbf25faa35bb?q=80&w=1920') center/cover; z-index: -1; }
  
  header { height: 60px; background: rgba(0,0,0,0.98); display: flex; align-items: center; justify-content: space-between; padding: 0 15px; border-bottom: 2px solid #f1c40f; }
  .stats b { color: #f1c40f; margin-right: 15px; }
  .shop-btn { background: #e74c3c; border: none; color: white; padding: 5px 10px; border-radius: 4px; font-weight: bold; cursor: pointer; }

  .layout { display: flex; height: calc(100vh - 110px); }
  nav { width: 120px; background: rgba(0,0,0,0.9); border-right: 1px solid #333; padding-top: 10px; }
  nav button { width: 100%; background: none; border: none; color: #777; padding: 15px 5px; cursor: pointer; font-size: 12px; text-align: left; }
  nav button.atv { color: #f1c40f; border-left: 3px solid #f1c40f; background: rgba(255,255,255,0.05); }

  /* NOIR TOTAL POUR LA LISIBILITÉ */
  .black-panel { flex: 1; margin: 15px; background: #000000; border: 1px solid #444; border-radius: 10px; padding: 20px; text-align: center; }

  .radar { width: 200px; height: 200px; border: 2px solid #f1c40f; border-radius: 50%; margin: 20px auto; position: relative; overflow: hidden; background: rgba(241,196,15,0.1); }
  .line { width: 50%; height: 2px; background: #f1c40f; position: absolute; top: 50%; left: 50%; transform-origin: left; animation: s 4s linear infinite; }
  @keyframes s { to { transform: rotate(360deg); } }

  .loot { position: absolute; background: none; border: none; font-size: 30px; cursor: pointer; filter: drop-shadow(0 0 10px #2ecc71); }

  footer { height: 50px; background: rgba(0,0,0,0.98); padding: 5px 20px; color: #2ecc71; font-family: monospace; border-top: 1px solid #333; }
</style>
