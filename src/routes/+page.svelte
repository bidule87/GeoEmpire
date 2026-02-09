<script>
  import { onMount } from 'svelte';

  // --- SYSTÈME DE JEU INTÉGRAL ---
  let player = {
    cash: 50000,
    gToken: 10,
    holdingName: "GEO EMPIRE",
    day: 1,
    clients: 100, // Clients de base
    marketingLevel: 1,
    properties: [],
    history: []
  };

  let activeTab = 'Carte GPS';
  let map;

  // --- CATALOGUE DES ENTREPRISES ---
  const catalog = [
    { id: 1, name: "Commerce de Rue", cost: 15000, incomePerClient: 5, maintenance: 200, icon: '🏠' },
    { id: 2, name: "Centre Industriel", cost: 75000, incomePerClient: 20, maintenance: 1500, icon: '🏭' },
    { id: 3, name: "Empire Casino", cost: 300000, incomePerClient: 100, maintenance: 8000, icon: '🎰' }
  ];

  onMount(async () => {
    const L = await import('leaflet');
    import('leaflet/dist/leaflet.css');
    map = L.map('map', {zoomControl: false}).setView([45.8336, 1.2611], 13);
    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png').addTo(map);
  });

  // --- LOGIQUE FINANCIÈRE JOURNALIÈRE ---
  function nextDay() {
    player.day++;
    
    // Calcul du flux de clients : Base * Marketing
    let dailyClients = Math.floor(player.clients * (1 + (player.marketingLevel * 0.5)));
    
    // Calcul Revenus et Frais
    let rawIncome = 0;
    let totalCosts = 0;
    
    player.properties.forEach(p => {
        rawIncome += (dailyClients * p.incomePerClient);
        totalCosts += p.maintenance;
    });

    let dailyProfit = rawIncome - totalCosts;
    player.cash += dailyProfit;

    player.history = [`Jour ${player.day-1}: Profit de ${dailyProfit}$ (${dailyClients} clients)`, ...player.history].slice(0, 5);
    player = player; // Refresh
    alert(`📅 BILAN JOUR ${player.day-1} COMPLÉTÉ`);
  }

  function investMarketing() {
    let cost = player.marketingLevel * 10000;
    if (player.cash >= cost) {
        player.cash -= cost;
        player.marketingLevel++;
        player.clients += 50;
    }
  }

  function buyBusiness(biz) {
    if (player.cash >= biz.cost) {
        player.cash -= biz.cost;
        player.properties = [...player.properties, biz];
    } else {
        alert("Fonds insuffisants !");
    }
  }

  const menu = ['Carte GPS', 'Mes Entreprises', 'Marché', 'Marketing', 'Holdings', 'Braquages', 'Loterie'];
</script>

<main>
  <header class="hud">
    <div class="logo">👑 {player.holdingName}</div>
    <div class="stats">
      <div class="stat"><span class="lbl">CASH</span><span class="val gold">{player.cash.toLocaleString()}$</span></div>
      <div class="stat"><span class="lbl">CLIENTS</span><span class="val blue">{player.clients}</span></div>
      <div class="stat"><span class="lbl">FILIALES</span><span class="val pink">{player.properties.length}</span></div>
    </div>
    <button class="day-btn" on:click={nextDay}>TERMINER JOUR {player.day}</button>
  </header>

  <div class="wrapper">
    <nav class="sidebar">
      {#each menu as item}
        <button class="nav-btn" class:active={activeTab === item} on:click={() => activeTab = item}>
          {item}
        </button>
      {/each}
    </nav>

    <section class="screen">
      {#if activeTab === 'Carte GPS'}
        <div id="map"></div>
      
      {:else if activeTab === 'Marché'}
        <div class="content">
          <h2>🛒 Acquisition de Filiales</h2>
          <div class="grid">
            {#each catalog as item}
              <div class="card">
                <span class="icon">{item.icon}</span>
                <h3>{item.name}</h3>
                <p>Coût: <b class="gold">{item.cost}$</b></p>
                <p>Gain/Client: +{item.incomePerClient}$</p>
                <button on:click={() => buyBusiness(item)}>ACHETER</button>
              </div>
            {/each}
          </div>
        </div>

      {:else if activeTab === 'Marketing'}
        <div class="content">
            <h2>📢 Département Marketing</h2>
            <div class="card wide">
                <h3>Campagne de Publicité (Nv.{player.marketingLevel})</h3>
                <p>Augmente le flux de clients journaliers de 50% par niveau.</p>
                <button class="gold-btn" on:click={investMarketing}>Investir {player.marketingLevel * 10000}$</button>
            </div>
        </div>

      {:else if activeTab === 'Mes Entreprises'}
        <div class="content">
            <h2>🏢 Patrimoine Actuel</h2>
            <div class="grid">
                {#each player.properties as p}
                    <div class="card">
                        <span class="icon">{p.icon}</span>
                        <h4>{p.name}</h4>
                        <p>Maintenance: -{p.maintenance}$</p>
                    </div>
                {/each}
            </div>
        </div>
      {/if}
    </section>
  </div>
</main>

<style>
  :global(body) { margin: 0; background: #000; color: #fff; font-family: 'Inter', sans-serif; overflow: hidden; }
  
  .hud { height: 80px; background: #111; display: flex; align-items: center; justify-content: space-between; padding: 0 30px; border-bottom: 2px solid #f1c40f; }
  .logo { font-size: 1.8rem; font-weight: 900; color: #f1c40f; }
  .stats { display: flex; gap: 40px; }
  .stat { text-align: center; }
  .lbl { display: block; font-size: 0.7rem; color: #666; }
  .val { font-size: 1.2rem; font-weight: bold; }
  .gold { color: #f1c40f; } .blue { color: #3498db; } .pink { color: #e84393; }

  .day-btn { background: #f1c40f; color: #000; border: none; padding: 10px 20px; font-weight: bold; border-radius: 5px; cursor: pointer; }

  .wrapper { display: flex; height: calc(100vh - 82px); }
  .sidebar { width: 220px; background: #0a0a0a; border-right: 1px solid #222; padding: 15px; display: flex; flex-direction: column; gap: 8px; }
  
  .nav-btn { background: transparent; border: none; color: #888; padding: 15px; text-align: left; cursor: pointer; border-radius: 8px; font-size: 0.9rem; }
  .nav-btn:hover { background: #1a1a1a; color: #fff; }
  .nav-btn.active { background: #f1c40f; color: #000; font-weight: bold; }

  .screen { flex: 1; background: #050505; overflow-y: auto; }
  #map { height: 100%; width: 100%; }

  .content { padding: 40px; }
  .grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); gap: 20px; }
  .card { background: #111; padding: 25px; border-radius: 12px; border: 1px solid #222; text-align: center; }
  .card.wide { max-width: 500px; margin: 0 auto; }
  .icon { font-size: 3rem; display: block; margin-bottom: 10px; }
  
  button { margin-top: 15px; width: 100%; padding: 12px; border-radius: 6px; border: none; font-weight: bold; cursor: pointer; background: #3498db; color: white; }
  .gold-btn { background: #f1c40f; color: #000; }
</style>
