<script>
  import { onMount } from 'svelte';

  let geo = 50000;
  let tpCards = 13;
  let activeTab = 'GPS';
  let logs = ["Interface Mobile activée."];
  let userPos = { lat: 45.8336, lon: 1.2611 };

  let shops = [
    { id: 1, name: "Boulangerie", price: 15000, type: "🥖", top: "35%", left: "40%" },
    { id: 2, name: "Bar Tabac", price: 25000, type: "🍺", top: "25%", left: "65%" },
    { id: 3, name: "Epicerie", price: 45000, type: "🛒", top: "55%", left: "50%" }
  ];

  onMount(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        userPos.lat = position.coords.latitude;
        userPos.lon = position.coords.longitude;
        logs = ["GPS Connecté.", ...logs];
      });
    }
  });

  function buyShop(shop) {
    if (geo >= shop.price) {
      geo -= shop.price;
      logs = [`Acquis : ${shop.name}`, ...logs];
      shops = shops.filter(s => s.id !== shop.id);
    }
  }
</script>

<main>
  <header>
    <div class="logo">👑 GEO EMPIRE</div>
    <div class="top-stats">
        <div class="stat-item">🟡 {geo.toLocaleString()}</div>
        <div class="stat-item">🎫 {tpCards}</div>
    </div>
  </header>

  <section class="main-view">
    {#if activeTab === 'GPS'}
      <div class="map-wrapper">
        <iframe 
          title="Map"
          src="https://www.openstreetmap.org/export/embed.html?bbox={userPos.lon-0.01},{userPos.lat-0.005},{userPos.lon+0.01},{userPos.lat+0.005}&layer=mapnik"
          style="filter: invert(90%) hue-rotate(180deg) brightness(0.7) contrast(1.2);">
        </iframe>
        
        <div class="mobile-radar">
            <div class="main-circle"></div>
            <div class="scan-line"></div>
        </div>

        {#each shops as shop}
          <button class="marker" style="top:{shop.top}; left:{shop.left}" on:click={() => buyShop(shop)}>
            <span class="m-icon">{shop.type}</span>
            <span class="m-price">{shop.price}</span>
          </button>
        {/each}
      </div>
    {:else}
      <div class="menu-overlay">
        <h2>MODULE BRAQUAGE</h2>
        <p>Synchronisation avec les serveurs de la ville...</p>
      </div>
    {/if}
  </section>

  <nav class="tab-bar">
    <button class:active={activeTab==='GPS'} on:click={()=>activeTab='GPS'}>📍 CARTE</button>
    <button class:active={activeTab==='HEIST'} on:click={()=>activeTab='HEIST'}>🏴‍☠️ BRAQUAGES</button>
    <button class="special" on:click={() => tpCards++}>🎫 PACK</button>
  </nav>

  <div class="status-bar">> {logs[0]}</div>
</main>

<style>
  :global(body) { margin:0; background:#000; color:white; font-family: 'Segoe UI', sans-serif; overflow:hidden; }
  
  header { 
    height: 50px; background: #000; display: flex; align-items: center; 
    justify-content: space-between; padding: 0 15px; border-bottom: 1px solid #f1c40f;
  }
  .logo { font-weight: 900; font-size: 0.9rem; color: #f1c40f; }
  .top-stats { display: flex; gap: 15px; font-weight: bold; font-size: 0.85rem; }

  .main-view { height: calc(100vh - 110px); width: 100vw; position: relative; }

  .map-wrapper { width: 100%; height: 100%; position: relative; }
  iframe { width: 100%; height: 100%; border: none; }

  /* RADAR OPTIMISÉ POUR TOUS ÉCRANS */
  .mobile-radar {
    position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);
    width: 70vw; height: 70vw; max-width: 320px; max-height: 320px;
    pointer-events: none; z-index: 5;
  }
  .main-circle { 
    position: absolute; inset: 0; border: 2px solid #f1c40f; border-radius: 50%; 
    box-shadow: 0 0 15px rgba(241, 196, 15, 0.4);
  }
  .scan-line {
    position: absolute; inset: 0; border: 1px solid rgba(241, 196, 15, 0.3);
    border-radius: 50%; animation: pulse 2s infinite ease-out;
  }
  @keyframes pulse { 0% { transform: scale(1); opacity: 1; } 100% { transform: scale(1.3); opacity: 0; } }

  /* BOUTONS COMMERCES */
  .marker {
    position: absolute; background: rgba(0,0,0,0.85); border: 1px solid #f1c40f;
    padding: 5px 10px; border-radius: 15px; color: white; display: flex; 
    flex-direction: column; align-items: center; cursor: pointer; z-index: 10;
  }
  .m-icon { font-size: 1.2rem; }
  .m-price { font-size: 10px; color: #f1c40f; font-weight: bold; }

  /* TAB BAR (BAS DE L'ÉCRAN) */
  .tab-bar {
    height: 60px; background: #050505; display: flex; border-top: 1px solid #222;
  }
  .tab-bar button {
    flex: 1; background: none; border: none; color: #666; font-weight: bold; font-size: 0.7rem;
  }
  .tab-bar button.active { color: #f1c40f; }
  .tab-bar button.special { color: #e74c3c; }

  .status-bar {
    position: fixed; bottom: 65px; left: 10px; font-family: monospace;
    font-size: 10px; color: #2ecc71; pointer-events: none;
  }

  .menu-overlay { display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100%; padding: 20px; text-align: center; }
</style>
