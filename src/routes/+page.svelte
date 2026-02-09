<script>
  // Paramètres du script Geo Empire
  let player = {
    geo: 50000,
    gToken: 10,
    crowns: 928,
    gpsRadius: 5, // 5km de base (10km avec Premium)
    properties: []
  };

  let activeTab = 'Braquages';
  let logs = ["Système prêt. Radar GPS calibré sur 5km."];
  
  // Variables Mini-jeu Braquage
  let isHeisting = false;
  let target = null;
  let unlockedCount = 0;
  let success = false;

  const targets = [
    { name: "Commerce (Zone A)", locks: 3, reward: 2500, color: "#f1c40f" },
    { name: "Banque (Zone B)", locks: 6, reward: 12000, color: "#e67e22" },
    { name: "Holding (Zone C)", locks: 9, reward: 75000, color: "#e74c3c" }
  ];

  function selectTarget(t) {
    target = t;
    unlockedCount = 0;
    isHeisting = true;
    success = false;
    logs = [`Infiltration : ${t.name}. Crochetez les ${t.locks} cadenas !`, ...logs];
  }

  function pickLock() {
    if (unlockedCount < target.locks) {
      unlockedCount++;
      if (unlockedCount === target.locks) {
        success = true;
        player.geo += target.reward;
        logs = [`SUCCÈS ! +${target.reward} GEO récoltés.`, ...logs];
        setTimeout(() => { isHeisting = false; }, 2000);
      }
    }
  }

  function abort() {
    isHeisting = false;
    logs = ["Opération annulée par l'utilisateur.", ...logs];
  }
</script>

<main style="background-image: url('https://images.unsplash.com/photo-1514924013411-cbf25faa35bb?auto=format&fit=crop&w=1920&q=80');">
  
  <header class="hud">
    <div class="logo">👑 GEO EMPIRE</div>
    <div class="stats">
      <div class="stat"><span class="lbl">GEO</span><span class="val gold">{player.geo.toLocaleString()}</span></div>
      <div class="stat"><span class="lbl">G-TOKEN</span><span class="val blue">{player.gToken}</span></div>
      <div class="stat"><span class="lbl">CROWNS</span><span class="val pink">{player.crowns}</span></div>
    </div>
    <div class="radius-tag">{player.gpsRadius} KM</div>
  </header>

  <div class="wrapper">
    <nav class="sidebar">
      <button class:active={activeTab === 'Carte GPS'} on:click={() => activeTab = 'Carte GPS'}>📍 Carte GPS</button>
      <button class:active={activeTab === 'Braquages'} on:click={() => activeTab = 'Braquages'}>🏴‍☠️ Braquages</button>
      <button class:active={activeTab === 'Marché'} on:click={() => activeTab = 'Marché'}>🛒 Marché</button>
      <button class:active={activeTab === 'Holdings'} on:click={() => activeTab = 'Holdings'}>🏢 Holdings</button>
    </nav>

    <section class="content-area">
      <div class="dark-panel">
        {#if activeTab === 'Braquages'}
          {#if !isHeisting}
            <h2>CIBLES DISPONIBLES</h2>
            <div class="grid">
              {#each targets as t}
                <div class="card" style="border-top: 4px solid {t.color}">
                  <h3>{t.name}</h3>
                  <p>{t.locks} Cadenas à briser</p>
                  <p class="gold">{t.reward} GEO</p>
                  <button class="btn-start" on:click={() => selectTarget(t)}>INFILTRER</button>
                </div>
              {/each}
            </div>
          {:else}
            <div class="lock-game">
              <h2 class={success ? "text-success" : "text-danger"}>
                {success ? "COFFRE OUVERT !" : "CROCHETAGE EN COURS..."}
              </h2>
              
              <div class
