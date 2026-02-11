<script>
  let logsMairie = "Social : L'Agence d'emploi a enregistré 3 nouvelles offres.";
  
  // Données basées sur ta capture "Caisse Solidaire"
  let niveauxCAS = [
    { niveau: 3, aide: 225000, beneficiaires: 2 },
    { niveau: 5, aide: 375000, beneficiaires: 4 },
    { niveau: 10, aide: 4039395000000, beneficiaires: 8 }
  ];

  // Système d'annonces (Agence d'emploi)
  let annoncesEmploi = [
    { entreprise: "Holding Bordo Tech", poste: "Directeur de Filiale", salaire: "50,000$/j + Primes" },
    { entreprise: "Banque Municipale", poste: "Analyste Risques", salaire: "45,000$/j" }
  ];

  function postuler(index) {
    logsMairie = `📩 CANDIDATURE : Vous avez postulé chez ${annoncesEmploi[index].entreprise}.`;
  }
</script>

<main style="background: #000; color: #eee; padding: 20px; font-family: 'Courier New', monospace;">
  
  <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
    
    <section style="background: #fff; color: #333; padding: 15px; border-radius: 8px;">
      <h3 style="color: #27ae60; font-size: 0.9rem; margin-top: 0;">🤝 CAISSE SOLIDAIRE (Bordo)</h3>
      <p style="font-size: 0.6rem; color: #666;">Les aides sont versées selon le niveau du bâtiment construit par l'Urbaniste.</p>
      
      <table style="width: 100%; font-size: 0.7rem; border-collapse: collapse; margin-top: 10px;">
        <tr style="background: #f4f4f4; text-align: left;">
          <th style="padding: 5px;">Niveau</th>
          <th>Aides ($)</th>
          <th>Bénéficiaires</th>
        </tr>
        {#each niveauxCAS as n}
          <tr style="border-bottom: 1px solid #eee;">
            <td style="padding: 5px;">{n.niveau}</td>
            <td style="font-weight: bold;">{n.aide.toLocaleString()}</td>
            <td>{n.beneficiaires}</td>
          </tr>
        {/each}
      </table>
    </section>

    <section style="background: #fff; color: #333; padding: 15px; border-radius: 8px;">
      <h3 style="color: #2980b9; font-size: 0.9rem; margin-top: 0;">📋 AGENCE D'EMPLOI</h3>
      {#each annoncesEmploi as job, i}
        <div style="border: 1px solid #ddd; padding: 10px; margin-bottom: 10px; border-radius: 4px;">
          <div style="display: flex; justify-content: space-between; align-items: center;">
            <b style="font-size: 0.75rem;">{job.entreprise}</b>
            <button on:click={() => postuler(i)} style="background: #2980b9; color: #fff; border: none; padding: 4px 8px; font-size: 0.6rem; cursor: pointer;">POSTULER</button>
          </div>
          <div style="font-size: 0.65rem; color: #34495e;">{job.poste}</div>
          <div style="font-size: 0.6rem; color: #27ae60;">{job.salaire}</div>
        </div>
      {/each}
    </section>

  </div>

  <footer style="margin-top: 20px; border-top: 1px solid #333; padding-top: 10px; font-size: 0.7rem; color: #f1c40f;">
    > {logsMairie}
  </footer>
</main>
