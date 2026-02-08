<script>
  import { onMount } from 'svelte';

  let player = {
    cash: 250000,
    gToken: 0,
    crowns: 928,
    holdingName: "GEO EMPIRE",
    day: 1,
    clients: 1500,
    marketing: 1,
    properties: []
  };

  let activeTab = 'Carte GPS';
  let map;

  // Importation dynamique de Leaflet pour éviter les erreurs SSR
  onMount(async () => {
    const L = await import('leaflet');
    import('leaflet/dist/leaflet.css');

    map = L.map('map').setView([45.8336, 1.2611], 13); // Centré sur Limoges comme ta capture
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

    // Ajout d'un cercle de zone comme sur ton image
    L.circle([45.8336, 1.2611], {
      color: '#f1c40f',
      fillColor: '#f1c40f',
      fillOpacity: 0.1,
      radius: 2000
    }).addTo(map);
  });

  function processDay() {
    player.day++;
    let revenue = (player.clients * (player.properties.length + 1) * 2);
    player.cash += revenue;
    alert(`Bilan Jour ${player.day-1} : +${revenue} GEO`);
  }

  const menu = [
    'Carte GPS', 'Mes Entreprises', 'Holdings', 'Finances', 
    'Marché', 'Loterie', 'Braquages', 'Ma Ville', 'Classement'
  ];
</script>

<main>
  <header class="hud">
    <div class="logo">👑 GEO EMPIRE</div>
    <div class="stats-container">
      <div class="stat-box"><span class="label">JOUEUR</span><span class="val gold">BIDULE</span></div>
      <div class="stat-box"><span class="label">💰 GEO</span><span class="val gold">{Math.floor(player.cash / 1000)}K</span></div>
      <div class="stat-box"><span class="label">💎 G-TOKEN</span><span class="val blue">{player.gToken}</span></div>
      <div class="stat-box"><span class="label">👑 CROWNS</span><span class="val pink">{player.crowns}</span></div>
      <div class="stat-box"><span class="label">📊 PATRIMOINE</span><span class="val gold">261K GEO</span></div>
    </div>
    <button class="btn-exit">DÉCONNEXION</button>
  </header>

  <div class="game-body">
    <nav class="sidebar">
      <div class="nav-title">⚡ NAVIGATION</div>
      {#each menu as item}
        <button class="nav-item" class:active={activeTab === item} on:click={() => activeTab = item}>
          {item}
        </button>
      {/each}
    </nav>

    <section class="viewport">
      {#if activeTab === 'Carte GPS'}
        <div id="map"></div>
      {:else if activeTab === 'Holdings'}
        <div class="content-view">
          <h2>Gestion de la Holding</h2>
          <p>Jour actuel : {player.day}</p>
          <button class="action-btn" on:click={processDay}>Lancer la mise à jour journalière</button>
        </div>
      {:else}
        <div class="content-view">
          <h2>{activeTab}</h2>
          <p>Contenu en cours de déploiement...</p>
        </div>
      {/if}
    </section>
  </div>
</main>

<style>
  :global(body) { margin: 0; background: #000; color: white; font-family: 'Arial', sans-serif; overflow: hidden; }
  
  .hud { height: 70px; background: #1a1a1a; display: flex; align-items: center; justify-content: space-between; padding: 0 20px; border-bottom: 2px solid #333; }
  .logo { color: #f1c40f; font-weight: bold; font-size: 1.5rem; letter-spacing: 2px; }
  
  .stats-container { display: flex; gap: 15px; }
  .stat-box { background: #333; padding: 5px 15px; border-radius: 8px; border: 1px solid #444; min-width: 100px; text-align: center; }
  .label { display: block; font-size: 0.6rem; color: #888; margin-bottom: 2px; }
  .val { font-weight: bold; font-size: 0.9rem; }
  
  .gold { color: #f1c40f; } .blue { color: #3498db; } .pink { color: #e84393; }

  .game-body { display: flex; height: calc(100vh - 72px); }

  .sidebar { width: 250px; background: #000; border-right: 2px solid #f1c40f; padding: 10px; display: flex; flex-direction: column; gap: 5px; }
  .nav-title { color: #f1c40f; font-weight: bold; padding: 10px; font-size: 0.8rem; border-bottom: 1px solid #222; margin-bottom: 10px; }
  
  .nav-item { background: transparent; border: none; color: #ccc; padding: 12px; text-align: left; cursor: pointer; border-radius: 8px; transition: 0.3s; font-size: 0.9rem; }
  .nav-item:hover { background: #222; color: #f1c40f; }
  .nav-item.active { background: linear-gradient(90deg, #f1c40f, #d4af37); color: black; font-weight: bold; }

  .viewport { flex: 1; position: relative; background: #111; }
  #map { height: 100%; width: 100%; }

  .content-view { padding: 40px; text-align: center; }
  .action-btn { background: #f1c40f; color: black; border: none; padding: 15px 30px; font-weight: bold; border-radius: 5px; cursor: pointer; }

  .btn-exit { background: #f1c40f; color: black; border: none; padding: 8px 15px; border-radius: 5px; font-weight: bold; cursor: pointer; }
</style>
