<script>
  import { onMount } from 'svelte';

  let geo = 39259;
  let tpCards = 10;
  let activeTab = 'RAID';
  let logs = ["Système prêt. Attente d'intrusion..."];

  let target = {
    name: "BANQUE CENTRALE Z-01",
    loot: 42500,
    img: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1000"
  };

  let locks = [
    { id: 1, solved: false },
    { id: 2, solved: false },
    { id: 3, solved: false }
  ];
  
  let heistStarted = false;
  let chances = 5; // On commence avec 5 chances pour tester
  let winReady = false;

  function startInfiltration() {
    if (tpCards >= 1) {
      tpCards -= 1;
      heistStarted = true;
      winReady = false;
      chances = 5;
      locks = locks.map(l => ({ ...l, solved: false }));
      logs = ["🔓 Infiltration réussie. Forcez les verrous !", ...logs];
    }
  }

  function tryLock(index) {
    if (!heistStarted || locks[index].solved || chances <= 0) return;

    // 30% de chance de succès
    if (Math.random() > 0.70) { 
      locks[index].solved = true;
      logs = [`✅ VERROU 0${index + 1} OUVERT !`, ...logs];
      locks = [...locks];
    } else {
      chances -= 1;
      logs = [`❌ Échec. Attention, chances : ${chances}`, ...logs];
    }

    if (locks.every(l => l.solved)) {
      winReady = true;
      logs = ["💰 TOUS LES VERROUS SONT OUVERTS ! Cliquez sur RÉCUPÉRER", ...logs];
    }
  }

  function collectMoney() {
    geo += target.loot;
    heistStarted = false;
    winReady = false;
    logs = [`💎 BRAVO ! +${target.loot.toLocaleString()} G ajoutés à votre compte.`, ...logs];
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

  <div class="raid-zone">
    <div class="banner">
      <img src={target.img} alt="Bank" />
      <div class="overlay">
        <h2>{target.name}</h2>
        <div class="loot-box">BUTIN : {target.loot.toLocaleString()} G</div>
      </div>
    </div>

    <div class="status-bar">
      <span>CHANCES RESTANTES :</span>
      <div class="stars">
        {#each Array(5) as _, i}
          <span class="star" class:off={i >= chances}>⚡</span>
        {/each}
      </div>
    </div>

    <div class="locks-container">
      {#each locks as lock, i}
        <button class="lock-card" class:solved={lock.solved} on:click={() => tryLock(i)}>
          <span class="icon">{lock.solved ? '🔓' : '🔒'}</span>
          <span class="txt">VERROU 0{lock.id}</span>
          <span class="state">{lock.solved ? 'OUVERT' : 'FERMÉ'}</span>
        </button>
      {/each}
    </div>

    <div class="controls">
      {#if !heistStarted}
        <button class="primary-btn" on:click={startInfiltration}>LANCER LE BRAQUAGE (1 🎫)</button>
      {:else if winReady}
        <button class="win-btn" on:click={collectMoney}>💰 RÉCUPÉRER LE BUTIN</button>
      {:else if chances <= 0}
        <button class="fail-btn" on:click={() => heistStarted = false}>ÉCHEC - FUIR 🚨</button>
      {:else}
        <div class="working-txt">HACKING EN COURS...</div>
      {/if}
    </div>
  </div>

  <div class="mini-logs">> {logs[0]}</div>
</main>

<style>
  :global(body) { margin:0; background:#0b0b0b; color:white; font-family: sans-serif; }
  header { height: 60px; display: flex; align-items: center; justify-content: space-between; padding: 0 20px; border-bottom: 2px solid #222; background: #000; }
  .logo { color: #f1c40f; font-weight: bold; }
  
  .banner { position: relative; height: 180px; overflow: hidden; border-bottom: 3px solid #e74c3c; }
  .banner img { width: 100%; height: 100%; object-fit: cover; opacity: 0.4; }
  .overlay { position: absolute; bottom: 15px; left: 15px; }
  .loot-box { background: #e74c3c; padding: 5px 12px; border-radius: 4px; font-weight: bold; font-size: 1.2rem; margin-top: 8px; }

  .status-bar { display: flex; align-items: center; justify-content: center; gap: 15px; padding: 15px; background: #151515; }
  .star { color: #f1c40f; font-size: 1.2rem; }
  .star.off { opacity: 0.1; filter: grayscale(1); }

  .locks-container { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; padding: 20px; }
  .lock-card { background: #1a1a1a; border: 2px solid #333; border-radius: 10px; padding: 15px 5px; color: white; transition: 0.3s; }
  .lock-card.solved { border-color: #2ecc71; background: rgba(46, 204, 113, 0.1); }
  .icon { font-size: 1.5rem; display: block; margin-bottom: 5px; }
  .txt { font-size: 0.7rem; color: #777; font-weight: bold; }
  .state { display: block; font-size: 0.8rem; font-weight: bold; margin-top: 3px; }

  .controls { padding: 20px; }
  .primary-btn { width: 100%; background: #e74c3c; border: none; color: white; padding: 18px; border-radius: 10px; font-weight: bold; font-size: 1rem; }
  .win-btn { width: 100%; background: #2ecc71; border: none; color: white; padding: 18px; border-radius: 10px; font-weight: bold; font-size: 1rem; animation: bounce 1s infinite; }
  .fail-btn { width: 100%; background: #444; border: none; color: white; padding: 18px; border-radius: 10px; font-weight: bold; }
  
  @keyframes bounce { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.05); } }
  .working-txt { text-align: center; color: #e74c3c; font-weight: bold; font-size: 0.9rem; }
  .mini-logs { position: fixed; bottom: 15px; left: 15px; color: #2ecc71; font-size: 0.7rem; font-family: monospace; }
</style>