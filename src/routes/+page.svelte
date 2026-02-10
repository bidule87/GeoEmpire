<script>
  // --- ÉTAT DE LA HOLDING ---
  let capitalHolding = 150000;
  let logs = "Système Holding prêt pour les injections et primes.";

  // --- FILIALES ---
  let filiales = [
    { 
      id: 1, 
      nom: "Acier 1", 
      treso: 12500,
      primeDirecteur: 1500,
      marketing: 3,
      ongletActif: 'situation',
      biens: [{ id: 101, nom: "Entrepôt Forge", valeur: 85000, type: "LOCATION", marge: 10 }]
    }
  ];

  // Injection de cash : Holding -> Filiale
  function injecterCash(filialeId, montant) {
    if (capitalHolding >= montant) {
      capitalHolding -= montant;
      let f = filiales.find(f => f.id === filialeId);
      f.treso += montant;
      filiales = [...filiales];
      logs = `Injection de ${montant}$ réussie dans ${f.nom}.`;
    } else {
      logs = "Fonds insuffisants dans la Holding !";
    }
  }

  // Payer la prime : Filiale -> Directeur
  function payerPrime(filialeId) {
    let f = filiales.find(f => f.id === filialeId);
    if (f.treso >= f.primeDirecteur) {
      f.treso -= f.primeDirecteur;
      filiales = [...filiales];
      logs = `Prime de ${f.primeDirecteur}$ payée par ${f.nom}.`;
    } else {
      logs = `Trésorerie insuffisante dans ${f.nom} pour la prime !`;
    }
  }
</script>

<main>
  <header class="holding-header">
    <div class="info">
      <h1>🏦 GESTION HOLDING</h1>
      <p>CAPITAL GLOBAL: <span class="gold">{capitalHolding.toLocaleString()} $ ∅</span></p>
    </div>
  </header>

  <div class="content">
    {#each filiales as fil}
      <section class="filiale-node">
        <header>
          <h2>{fil.nom}</h2>
          <div class="quick-actions">
            <button class="btn-inj" on:click={() => injecterCash(fil.id, 5000)}>+ Injecter 5k$</button>
          </div>
        </header>

        <nav class="tabs">
          <button class:active={fil.ongletActif === 'situation'} on:click={() => fil.ongletActif = 'situation'}>SITUATION</button>
          <button class:active={fil.ongletActif === 'business'} on:click={() => fil.ongletActif = 'business'}>BUSINESS</button>
        </nav>

        <div class="body">
          {#if fil.ongletActif === 'situation'}
            <div class="details">
              <div class="row"><span>Trésorerie filiale :</span> <b>{fil.treso.toLocaleString()} $</b></div>
              <div class="row">
                <span>Prime Directeur :</span> 
                <div class="prime-control">
                  <input type="number" bind:value={fil.primeDirecteur}>
                  <button on:click={() => payerPrime(fil.id)}>PAYER</button>
                </div>
              </div>
            </div>
          {:else}
            <div class="details">
              {#each fil.biens as bien}
                <div class="item">
                  <span>{bien.nom}</span>
                  <input type="range" min="-20" max="20" bind:value={bien.marge}>
                  <span>Marge: {bien.marge}%</span>
                </div>
              {/each}
            </div>
          {/if}
        </div>
      </section>
    {/each}
  </div>

  <div class="console">> {logs}</div>
</main>

<style>
  :global(body) { background: #050505; color: #ddd; font-family: 'Inter', sans-serif; margin: 0; }
  .holding-header { background: #111; padding: 20px; border-bottom: 2px solid #f1c40f; }
  .gold { color: #f1c40f; font-weight: bold; font-size: 1.2rem; }
  
  .content { padding: 20px; }
  .filiale-node { background: #0a0a0a; border: 1px solid #222; border-radius: 8px; margin-bottom: 20px; overflow: hidden; }
  .filiale-node header { padding: 15px; display: flex; justify-content: space-between; align-items: center; background: #151515; }
  
  .btn-inj { background: #27ae60; color: white; border: none; padding: 5px 10px; border-radius: 4px; cursor: pointer; font-weight: bold; }
  
  .tabs { display: flex; background: #080808; border-bottom: 1px solid #1a1a1a; }
  .tabs button { flex: 1; padding: 12px; background: none; border: none; color: #555; cursor: pointer; font-weight: bold; }
  .tabs button.active { color: #f1c40f; background: #111; border-bottom: 2px solid #f1c40f; }

  .body { padding: 15px; }
  .row { display: flex; justify-content: space-between; align-items: center; padding: 10px 0; border-bottom: 1px solid #111; }
  
  .prime-control { display: flex; gap: 10px; }
  .prime-control input { background: #222; border: 1px solid #333; color: white; width: 80px; padding: 3px; }
  .prime-control button { background: #f1c40f; border: none; padding: 3px 10px; font-weight: bold; cursor: pointer; }

  .console { position: fixed; bottom: 0; width: 100%; padding: 10px; background: #000; color: #2ecc71; border-top: 1px solid #222; font-family: monospace; font-size: 0.8rem; }
</style>
