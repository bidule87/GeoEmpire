<script>
  // Variables Globales
  let geo = 39259;
  let tpCards = 10;
  let crowns = 0;
  let gTokens = 5000;
  let jumps = 0;
  let isElite = false;
  
  let activeTab = 'RAID';
  let logs = ["Prêt pour l'expansion."];

  // Logique du Raid
  let target = { name: "BANQUE CENTRALE", loot: 42500, img: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1000" };
  let locks = [{id:0, s:false, ok:false}, {id:1, s:false, ok:false}, {id:2, s:false, ok:false}];
  let heistStarted = false;
  let winReady = false;

  function startInfiltration() {
    if (tpCards >= 1) {
      tpCards--; heistStarted = true; winReady = false;
      let rand = [0,1,2].sort(() => Math.random() - 0.5);
      locks = locks.map((l, i) => ({ ...l, s: false, ok: rand.slice(0,2).includes(i) }));
      logs = ["🔓 Infiltration réussie. Trouvez les 2 verrous.", ...logs];
    }
  }

  function tryLock(i) {
    if (!heistStarted || locks[i].s || winReady) return;
    if (locks[i].ok) {
      locks[i].s = true; locks = [...locks];
      if (locks.filter(l => l.s).length >= 2) { winReady = true; logs = ["💰 ACCÈS TOTAL !", ...logs]; }
    } else { logs = ["❌ Verrou renforcé.", ...logs]; }
  }

  function buy(name, type, qty) {
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
    <div class="logo">👑 GEO EMPIRE {isElite ? '★ ELITE' : ''}</div>
    <div class="stats">
      <span>🟡 {geo.toLocaleString()}</span>
      <span>🎫 {tpCards}</span>
      <span>👑 {crowns}</span>
      <span>🧱 {gTokens}</span>
    </div>
  </header>

  <nav>
    <button class:atv={activeTab==='MAP'} on:click={()=>activeTab='MAP'}>📍 RADAR</button>
    <button class:atv={activeTab==='SHOP'} on:click={()=>activeTab='SHOP'}>🛒 SHOP</button>
    <button class:atv={activeTab==='RAID'} on:click={()=>activeTab='RAID'}>🏴‍☠️ RAID</button>
  </nav>

  <div class="container">
    {#if activeTab === 'MAP'}
      <div class="radar-box">
        <div class="radar-circle"><div class="line"></div></div>
        <p>RECHERCHE GPS...</p>
        {#if jumps > 0}
          <button class="j-btn" on:click={()=>{jumps--; logs=["🌀 Saut effectué", ...logs]}}>SAUTER (RESTE: {jumps})</button>
        {/if}
      </div>

    {:else if activeTab === 'SHOP'}
      <div class="shop">
        <h3 class="title">💎 BOUTIQUE (RÉEL)</h3>
        <div class="item elite" on:click={()=>buy('ELITE','ELITE',1)}>
          <span>📂 PACK ÉLITE</span> <b>9.99 €</b>
        </div>
        <div class="item prestige" on:click={()=>buy('PRESTIGE','TICKET',100)}>
          <span>📦 PRESTIGE (100🎫)</span> <b>7.99 €</b>
        </div>
        <div class="item teleport" on:click={()=>buy('TELE','JUMP',3)}>
          <span>🌀 TÉLÉPORT (3 sauts)</span> <b>5.99 €</b>
        </div>
        <div class="item crown" on:click={()=>buy('CROWNS','CROWN',10)}>
          <span>👑 CROWNS (10 jetons)</span> <b>4.99 €</b>
        </div>
        <div class="item gtoken" on:click={()=>buy('G-TOKEN','GTOKEN',10000)}>
          <span>🧱 G-TOKENS (10k)</span> <b>4.99 €</b>
        </div>
      </div>

    {:else if activeTab === 'RAID'}
      <div class="raid">
        <div class="banner">
          <img src={target.img} alt="" />
          <div class="info"><h2>{target.name}</h2><div class="tag">{target.loot} G</div></div>
        </div>
        <div class="locks">
          {#each locks as l, i}
            <button class="l-card" class:op={l.s} on:click={()=>tryLock(i)}>
              {l.s ? '🔓' : '🔒'} <small>{l.s ? 'OK' : 'TEST'}</small>
            </button>
          {/each}
        </div>
        <div class="foot">
          {#if !heistStarted} <button class="b r" on:click={startInfiltration}>LANCER (1 🎫)</button>
          {:else if winReady} <button class="b g" on:click={()=>{geo+=target.loot; heistStarted=false; winReady=false;}}>💰 RÉCUPÉRER</button>
          {:else} <div class="txt">PIRATAGE...</div> {/if}
        </div>
      </div>
    {/if}
  </div>
  <div class="log">> {logs[0]}</div>
</main>

<style>
  :global(body) { margin:0; background:#000; color:#fff; font-family:sans-serif; }
  header { padding:15px; border-bottom:1px solid #222; }
  .logo { color:#f1c40f; font-weight:bold; margin-bottom:5px; }
  .stats { font-size:0.75rem; display:flex; gap:10px; color:#aaa; }
  nav { display:flex; border-bottom:2px solid #f1c40f; }
  nav button { flex:1; padding:15px; background:none; border:none; color:#555; font-weight:bold; font-size:0.7rem; }
  nav button.atv { color:#f1c40f; background:rgba(241,196,15,0.1); }
  .container { height:calc(100vh - 120px); overflow-y:auto; }
  
  /* SHOP */
  .shop { padding:15px; }
  .title { color:#f1c40f; font-size:0.8rem; letter-spacing:1px; }
  .item { display:flex; justify-content:space-between; background:#111; padding:15px; border-radius:10px; margin-bottom:10px; border:1px solid #333; align-items:center; }
  .item b { background:#f1c40f; color:#000; padding:5px 10px; border-radius:5px; font-size:0.75rem; }
  .elite { border-color:#fff; } .prestige { border-color:#00d4ff; } .teleport { border-color:#9b59b6; } .crown { border-color:#f1c40f; } .gtoken { border-color:#e67e22; }

  /* RAID */
  .banner { position:relative; height:140px; }
  .banner img { width:100%; height:100%; object-fit:cover; opacity:0.3; }
  .info { position:absolute; bottom:10px; left:15px; }
  .tag { background:#e74c3c; padding:3px 8px; border-radius:4px; font-weight:bold; }
  .locks { display:grid; grid-template-columns: repeat(3, 1fr); gap:10px; padding:20px; }
  .l-card { background:#111; border:2px solid #333; border-radius:10px; padding:20px 0; color:#fff; font-size:1.5rem; }
  .l-card.op { border-color:#2ecc71; color:#2ecc71; }
  .l-card small { display:block; font-size:0.6rem; }
  .foot { padding:0 20px; }
  .b { width:100%; padding:15px; border-radius:10px; border:none; color:#fff; font-weight:bold; }
  .r { background:#e74c3c; } .g { background:#2ecc71; }
  .txt { text-align:center; color:#e74c3c; font-weight:bold; }

  /* RADAR */
  .radar-box { display:flex; flex-direction:column; align-items:center; padding:40px; }
  .radar-circle { width:150px; height:150px; border:2px solid #f1c40f; border-radius:50%; position:relative; overflow:hidden; }
  .line { position:absolute; width:50%; height:2px; background:#f1c40f; top:50%; left:50%; transform-origin:left; animation: r 4s linear infinite; }
  @keyframes r { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
  .j-btn { margin-top:20px; background:#9b59b6; border:none; color:#fff; padding:10px 20px; border-radius:20px; }
  
  .log { position:fixed; bottom:0; width:100%; background:#000; padding:10px; color:#2ecc71; font-family:monospace; font-size:0.6rem; }
</style>