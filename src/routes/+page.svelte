<script>
  // Initialisation selon ton script (GEO, G-TOKEN, CROWNS)
  let player = {
    geo: 50000,
    gToken: 10,
    crowns: 928,
    gpsRadius: 5, // Limite de 5km sans Premium
    properties: []
  };

  let activeTab = 'Braquages';
  let logs = ["Prêt pour l'infiltration. Choisissez une cible."];
  
  // Variables du mini-jeu de braquage (Cadenas)
  let heistMode = false;
  let currentTarget = null;
  let unlockedLocks = 0;
  let isEscaping = false;

  const targets = [
    { id: 1, name: "Commerce Local", locks: 3, reward: 5000, color: '#f1c40f' },
    { id: 2, name: "Filiale Bancaire", locks: 6, reward: 25000, color: '#e67e22' },
    { id: 3, name: "Siège de Holding", locks: 9, reward: 150000, color: '#e74c3c' }
  ];

  function startHeist(target) {
    currentTarget = target;
    unlockedLocks = 0;
    heistMode = true;
    isEscaping = false;
    logs = [`Infiltration de : ${target.name}. ${target.locks} cadenas à briser.`, ...logs];
  }

  function breakLock() {
    if (unlockedLocks < currentTarget.locks) {
      unlockedLocks++;
      if (unlockedLocks === currentTarget.locks) {
        player.geo += currentTarget.reward;
        logs = [`SUCCÈS ! +${currentTarget.reward.toLocaleString()} GEO dérobés !`, ...logs];
        isEscaping = true;
        setTimeout(() => { heistMode = false; }, 2000);
      }
    }
  }

  function failHeist() {
    let fine = Math.round(player.geo * 0.05);
    player.geo -= fine;
    logs = [`ALARME ! Tu fuis mais perds ${fine.toLocaleString()} GEO d'amende.`, ...logs];
    heistMode = false;
  }
</script>

<main style="background-image: url('https://images.unsplash.com/photo-1449824913935-59a10b8d2000?auto=format&fit=crop&w=1920&q=80');">
  
  <header class="hud">
    <div class="logo">👑 GEO EMPIRE</div>
    <div class="stats">
      <div class="stat"><span class="lbl">GEO</span><span class="val gold">{player.geo.toLocaleString()}</span></div>
      <div class="stat"><span class="lbl">G-TOKEN</span><span class="val blue">{player.gToken}</span></div>
      <div class="stat"><span class="lbl">CROWNS</span><span class="val pink">{player.crowns}</span></div>
    </div>
    <div class="gps-badge">Zone : {player.gpsRadius} KM</div>
  </header>

  <div class="wrapper">
    <nav class="sidebar">
      <button class:active={activeTab === 'Carte GPS'} on:click={() => activeTab = 'Carte GPS'}>📍 Carte GPS</button>
      <button class:active={activeTab === 'Braquages'} on:click={() => activeTab = 'Braquages'}>🏴‍☠️ Braquages</button>
      <button class:active={activeTab === 'Marché'} on:click={() => activeTab = 'Marché'}>🛒 Marché</button>
    </nav>

    <section class="screen">
      <div class="glass-panel">
        {#if activeTab === 'Braquages'}
          {#if !heistMode}
            <h2>CIBLES À PROXIMITÉ (5KM)</h2>
            <div class="target-list">
              {#each targets as t}
                <div class="target-card" style="border-left: 5px solid {t.color}">
                  <h3>{t.name}</h3>
                  <p>Sécurité : <b>{t.locks} Cadenas</b></p>
                  <p>Butin : <span class="gold">{t.reward.toLocaleString()} GEO</span></p>
                  <button class="heist-start-btn" on:click={() => startHeist(t)}>LANCER L'OPÉRATION</button>
                </div>
              {/each}
            </div>
          {:else}
            <div class="lock-screen">
              <h2 class="blink">OPÉRATION : {currentTarget.name}</h2>
              <div class="lock-grid">
                {#each Array(currentTarget.locks) as _, i}
                  <div class="lock-icon {i < unlockedLocks ? 'unlocked' : 'locked'}">
                    {i < unlockedLocks ? '🔓' : '🔒'}
                  </div>
                {/each}
              </div>
              
              {#if !isEscaping}
                <button class="break-btn" on:click={breakLock}>FORCER LE CADENAS N°{unlockedLocks + 1}</button>
                <button class="fail-btn" on:click={failHeist}>ANNULER (RISQUE D'AMENDE)</button>
              {:else}
                <div class="success-msg">COFFRE VIDÉ ! ÉVACUATION...</div>
              {/if}
            </div>
          {/if}
        {:else if activeTab === 'Carte GPS'}
          <div class="radar-container">
            <div class="radar-circle">
                <div class="sweep"></div>
                <div class="player-dot"></div>
            </div>
            <p>Scanning en cours dans un rayon de {player.gpsRadius}km...</p>
          </div>
        {:else}
          <div class="placeholder">Module {activeTab} en cours de connexion...</div>
        {/if}
      </div>
    </section>
  </div>

  <div class="terminal">
    {#each logs.slice(0, 3) as log}<p>> {log}</p>{/each}
  </div>
</main>

<style>
  :global(body) { margin:0; background:#000; color:white; font-family:'Segoe UI', sans-serif; overflow:hidden; }
  main { height:100vh; background-size:cover; background-position:center; display:flex; flex-direction:column; }
  
  .hud { height:80px; background:rgba(0,0,0,0.95); display:flex; align-items:center; justify-content:space-between; padding:0 30px; border-bottom:3px solid #f1c40f; z-index:10; }
  .stats { display:flex; gap:40px; }
  .lbl { display:block; font-size:0.7rem; color:#8
