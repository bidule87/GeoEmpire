<script>
  export let nomVille = "Bordo"; // Adapté selon la géoloc du Maire
  
  // Flux alimenté par les actions "CRÉER" des joueurs locaux
  let nouvellesActivites = [
    { heure: "14:22", proprietaire: "Lucas_87", type: "ENTREPRISE", nom: "Limo-Tech", statut: "ACTIF" },
    { heure: "15:45", proprietaire: "Holding_Elite", type: "HOLDING", nom: "Elite Global", statut: "EN CONSTRUCTION" },
    { heure: "17:10", proprietaire: "Sarah_V", type: "ENTREPRISE", nom: "Bio-Food", statut: "ACTIF" }
  ];

  let totalEntreprises = 142;
  let totalHoldings = 28;
</script>

<main style="background: #000; color: #eee; padding: 25px; font-family: 'Courier New', monospace; min-height: 100vh;">
  
  <header style="border-bottom: 2px solid #3498db; padding-bottom: 15px; margin-bottom: 30px; display: flex; justify-content: space-between;">
    <div>
      <h2 style="color: #3498db; margin: 0; font-size: 1.1rem; letter-spacing: 2px;">📊 CABINET DU MAIRE - {nomVille.toUpperCase()}</h2>
      <p style="font-size: 0.6rem; color: #666; margin-top: 5px;">SURVEILLANCE DU DÉVELOPPEMENT LOCAL</p>
    </div>
    <div style="text-align: right;">
      <span style="font-size: 0.5rem; color: #444;">POPULATION ÉCONOMIQUE</span>
      <div style="font-size: 0.8rem; color: #fff;">{totalEntreprises + totalHoldings} UNITÉS</div>
    </div>
  </header>

  <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 30px;">
    <div style="background: #0a0a0a; border: 1px solid #222; padding: 15px; border-left: 4px solid #2ecc71;">
      <span style="font-size: 0.5rem; color: #555;">ENTREPRISES ACTIVES</span>
      <div style="font-size: 1.2rem; color: #fff;">{totalEntreprises}</div>
    </div>
    <div style="background: #0a0a0a; border: 1px solid #222; padding: 15px; border-left: 4px solid #f1c40f;">
      <span style="font-size: 0.5rem; color: #555;">HOLDINGS ENREGISTRÉES</span>
      <div style="font-size: 1.2rem; color: #fff;">{totalHoldings}</div>
    </div>
  </div>

  <section style="background: #050505; border: 1px solid #111; padding: 15px;">
    <h3 style="font-size: 0.7rem; color: #888; margin-bottom: 15px;">🕒 DERNIÈRES ENTRÉES AU REGISTRE</h3>
    
    {#each nouvellesActivites as activite}
      <div style="display: flex; justify-content: space-between; padding: 10px; border-bottom: 1px solid #111; font-size: 0.75rem;">
        <span style="color: #444;">[{activite.heure}]</span>
        <span style="color: #eee;"><b>{activite.nom}</b> ({activite.type})</span>
        <span style="color: #3498db;">Par: {activite.proprietaire}</span>
        <span style="color: {activite.statut === 'ACTIF' ? '#2ecc71' : '#f1c40f'}; font-size: 0.6rem;">● {activite.statut}</span>
      </div>
    {/each}
  </section>

  <footer style="margin-top: 30px; font-size: 0.6rem; color: #444; font-style: italic;">
    > Le Maire perçoit une taxe de fondation de 2% sur chaque création effectuée dans son rayon GPS.
  </footer>

</main>
