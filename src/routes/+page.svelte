<script>
  import { onMount } from 'svelte';

  let geo = 39259;
  let tpCards = 10;
  let activeTab = 'MAP';
  let logs = ["Prêt pour l'infiltration. Analyse des verrous en cours..."];

  // Données de la société
  let target = {
    name: "BANQUE CENTRALE Z-01",
    loot: 42500,
    img: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1000"
  };

  // Système de cadenas (Hasard interne)
  let locks = [
    { id: 1, solved: false },
    { id: 2, solved: false },
    { id: 3, solved: false }
  ];
  
  let heistStarted = false;

  function startInfiltration() {
    if (tpCards >= 1 && !heistStarted) {
      tpCards -= 1;
      heistStarted = true;
      locks = locks.map(l => ({ ...l, solved: false }));
      logs = ["🔓 Infiltration réussie. Trouvez le point de rupture des cadenas...", ...logs];
    }
  }

  function tryLock(index) {
    if (!heistStarted || locks[index].solved) return;

    // Hasard : 1 chance sur 4 de réussir à chaque clic
    let success = Math.random() > 0.75;
    
    if (success) { 
      locks[index].solved = true;
      logs = [`✅ CADENAS 0${index + 1} DÉVERROUILLÉ !`, ...logs];
      locks = [...locks]; // Force la mise à jour visuelle
    } else {
      logs = [`❌ Échec sur le cadenas 0${index + 1}... Réessayez.`, ...logs];
    }

    if (locks.every(l => l.solved)) {
      finishHeist();
    }
  }

  function finishHeist() {
    heistStarted = false;
    geo += target.loot;
    logs = [`💰 BRAQUAGE TERMINÉ ! +${target.loot.toLocaleString()} G récoltés.`, ...logs];
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
    <button class:atv={activeTab==='MAP'} on:click={()=>activeTab='MAP'}>📍 RADAR</button>
    <button class:atv={activeTab==='RAID'} on:click={()=>activeTab='RAID'}>🏴‍☠️ BRAQUER</button>
  </nav>

  <div class="content">
    {#if activeTab === 'MAP'}
      <div class="map-view">
         <p>CHARGEMENT DU RADAR...</p>
         <div class="radar-pulse"></div>
      </div>
    {:else if activeTab === 'RAID'}
      <div class="raid-view">
        <div class="target-banner">
          <img src={target.img} alt="Bank" />
          <div class="overlay">
            <h2>{target.name}</h2>
            <div class="loot-display">BUTIN : {target.loot.toLocaleString()} G</div>
          </div>
        </div>

        <div class="lock-grid">
          <p class="hint">CLIQUEZ SUR LES CADENAS POUR FORCER LE MÉCANISME</p>
          <div class="grid-wrapper">
            {#each locks as lock, i}
              <button class="lock-card" class:solved={lock.solved} on:click={() => tryLock(i)}>
                <div class="lock-icon">{lock.solved ? '🔓' : '🔒'}</div>
                <div class="lock-name">VERROU 0{i+1}</div>
                <div class="lock-status">{lock.solved ? 'OUVERT' : 'FERMÉ'}</div>
              </button>
            {/each}
          </div>
        </div>

        <div class="action-footer">
          {#if !heistStarted}
            <button class="btn-start" on:click={startInfiltration}>LANCER LE RAID (1 🎫)</button>
          {:else}
            <div class="status-active">HACKING EN COURS...</div>
          {/if}
        </div>
      </div>
    {/if}
  </div>

  <div class="terminal">> {logs[0]}</div>
</main>

<style>
  :global(body) { margin:0; background:#000; color:white; font-family: sans-serif; overflow:hidden; }
  header { height: 50px; display: flex; align-items: center; justify-content: space-between; padding: 0 15px; border-bottom: 1px solid #222; }
  .logo { font-weight: 900; color: #f1c40f; }
  
  .top-nav { display: flex; background: #080808; border-bottom: 2px solid #f1c40f; }
  .top-nav button { flex: 1; padding: 15px; background: none; border: none; color: #444; font-weight: bold; font-size: 0.7rem; }
  .top-nav button.atv { color: #f1c40f; background: rgba(241,196,15,0.05); }

  .content { height: calc(100vh - 100px); overflow-y: auto; }
  
  .target-banner { position: relative; height: 180px; border-bottom: 3px solid #e74c3c; }
  .target-banner img { width: 100%; height: 100%; object-fit: cover; opacity: 0.5; }
  .overlay { position: absolute; bottom: 15px; left: 15px; }
  .loot-display { color: #f1c40f; font-weight: bold; font-size: 1.2rem; margin-top: 5px; }

  .lock-grid { padding: 20px; }
  .hint { font-size: 10px; color: #666; text-align: center; margin-bottom: 20px; letter-spacing: 1px; }
  
  .grid-wrapper { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
  .lock-card { 
    background: #111; border: 1px solid #333; padding: 15px; border-radius: 10px;
    color: white; transition: 0.3s;
  }
  .lock-card.solved { border-color: #2ecc71; background: rgba(46, 204, 113, 0.1); }
  .lock-icon { font-size: 1.5rem; margin-bottom: 8px; }
  .lock-name { font-size: 9px; color: #888; font-weight: bold; }
  .lock-status { font-size: 11px; font-weight: bold; margin-top: 4px; }

  .action-footer { padding: 20px; }
  .btn-start { width: 100%; background: #e74c3c; border: none; color: white; padding: 15px; border-radius: 8px; font-weight: bold; }
  .status-active { text-align: center; color: #e74c3c; font-weight: bold; animation: pulse 1s infinite; }

  @keyframes pulse { 0% { opacity: 1; } 50% { opacity: 0.6; } 100% { opacity: 1; } }
  .terminal { position: fixed; bottom: 10px; left: 15px; font-size: 10px; color: #2ecc71; }
  
  .map-view { padding: 50px; text-align: center; color: #444; }
</style>
