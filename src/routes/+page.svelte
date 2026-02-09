<script>
  import { onMount } from 'svelte';

  let geo = 39259;
  let tpCards = 10;
  let activeTab = 'MAP';
  let logs = ["Prêt pour l'infiltration tactique."];

  // Données de la société cible
  let target = {
    name: "BANQUE CENTRALE Z-01",
    loot: 42500,
    img: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1000"
  };

  // Logique des Cadenas (Hasard)
  // Chaque cadenas a un "code" (un chiffre entre 1 et 5)
  let locks = [
    { id: 1, solved: false, attempts: 0, secret: Math.floor(Math.random() * 5) + 1 },
    { id: 2, solved: false, attempts: 0, secret: Math.floor(Math.random() * 5) + 1 },
    { id: 3, solved: false, attempts: 0, secret: Math.floor(Math.random() * 5) + 1 }
  ];
  
  let heistStarted = false;

  function startInfiltration() {
    if (tpCards >= 1) {
      tpCards -= 1;
      heistStarted = true;
      logs = ["🔓 Infiltration commencée. Trouvez les points faibles des verrous...", ...logs];
    }
  }

  function tryLock(index) {
    if (!heistStarted || locks[index].solved) return;

    locks[index].attempts += 1;
    
    // Tirage au sort : 20% de chance de réussir à chaque clic (Hasard interne)
    let chance = Math.random();
    
    if (chance > 0.8) { 
      locks[index].solved = true;
      logs = [`✅ Verrou 0${index + 1} débloqué !`, ...logs];
    } else {
      logs = [`❌ Échec tentative sur cadenas 0${index + 1}...`, ...logs];
    }

    // Vérifier si tout est ouvert
    if (locks.every(l => l.solved)) {
      finishHeist();
    }
  }

  function finishHeist() {
    heistStarted = false;
    geo += target.loot;
    logs = [`💰 TERMINÉ ! Butin de ${target.loot} G récupéré.`, ...logs];
    // On réinitialise pour le prochain
    locks = locks.map(l => ({ ...l, solved: false, secret: Math.floor(Math.random() * 5) + 1 }));
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

  <section class="content">
    {#if activeTab === 'MAP'}
      <div class="map-placeholder">
        <div class="radar-circle"></div>
        <p>RECHERCHE DE CIBLES...</p>
      </div>
    {:else if activeTab === 'RAID'}
      <div class="heist-panel">
        <div class="banner">
          <img src={target.img} alt="Cible" />
          <div class="overlay">
            <h2>{target.name}</h2>
            <div class="loot-info">BUTIN DISPONIBLE : {target.loot} G</div>
          </div>
        </div>

        <div class="security-grid">
          <p class="instr">CLIQUEZ SUR LES CADENAS POUR TESTER LE CODE</p>
          <div class="grid">
            {#each locks as lock, i}
              <button class="lock-btn" class:open={lock.solved} on:click={() => tryLock(i)}>
                <div class="icon">{lock.solved ? '🔓' : '🔒'}</div>
                <div class="name">CADENAS 0{i+1}</div>
                <div class="status">{lock.solved ? 'OUVERT' : 'VERROUILLÉ'}</div>
              </button>
            {/each}
          </div>
        </div>

        <div class="footer">
          {#if !heistStarted}
            <button class="launch-btn" on:click={startInfiltration}>LANCER L'OPÉRATION (1 🎫)</button>
          {:else}
            <div class="active-msg">SÉCURITÉ EN COURS DE FORÇAGE...</div>
          {/if}
        </div>
      </div>
    {/if}
  </section>

  <div class="terminal">> {logs[0]}</div>
</main>

<style>
  :global(body) { margin:0; background:#000; color:white; font-family: 'Segoe UI', sans-serif; }
  header { height: 50px; display: flex; align-items: center; justify-content: space-between; padding: 0 15px; border-bottom: 1px solid #222; }
  .logo { font-weight: 900; color: #f1c40f; }
  
  .top-nav { display: flex; background: #080808; border-bottom: 2px solid #f1c40f; }
  .top-nav button { flex: 1; padding: 15px; background: none; border: none; color: #444; font-weight: bold; }
  .top-nav button.atv { color: #f1c40f; background: rgba(241,196,15,0.05); }

  .heist-panel { background: #000; }
  .banner { position: relative; height: 180px; border-bottom: 3px solid #e74c3c; }
  .banner img { width: 100%; height: 100%; object-fit: cover; opacity: 0.5; }
  .overlay { position: absolute; bottom: 15px; left: 15px; }
  .loot-info { color: #f1c40f; font-weight: bold; font-size: 1.1rem; }

  .security-grid { padding: 20px; }
  .instr { font-size: 10px; color: #666; text-align: center; margin-bottom: 20px; letter-spacing: 1px; }
  
  .grid { display: grid; grid-template-columns: 1fr 1fr; gap: 15px; }
  .lock-btn { 
    background: #111; border: 1px solid #333; padding: 20px; border-radius: 12px;
    color: white; transition: 0.2s; cursor: pointer;
  }
  .lock-btn.open { border-color: #2ecc71; background: rgba(46, 204, 113, 0
