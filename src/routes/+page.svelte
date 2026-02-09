<script>
  import { onMount } from 'svelte';

  let geo = 50000;
  let tpCards = 13;
  let marketingLevel = 1;
  let activeTab = 'CARTE'; // CARTE, POSSESSIONS, MARKETING
  let logs = ["Beta-test : Système synchronisé sur minuit."];
  let userPos = { lat: 45.8336, lon: 1.2611 };

  // Base de données locale des commerces
  let properties = [
    { id: 1, name: "Boulangerie République", price: 15000, baseRent: 500, owned: false, type: "🥖", top: "35%", left: "40%" },
    { id: 2, name: "Tabac de la Gare", price: 25000, baseRent: 1200, owned: false, type: "🍺", top: "25%", left: "65%" },
    { id: 3, name: "Immobilier Centre", price: 85000, baseRent: 4500, owned: false, type: "🏢", top: "55%", left: "50%" }
  ];

  onMount(() => {
    // GPS HAUTE PRÉCISION
    if ("geolocation" in navigator) {
      navigator.geolocation.watchPosition((position) => {
        userPos.lat = position.coords.latitude;
        userPos.lon = position.coords.longitude;
      }, null, { enableHighAccuracy: true });
    }

    // CYCLE DE MINUIT (Vérification toutes les minutes pour plus de stabilité)
    const midnightInterval = setInterval(() => {
      const now = new Date();
      if (now.getHours() === 0 && now.getMinutes() === 0) {
        processDailyEarnings();
      }
    }, 60000);

    return () => clearInterval(midnightInterval);
  });

  function processDailyEarnings() {
    let total = properties.filter(p => p.owned).reduce((s, p) => s + (p.baseRent * marketingLevel), 0);
    if (total > 0) {
      geo += total;
      logs = [`[MINUIT] Revenus collectés : +${total} G`, ...logs];
    }
  }

  function buyProperty(prop) {
    if (!prop.owned && geo >= prop.price) {
      geo -= prop.price;
      prop.owned = true;
      properties = properties; // Trigger update
      logs = [`Acquis : ${prop.name}. Prochain loyer à minuit.`, ...logs];
    } else if (prop.owned) {
      logs = ["Vous possédez déjà ce bien.", ...logs];
    } else {
      logs = ["GEO insuffisants.", ...logs];
    }
  }
</script>

