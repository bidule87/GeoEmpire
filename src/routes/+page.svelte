<script>
  // --- ETAT GLOBAL ---
  let geo = 39259;
  let tpCards = 10;
  let crowns = 0;
  let gTokens = 5000;
  let jumps = 0;
  let isElite = false;
  
  let activeTab = 'RAID';
  let logs = ["Système Empire chargé."];

  // --- MINI-JEU RAID ---
  let target = { name: "BANQUE CENTRALE", loot: 42500, img: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1000" };
  let locks = [{id:0, s:false, ok:false}, {id:1, s:false, ok:false}, {id:2, s:false, ok:false}];
  let heistStarted = false;
  let winReady = false;

  function startInfiltration() {
    if (tpCards >= 1) {
      tpCards--; heistStarted = true; winReady = false;
      let rand = [0,1,2].sort(() => Math.random() - 0.5);
      locks = locks.map((l, i) => ({ ...l, s: false, ok: rand.slice(0,2).includes(i) }));
      logs = ["🔓 Infiltration réussie. Trouvez les 2 points faibles.", ...logs];
    }
  }

  function tryLock(i) {
    if (!heistStarted || locks[i].s || winReady) return;
    if (locks[i].ok) {
      locks[i].s = true; locks = [...locks];
      if (locks.filter(l => l.s).length >= 2) { winReady = true; logs = ["💰 ACCÈS TOTAL !", ...logs]; }
    } else { logs = ["❌ Verrou renforcé.", ...logs]; }
  }

  function handleBuy(name, type, qty) {
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
    <button class:atv={activeTab==='RA