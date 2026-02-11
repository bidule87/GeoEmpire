<script>
  let logsMairie = "Système : Prêt à l'emploi.";

  // Données exactes de ta capture "Caisse Solidaire de Bordo"
  let niveauxCAS = [
    { niveau: 3, aide: 225000, beneficiaires: 2 },
    { niveau: 4, aide: 300000, beneficiaires: 3 },
    { niveau: 5, aide: 375000, beneficiaires: 4 },
    { niveau: 6, aide: 450000, beneficiaires: 5 },
    { niveau: 7, aide: 525000, beneficiaires: 6 },
    { niveau: 8, aide: 20025000000, beneficiaires: 7 },
    { niveau: 9, aide: 30550000000, beneficiaires: 7 },
    { niveau: 10, aide: 4039395000000, beneficiaires: 8 }
  ];
</script>

<main style="background: #f4f7f6; padding: 20px; font-family: sans-serif;">
  <section style="background: #fff; padding: 15px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
    <h3 style="color: #27ae60; margin-top: 0;">🤝 Caisse solidaire de Bordo</h3>
    <p style="font-size: 0.8rem; color: #666;">Aides versées par votre ville :</p>
    
    <table style="width: 100%; font-size: 0.7rem; border-collapse: collapse; margin-top: 10px;">
      <thead>
        <tr style="background: #f4f4f4; text-align: left;">
          <th style="padding: 10px; border-bottom: 2px solid #ddd;">Niveau</th>
          <th style="padding: 10px; border-bottom: 2px solid #ddd;">Aides ($)</th>
          <th style="padding: 10px; border-bottom: 2px solid #ddd;">Bénéficiaires</th>
        </tr>
      </thead>
      <tbody>
        {#each niveauxCAS as n}
          <tr style="border-bottom: 1px solid #eee;">
            <td style="padding: 10px;">{n.niveau}</td>
            <td style="padding: 10px; font-weight: bold;">{n.aide.toLocaleString()} $</td>
            <td style="padding: 10px;">{n.beneficiaires}</td>
          </tr>
        {/each}
      </tbody>
    </table>
  </section>
</main>
