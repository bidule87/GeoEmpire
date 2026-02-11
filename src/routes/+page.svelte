<script>
  import { onMount } from 'svelte';

  let capitalHolding = 6157.92;
  let logs = "GEO EMPIRE : Prêt pour expansion.";
  let beneficeSemaineAccumule = 0;

  // PARAMÈTRES FISCAUX (Mairie)
  let taxeMunicipaleFixe = 500; 
  let tauxImpotBenefice = 0.20;

  // NOTRE EMPIRE
  let filiales = [
    { id: 1, nom: "Acier 1", type: "Entreprise", gainJour: 8500 }
  ];

  // CATALOGUE D'ACHAT
  const catalogue = [
    { type: "Entreprise", nom: "PME Locale", prix: 15000, gain: 2500 },
    { type: "Entreprise", nom: "Usine Textile", prix: 50000, gain: 12000 },
    { type: "Holding", nom: "Fond d'Investissement", prix: 150000, gain: 45000 }
  ];

  function acheter(item) {
    if (capitalHolding >= item.prix) {
      capitalHolding -= item.prix;
      const newId = filiales.length + 1;
      filiales = [...filiales, { 
        id: newId, 
        nom: `${item.nom} #${newId}`, 
        type: item.type, 
        gainJour: item.gain 
      }];
      logs = `Achat réussi : ${item.nom} intégrée à l'empire.`;
    } else {
      logs = "ERREUR : Fonds insuffisants pour cet achat !";
    }
  }

  // LOGIQUE DE FLUX (Tick chaque seconde)
  onMount(() => {
    const interval = setInterval(() => {
      let gainTotalJour = filiales.reduce((acc, f) => acc + f.gainJour, 0);
      let gainTick = gainTotalJour / 3600; 
      capitalHolding += gainTick;
      beneficeSemaineAccumule += gainTick;
    }, 1000);
    return () => clearInterval(interval);
  });
</script>

<main style="background: #000; color: #eee; min-height: 100vh; font-family: sans-serif;">
  
  <header style="background: #111; padding: 20px; border-bottom: 3px solid #2ecc71; display: flex; justify-content: space-between; align-items: center;">
    <div>
      <h1 style="margin:0; font-size: 0.8rem; color: #555; text-transform: uppercase;">Expansion Empire</h1>
      <div style="font-size: 1.6rem; font-weight: bold; color: #2ecc71;">{capitalHolding.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})} $</div>
    </div>
    <div style="text-align: right;">
      <span style="display: block; font-size: 0.6rem; color: #666;">COÛT MAIRIE / JOUR</span>
      <b style="color: #e74c3c;">-{(filiales.length * taxeMunicipaleFixe).toLocaleString()} $</b>
    </div>
  </header>

  <div style="padding: 15px;">
    
    <h2 style="font-size: 0.8rem; color: #555; margin-bottom: 10px; text-transform: uppercase;">Catalogue d'Acquisition</h2>
    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-bottom: 30px;">
      {#each catalogue as item}
        <button 
          on:click={() => acheter(item)}
          style="background: #0a0a0a; border: 1px solid #333; padding: 15px; border-radius: 8px; text-align: left; cursor: pointer; transition: 0.2s;"
        >
          <b style="color: #fff; display: block; font-size: 0.9rem;">{item.nom}</b>
          <span style="color: #2ecc71; font-size: 0.8rem; display: block;">+{item.gain}$ / jour</span>
          <span style="color: #f1c40f; font-size: 0.8rem; font-weight: bold; display: block; margin-top: 10px;">Prix: {item.prix.toLocaleString()} $</span>
        </button>
      {/each}
    </div>

    <h2 style="font-size: 0.8rem; color: #555; margin-bottom: 10px; text-transform: uppercase;">Vos Filiales ({filiales.length})</h2>
    {#each filiales as f}
      <div style="background: #0a0a0a; border: 1px solid #222; padding: 15px; border-radius: 8px; margin-bottom: 10px; display: flex; justify-content: space-between; align-items: center;">
        <div>
          <b style="color: #eee;">{f.nom}</b>
          <div style="font-size: 0.6rem; color: #444; text-transform: uppercase; margin-top: 2px;">{f.type}</div>
        </div>
        <div style="text-align: right;">
          <span style="color: #2ecc71; font-weight: bold;">+{f.gainJour} $</span>
        </div>
      </div>
    {/each}

  </div>

  <footer style="position: fixed; bottom: 0; width: 100%; background: #000; color: #2ecc71; padding: 10px; font-family: monospace; font-size: 0.7rem; border-top: 1px solid #222;">
    > {logs}
  </footer>
</main>
