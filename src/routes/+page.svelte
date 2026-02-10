<script>
  // --- VARIABLES ÉCONOMIQUES ---
  let geo = 39259;
  let tpCards = 10;      // Tickets de Raid
  let crowns = 10;       // Jetons Loterie (Pack à 4.99€)
  let gTokens = 5000;    // Lingots (Pack Prestige/G-Token)
  let jumps = 3;         // Sauts GPS (Pack Téléportation)
  let isElite = false;   // Statut du Pack Elite (9.99€)
  
  let activeTab = 'RAID';
  let logs = ["Système Empire initialisé. Prêt pour l'expansion."];

  // --- LOGIQUE BRAQUAGE (RAID) ---
  let target = { 
    name: "BANQUE CENTRALE Z-01", 
    loot: 42500, 
    img: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1000" 
  };
  
  // On gère 3 verrous par défaut, 9 si Elite
  let locks = Array.from({length: 3}, (_, i) => ({ id: i, solved: false, isCorrect: false }));
  let heistStarted = false;
  let winReady = false;

  function startInfiltration() {
    if (tpCards >= 1) {
      tpCards -= 1;
      heistStarted = true;
      winReady = false;
      // On définit 2 verrous gagnants sur les 3
      let indices = [0, 1, 2].sort(() => Math.random() - 0.5);
      let correctIndices = indices.slice(0, 2);
      locks = locks.map((l, i) => ({ ...l, solved: false, isCorrect: correctIndices.includes(i) }));
      logs = ["🔓 Infiltration réussie. Trouvez les 2 points d'accès.", ...logs];
    } else {
      logs = ["⚠️ Plus de tickets ! Visitez le Shop.", ...logs];
    }
  }

  function tryLock(index) {
    if (!heistStarted || locks[index].solved || winReady) return;
    if (locks[index].isCorrect) {
      locks[index].solved = true;
      locks = [...locks];
      if (locks.filter(l => l.solved).length >= 2) {
        winReady = true;
        logs = ["💰 ACCÈS TOTAL ! Récupérez le butin.", ...logs];
      }
    } else {
      logs = ["❌ Ce verrou est renforcé...", ...logs];
    }
  }

  function collectMoney() {
    geo += target.loot;
    heistStarted = false;
    winReady = false;
    logs = [`💎 +${target.loot.toLocaleString()} G ! Bravo.`, ...logs];
  }

  // --- LOGIQUE BOUTIQUE (ACHATS SIMULÉS) ---
  function buyPack(name, type, qty, price) {
    // Ici on simule l'achat direct
    if (type === 'TICKET') tpCards += qty;
    if (type === 'CROWN') crowns += qty;
    if (type === 'GTOKEN') gTokens += qty;
    if (type === 'JUMP') jumps += qty;
    if (type === 'ELITE') isElite = true;
    logs = [`🛒 Pack ${name} activé !`, ...logs];
  }
</script>

