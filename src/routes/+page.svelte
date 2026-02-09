<script>
  let geo = 50000;
  let tpCards = 3;
  let activeTab = 'GPS';
  let logs = ["Système GPS initialisé sur zone."];

  function buyPack() {
    tpCards += 10;
    logs = ["Pack Premium : +10 Cartes TP.", ...logs];
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
            title="GPS"
            width="100%" 
            height="100%" 
            frameborder="0" 
            src="https://www.openstreetmap.org/export/embed.html?bbox=1.23,45.81,1.29,45.85&layer=mapnik"
            style="filter: invert(90%) hue-rotate(180deg) brightness(0.6) contrast(1.3);">
          </iframe>
          
          <div class="radar-circle">
            <div class="cross-v"></div>
            <div class="cross-h"></div>
          </div>
          
          <div class="map-label">SCANNER ACTIF : 5KM</div>
        </div>
      {:else}
        <div class="empty-msg">SYNCHRONISATION DES CIBLES...</div>
      {if}
    </section>
  </div>

  <footer>
    {#each logs.slice(0, 1) as log}<p>> {log}</p>{/each}
  </footer>
</main>

<style>
  :global(body) { margin:0; background:#000; color:white; font-family: monospace; overflow:hidden; }
  .city-bg { position:fixed; inset:0; background:url('https://images.unsplash.com/photo-1514924013411-cbf25faa35bb?q=80&w=1920') center/cover; z-index:-1; opacity:0.3; }
  header { height:70px; background:rgba(0,0,0,0.98); display:flex; align-items:center; justify-content:space-between; padding:0 20px; border-bottom:2px solid #f1c40f
