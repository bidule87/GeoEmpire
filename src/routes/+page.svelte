<script>
  import { onMount } from 'svelte';

  let geo = 50000;
  let tpCards = 13;
  let activeTab = 'GPS';
  let logs = ["Système mobile optimisé."];
  let userPos = { lat: 45.8336, lon: 1.2611 };

  let shops = [
    { id: 1, name: "Boulangerie", price: 15000, lat: 45.835, lon: 1.262, type: "🥖", top: "40%", left: "40%" },
    { id: 2, name: "Bar Tabac", price: 25000, lat: 45.836, lon: 1.258, type: "🍺", top: "30%", left: "60%" },
    { id: 3, name: "Epicerie", price: 45000, lat: 45.831, lon: 1.265, type: "🛒", top: "65%", left: "50%" }
  ];

  onMount(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        userPos.lat = position.coords.latitude;
        userPos.lon = position.coords.longitude;
        logs = ["Localisation GPS réussie.", ...logs];
      });
    }
  });

  function buyShop(shop) {
    if (geo >= shop.price) {
      geo -= shop.price;
      logs = [`Acheté: ${shop.name}`, ...logs];
      shops = shops.filter(s => s.id !== shop.id);
    }
  }
</script>

<main>
  <header>
    <div class="logo">👑 GEO EMPIRE</div>
    <div class="stats">
        <span>{geo.toLocaleString()} 🟡</span>
        <span>{tpCards} 🎫</span>
    </div>
  </header>

  <div class="content">
    {#if activeTab === 'GPS'}
      <div class="map-container">
        <iframe 
          title="Map"
          src="https://www.openstreetmap.org/export/embed.html?bbox={userPos.lon-0.01},{userPos.lat-0.005},{userPos.lon+0.01},{userPos.lat+0.005}&layer=mapnik"
          style="filter: invert(90%) hue-rotate(180deg) brightness(0.7);">
        </iframe>
        
        <div class="radar-center">
            <div class="ring"></div>
            <div class="pulse"></div>
        </div>

        {#each shops as shop}
          <button class="marker" style="top:{shop.top}; left:{shop.left}" on:click={() => buyShop(shop)}>
            {shop.type} <small>{shop.price}</small>
          </button>
        {each}
      </div>
    {:else}
      <div class="menu-screen">
        <h2>BRAQUAGES</h2>
        <p>Cibles en cours de détection...</p>
      </div>
    {/if}
  </div>

  <nav class="bottom-nav">
    <button class:atv={activeTab==='GPS'} on:click={()=>activeTab='GPS'}>📍 CARTE</button>
    <button class:atv={activeTab==='HEIST'} on:click={()=>activeTab='HEIST'}>🏴‍☠️ JOUEURS</button>
    <button on:click={() => tpCards++}>🎫 PACK</button>
  </nav>

  <div class="mini-log">> {logs[0]}</div>
</main>

<style>
  :global(body) { margin:0; background:#000; color:white; font-family: sans-serif; overflow:hidden; }
  
  header { 
    height: 50px; background: #111; display: flex; align-items: center; 
    justify-content: space-between; padding: 0 15px; border-bottom: 2px solid #f1c40f;
    font-size: 0.8rem;
  }

  .stats { font-weight: bold; color: #f1c40f; display: flex; gap: 10px; }

  .content { height: calc(100vh - 110px); width: 100vw; position: relative; }

  .map-container { width: 100%; height: 100%; position: relative; overflow: hidden; }
  iframe { width: 100%; height: 100%; border: none; }

  /* RADAR MOBILE */
  .radar-center {
    position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);
    width: 280px; height: 280px; pointer-events: none;
  }
  .ring { position: absolute; inset: 0; border: 2px solid #f1c40f; border-radius: 50%; box-shadow: 0 0 15px #f1c40f; }
  .pulse { position: absolute; inset: 0; border: 1px solid #f1c40f; border-radius: 50%; animation: p 2s infinite; }
  @keyframes p { 0% { transform: scale(1); opacity: 1; } 100% { transform: scale(1.3); opacity: 0; } }

  /* MARKERS */
  .marker {
    position: absolute; background: rgba(0,0,0,0.8); border: 1px solid #f1c40f;
    padding: 4px 8px; border-radius: 20px; color: white; font-size: 12px;
    cursor: pointer; z-index: 10;
  }

  /* NAVIGATION BASSE (STYLE MOBILE) */
  .bottom-nav {
    height: 60px; background: #0a0a0a; display: flex; border-top: 1px solid #333;
  }
  .bottom-nav button {
    flex: 1; background: none; border: none; color: #555; font-weight: bold; font-size: 0.7rem;
  }
  .bottom-nav button.atv { color: #f1c40f; background: rgba(241,196,15,0.1); }

  .mini-log {
    position: fixed; bottom: 70px; left: 10px; right: 10px; 
    background: rgba(0,0,0,0.7); font-family: monospace; font-size: 10px; color: #2ecc71;
    pointer-events: none;
  }

  .menu-screen { padding: 40px; text-align: center; color: #444; }
</style>
