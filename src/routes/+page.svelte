<script>
  let player = {
    cash: 50000,
    gToken: 10,
    crowns: 928,
    day: 1,
    properties: []
  };

  let activeTab = 'Carte GPS';
  let logs = ["Système prêt. En attente d'ordres..."];

  function nextDay() {
    player.day++;
    let profit = player.properties.length * 2500;
    player.cash += profit;
    logs = [`Jour ${player.day-1} : +${profit}$ de revenus`, ...logs].slice(0, 3);
  }

  const menu = ['Carte GPS', 'Mes Entreprises', 'Marché', 'Marketing', 'Holdings', 'Braquages'];
</script>

<main style="background-image: url('https://images.unsplash.com/photo-1514924013411-cbf25faa35bb?auto=format&fit=crop&w=1920&q=80');">
  
  <header class="hud">
    <div class="logo">👑 GEO EMPIRE</div>
    <div class="stats">
      <div class="stat"><span class="lbl">CASH</span><span class="val gold">{player.cash.toLocaleString()}$</span></div>
      <div class="stat"><span class="lbl">CROWNS</span><span class="val pink">{player.crowns}</span></div>
      <div class="stat"><span class="lbl">JOUR</span><span class="val blue">{player.day}</span></div>
    </div>
    <button class="day-btn" on:click={nextDay}>FINIR LA JOURNÉE</button>
  </header>

  <div class="wrapper">
    <nav class="sidebar">
      <div class="nav-title">⚡ NAVIGATION</div>
      {#each menu as item}
        <button class="nav-btn" class:active={activeTab === item} on:click={() => activeTab = item}>
          {item}
        </button>
      {/each}
    </nav>

    <section class="screen">
      <div class="glass-container">
        {#if activeTab === 'Carte GPS'}
          <div class="gps-view">
            <h2>📍 SCANNER GPS ACTIF</h2>
            <div class="radar">
                <div class="beam"></div>
                <div class="center-dot"></div>
                {#each player.properties as _, i}
                    <div class="poi" style="top:{40 + i*10}%; left:{50 + i*5}%">🏢</div>
                {/each}
            </div>
            <p class="location-text">Localisation : Secteur Limoges / Côte d'Azur</p>
          </div>
        {:else if activeTab === 'Marché'}
          <div class="content">
            <h2>🛒 Marché Mondial</h2>
            <p>Sélectionnez un actif à acquérir...</p>
            <button class="buy-btn" on:click={() => player.properties = [...player.properties, {}]}>
                Acheter Filiale (15,000$)
            </button>
          </div>
        {:else}
          <div class="content">
            <h2>{activeTab}</h2>
            <p>Accès restreint - Chargement des données...</p>
          </div>
        {/if}
      </div>
    </section>
  </div>

  <div class="terminal">
    {#each logs as log}<p>> {log}</p>{/each}
  </div>
</main>

<style>
  :global(body) { margin: 0; background: #000; color: white; font-family: 'Segoe UI', sans-serif; overflow: hidden; }
  
  main { height: 100vh; background-size: cover; background-position: center; display: flex; flex-direction: column; }

  /* HUD SUPERIEUR */
  .hud { height: 80px; background: rgba(0, 0, 0, 0.9); display: flex; align-items: center; justify-content: space-between; padding: 0 30px; border-bottom: 2px solid #f1c40f; z-index: 10; }
  .logo { font-size: 1.5rem; font-weight: 900; color: #f1c40f; text-shadow: 0 0 10px rgba(241, 196, 15, 0.5); }
  .stats { display: flex; gap: 30px; }
  .lbl { display: block; font-size: 0.7rem; color: #aaa; text-transform: uppercase; }
  .val { font-size: 1.1rem; font-weight: bold; }
  .gold { color: #f1c40f; } .blue { color: #3498db; } .pink { color: #e84393; }
  .day-btn { background: #f1c40f; color: black; border: none; padding: 10px 20px; font-weight: bold; border-radius: 4px; cursor: pointer; }

  .wrapper { display: flex; flex: 1; overflow: hidden; }

  /* NAVIGATION LATERALE - NOIR OPAQUE */
  .sidebar { width: 240px; background: rgba(0, 0, 0, 0.85); border-right: 1px solid rgba(241, 196, 15, 0.3); padding: 20px; display: flex; flex-direction: column; gap: 10px; }
  .nav-title { color: #f1c40f; font-size: 0.8rem; font-weight: bold; margin-bottom: 15px; letter-spacing: 1px; }
  .nav-btn { background: rgba(255, 255, 255, 0.05); border: none; color: #ccc; padding: 15px; text-align: left; border-radius: 8px; cursor: pointer; transition: 0.3s; }
  .nav-btn:hover { background: rgba(241, 196, 15, 0.2); color: white; }
  .nav-btn.active { background: #f1c40f; color: black; font-weight: bold; }

  /* ZONE DE JEU */
  .screen { flex: 1; padding: 40px; display: flex; justify-content: center; align-items: flex-start; }
  .glass-container { background: rgba(0, 0, 0, 0.9); width: 100%; max-width: 900px; min-height: 500px; border-radius: 15px; border: 1px solid rgba(255, 255, 255, 0.1); padding: 30px; box-shadow: 0 20px 50px rgba(0,0,0,0.5); }

  /* VUE RADAR GPS */
  .gps-view { text-align: center; }
  .radar { width: 300px; height: 300px; border: 2px solid #f1c40f; border-radius: 50%; margin: 40px auto; position: relative; background: rgba(241, 196, 15, 0.05); overflow: hidden; }
  .beam { width: 50%; height: 2px; background: linear-gradient(to right, transparent, #f1c40f); position: absolute; top: 50%; left: 50%; transform-origin: left center; animation: spin 4s linear infinite; }
  @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
  .center-dot { width: 10px; height: 10px; background: #f1c40f; border-radius: 50%; position: absolute; top: 48%; left: 48%; box-shadow: 0 0 15px #f1c40f; }
  .poi { position: absolute; font-size: 1.5rem; filter: drop-shadow(0 0 5px gold); }
  .location-text { color: #f1c40f; font-family: monospace; margin-top: 20px; }

  .content { text-align: center; }
  .buy-btn { background: #3498db; color: white; border: none; padding: 15px 30px; border-radius: 8px; font-weight: bold; cursor: pointer; margin-top: 20px; }

  /* TERMINAL BAS DE PAGE */
  .terminal { height: 90px; background: rgba(0, 0, 0, 0.95); padding: 15px 30px; font-family: monospace; color: #2ecc71; border-top: 1px solid #333; }
</style>