<main>
  <header>
    <div class="logo">👑 GEO EMPIRE {isElite ? '★' : ''}</div>
    <div class="stats-bar">
      <div class="stat"><span>🟡</span> {geo.toLocaleString()}</div>
      <div class="stat"><span>🎫</span> {tpCards}</div>
      <div class="stat"><span>👑</span> {crowns}</div>
      <div class="stat"><span>🧱</span> {gTokens.toLocaleString()}</div>
    </div>
  </header>

  <nav class="top-nav">
    <button class:atv={activeTab==='MAP'} on:click={()=>activeTab='MAP'}>📍 RADAR</button>
    <button class:atv={activeTab==='SHOP'} on:click={()=>activeTab='SHOP'}>🛒 SHOP</button>
    <button class:atv={activeTab==='RAID'} on:click={()=>activeTab='RAID'}>🏴‍☠️ RAID</button>
  </nav>

  <div class="content">
    {#if activeTab === 'MAP'}
      <div class="radar-container">
        <div class="radar">
          <div class="scanner"></div>
          <div class="point" style="top:30%; left:60%"></div>
        </div>
        <p>RECHERCHE DE SOCIÉTÉS...</p>
        {#if jumps > 0}
          <button class="jump-btn" on:click={() => {jumps--; logs=["🌀 Saut GPS effectué !", ...logs]}}>
            UTILISER TÉLÉPORTATION (Sauts: {jumps})
          </button>
        {/if}
      </div>

    {:else if activeTab === 'SHOP'}
      <div class="shop-grid">
        <h3 class="shop-title">💎 PACKS PREMIUM (RÉEL)</h3>
        
        <div class="p-card elite">
          <div class="p-icon">📂</div>
          <div class="p-info"><b>PACK ÉLITE</b><small>Full Gestion + Excel</small></div>
          <button on:click={() => buyPack('ELITE', 'ELITE', 1, 9.99)}>9.99 €</button>
        </div>

        <div class="p-card prestige">
          <div class="p-icon">📦</div>
          <div class="p-info"><b>PACK PRESTIGE</b><small>100 Tickets + 5k G-Tokens</small></div>
          <button on:click={() => buyPack('PRESTIGE', 'TICKET', 100, 7.99)}>7.99 €</button>
        </div>

        <div class="p-card teleport">
          <div class="p-icon">🌀</div>
          <div class="p-info"><b>TÉLÉPORTATION</b><small>3 Sauts de zone GPS</small></div>
          <button on:click={() => buyPack('TELEPORT', 'JUMP', 3, 5.99)}>5.99 €</button>
        </div>

        <div class="p-card crown">
          <div class="p-icon">👑</div>
          <div class="p-info"><b>PACK CROWNS</b><small>10 Jetons Loterie</small></div>
          <button on:click={() => buyPack('CROWNS', 'CROWN', 10, 4.99)}>4.99 €</button>
        </div>

        <div class="p-card gtoken">
          <div class="p-icon">🧱</div>
          <div class="p-info"><b>PACK G-TOKENS</b><small>10 000 Lingots Boost</small></div>
          <button on:click={() => buyPack('GTOKEN', 'GTOKEN', 10000, 4.99)}>4.99 €</button>
        </div>
      </div>

    {:else if activeTab === 'RAID'}
      <div class="raid-zone">
        <div class="bank-card">
          <img src={target.img} alt="target" />
          <div class="bank-info">
            <h2>{target.name}</h2>
            <div class="loot-tag">{target.loot.toLocaleString()} G</div>
          </div>
        </div>

        <div class="locks-grid">
          {#each locks as lock, i}
            <button class="lock-btn" class:open={lock.solved} on:click={() => tryLock(i)}>
              <span class="lock-icon">{lock.solved ? '🔓' : '🔒'}</span>
              <span class="lock-status">{lock.solved ? 'OK' : 'TEST'}</span>
            </button>
          {/each}
        </div>

        <div class="raid-actions">
          {#if !heistStarted}
            <button class="action-btn start" on:click={startInfiltration}>BRAQUER (1 🎫)</button>
          {:else if winReady}
            <button class="action-btn collect" on:click={collectMoney}>RÉCUPÉRER BUTIN</button>
          {:else}
            <div class="hacking-status">PIRATAGE EN COURS...</div>
          {/if}
        </div>
      </div>
    {/if}
  </div>

  <div class="logs">> {logs[0]}</div>
</main>

<style>
  :global(body) { margin:0; background:#000; color:#fff; font-family: 'Segoe UI', sans-serif; overflow:hidden; }
  
  /* HEADER */
  header { padding: 10px 15px; border-bottom: 1px solid #222; background: #0a0a0a; }
  .logo { color: #f1c40f; font-weight: 900; font-size: 1.2rem; margin-bottom: 5px; }
  .stats-bar { display: flex; gap: 12px; font-size: 0.8rem; font-weight: bold; }
  .stat span { margin-right: 2px; }

  /* NAV */
  .top-nav { display: flex; border-bottom: 2px solid #f1c40f; background: #000; }
  .top-nav button { flex: 1; padding: 15px; background: none; border: none; color: #666; font-weight: bold; font-size: 0.7rem; }
  .top-nav button.atv { color: #f1c40f; background: rgba(241, 196, 15, 0.1); }

  .content { height: calc(100vh - 120px); overflow-y: auto; padding-bottom: 50px; }

  /* SHOP */
  .shop-grid { padding: 15px; }
  .shop-title { color: #f1c40f; font-size: 0.8rem; letter-spacing: 2px; margin-bottom: 15px; }
  .p-card { display: flex; align-items: center; background: #111; padding: 12px; border-radius: 10px; margin-bottom: 10px; border: 1px solid #333; }
  .p-icon { font-size: 2rem; margin-right: 15px; width: 40px; text-align: center; }
  .p-info { flex: 1; display: flex; flex-direction: column; }
  .p-info b { font-size: 0.8rem; }
  .p-info small { color: #777; font-size: 0.65rem; }
  .p-card button { background: #f1c40f; border: none; color: #000; padding: 8px 12px; border-radius: 6px; font-weight: 900; font-size: 0.75rem; }
  
  .elite { border-color: #fff; } .prestige { border-color: #00d4ff; } .crown { border-color: #f1c40f; } .gtoken { border-color: #ff9f43; } .teleport { border-color: #9b59b6; }

  /* RAID */
  .bank-card { position: relative; height: 160px; width: 100%; }
  .bank-card img { width: 100%; height: 100%; object-fit: cover; opacity: 0.4; }
  .bank-info { position: absolute; bottom: 15px; left: 15px; }
  .loot-tag { background: #e74c3c; padding: 4px 10px; border-radius: 4px; font-weight: bold; }
  .locks-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; padding: 20px; }
  .lock-btn { background: #111; border: 2px solid #333; border-radius: 12px; padding: 20px 0; color: #fff; }
  .lock-btn.open { border-color: #2ecc71; color: #2ecc71; background: rgba(46, 204, 113, 0.1); }
  .lock-icon { display: block; font-size: 1.5rem; margin-bottom: 5px; }
  .lock-status { font-size: 0.6rem; font-weight: bold; }
  .raid-actions { padding: 0 20px; }
  .action-btn { width: 100%; padding: 18px; border-radius: 10px; border: none; font-weight: bold; color: #fff; font-size: 1rem; }
  .start { background: #e74c3c; } .collect { background: #2ecc71; animation: pulse 1s infinite; }
  @keyframes pulse { 0% { opacity: 1; } 50% { opacity: 0.8; } 100% { opacity: 1; } }
  .hacking-status { text-align: center; color: #e74c3c; font-weight: bold; font-size: 0.8rem; }

  /* RADAR */
  .radar-container { display: flex; flex-direction: column; align-items: center; padding: 40px; }
  .radar { width: 180px; height: 180px; border: 2px solid #f1c40f; border-radius: 50%; position: relative; overflow: hidden; background: radial-gradient(circle, #001a00 0%, #000 80%); }
  .scanner { position: absolute; width: 50%; height: 2px; background: #f1c40f; top: 50%; left: 50%; transform-origin: left; animation: scan 3s linear infinite; }
  @keyframes scan { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
  .point { width: 6px; height: 6px; background: #f1c40f; border-radius: 50%; position: absolute; box-shadow: 0 0 10px #f1c40f; }
  .jump-btn { margin-top: 30px; background: #9b59b6; border: none; color: #fff; padding: 12px 20px; border-radius: 8px; font-weight: bold; font-size: 0.8rem; }

  .logs { position: fixed; bottom: 0; width: 100%; background: #000; border-top: 1px solid #222; padding: 10px 15px; color: #2ecc71; font-family: monospace; font-size: 0.65rem; }
</style>