<script>
  // --- ÉCONOMIE DE L'EMPIRE ---
  let geo = 39259;
  let tpCards = 10;      // Pack Prestige (100)
  let crowns = 0;        // Pack Crowns (10) à 4.99€
  let gTokens = 5000;    // Pack G-Token (10 000) ou Prestige (5 000)
  let jumps = 0;         // Pack Téléportation (3) à 5.99€
  let isElite = false;   // Pack Élite à 9.99€
  
  let activeTab = 'RAID';
  let logs = ["Prêt pour l'expansion. En attente d'ordres..."];

  // --- LOGIQUE BRAQUAGE ---
  let target = { 
    name: "BANQUE CENTRALE Z-01", 
    loot: 42500, 
    img: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1000" 
  };
  
  let locks = Array.from({length: 3}, (_, i) => ({ id: i, solved: false, isCorrect: false }));
  let heistStarted = false;
  let winReady = false;

  function startInfiltration() {
    if (tpCards >= 1) {
      tpCards -= 1;
      heistStarted = true; winReady = false;
      let indices = [0, 1, 2].sort(() => Math.random() - 0.5);
      let correctIndices = indices.slice(0, 2);
      locks = locks.map((l, i) => ({ ...l, solved: false, isCorrect: correctIndices.includes(i) }));
      logs = ["🔓 Infiltration réussie. Trouvez les 2 points faibles.", ...logs];
    } else {
      logs = ["⚠️ Tickets insuffisants ! Passez au Shop.", ...logs];
    }
  }

  function tryLock(index) {
    if (!heistStarted || locks[index].solved || winReady) return;
    if (locks[index].isCorrect) {
      locks[index].solved = true;
      locks = [...locks];
      if (locks.filter(l => l.solved).length >= 2) {
        winReady = true;
        logs = ["💰 SÉCURITÉ MISE HORS SERVICE ! RÉCUPÉREZ LE BUTIN.", ...logs];
      }
    } else {
      logs = ["❌ Ce verrou résiste. Tentez un autre.", ...logs];
    }
  }

  function collectMoney() {
    geo += target.loot;
    heistStarted = false; winReady = false;
    logs = [`💎 +${target.loot.toLocaleString()} G ! Transfert réussi.`, ...logs];
  }

  // --- BOUTIQUE RÉELLE ---
  function buyPack(name, type, qty, price) {
    if (type === 'TICKET') tpCards += qty;
    if (type === 'CROWN') crowns += qty;
    if (type === 'GTOKEN') gTokens += qty;
    if (type === 'JUMP') jumps += qty;
    if (type === 'ELITE') isElite = true;
    logs = [`🛒 Pack ${name} activé (${price}€) !`, ...logs];
  }
</script>

