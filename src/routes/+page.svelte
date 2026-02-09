<script>
  let geo = 50000;
  let tpCards = 13;
  let activeTab = 'CARTE GPS';
  let logs = ["Scan de Limoges terminé. Rayon de 5km actif."];

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
            style="filter: invert(90%) hue-rotate(180deg) brightness(0.6) contrast(1.3); pointer-events: all;">
          </iframe>
          
          <div class="radar-circle">
             <div class="glow-effect"></div>
             <div class="label-range">RADAR RANGE: 5.0KM</div>
          </div>
          
          <div class="scanner-label">SCANNER ACTIF</div>
        </div>
      {:else}
        <div class="empty-state">
          <h2>UNITÉ DE BRAQUAGE</h2>
          <p>En attente de synchronisation...</p>
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
  
  .city-bg { position:fixed; inset:0; background:url('
