<script>
  import { onMount } from 'svelte';

  let geo = 50000;
  let tpCards = 13;
  let activeTab = 'CARTE GPS';
  let logs = ["Système GPS : Recherche de position..."];
  let userPos = { lat: 45.8336, lon: 1.2611 }; // Limoges par défaut

  // Liste des commerces à proximité
  let shops = [
    { id: 1, name: "Boulangerie Centrale", price: 15000, lat: 45.835, lon: 1.262, type: "🥖" },
    { id: 2, name: "Bar de la Gare", price: 25000, lat: 45.836, lon: 1.258, type: "🍺" },
    { id: 3, name: "Supérette Express", price: 45000, lat: 45.831, lon: 1.265, type: "🛒" }
  ];

  onMount(() => {
    // FONCTION POUR GÉOLOCALISER LE JOUEUR
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        userPos.lat = position.coords.latitude;
        userPos.lon = position.coords.longitude;
        logs = ["Position GPS verrouillée.", ...logs];
      }, (err) => {
        logs = ["Erreur GPS : Utilisation position par défaut (Limoges).", ...logs];
      });
    }
  });

  function buyShop(shop) {
    if (geo >= shop.price) {
      geo -= shop.price;
      logs = [`Achat réussi : ${shop.name} !`, ...logs];
      shops = shops.filter(s => s.id !== shop.id); // On le retire de la map après achat
    } else {
      logs = ["Fonds insuffisants pour cet empire !", ...logs];
    }
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
    <button class="buy-btn">PACK 10x 🎫 (4.99€)</button>
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
            width="100%" height="100%" frameborder="0" 
            src="https://www.openstreetmap.org/export/embed.html?bbox={userPos.lon-0.02},{userPos.lat-0.01},{userPos.lon+0.02},{userPos.lat+0.01}&layer=mapnik"
            style="filter: invert(90%) hue-rotate(180deg) brightness(0.6) contrast(1.2);">
          </iframe>
          
          <div class="fix-radar">
             <div class="main-ring"></div>
             <div class="pulse-ring"></div>
          </div>

          <div class="shop-layer">
            {#each shops as shop}
                <button class="shop-marker" on:click={() => buyShop(shop)}>
                    <span class="icon">{shop.type}</span>
                    <div class="info">{shop.name}<br><b>{shop.price} G</b></div>
                </button>
            {/each}
          </div>
          
          <div class="status-tag">GPS: {userPos.lat.toFixed(3)}, {userPos.lon.toFixed(3)}</div>
        </div>
      {:else}
        <div class="empty-state">
          <h2>MODULE BRAQUAGE</h2>
          <p>Recherche de commerces vulnérables dans votre zone...</p>
        </div>
      {/if}
    </section>
  </div>

  <footer>
    {#each logs.slice(0, 1) as log}<p>> {log}</p>{/each}
  </footer>
</main>

<style>
  :global(body) { margin:0; background:#000; color:white; font-family: sans-serif; overflow:hidden; }
  .city-bg { position:fixed; inset:0; background:url('https://images.unsplash.com/photo-1514924013411-cbf25faa35bb?q=80&w=1920') center/cover; z-index:-1; opacity:0.15; }
  header { height:70px; background:rgba(0,0,0,0.95); display:flex; align-items:center; justify-content:space-between; padding:0 25px; border-bottom:2px solid #f1c40f; }
  .box b { color:#f1c40f; font-size:1.1rem; }
  .gold { color:#f1c40f !important; }
  .buy-btn { background:#e74c3c; color:white; border:none; padding:8px 15px; border-radius:4px; font-weight:bold; cursor:pointer; }

  .main-container { display:flex; height:calc(100vh - 120px); }
  nav { width:180px; background:rgba(10,10,10,0.98); border-right:1px solid #222; }
  nav button { width:100%; background:none; border:none; color:#555; padding:20px; text-align:left; cursor:pointer; font-weight:bold; }
  nav button.atv { color:#f1c40f; border-left:4px solid #f1c40f; background:rgba(241,196,15,0.05); }

  .game-panel { flex:1; margin:15px; background:#000; border:1px solid #333; border-radius:12px; overflow:hidden; position:relative; }
  .map-box { width:100%; height:100%; position:relative; }

  /* RADAR */
  .fix-radar { position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); width: 340px; height: 34
