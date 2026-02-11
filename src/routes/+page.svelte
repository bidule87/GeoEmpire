<script>
  // Variables dynamiques à charger selon le serveur/joueur
  export let nomVille = "Bordo"; // Sera remplacé par la ville du joueur
  let logsMairie = "Administration : Prêt à ajuster les paliers de solidarité.";
  
  // Paramètres modifiables par le Maire ou le Banquier
  let seuilEligibilite = 1000000; 
  let budgetTotalCAS = 50000000;

  // Données de ta capture, maintenant modifiables
  let niveauxCAS = [
    { niveau: 3, aide: 225000, beneficiaires: 2 },
    { niveau: 5, aide: 375000, beneficiaires: 4 },
    { niveau: 10, aide: 4039395000000, beneficiaires: 8 }
  ];

  function ajusterAide(index, nouveauMontant) {
    niveauxCAS[index].aide = nouveauMontant;
    logsMairie = `⚙️ MAJ : Niveau ${niveauxCAS[index].niveau} ajusté à ${nouveauMontant.toLocaleString()} $`;
  }
</script>

<main style="background: #000; color: #eee; padding: 20px; font-family: 'Courier New', monospace; min-height: 100vh;">
  
  <header style="border-bottom: 2px solid #27ae60; padding-bottom: 15px; margin-bottom: 25px;">
    <h2 style="color: #27ae60; margin: 0; font-size: 1.2rem;">🤝 CAISSE DE SOLIDARITÉ - {nomVille.toUpperCase()}</h2>
    <div style="display: flex; justify-content: space-between; margin-top: 10px; font-size: 0.7rem; color: #888;">
      <span>Responsable : BANQUIER MUNICIPAL</span>
      <span>Budget CAS : <b style="color: #2ecc71;">{budgetTotalCAS.toLocaleString()} $</b></span>
    </div>
  </header>

  <section style="background: #0a0a0a; border: 1px solid #333; padding: 20px; margin-bottom: 20px;">
    <h3 style="color: #f1c40f; font-size: 0.8rem; margin-top: 0;">🛠️ CONFIGURATION DES AIDES</h3>
    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
      <div>
        <label style="font-size: 0.6rem; color: #666;">SEUIL D'ÉLIGIBILITÉ (CAPITAL MAX)</label>
        <input type="number" bind:value={seuilEligibilite} style="width: 100%; background: #111; color: #fff; border: 1px solid #444; padding: 5px; margin-top: 5px;">
      </div>
      <p style="font-size: 0.6rem; color: #555; align-self: end;">
        Les joueurs ayant plus de {seuilEligibilite.toLocaleString()} $ ne peuvent plus prétendre aux aides.
      </p>
    </div>
  </section>

  <section style="background: #0a0a0a; border: 1px solid #222; padding: 15px;">
    <table style="width: 100%; font-size: 0.75rem; border-collapse: collapse;">
      <thead>
        <tr style="text-align: left; color: #27ae60; border-bottom: 1px solid #27ae60;">
          <th style="padding: 10px;">Niveau Bâtiment</th>
          <th style="padding: 10px;">Montant de l'aide ($)</th>
          <th style="padding: 10px;">Bénéficiaires Max</th>
        </tr>
      </thead>
      <tbody>
        {#each niveauxCAS as n, i}
          <tr style="border-bottom: 1px solid #111;">
            <td style="padding: 10px;">NIVEAU {n.niveau}</td>
            <td style="padding: 10px;">
              <input type="number" bind:value={n.aide} on:change={() => ajusterAide(i, n.aide)} 
                style="background: #000; color: #2ecc71; border: 1px solid #222; padding: 3px; width: 120px; font-weight: bold;">
            </td>
            <td style="padding: 10px; color: #888;">{n.beneficiaires} joueurs / jour</td>
          </tr>
        {/each}
      </tbody>
    </table>
  </section>

  <footer style="position: fixed; bottom: 0; left: 0; width: 100%; background: #050505; padding: 10px; color: #27ae60; font-size: 0.7rem; border-top: 1px solid #222;">
    > {logsMairie}
  </footer>
</main>
