<script>
  import { onMount } from 'svelte';

  let geo = 39259;
  let tpCards = 10;
  let activeTab = 'RAID';
  let logs = ["Système prêt."];

  let target = {
    name: "BANQUE CENTRALE Z-01",
    loot: 42500,
    img: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1000"
  };

  // Configuration des verrous
  let locks = [
    { id: 1, solved: false },
    { id: 2, solved: false },
    { id: 3, solved: false }
  ];
  
  // Règle : Chances = Nombre de verrous - 1
  let maxChances = locks.length - 1;
  let currentChances = maxChances;
  let heistStarted = false;
  let gameOver = false;

  function startInfiltration() {
    if (tpCards >= 1) {
      tpCards -= 1;
      heistStarted = true;
      gameOver = false;
      currentChances = maxChances;
      locks = locks.map(l => ({ ...l, solved: false }));
      logs = [`🔓 Infiltration lancée. Vous avez ${currentChances} chances !`, ...logs];
    }
  }

  function tryLock(index) {
    if (!heistStarted || locks[index].solved || gameOver) return;

    // 25% de chance de succès
    let success = Math.random() > 0.75;
    
    if (success) { 
      locks[index].solved = true;
      logs = [`✅ VERROU 0${index + 1} OUVERT !`, ...logs];
      locks = [...locks];
    } else {
      // Si on échoue le crochetage, on perd une chance
      currentChances -= 1;
      logs = [`❌ Alerte ! Mécanisme bloqué. Chances restantes : ${currentChances}`, ...logs];
      
      if (currentChances <= 0) {
        failHeist();
      }
    }

    if (locks.every(l => l.solved)) {
      finishHeist();
    }
  }

  function failHeist() {
    heistStarted = false;
    gameOver = true;
    logs = ["🚨 ALARME ! Le braquage a échoué. Fuyez !", ...logs];
  }

  function finishHeist() {
    heistStarted = false;
    geo += target.loot;
    logs = [`💰 RÉUSSI ! +${target.loot.toLocaleString()} G récoltés.`, ...logs];
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

  <div class="raid-container">
    <div class="target-card">
      <img src={target.img} alt="Bank" />
      <div class="info">
        <h2>{target.name}</h2>
        <div class="loot-tag">{target.loot.toLocaleString()} G</div>
      </div>
    </div>

    <div class="chances-bar">
        <span>SÉCURITÉ :</span>
        <div class="hearts">
            {#each Array(maxChances) as _, i}
                <span class="heart" class:lost={i >= currentChances}>⚡</span>
            {/each}
        </div>
    </div>

    <div class="lock-grid">
      {#each locks as lock, i}
        <button class="lock-box" class:solved={lock.solved} class:failed={gameOver} on:click={() => tryLock(i)}>
          <span class="lock-icon">{lock.solved ? '🔓' : '🔒'}</span>
          <span class="lock-id">ID-{lock.id}</span>
        </button>
      {/each}
    </div>

    <div class="footer">
      {#if !heistStarted}
        <button class="btn-main" on:click={startInfiltration}>COMMENCER LE RAID</button>
      {:else if gameOver}
        <button class="btn-main retry" on:click={() => activeTab = 'MAP'}>FUIR LE SECTEUR</button>
      {:else}
        <div class="status-working">DÉCRYPTAGE EN COURS...</div>
      {/if}
    </div>
  </div>

  <div class="log-console">> {logs[0]}</div>
</main>

<style>
  :global(body) { margin:0; background:#000; color:white; font-family: sans-serif; overflow:hidden; }
  header { height: 50px; display: flex; align-items: center; justify-content: space-between; padding: 0 15px; border-bottom: 1px solid #222; }
  .logo { font-weight: 900; color: #f1c40f; }

  .raid-container { padding-bottom: 20px; }
  .target-card { position: relative; height: 160px; }
  .target-card img { width: 100%; height: 100%; object-fit: cover; opacity: 0.5; }
  .info { position: absolute; bottom: 10px; left: 15px; }
  .loot-tag { background: #e74c3c; color: white; padding: 4px 10px; border-radius: 4px; font-weight: bold; font-size: 1.2rem; display: inline-block; margin-top: 5px; }

  .chances-bar { display: flex; align-items: center; justify-content: center; gap: 10px; padding: 15px; background: #111; margin: 10px; border-radius: 8px; border: 1px solid #333; }
  .heart { color: #f1c40f; font-size: 1.5rem; text-shadow: 0 0 10px #f1c40f; }
  .heart.lost { opacity: 0.1; filter: grayscale(1); text-shadow: none; }

  .lock-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; padding: 15px; }
  .lock-box { background: #111; border: 2px solid #333; border-radius: 12px; padding: 20px 10px; display: flex; flex-direction: column; align-items: center; color: white; transition: 0.3s; }
  .lock-box.solved { border-color: #2ecc71; background: rgba(46, 204, 113, 0.1); }
  .lock-box.failed { border-color: #e74c3c; opacity: 0.5; }
  .lock-icon { font-size: 1.8rem; margin-bottom: 5px; }
  .lock-id { font-size: 0.6rem; color: #666; font-weight: bold; }

  .footer { padding: 15px; }
  .btn-main { width: 100%; background: #e74c3c; border: none; color: white; padding: 16px; border-radius: 8px; font-weight: bold; font-size: 1rem; box-shadow: 0 4px 0 #c0392b; }
  .btn-main:active { transform: translateY(2px); box-shadow: 0 2px 0 #c0392b; }
  .btn-main.retry { background: #555; box-shadow: 0 4px 0 #333; }

  .status-working { text-align: center; color: #e74c3c; font-weight: bold; animation: pulse 1s infinite; }
  @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.5; } }

  .log-console { position: fixed; bottom: 10px; left: 15px; font-size: 9px; color: #2ecc71; font-family: monospace; }
</style>