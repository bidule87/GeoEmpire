<script>
  import { onMount } from 'svelte';
  
  let geo = 50000;
  let tpCards = 3;
  let activeTab = 'GPS';
  let map;

  onMount(async () => {
    if (activeTab === 'GPS') {
      // Importation dynamique pour éviter les erreurs Vercel/SSR
      const L = await import('leaflet');
      import('leaflet/dist/leaflet.css');

      // Création de la carte centrée sur Limoges
      map = L.map('map').setView([45.8336, 1.2611], 13);

      // Design de la carte "Dark Mode" (CartoDB Dark Matter)
      L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
        attribution: '© Geo Empire'
      }).addTo(map);

      // Dessin du rayon de 5km
      L.circle([45.8336, 1.2611], {
        color: '#f1c40f',
        fillColor: '#f1c40f',
        fillOpacity: 0.1,
        radius: 5000 // 5km
      }).addTo(map);

      // Ajout d'une carte TP aléatoire sur la map
      L.marker([45.84, 1.27]).addTo(map).bindPopup("🎫 Carte TP détectée !");
    }
  });
</script>

<main>
  <div class="city-bg"></div>

  <header>
    <div class="logo">👑 GEO EMPIRE</div>
    <div class="stats">
      <div class="box"><span>GEO</span><b>{geo.toLocaleString()}</b></div>
      <div class="box"><span>TP</span><b class="green">{tpCards}</b></div>
    </div>
    <button class="buy-btn">PACK 10x 🎫 (4.99€)</button>
  </header>

  <div class="main-layout">
    <nav>
      <button class:atv={activeTab==='GPS'} on:click={()=>activeTab='GPS'}>📍 CARTE GPS</button>
      <button class:atv={activeTab==='Braquages'} on:click={()=>activeTab='Braquages'}>🏴‍☠️ BRAQUAGES</button>
    </nav>

    <section class="display-panel">
      {#if activeTab === 'GPS'}
        <div id="map"></div>
        <div class="map-overlay">
            <span>MODE SATELLITE ACTIF - RAYON 5KM</span>
        </div>
      {:else}
        <div class="empty">Module Braquage en attente...</div>
      {/if}
    </section>
  </div>
</main>

<style>
  :global(body) { margin: 0; background: #000; color: white; font-family: sans-serif; overflow: hidden; }
  .city-bg { position: fixed; inset: 0; background: url('https://images.unsplash.com/photo-1514924013411-cbf25faa35bb?q=80&w=1920') center/cover; z-index: -1; opacity: 0.4; }

  header { height: 70px; background: rgba(0,0,0,0.98); display: flex; align-items: center; justify-content: space-between; padding: 0 25px; border-bottom: 2px solid #f1c40f; }
  .box b { font-size: 1.2rem; color: #f1c40f; }
  .green { color: #2ecc71 !important; }
  .buy-btn { background: #e74c3c; color: white; border: none; padding: 8px 15px; border-radius: 4px; font-weight: bold; cursor: pointer; }

  .main-layout { display: flex; height: calc(100vh - 70px); }
  nav { width: 180px; background: rgba(0,0,0,0.95); border-right: 1px solid #222; padding: 10px; }
  nav button { width: 100%; background: none; border: none; color: #666; padding: 15px 10px; text-align: left; cursor: pointer; }
  nav button.atv { color: #f1c40f; border-left: 3px solid #f1c40f; font-weight: bold; }

  .display-panel { flex: 1; position: relative; background: #000; margin: 10px; border-radius: 10px; overflow: hidden; border: 1px solid #333; }
  
  /* LA CARTE PREND TOUTE LA PLACE */
  #map { width: 100%; height: 100%; z-index: 1; }

  .map-overlay {
    position: absolute; top: 10px; right: 10px; z-index: 10;
    background: rgba(0,0,0,0.8); padding: 5px 15px; border-radius: 20px;
    border: 1px solid #f1c40f; font-size: 0.7rem; color: #f1c40f; font-weight: bold;
  }
</style>
