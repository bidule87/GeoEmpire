<script>
  let geo = 39259;
  let tpCards = 10;
  let activeTab = 'RAID';
  let logs = ["Système Elite initialisé."];

  // --- LOGIQUE BRAQUAGE ---
  let target = { name: "BANQUE CENTRALE Z-01", loot: 42500, img: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1000" };
  let locks = [ { id: 0, solved: false, isCorrect: false }, { id: 1, solved: false, isCorrect: false }, { id: 2, solved: false, isCorrect: false } ];
  let heistStarted = false;
  let winReady = false;

  function startInfiltration() {
    if (tpCards >= 1) {
      tpCards -= 1; heistStarted = true; winReady = false;
      let indices = [0, 1, 2].sort(() => Math.random() - 0.5);
      let correctIndices = indices.slice(0, 2);
      locks = locks.map((l, i) => ({ ...l, solved: false, isCorrect: correctIndices.includes(i) }));
      logs = ["🔓 Infiltration réussie. Trouvez les 2 points d'accès.", ...logs];
    }
  }

  function tryLock(index) {
    if (!heistStarted || locks[index].solved || winReady) return;
    if (locks[index].isCorrect) {
      locks[index].solved = true;
      locks = [...locks];
      if (locks.filter(l => l.solved).length >= 2) winReady = true;
    } else { logs = ["❌ Verrou renforcé...", ...logs]; }
  }

  function collectMoney() {
    geo += target.loot; heistStarted = false; winReady = false;
    logs = [`💎 +${target.loot.toLocaleString()} G !`, ...logs];
  }

  // --- LOGIQUE BOUTIQUE & POUVOIRS ---
  let jumps = 0;
  function buyItem(type, amount, price) {
    if (geo >= price) {
      geo -= price;
      if (type === 'TICKET') tpCards += amount;
      if (type === 'JUMP') jumps += amount;
      logs = [`🛒 Achat réussi : ${amount} ${type}.`, ...logs];
    } else { logs = ["⚠️ GEO insuffisants !", ...logs]; }
  }
</script>

<main>
  <header>
    <div class="logo">👑 GEO EMPIRE</div>
    <div class="stats">
      <span>🟡 {geo.toLocaleString()}</span>
      <span>🎫 {tpCards}</span>
      {#if jumps > 0}<span>🌀 {jumps}</span>{/if}
    </div>
  </header>

  <nav class="top-nav">
    <button class:atv={activeTab==='MAP'} on:click={()=>activeTab='MAP'}>📍 RADAR</button>
    <button class:atv={activeTab==='SHOP'} on:click={()=>activeTab='SHOP'}>🛒 SHOP</button>
    <button class:atv={activeTab==='RAID'} on:click={()=>activeTab='RAID'}>🏴‍☠️ RAID</button>
  </nav>

  <div class="content">
    {#if activeTab === 'MAP'}
      <div class="radar-view">
        <div class="radar-circle"><div class="radar-line"></div></div>
        <p>RECHERCHE DE CIBLES...</p>
        {#if jumps > 0}
          <button class="jump-btn" on:click={() => {jumps--; logs = ["🌀 SAUT EFFECTUÉ vers une nouvelle zone.", ...logs];}}>UTILISER UN SAUT (Remplace la cible)</button>
        {/if}
      </div>

    {:else if activeTab === 'SHOP'}
      <div class="shop-view">
        <h3 class="stitle">🎫 TICKETS & PRESTIGE</h3>
        <div class="sitem" on:click={() => buyItem('TICKET', 10, 10000)}>
            <span>Pack Braqueur (10)</span> <button>10 000 G</button>
        </div>
        <div class="sitem prestige" on:click={() => buyItem('TICKET', 100, 75000)}>
            <span>💎 PACK PRESTIGE (100)</span> <button>75 000 G</button>
        </div>

        <h3 class="stitle">👑 ÉDITION CROWN</h3>
        <div class="sitem crown" on:click={() => {if(geo>=50000){geo-=50000; logs=["👑 MODE CROWN ACTIVÉ.", ...logs]}}}>
            <span>👑 CROWN PASS (Gains x2)</span> <button>50 000 G</button>
        </div>

        <h3 class="stitle">🌀 NAVIGATION</h3>
        <div class="sitem teleport" on:click={() => buyItem('JUMP', 3, 30000)}>
            <span>🌀 PACK TÉLÉPORTATION (3)</span> <button>30 000 G</button>
        </div>
      </div>

    {:else if activeTab === 'RAID'}
      <div class="raid-zone">
        <div class="banner">
            <img src={target.img} alt="Bank" />
            <div class="overlay"><h2>{target.name}</h2><div class="loot">{target.loot.toLocaleString()} G</div></div>
        </div>
        <div class="locks-grid">
          {#each locks as lock, i}
            <button class="lock-card" class:solved={lock.solved} on:click={() => tryLock(i)}>
              <span>{lock.solved ? '🔓' : '🔒'}</span>
              <small>{lock.solved ? 'OK' : 'TESTER'}</small>
            </button>
          {/each}
        </div>
        <div class="controls">
          {#if !heistStarted}<button class="btn red" on:click={startInfiltration}>LANCER (1 🎫)</button>
          {:else if winReady}<button class="btn green" on:click={collectMoney}>💰 RÉCUPÉRER BUTIN</button>
          {:else}<div class="working">INFILTRATION EN COURS...</div>{/if}
        </div>
      </div>
    {/if}
  </div>

  <div class="terminal">> {logs[0]}</div>
</main>

<style>
  :global(body) { margin:0; background:#000; color:white; font-family: sans-serif; overflow:hidden; }
  header { height: 60px; display: flex; align-items: center; justify-content: space-between; padding: 0 15px; border-bottom: 1px solid #222; }
  .logo { color: #f1c40f; font-weight: bold; }
  .stats { font-size: 0.8rem; display: flex; gap: 10px; }
  .top-nav { display: flex; border-bottom: 2px solid #f1c40f; }
  .top-nav button { flex: 1; padding: 15px; background: none; border: none; color: #555; font-weight: bold; }
  .top-nav button.atv { color: #f1c40f; background: rgba(241,196,15,0.1); }
  .content { height: calc(100vh - 120px); overflow-y: auto; }

  /* SHOP STYLE */
  .shop-view { padding: 15px; }
  .stitle { font-size: 0.7rem; color: #f1c40f; letter-spacing: 2px; margin: 15px 0 10px; }
  .sitem { display: flex; justify-content: space-between; align-items: center; background: #111; padding: 12px; border-radius: 8px; margin-bottom: 8px; border: 1px solid #222; }
  .sitem span { font-size: 0.8rem; font-weight: bold; }
  .sitem button { background: #333; color: white; border: none; padding: 6px 10px; border-radius: 4px; font-weight: bold; font-size: 0.7rem; }
  .prestige { border-color: #00d4ff; } .prestige button { background: #00d4ff; color: black; }
  .crown { border-color: #f1c40f; } .crown button { background: #f1c40f; color: black; }
  .teleport { border-color: #9b59b6; } .teleport button { background: #9b59b6; }

  /* RADAR */
  .radar-view { display: flex; flex-direction: column; align-items: center; padding: 40px 20px; }
  .radar-circle { width: 160px; height: 160px; border: 2px solid #f1c40f; border-radius: 50%; position: relative; background: radial-gradient(circle, #001100 0%, #000 80%); margin-bottom: 20px; }
  .radar-line { position: absolute; width: 50%; height: 2px; background: #f1c40f; top: 50%; left: 50%; transform-origin: left; animation: rot 3s linear infinite; }
  @keyframes rot { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
  .jump-btn { background: #9b59b6; border: none; color: white; padding: 10px; border-radius: 5px; font-weight: bold; font-size: 0.7rem; margin-top: 20px; }

  /* RAID */
  .banner { position: relative; height: 140px; }
  .banner img { width: 100%; height: 100%; object-fit: cover; opacity: 0.4; }
  .overlay { position: absolute; bottom: 10px; left: 10px; }
  .loot { background: #e74c3c; padding: 3px 8px; border-radius: 4px; font-weight: bold; font-size: 1rem; }
  .locks-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; padding: 20px; }
  .lock-card { background: #111; border: 2px solid #333; border-radius: 10px; padding: 15px 0; color: white; }
  .lock-card.solved { border-color: #2ecc71; color: #2ecc71; }
  .btn { width: 100%; padding: 15px; border-radius: 8px; border: none; font-weight: bold; color: white; }
  .red { background: #e74c3c; } .green { background: #2ecc71; }
  .terminal { position: fixed; bottom: 10px; left: 15px; color: #2ecc71; font-size: 0.6rem; }
</style>