<script>
  let geo = 50000;
  let tpCards = 3;
  let activeTab = 'GPS';
  let logs = ["Logiciel GPS connecté à Limoges."];

  function buyPack() {
    tpCards += 10;
    logs = ["Pack 10x 🎫 ajouté au compte.", ...logs];
  }
</script>

<main>
  <div class="city-bg"></div>

  <header>
    <div class="logo">👑 GEO EMPIRE</div>
    <div class="stats">
      <div class="box"><span>GEO</span><b>{geo.toLocaleString()}</b></div>
      <div class="box"><span>TP</span><b style="color:#2ecc71">{tpCards}</b></div>
    </div>
    <button class="buy-btn" on:click={buyPack}>PACK 10x 🎫 (4.99€)</button>
  </header>

  <div class="layout">
    <nav>
      <button class:atv={activeTab==='GPS'} on:click={()=>activeTab='GPS'}>📍 CARTE GPS</button>
      <button class:atv={activeTab==='Heist'} on:click={()=>activeTab='Heist'}>🏴‍☠️ BRAQUAGES</button>
    </nav>

    <section class="panel">
      {#if activeTab === 'GPS'}
        <div class="map-wrapper">
          <iframe 
            width="100%" 
            height="100%" 
            frameborder="0" 
            scrolling="no" 
            marginheight="0" 
            marginwidth="0" 
            src="https://www.openstreetmap.org/export/embed.html?bbox=1.21,45.81,1.31,45.86&layer=mapnik"
            style="filter: invert(90%) hue-rotate(180deg) brightness(0.8) contrast(1.2);">
          </iframe>
          <div class="map-ui">RAYON ACTIF : 5KM</div>
        </div>
      {:else}
        <div class="empty">SYNCHRONISATION DES CADENAS...</div>
      {/if}
    </section>
  </div>

  <footer>
    {#each logs.slice(0, 1) as log}<p>> {log}</p>{/each}
  </footer>
</main>

<style>
  :global(body) { margin:0; background:#000; color:white; font-family:sans-serif; overflow:hidden; }
  .city-bg { position:fixed; inset:0; background:url('https://images.unsplash.com/photo-1514924013411-cbf25faa35bb?q=80&w=1920') center/cover; z-index:-1; opacity:0.4; }

  header { height:60px; background:rgba(0,0,0,0.98); display:flex; align-items:center; justify-content:space-between; padding:0 20px; border-bottom:2px solid #f1c40f; }
  .box b { color:#f1c40f; font-size:1.1rem; }
  .buy-btn { background:#e74c3c; color:white; border:none; padding:8px 15px; border-radius:4px; font-weight:bold; cursor:pointer; }

  .layout { display:flex; height:calc(100vh - 110px); }
  nav { width:150px; background:rgba(0,0,0,0.95); border-right:1px solid #333; }
  nav button { width:100%; background:none; border:none; color:#666; padding:15px; text-align:left; cursor:pointer; }
  nav button.atv { color:#f1c40f; border-left:3px solid #f1c40f; background:rgba(255,255,255,0.05); }

  .panel { flex:1; margin:15px; background:#000; border:1px solid #444; border-radius:10px; overflow:hidden; position:relative; }
  
  .map-wrapper { width:100%; height:100%; position:relative; }
  
  /* L'overlay pour garder le look Geo Empire par-dessus la map */
  .map-ui {
    position:absolute; top:15px; right:15px; background:rgba(0,0,0,0.85);
    color:#f1c40f; border:1px solid #f1c40f; padding:5px 12px; border-radius:20px;
    font-size:0.7rem; font-weight:bold; pointer-events:none;
  }

  footer { height:50px; background:#000; padding:10px 25px; color:#2ecc71; border-top:1px solid #222; font-family:monospace; }
</style>
