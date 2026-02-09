<script>
  import { onMount } from 'svelte';

  let geo = 50000;
  let tpCards = 13;
  let marketingLevel = 1;
  let activeTab = 'MAP'; // MAP, BIENS, SÉCU, BRAQUER
  let logs = ["Système prêt. Mise à jour des revenus à minuit."];
  let userPos = { lat: 45.8336, lon: 1.2611 };

  // Assurances : 'AUCUNE', 'STANDARD' (50%), 'PREMIUM' (80%), 'PRESTIGE' (100%)
  let insurance = 'AUCUNE';

  let properties = [
    { id: 1, name: "Boulangerie République", price: 15000, baseRent: 500, owned: false, type: "🥖", top: "35%", left: "40%" },
    { id: 2, name: "Tabac de la Gare", price: 25000, baseRent: 1200, owned: false, type: "🍺", top: "25%", left: "65%" },
    { id: 3, name: "Immobilier Centre", price: 85000, baseRent: 4500, owned: false, type: "🏢", top: "55%", left: "50%" }
  ];

  let targets = [
    { name: "Dark_Vador87", level: 4, loot: "3k - 5k", security: "Faible" },
    { name: "Investor_Pro", level: 15, loot: "12k - 20k", security: "Optimale" }
  ];

  onMount(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.watchPosition((p) => {
        userPos.lat = p.coords.latitude;
        userPos.lon = p.coords.longitude;
      }, null, { enableHighAccuracy: true });
    }

    // CYCLE DE MINUIT : TRANSACTION RÉELLE
    const midnight = setInterval(() => {
      const now = new Date();
      if (now.getHours() === 0 && now.getMinutes() === 0) {
        let dailyIncome = properties.filter(p => p.owned).reduce((s, p) => s + (p.baseRent * marketingLevel), 0);
        
        // Sim braquage subi
        if (Math.random() < 0.15) { // 15% de chance d'être braqué cette nuit
            let loss = Math.floor(dailyIncome * 0.4);
            if (insurance === 'PRESTIGE') {
                logs = ["🛡️ Braquage subi : Remboursé à 100% par Pack Prestige.", ...logs];
            } else {
                if (insurance === 'STANDARD') loss *= 0.5;
                if (insurance === 'PREMIUM') loss *= 0.2;
                dailyIncome -= loss;
                logs = [`⚠️ Braquage ! Perte de ${loss} G (Assurance: ${insurance})`, ...logs];
            }
        }
        geo += dailyIncome;
      }
    }, 60000);
    return () => clearInterval(midnight);
  });

  function launchHeist(t) {
    if (tpCards >= 1) {
        tpCards--;
        let success = Math.random() > 0.5;
        if (success) {
            let win = 2500 + Math.floor(Math.random() * 2000);
            geo += win;
            logs = [`🏴‍☠️ Succès ! +${win} G volés à ${t.name}`, ...logs];
        } else {
            logs = [`🚫 Échec du braquage sur ${t.name}.`, ...logs];
        }
    }
  }
</script>

