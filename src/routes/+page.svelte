<script>
  import { onMount } from 'svelte';

  let capitalHolding = 100000; 
  let logs = "GEO EMPIRE : Systèmes fiscaux synchronisés.";

  // CONFIGURATION MAIRIE (Modifiable par l'équipe du maire)
  let taxeMunicipaleFixe = 500; // Retiré chaque minuit par entité
  let tauxImpotBenefice = 0.25; // 25% chaque dimanche sur le profit hebdomadaire

  // DONNÉES DE JEU
  let beneficeSemaineAccumule = 0;
  
  let filiales = [
    { id: 1, nom: "Acier 1", type: "Entreprise", gainJour: 8500 },
    { id: 2, nom: "Alpha Holding", type: "Holding", gainJour: 15000 }
  ];

  // LOGIQUE DE MINUIT (TOUS LES JOURS)
  function cycleMinuitQuotidien() {
    let nbEntites = filiales.length + 1; // Filiales + la Holding principale
    let totalTaxeMairie = nbEntites * taxeMunicipaleFixe;
    
    capitalHolding -= totalTaxeMairie;
    logs = `🏛️ MINUIT : La mairie a prélevé ${totalTaxeMairie}$ (${nbEntites} entités).`;
  }

  // LOGIQUE DU DIMANCHE (HEBDOMADAIRE)
  function cycleDimancheMinuit() {
    let impotIS = beneficeSemaineAccumule * tauxImpotBenefice;
    capitalHolding -= impotIS;
    
    logs = `⚖️ DIMANCHE : Impôt sur les bénéfices prélevé : -${impotIS.toLocaleString()}$`;
    beneficeSemaineAccumule = 0; // Reset pour la semaine suivante
  }

  // SIMULATION DU FLUX DE TRÉSORERIE
  onMount(() => {
    const interval = setInterval(() => {
      // Gain par seconde basé sur les revenus journaliers
      let gainTotalJour = filiales.reduce((acc, f) => acc + f.gainJour, 0);
      let gainTick = gainTotalJour / 3600; 

      capitalHolding += gainTick;
      beneficeSemaineAccumule += gainTick;
    }, 1000);
    return () => clearInterval(interval);
  });
</script>

<main style="background: #000; color: #eee; min-height: 100vh; font-family: sans-serif;">
  
  <header style="background: #111; padding: 20px; border-bottom: 3px solid #f1c40f; display: flex; justify-content: space-between;">
    <div>
      <h1 style="margin:0; font-size: 0.8rem; color: #555;">ÉTAT FINANCIER EMPIRE</h1>
      <div style="font-size: 1.6rem; font-weight: bold; color: #f1c40f;">
        {capitalHolding.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})} $
      </div>
    </div>
    <div style="text-align: right;">
      <span style="font-size: 0.6rem; color: #666; display: block;">BÉNÉFICE SEMAINE</span>
      <b style="color: #2ecc71;">+ {beneficeSemaineAccumule.toLocaleString(undefined, {maximumFractionDigits: 0})} $</b>
    </div>
  </header>

  <div style="padding: 15px;">
    
    <div style="display: flex; gap: 10px; margin-bottom: 20px;">
      <div style="flex: 1; background: #0a0a0a; border: 1px solid #222; padding: 15px; border-radius: 8px;">
        <p style="font-size: 0.7rem; color: #555; margin: 0;">TAXE MAIRIE (JOUR)</p>
        <b style="color: #e74c3c;">-{taxeMunicipaleFixe} $ / entité</b>
      </div>
      <div style="flex: 1; background: #0a0a0a; border: 1px solid #222; padding: 15px; border-radius: 8px;">
        <p style="font-size: 0.7rem; color: #555; margin: 0;">IMPÔT BÉNÉFICE (DIM)</p>
        <b style="color: #f1c40f;">{tauxImpotBenefice * 100} %</b>
      </div>
    </div>

    <div style="background: #111; padding: 15px; border-radius: 8px; border: 1px solid #333; margin-bottom: 20px;">
      <p style="font-size: 0.7rem; color: #888; text-align: center; margin-bottom: 10px;">ACTIONS MAIRIE (TEST)</p>
      <div style="display: flex; gap: 10px;">
        <button on:click={cycleMinuitQuotidien} style="flex: 1; padding: 10px; background: #222; color: #eee; border: 1px solid #444; cursor: pointer; font-size: 0.7rem;">SIMULER MINUIT</button>
        <button on:click={cycleDimancheMinuit} style="flex: 1; padding: 10px; background: #e74c3c; color: #fff; border: none; font-weight: bold; cursor: pointer; font-size: 0.7rem;">SIMULER DIMANCHE</button>
      </div>
    </div>

    {#each filiales as f}
      <div style="background: #0a0a0a; border: 1px solid #222; padding: 15px; border-radius: 8px; margin-bottom: 10px; display: flex; justify-content: space-between; align-items: center;">
        <div>
          <b style="color: #fff; display: block;">{f.nom}</b>
          <small style="color: #444;">{f.type}</small>
        </div>
        <div style="text-align: right;">
          <span style="color: #2ecc71; font-size: 0.8rem;">+{f.gainJour} $ / jour</span>
          <span style="display: block; color: #e74c3c; font-size: 0.7rem;">Taxe Mairie: -{taxeMunicipaleFixe} $</span>
        </div>
      </div>
    {/each}

  </div>

  <footer style="position: fixed; bottom: 0; width: 100%; background: #000; color: #2ecc71; padding: 10px; font-family: monospace; font-size: 0.7rem; border-top: 1px solid #222;">
    > {logs}
  </footer>
</main>
