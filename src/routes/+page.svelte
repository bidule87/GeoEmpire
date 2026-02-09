<script>
  import { onMount } from 'svelte';

  let geo = 39259;
  let tpCards = 10;
  let activeTab = 'MAP';
  let logs = ["Système synchronisé. Prêt pour l'infiltration."];

  // GPS
  let lat = 45.8336;
  let lon = 1.2611;
  let mapUrl = `https://www.openstreetmap.org/export/embed.html?bbox=${(lon-0.005).toFixed(4)},${(lat-0.003).toFixed(4)},${(lon+0.005).toFixed(4)},${(lat+0.003).toFixed(4)}&layer=mapnik&marker=${lat.toFixed(4)},${lon.toFixed(4)}`;

  // État du Braquage
  let lock1 = 0; let lock2 = 0; let lock3 = 0;
  let heistActive = false;
  let decayInterval;

  function startHeist() {
    if (tpCards >= 1 && !heistActive) {
      tpCards -= 1;
      heistActive = true;
      lock1 = 0; lock2 = 0; lock3 = 0;
      logs = ["⚠️ INFILTRATION EN COURS... Cliquez vite sur les verrous !", ...logs];
      
      decayInterval = setInterval(() => {
        if (lock1 > 0) lock1 -= 1.2;
        if (lock2 > 0) lock2 -= 1.2;
        if (lock3 > 0) lock3 -= 1.2;
      }, 1000);
    }
  }

  function tapLock(id) {
    if (!heistActive) return;
    if (id === 1 && lock1 < 100) lock1 += 8;
    if (id === 2 && lock2 < 100) lock2 += 8;
    if (id === 3 && lock3 < 100) lock3 += 8;

    if (lock1 >= 100 && lock2 >= 100 && lock3 >= 100) {
      completeHeist();
    }
  }

  function completeHeist() {
    heistActive = false;
    clearInterval(decayInterval);
    let win = 15000;
    geo += win;
    logs = [`💰 SUCCÈS ! +${win} G récoltés.`, ...logs];
  }

  onMount(() => {
    return () => clearInterval(decayInterval);
  });
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
    <button class:atv={activeTab==='MAP'} on:click={()=>activeTab='MAP'}>📍 MAP</button>
    <button class:atv={activeTab==='RAID'} on:click={()=>activeTab='RAID'}>🏴‍☠️ RAID</button>
  </nav>

  <div class="view">
    {#if activeTab === 'MAP'}
      <div class="map-box">
        <iframe title="Map" src={mapUrl}></iframe>
        <div class="radar-circle"></div>
        <div class="marker-dot" style="top:40%; left:45%"><span class="icon">🥖</span></div>
      </div>

    {:else if activeTab === 'RAID'}
      <div class="heist-screen">
        <div class="target-header">
          <img src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1000" alt="Bank" />
          <div class="target-overlay">
            <h2>BANQUE CENTRALE Z-01</h2>
            <span class="badge">SÉCURITÉ : ÉLEVÉE 🛡️</span>
          </div>
        </div>

        <div class="security-panel">
          <p class="panel-title">SYSTÈME DE SÉCURITÉ EN LIGNE</p>
          
          {#each [{v:lock1, n:'01'}, {v:lock2, n:'02'}, {v:lock3, n:'03'}] as lock, i}
            <div class="lock-row">
              <span class="lock-label">CADENAS {lock.n}</span>
              <div class="bar-container">
                <div class="bar-fill" style="width: {lock.v}%"></div>
              </div>
              <button class="hack-btn" on:click={() => tapLock(i+1)}>FORCER LE VERROU</button>
            </div>
          {/each}
        </div>

        <div class="footer-btns">
          <button class="btn-cancel" on:click={() => {heistActive=false; clearInterval(decayInterval);}}>ANNULER</button>
          <button class="btn-start" class:active={heistActive} on:click={startHeist}>
            {heistActive ? 'DÉCRYPTAGE NEURAL...' : 'LANCER LE BRAQUAGE (1 🎫)'}
          </button>
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
  .stats { font-weight: bold; font-size: 0.8rem; }
  
  .top-nav { display: flex; background: #080808; border-bottom: 2px solid #f1c40f; }
  .top-nav button { flex: 1; padding: 15px; background: none; border: none; color: #444; font-weight: bold; font-size: 0.7rem; }
  .top-nav button.atv { color: #f1c40f; background: rgba(241,196,15,0.1); }

  .view { height: calc(100vh - 100px); overflow-y: auto; }
  .map-box { width: 100%; height: 100%; position: relative; }
  iframe { width: 100%; height: 100%; border: none; filter: invert(90%) hue-rotate(180deg) brightness(0.7); }

  .radar-circle { position: absolute; top:50%; left:50%; transform:translate(-50%,-50%); width: 220px; height: 220px; border: 2px solid #f1c40f; border-radius: 50%; pointer-events: none; box-shadow: 0 0 15px rgba(241,196,15,0.3); }

  .heist-screen { background: #000; min-height: 100%; }
  .target-header { position: relative; height: 180px; width: 100%; overflow: hidden; border-bottom: 2px solid #e74c3c; }
  .target-header img { width: 100%; height: 100%; object-fit: cover; opacity: 0.6; }
  .target-overlay { position: absolute; bottom: 15px; left: 15px; }
  .badge { background: #e74c3c; font-size: 10px; padding: 3px 6px; border-radius: 3px; font-weight: bold; }

  .security-panel { padding: 15px; }
  .panel-title { font-size: 12px; font-weight: bold; margin-bottom: 15px; color: #fff; }
  .lock-row { margin-bottom: 20px; background: #111; padding: 10px; border-radius: 5px; border-left: 3px solid #e74c3c; }
  .lock-label { font-size: 10px; color: #888; display: block; margin-bottom: 5px; }
  
  .bar-container { height: 8px; background: #222; border-radius: 4px; overflow: hidden; margin-bottom: 10px; }
  .bar-fill { height: 100%; background: linear-gradient(to right, #e74c3c, #f1c40f); transition: width 0.2s; }
  
  .hack-btn { background: none; border: 1px solid #e74c3c; color: #e74c3c; font-size: 9px; padding: 5px 10px; border-radius: 3px; font-weight: bold; }
  
  .footer-btns { display: flex; gap: 10px; padding: 15px; }
  .btn-cancel { flex: 1; background: #333; border: none; color: white; padding: 12px; border-radius: 5px; }
  .btn-start { flex: 2; background: #e74c3c; border: none; color: white; padding: 12px; border-radius: 5px; font-weight: bold; }
  .btn-start.active { background: #222; color: #e74c3c; border: 1px solid #e74c3c; }

  .terminal { position: fixed; bottom: 10px; left: 15px; font-size: 9px; color: #2ecc71; pointer-events: none; }
</style>