<main>
  <header>
    <div class="logo">👑 GEO EMPIRE</div>
    <div class="stats">
        <span>🟡 {geo.toLocaleString()}</span>
        <span>🎫 {tpCards}</span>
    </div>
  </header>

  <nav class="top-nav">
    <button class:atv={activeTab==='MAP'} on:click={()=>activeTab='MAP'}>📍 MAP</button>
    <button class:atv={activeTab==='BIENS'} on:click={()=>activeTab='BIENS'}>🏢 BIENS</button>
    <button class:atv={activeTab==='SEC'} on:click={()=>activeTab='SEC'}>🛡️ SÉCU</button>
    <button class:atv={activeTab==='HEIST'} on:click={()=>activeTab='HEIST'}>🏴‍☠️ RAID</button>
  </nav>

  <div class="container">
    {#if activeTab === 'MAP'}
      <div class="map-box">
        <iframe title="GPS" src="https://www.openstreetmap.org/export/embed.html?bbox={userPos.lon-0.003},{userPos.lat-0.002},{userPos.lon+0.003},{userPos.lat+0.002}&layer=mapnik&marker={userPos.lat},{userPos.lon}"></iframe>
        {#each properties as p}
          <button class="mkr {p.owned ? 'own' : ''}" style="top:{p.top}; left:{p.left}" on:click={() => { if(!p.owned && geo>=p.price) { p.owned=true; geo-=p.price; properties=properties; }}}>
            {p.type} <br> <small>{p.owned ? 'OK' : p.price}</small>
          </button>
        {/each}
      </div>

    {:else if activeTab === 'BIENS'}
      <div class="list">
          <h3>MES PROPRIÉTÉS</h3>
          {#each properties.filter(p => p.owned) as p}
            <div class="item"><b>{p.type} {p.name}</b> <br> <small>Revenu estimé à minuit : {p.baseRent * marketingLevel} G</small></div>
          {/each}
      </div>

    {:else if activeTab === 'SEC'}
      <div class="list">
          <h3>ASSURANCES (Protection Minuit)</h3>
          <p>Actuelle : <b style="color:#f1c40f">{insurance}</b></p>
          <div class="card">🛡️ Standard (50%) - 5 000 G <button on:click={()=> {if(geo>=5000){geo-=5000; insurance='STANDARD';}}}>CONTRAT</button></div>
          <div class="card premium">💎 Prestige (100%) - 20 🎫 <button on:click={()=> {if(tpCards>=20){tpCards-=20; insurance='PRESTIGE';}}}>ACTIVER</button></div>
      </div>

    {:else if activeTab === 'HEIST'}
      <div class="list">
          <h3>JOUEURS À PROXIMITÉ</h3>
          {#each targets as t}
            <div class="card heist">
                <b>{t.name}</b> <small>Sécu: {t.security}</small>
                <button on:click={()=>launchHeist(t)}>BRAQUER (1 🎫)</button>
            </div>
          {/each}
      </div>
    {/if}
  </div>

  <div class="log">> {logs[0]}</div>
</main>

<style>
  :global(body) { margin:0; background:#000; color:white; font-family: sans-serif; overflow:hidden; }
  header { height: 50px; background: #000; display: flex; align-items: center; justify-content: space-between; padding: 0 15px; border-bottom: 1px solid #333; }
  .logo { font-weight: 900; color: #f1c40f; }
  .stats { display: flex; gap: 10px; font-weight: bold; font-size: 0.8rem; }

  .top-nav { display: flex; background: #0a0a0a; border-bottom: 2px solid #f1c40f; }
  .top-nav button { flex: 1; padding: 12px 5px; background: none; border: none; color: #555; font-weight: bold; font-size: 0.65rem; }
  .top-nav button.atv { color: #f1c40f; background: rgba(241,196,15,0.1); }

  .container { height: calc(100vh - 100px); overflow-y: auto; }
  .map-box { width: 100%; height: 100%; position: relative; }
  iframe { width: 100%; height: 100%; border: none; filter: invert(90%) hue-rotate(180deg); }

  .mkr { position: absolute; background: rgba(0,0,0,0.9); border: 1px solid #f1c40f; padding: 5px; border-radius: 8px; color: white; }
  .mkr.own { border-color: #2ecc71; }

  .list { padding: 15px; }
  .card { background: #111; padding: 12px; border-radius: 8px; margin-bottom: 10px; border: 1px solid #333; }
  .premium { border-color: #f1c40f; }
  .heist { border-left: 4px solid #e74c3c; }
  
  button { background: #f1c40f; border: none; padding: 8px; border-radius: 4px; font-weight: bold; width: 100%; margin-top: 5px; }
  .log { position: fixed; bottom: 10px; left: 15px; font-size: 10px; color: #2ecc71; pointer-events: none; }
</style>
