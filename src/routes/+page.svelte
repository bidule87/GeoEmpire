<script>
  let geo = 50000;
  let tpCards = 13;
  let activeTab = 'CARTE GPS';
  let logs = ["Scan satellite actif. Zone de 5km verrouillée."];

  function buyPack() {
    tpCards += 10;
    logs = ["Pack Premium : +10 Cartes TP ajoutées.", ...logs];
  }
</script>

<main>
  <div class="city-bg"></div>

  <header>
    <div class="logo">👑 GEO EMPIRE</div>
    <div class="stats">
      <div class="box"><span>GEO</span><b>{geo.toLocaleString()}</b></div>
      <div class="box"><span>TP</span><b class="gold">{tpCards}</b></div>
    </div>
    <button class="buy-btn" on:click={buyPack}>PACK 10x 🎫 (4.99€)</button>
  </header>

  <div class="main-container">
    <nav>
      <button class:atv={activeTab==='CARTE GPS'} on:click={()=>activeTab='CARTE GPS'}>📍 CARTE GPS</button>
      <button class:atv={activeTab==='BRAQUAGES'} on:click={()=>activeTab='BRAQUAGES'}>🏴‍☠️ BRAQUAGES</button>
    </nav>

    <section class="game-panel">
      {#if activeTab === 'CARTE GPS'}
        <div class="map-box">
          <iframe 
            title="GPS Map"
            width="100%" 
            height="100%" 
            frameborder="0" 
            src="https://www.openstreetmap.org/export/embed.html?bbox=1.23,45.81,1.29,45.86&layer=mapnik"
            style="filter: invert(90%) hue-rotate(180deg) brightness(0.6) contrast(1.2); pointer-events: all;">
          </iframe>
          
          <div class="fix-radar">
             <div class="main-ring"></div>
             <div class="pulse-ring"></div>
             <div class="range-text">PÉRIMÈTRE : 5KM</div>
          </div>
          
          <div class="status-tag">SCANNER EN COURS...</div>
        </div>
      {:else}
        <div class="empty-state">
          <h2>UNITÉ DE BRAQUAGE</h2>
          <p>En attente de cibles dans le rayon des 5km...</p>
        </div>
      {/if}
    </section>
  </div>

  <footer>
    {#each logs.slice(0, 1) as log}<p>> {log}</p>{/each}
  </footer>
</main>

<style>
  :global(body) { margin:0; background:#000; color:white; font-family: 'Segoe UI', sans-serif; overflow:hidden; }
  
  .city-bg { position:fixed; inset:0; background:url('https://images.unsplash.com/photo-1514924013411-cbf25faa35bb?q=80&w=1920') center/cover; z-index:-1; opacity:0.15; }

  header { height:70px; background:rgba(0,0,0,0.95); display:flex; align-items:center; justify-content:space-between; padding:0 25px; border-bottom:2px solid #f1c40f; }
  .box b { color:#f1c40f; font-size:1.1rem; padding-left:5px; }
  .gold { color:#f1c40f !important; }
  .buy-btn { background:#e74c3c; border:none; color:white; padding:8px 15px; border-radius:4px; font-weight:bold; cursor:pointer; transition: 0.3s; }
  .buy-btn:hover { background:#ff5e4d; transform: scale(1.05); }

  .main-container { display:flex; height:calc(100vh - 120px); }
  nav { width:180px; background:rgba(10,10,10,0.98); border-right:1px solid #222; padding-top:15px; }
  nav button { width:100%; background:none; border:none; color:#555; padding:15px; text-align:left; cursor:pointer; font-weight:bold; font-size:0.85rem; }
  nav button.atv { color:#f1c40f; border-left:4px solid #f1c40f; background:rgba(241, 196, 15, 0.05); }

  .game-panel { flex:1; margin:15px; background:#000; border:1px solid #333; border-radius:12px; overflow:hidden; position:relative; box-shadow: 0 0 40px rgba(0,0,0,0.5); }

  .map-box { width:100%; height:100%; position:relative; }

  /* LE RADAR DORÉ FIXE */
  .fix-radar {
    position: absolute; top: 50%; left: 50%;
    transform: translate(-50%, -50%);
    width: 340px; height: 340px;
    pointer-events: none; z-index: 100;
  }

  .main-ring {
    position: absolute; inset: 0;
    border: 3px solid #f1c40f;
    border-radius: 50%;
    box-shadow: 0 0 25px rgba(241, 196, 15, 0.5), inset 0 0 15px rgba(241, 196, 15, 0.2);
  }

  .pulse-ring {
    position: absolute; inset: 0;
    border: 1px solid rgba(241, 196, 15, 0.4);
    border-radius: 50%;
    animation: radar-pulse 3s infinite ease-out;
  }

  .range-text {
    position: absolute; bottom: -30px; left: 50%; transform: translateX(-50%);
    color: #f1c40f; font-size: 11px; font-weight: bold; text-shadow: 0 0 5px black;
  }

  @keyframes radar-pulse {
    0% { transform: scale(1); opacity: 0.8; }
    100% { transform: scale(1.4); opacity: 0; }
  }

  .status-tag {
    position:absolute; top:20px; right:20px; z-index:20;
    background:rgba(0,0,0,0.85); color:#f1c40f; border:1px solid #f1c40f;
    padding:6px 15px; border-radius:4px; font-size:0.7rem; font-weight:bold;
  }

  .empty-state { display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100%; color: #444; }

  footer { height:50px; background:#000; padding:12px 25px; color:#2ecc71; border-top:1px solid #222; font-family: monospace; }
</style>
