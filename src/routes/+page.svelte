<script>
  let geo = 50000;
  let tpCards = 3;
  let activeTab = 'GPS';
  let logs = ["Radar de précision calibré sur Limoges."];

  function buyPack() {
    tpCards += 10;
    logs = ["Pack Premium reçu : +10 Cartes TP.", ...logs];
  }
</script>

<main>
  <div class="city-bg"></div>

  <header>
    <div class="logo">👑 GEO EMPIRE</div>
    <div class="stats">
      <div class="box"><span>GEO</span><b>{geo.toLocaleString()}</b></div>
      <div class="box"><span>TP</span><b class="green">{tpCards}</b></div>
    </div>
    <button class="buy-btn" on:click={buyPack}>PACK 10x 🎫 (4.99€)</button>
  </header>

  <div class="main-container">
    <nav>
      <button class:atv={activeTab==='GPS'} on:click={()=>activeTab='GPS'}>📍 CARTE GPS</button>
      <button class:atv={activeTab==='Heist'} on:click={()=>activeTab='Heist'}>🏴‍☠️ BRAQUAGES</button>
    </nav>

    <section class="game-panel">
      {#if activeTab === 'GPS'}
        <div class="map-box">
          <iframe 
            title="GPS Map"
            width="100%" 
            height="100%" 
            frameborder="0" 
            src="https://www.openstreetmap.org/export/embed.html?bbox=1.245,45.825,1.275,45.845&layer=mapnik"
            style="filter: invert(90%) hue-rotate(180deg) brightness(0.6) contrast(1.3); pointer-events: all;">
          </iframe>
          
          <div class="targeting-system">
             <div class="main-circle"></div>
             <div class="pulse-ring"></div>
             <div class="cross-v"></div>
             <div class="cross-h"></div>
             <div class="coords-display">RADAR RANGE: 5.0KM</div>
          </div>
          
          <div class="map-label">SCANNER ACTIF</div>
        </div>
      {:else}
        <div class="empty-state">
          <h2>UNITÉ DE BRAQUAGE</h2>
          <p>Recherche de commerces vulnérables à Limoges...</p>
        </div>
      {/if} 
    </section>
  </div>

  <footer>
    {#each logs.slice(0, 1) as log}<p>> {log}</p>{/each}
  </footer>
</main>

<style>
  :global(body) { margin:0; background:#000; color:white; font-family: 'Courier New', monospace; overflow:hidden; }
  
  .city-bg { position:fixed; inset:0; background:url('https://images.unsplash.com/photo-1514924013411-cbf25faa35bb?q=80&w=1920') center/cover; z-index:-1; opacity:0.3; }

  header { height:70px; background:rgba(0,0,0,0.98); display:flex; align-items:center; justify-content:space-between; padding:0 25px; border-bottom:2px solid #f1c40f; }
  .box b { color:#f1c40f; font-size:1.1rem; padding-left: 5px; }
  .green { color:#2ecc71 !important; }
  .buy-btn { background:#e74c3c; border:none; color:white; padding:8px 15px; border-radius:4px; font-weight:bold; cursor:pointer; }

  .main-container { display:flex; height:calc(100vh - 120px); }
  nav { width:170px; background:rgba(0,0,0,0.95); border-right:1px solid #333; padding-top:15px; }
  nav button { width:100%; background:none; border:none; color:#555; padding:15px; text-align:left; cursor:pointer; font-weight:bold; }
  nav button.atv { color:#f1c40f; border-left:3px solid #f1c40f; background:rgba(241,196,15,0.05); }

  .game-panel { flex:1; margin:20px; background:#000; border:2px solid #333; border-radius:15px; overflow:hidden; position:relative; }

  /* LE SYSTÈME DE CIBLE GPS DORÉ */
  .targeting-system {
    position: absolute; top: 50%; left: 50%;
    transform: translate(-50%, -50%);
    width: 320px; height: 320px;
    pointer-events: none; z-index: 10;
  }

  .main-circle {
    position: absolute; inset: 0;
    border: 4px solid #f1c40f;
    border-radius: 50%;
    box-shadow: 0 0 20px rgba(241, 196, 15, 0.6);
  }

  .pulse-ring {
    position: absolute; inset: -5px;
    border: 2px solid rgba(241, 196, 15, 0.3);
    border-radius: 50%;
    animation: pulse 2s infinite;
  }

  .cross-v { position: absolute; left: 50%; top: -15px; bottom: -15px; width: 1px; background: rgba(241, 196, 15, 0.5); }
  .cross-h { position: absolute; top: 50%; left: -15px; right: -15px; height: 1px; background: rgba(241, 196, 15, 0.5); }

  .coords-display {
    position: absolute; bottom: -30px; left: 50%; transform: translateX(-50%);
    color: #f1c40f; font-size: 10px; font-weight: bold; letter-spacing: 1px;
  }

  @keyframes pulse {
    0% { transform: scale(1); opacity: 1; }
    100% { transform: scale(1.1); opacity: 0; }
  }

  .map-label {
    position:absolute; top:20px; left:50%; transform:translateX(-50%); z-index:20;
    background:rgba(0,0,0,0.9); color:#f1c40f; border:1px solid #f1c40f;
    padding:8px 20px; border-radius:5px; font-size:0.7rem; font-weight:bold;
  }

  .empty-state { display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100%; color: #444; }

  footer { height:50px; background:#000; padding:10px 25px; color:#2ecc71; border-top:1px solid #222; }
</style>