<main>
  <header>
    <div class="logo">👑 GEO EMPIRE {isElite ? '★ ELITE' : ''}</div>
    <div class="stats-bar">
      <div class="stat" title="GEO">🟡 {geo.toLocaleString()}</div>
      <div class="stat" title="Tickets">🎫 {tpCards}</div>
      <div class="stat" title="Crowns">👑 {crowns}</div>
      <div class="stat" title="G-Tokens">🧱 {gTokens.toLocaleString()}</div>
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
        <div class="radar-visual">
          <div class="scanner-line"></div>
          <div class="target-blip" style="top:40%; left:55%"></div>
        </div>
        <p class="radar-text">RECHERCHE DE CIBLES À PROXIMITÉ...</p>
        {#if jumps > 0}
          <button class="jump-action" on:click={() => {jumps--; logs=["🌀 Saut GPS vers nouvelle zone.", ...logs]}}>
            🌀 UTILISER UN SAUT ({jumps} restants)
          </button>
        {/if}
      </div>

    {:else if activeTab === 'SHOP'}
      <div class="shop-content">
        <h3 class="section-title">💎 BOUTIQUE PRIVÉE (ARGENT RÉEL)</h3>
        
        <div class="card elite-card" on:click={() => buyPack('ÉLITE', 'ELITE', 1, 9.99)}>
          <div class="icon">📂</div>
          <div class="info"><b>PACK ÉLITE</b><small>Tout louer/vendre + Export Excel</small></div>
          <div class="price">9.99 €</div>
        </div>

        <div class="card prestige-card" on:click={() => buyPack('PRESTIGE', 'TICKET', 100, 7.99)}>
          <div class="icon">📦</div>
          <div class="info"><b>PACK PRESTIGE</b><small>100 Tickets + 5 000 G-Tokens</small></div>
          <div class="price">7.99 €</div>
        </div>

        <div class="card teleport-card" on:click={() => buyPack('TÉLÉPORT', 'JUMP', 3, 5.99)}>
          <div class="icon">🌀</div>
          <div class="info"><b>TÉLÉPORTATION</b><small>3 Sauts instantanés (5km)</small></div>
          <div class="price">5.99 €</div>
        </div>

        <div class="card crown-card" on:click={() => buyPack('CROWNS', 'CROWN', 10, 4.99)}>
          <div class="icon">👑</div>
          <div class="info"><b>PACK CROWNS</b><small>10 Jetons Loterie Royale</small></div>
          <div class="price">4.99 €</div>
        </div>

        <div class="card gtoken-card" on:click={() => buyPack('G-TOKEN', 'GTOKEN', 10000, 4.99)}>
          <div class="icon">🧱</div>
          <div class="info"><b>PACK G-TOKENS</b><small>10 000 Lingots de boost</small></div>
          <div class="price">4.99 €</div>
        </div>
      </div>

    {:else if activeTab === 'RAID'}
      <div class="raid-view">
        <div class="target-banner">
          <img src={target.img} alt="target" />
          <div class="target-overlay">
            <h2>{target.name}</h2>
            <div class="loot-display">{target.loot.toLocaleString()} G</div>
          </div>
        </div>

        <div class="locks-container">
          {#each locks as lock, i}
            <button class="lock-box" class:is-open={lock.solved} on:click={() => tryLock(i)}>
              <span class="lock-ico">{lock.solved ? '🔓' : '🔒'}</span>
              <span class="lock-label">{lock.solved ? 'OUVERT' : 'TESTER'}</span>
            </button>
          {/each}
        </div>

        <div class="raid-footer">
          {#if !heistStarted}
            <button class="raid-btn start" on:click={startInfiltration}>LANCER LE RAID (1 🎫)</button>
          {:else if winReady}
            <button class="raid-btn collect" on:click={collectMoney}>💰 RÉCUPÉRER BUTIN</button>
          {:else}
            <div class="hack-status">TENTATIVE DE DÉVERROUILLAGE...</div>
          {/if}
        </div>
      </div>
    {/if}
  </div>

  <div class="bottom-logs">> {logs[0]}</div>
</main>

<style>
  :global(body) { margin:0; background:#000; color:#fff; font-family: 'Helvetica', sans-serif; overflow:hidden; }
  
  header { padding: 12px 15px; border-bottom: 1px solid #222; background: #050505; }
  .logo { color: #f1c40f; font-weight: 900; font-size: 1.1rem; letter-spacing: 1px; }
  .stats-bar { display: flex; gap: 10px; margin-top: 5px; font-size: 0.75rem; color: #aaa; }
  .stat { background: #111; padding: 3px 8px; border-radius: 4px; border: 1px solid #222; }

  .top-nav { display: flex; border-bottom: 2px solid #f1c40f; }
  .top-nav button { flex: 1; padding: 14px; background: none; border: none; color: #555; font-weight: bold; font-size: 0.7rem; }
  .top-nav button.atv { color: #f1c40f; background: rgba(241, 196, 15, 0.1); }

  .content { height: calc(100vh - 120px); overflow-y: auto; }

  /* STYLE SHOP */
  .shop-content { padding: 15px; }
  .section-title { font-size: 0.75rem; color: #f1c40f; letter-spacing: 2px; margin-bottom: 15px; border-left: 3px solid #f1c40f; padding-left: 8px; }
  .card { display: flex; align-items: center; background: #0a0a0a; padding: 12px; border-radius: 12px; margin-bottom: 10px; border: 1px solid #222; transition: 0.2s; }
  .card:active { transform: scale(0.98); background: #151515; }
  .icon { font-size: 2.2rem; margin-right: 15px; }
  .info { flex: 1; }
  .info b { display: block; font-size: 0.85rem; margin-bottom: 2px; }
  .info small { color: #666; font-size: 0.6rem; }
  .price { background: #f1c40f; color: #000; padding: 6px 10px; border-radius: 6px; font-weight: 900; font-size: 0.75rem; }
  
  .elite-card { border-color: #fff; box-shadow: 0 0 10px rgba(255,255,255,0.1); }
  .prestige-card { border-color: #00d4ff; }
  .crown-card { border-color: #f1c40f; }
  .gtoken-card { border-color: #e67e22; }
  .teleport-card { border-color: #9b59b6; }

  /* STYLE RAID */
  .target-banner { position: relative; height