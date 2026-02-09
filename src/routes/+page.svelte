<script>
  import { onMount } from 'svelte';

  let geo = 50000;
  let tpCards = 3;
  let activeTab = 'GPS';
  let logs = ["Logiciel GPS initialisé..."];

  let map;
  let L;

  onMount(async () => {
    // On attend que la page soit prête pour charger le logiciel de carte
    if (typeof window !== 'undefined') {
      const leaflet = await import('leaflet');
      L = leaflet.default;
      
      // Chargement du style visuel de la carte
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
      document.head.appendChild(link);

      initMap();
    }
  });

  function initMap() {
    // Centre la carte sur Limoges (par défaut)
    map = L.map('map', { zoomControl: false }).setView([45.8336, 1.2611], 13);

    // Style de carte "Hacker/Empire" ultra sombre
    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
      attribution: 'Geo Empire'
    }).addTo(map);

    // Ton rayon d'achat de 5km (fictif/réel selon ton script)
    L.circle([45.8336, 1.2611], {
      color: '#f1c40f',
      fillColor: '#f1c40f',
      fillOpacity: 0.1,
      radius: 5000 // 5000 mètres = 5km
    }).addTo(map);

    // Ajout d'une carte TP à ramasser (exemple)
    const tpIcon = L.divIcon({ html: '🎫', className: 'tp-icon', iconSize: [30, 30] });
    L.marker([45.845, 1.27], { icon: tpIcon }).addTo(map).on('click', () => {
      tpCards++;
      logs = ["Carte TP ramassée sur le GPS !", ...logs];
    });
  }
</script>

<main>
  <div class="city-background"></div>

  <header>
    <div class="logo">👑 GEO EMPIRE</div>
    <div class="stats">
      <div class="stat-item"><span>GEO</span><b>{geo.toLocaleString()}</b></div>
      <div class="stat-item"><span>TP</span><b class="green">{tpCards}</b></div>
    </div>
    <button class="premium-btn">PACK 10x 🎫 (4.99€)</button>
  </header>

  <div class="app-body">
    <nav>
      <button class:atv={activeTab==='GPS'} on:click={()=>activeTab='GPS'}>📍 CARTE GPS</button>
      <button class:atv={activeTab==='Braquages'} on:click={()=>activeTab='Braquages'}>🏴‍☠️ BRAQUAGES</button>
    </nav>

    <section class="map-container">
      {#if activeTab === 'GPS'}
        <div id="map"></div>
        <div class="overlay-info">SCANNER ACTIF : RAYON 5KM</div>
      {:else}
        <div class="fallback">BRAQUAGES : EN ATTENTE DE CIBLE...</div>
      {/if}
    </section>
  </div>

  <footer>
    {#each logs.slice(0, 1) as log}<p>> {log}</p