<main>
  <header>
    <div class="logo">👑 GEO EMPIRE</div>
    <div class="main-stats">
        <span>🟡 {geo.toLocaleString()}</span>
        <span>🎫 {tpCards}</span>
    </div>
  </header>

  <nav class="top-nav">
    <button class:atv={activeTab==='CARTE'} on:click={()=>activeTab='CARTE'}>📍 CARTE</button>
    <button class:atv={activeTab==='BIENS'} on:click={()=>activeTab='BIENS'}>🏢 BIENS</button>
    <button class:atv={activeTab==='MKT'} on:click={()=>activeTab='MKT'}>📈 MKT</button>
  </nav>

  <section class="content">
    {#if activeTab === 'CARTE'}
      <div class="map-view">
        <iframe 
          title="GPS"
          src="https://www.openstreetmap.org/export/embed.html?bbox={userPos.lon-0.003},{userPos.lat-0.002},{userPos.lon+0.003},{userPos.lat+0.002}&layer=mapnik&marker={userPos.lat},{userPos.lon}"
          style="filter: invert(90%) hue-rotate(180deg) brightness(0.65) contrast(1.2);">
        </iframe>
        
        <div class="radar-circle"></div>

        {#each properties as p}
          <button class="map-marker {p.owned ? 'owned' : ''}" 
                  style="top:{p.top}; left:{p.left}" 
                  on:click={() => buyProperty(p)}>
            {p.type} <br> <span class="price-tag">{p.owned ? 'OK' : p.price}</span>
          </button>
        {/each}
      </div>

    {:else if activeTab === 'BIENS'}
      <div class="list-view">
          <h3>MES POSSESSIONS</h3>
          {#each properties.filter(p => p.owned) as p}
            <div class="card">
                <span class="card-icon">{p.type}</span>
                <div class="card-info">
                    <b>{p.name}</b><br>
                    <small>Loyer journalier : {p.baseRent * marketingLevel} G</small>
                </div>
                <div class="status">EN GESTION</div>
            </div>
          {:else}
            <p class="empty-msg">Aucun bien acquis dans ce secteur.</p>
          {/each}
      </div>

    {:else if activeTab === 'MKT'}
      <div class="list-view">
          <h3>MARKETING & INFLUENCE</h3>
          <div class="mkt-box">
              <p>Niveau actuel : <b>{marketingLevel}</b></p>
              <p>Multiplicateur de gains : <b>x{marketingLevel}</b></p>
              <button class="buy-btn" on:click={() => { if(geo>=10000){ geo-=10000; marketingLevel++; logs=["Marketing amélioré !", ...logs]; } }}>
                  AMÉLIORER (10 000 G)
              </button>
          </div>
          <p class="info-text">Le marketing augmente les revenus immobiliers lors de la mise à jour de minuit.</p>
      </div>
    {/if}
  </section>

  <div class="terminal">> {logs[0]}</div>
</main>

<style>
  :global(body) { margin:0; background:#000; color:white; font-family: 'Segoe UI', sans-serif; overflow:hidden; }
  
  header { height: 50px; background: #000; display: flex; align-items: center; justify-content: space-between; padding: 0 15px; border-bottom: 1px solid #333; }
  .logo { font-weight: 900; color: #f1c40f; font-size: 0.9rem; }
  .main-stats { font-weight: bold; font-size: 0.8rem; display: flex; gap: 10px; }

  /* NAVIGATION EN HAUT */
  .top-nav { height: 50px; background: #0a0a0a; display: flex; border-bottom: 2px solid #f1c40f; }
  .top-nav button { flex: 1; background: none; border: none; color: #666; font-weight: bold; font-size: 0.75rem; letter-spacing: 1px; }
  .top-nav button.atv { color: #f1c40f; background: rgba(241,196,15,0.05); }

  .content { height: calc(100vh - 100px); position: relative; overflow-y: auto; }
  .map-view { width: 100%; height: 100%; position: relative; }
  iframe { width: 100%; height: 100%; border: none; }

  .radar-circle { position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); width: 280px; height: 280px; border: 2px solid #f1c40f; border-radius: 50%; pointer-events: none; opacity: 0.4; }

  .map-marker { position: absolute; background: rgba(0,0,0,0.9); border: 1px solid #f1c40f; padding: 5px; border-radius: 8px; color: white; cursor: pointer; min-width: 50px; font-size: 1.2rem; }
  .map-marker.owned { border-color: #2ecc71; color: #2ecc71; }
  .price-tag { font-size: 8px; font-weight: bold; display: block; }

  .list-view { padding: 20px; }
  .card { background: #111; border: 1px solid #333; padding: 15px; border-radius: 8px; display: flex; align-items: center; margin-bottom: 10px; gap: 15px; }
  .card-icon { font-size: 1.5rem; }
  .card-info { flex: 1; font-size: 0.8rem; }
  .status { font-size: 10px; color: #2ecc71; font-weight: bold; }

  .mkt-box { background: #111; padding: 20px; border-radius: 8px; text-align: center; border: 1px solid #f1c40f; }
  .buy-btn { background: #f1c40f; border: none; padding: 10px 20px; border-radius: 4px; font-weight: bold; margin-top: 10px; }

  .terminal { position: fixed; bottom: 10px; left: 15px; font-family: monospace; font-size: 11px; color: #2ecc71; pointer-events: none; }
  .empty-msg { color: #444; text-align: center; margin-top: 40px; }
</style>
