<script>
  import { onMount } from 'svelte';

  let geo = 50000;
  let tpCards = 3;
  let activeTab = 'GPS';
  let logs = ["Initialisation du logiciel GPS..."];

  onMount(() => {
    // On injecte le logiciel de carte directement dans le HTML
    const script = document.createElement('script');
    script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
    script.async = true;
    document.head.appendChild(script);

    const style = document.createElement('link');
    style.rel = 'stylesheet';
    style.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
    document.head.appendChild(style);

    script.onload = () => {
      // Une fois le logiciel chargé, on lance la carte
      const L = window.L;
      const map = L.map('map-container', { zoomControl: false }).setView([45.8336, 1.2611], 13);

      // Fond de carte "Dark Mode"
      L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png').addTo(map);

      // Ton rayon de 5km autour de Limoges
      L.circle([45.8336, 1.2611], {
        color: '#f1c40f',
        fillColor: '#f1c40f',
        fillOpacity: 0.15,
        radius: 5000 
      }).addTo(map);

      // Un petit point pour le joueur
      L.circleMarker([45.8336, 1.2611], { color: 'white', radius: 5 }).addTo(map);

      logs = ["GPS Connecté : Limoges, France", ...logs];
    };
  });

  function buyPack() {
    tpCards += 10;
    logs = ["Pack 10x 🎫 ajouté via Boutique.", ...logs];
  }
</script>

<main>
  <div class="background-city"></div>

  <header>
    <div class="logo">👑 GEO EMPIRE</div>
    <div class="stats">
      <div class="box"><span>GEO</span><b>{geo.toLocaleString()}</b></div>
      <div class="box"><span>CARTES TP</span><b style="color:#2ecc71">{tpCards}</b></div>
    </div>
    <button class="buy-btn"
