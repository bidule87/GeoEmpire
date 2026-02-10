<script>
  let geo = 39259;
  let tpCards = 10;
  let activeTab = 'RAID';
  let logs = ["Système prêt. Analyse de la cible..."];

  let target = {
    name: "BANQUE CENTRALE Z-01",
    loot: 42500,
    img: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1000"
  };

  // État des verrous
  let locks = [
    { id: 0, solved: false, isCorrect: false },
    { id: 1, solved: false, isCorrect: false },
    { id: 2, solved: false, isCorrect: false }
  ];
  
  let heistStarted = false;
  let winReady = false;

  function startInfiltration() {
    if (tpCards >= 1) {
      tpCards -= 1;
      heistStarted = true;
      winReady = false;
      
      // ÉTAPE CLÉ : On définit les 2 bons cadenas au HASARD dès le début
      // On mélange les indices [0, 1, 2] et on en prend deux
      let indices = [0, 1, 2].sort(() => Math.random() - 0.5);
      let correctIndices = indices.slice(0, 2); // On prend les 2 premiers du mélange
      
      locks = locks.map((l, index) => ({
        ...l,
        solved: false,
        isCorrect: correctIndices.includes(index)
      }));

      logs = ["🔓 Infiltration réussie. Trouvez les 2 points faibles fixes.", ...logs];
    }
  }

  function tryLock(index) {
    if (!heistStarted || locks[index].solved || winReady) return;

    // Si c'est un des 2 bons cadenas définis au départ
    if (locks[index].isCorrect) {
      locks[index].solved = true;
      logs = [`✅ VERROU 0${index + 1} DÉBLOQUÉ !`, ...logs];
      locks = [...locks];
    } else {
      logs = [`❌ Ce verrou est renforcé. Essayez les autres.`, ...logs];
    }

    // Victoire si les 2 bons sont trouvés
    let solvedCount = locks.filter(l => l.solved).length;
    if (solvedCount >= 2) {
      winReady = true;
      logs = ["💰 ACCÈS TOTAL ! Récupérez le butin.", ...logs];
    }
  }

  function collectMoney() {
    geo += target.loot;
    heistStarted = false;
    winReady = false;
    logs = [`💎 +${target.loot.toLocaleString()} G ! Infiltration terminée.`, ...logs];
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

    <div class="instruction">
      {#if !heistStarted}
        PRÉPAREZ-VOUS À L'INFILTRATION
      {:else}
        TROUVEZ LES 2 POINTS D'ACCÈS SUR LES 3
      {/if}
    </div>

    <div class="locks-grid">
      {#each locks as lock, i}
        <button class="lock-card" class:solved={lock.solved} on:click={() => tryLock(i)}>
          <span class="icon">{lock.solved ? '🔓' : '🔒'}</span>
          <span class="state">{lock.solved ? 'OUVERT' : 'TESTER'}</span>
        </button>
      {/each}
    </div>

    <div class="controls">
      {#if !heistStarted}
        <button class="primary-btn" on:click={startInfiltration}>LANCER LE BRAQUAGE (1 🎫)</button>
      {:else if winReady}
        <button class="win-btn" on:click={collectMoney}>💰 RÉCUPÉRER LE BUTIN</button>
      {:else}
        <div class="working-txt">HACKING EN COURS...</div>
      {/if}
    </div>
  </div>

  <div class="mini-logs">> {logs[0]}</div>
</main>

<style>
  :global(body) { margin:0; background:#000; color:white; font-family: sans-serif; }
  header { height: 60px; display: flex; align-items: center; justify-content: space-between; padding: 0 20px; border-bottom: 2px solid #222; }
  .logo { color: #f1c40f; font-weight: bold; }
  
  .banner { position: relative; height: 180px; overflow: hidden; border-bottom: 3px solid #e74c3c; }
  .banner img { width: 100%; height: 100%; object-fit: cover; opacity: 0.4; }
  .overlay { position: absolute; bottom: 15px; left: 15px; }
  .loot-box { background: #e74c3c; padding: 5px 12px; border-radius: 4px; font-weight: bold; margin-top: 8px; }

  .instruction { text-align: center; padding: 20px 10px; font-size: 0.75rem; color: #888; letter-spacing: 1.5px; text-transform: uppercase; }

  .locks-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 15px; padding: 0 20px; }
  .lock-card { background: #111; border: 2px solid #333; border-radius: 12px; padding: 25px 5px; color: white; transition: all 0.2s; }
  .lock-card.solved { border-color: #2ecc71; background: rgba(46, 204, 113, 0.1); color: #2ecc71; box-shadow: 0 0 15px rgba(46, 204, 113, 0.2); }
  .icon { font-size: 2rem; display: block; margin-bottom: 5px; }
  .state { font-size: 0.7rem; font-weight: bold; }

  .controls { padding: 30px 20px; }
  .primary-btn { width: 100%; background: #e74c3c; border: none; color: white; padding: 18px; border-radius: 10px; font-weight: bold; cursor: pointer; }
  .win-btn { width: 100%; background: #2ecc71; border: none; color: white; padding: 18px; border-radius: 10px; font-weight: bold; animation: pulse 1s infinite; cursor: pointer; }
  
  @keyframes pulse { 0% { transform: scale(1); } 50% { transform: scale(1.02); } 100% { transform: scale(1); } }
  .working-txt { text-align: center; color: #e74c3c; font-weight: bold; font-size: 0.9rem; letter-spacing: 1px; }
  .mini-logs { position: fixed; bottom: 15px; left: 15px; color: #2ecc71; font-size: 0.7rem; font-family: monospace; }
</style>