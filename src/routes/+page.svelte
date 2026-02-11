<script>
  let capitalHolding = 1500000;
  let dettesActuelles = 0;
  let tabActuel = "Banque";
  let isPrestige = false;
  let logs = "Système Bancaire : Prêt pour financement.";

  // Paramètres Banque
  let capacitéEmprunt = 10000000; // Basé sur le patrimoine total
  let montantDemande = 0;

  function contracterPret() {
    if (montantDemande + dettesActuelles <= capacitéEmprunt) {
      capitalHolding += montantDemande;
      dettesActuelles += montantDemande * (isPrestige ? 1.05 : 1.15); // +5% ou +15% d'intérêt
      logs = `🏦 PRÊT ACCORDÉ : +${montantDemande.toLocaleString()} $. Dette totale : ${dettesActuelles.toLocaleString()} $.`;
      montantDemande = 0;
    } else {
      logs = "⚠️ REFUS BANCAIRE : Capacité d'endettement dépassée.";
    }
  }
</script>

<main style="background: #000; color: #eee; min-height: 100vh; font-family: 'Courier New', monospace;">
  
  <nav style="display: flex; background: #111; border-bottom: 1px solid #333;">
    {#each ['Acheter', 'Assurance', 'Banque', 'Info'] as t}
      <button on:click={() => tabActuel = t} style="flex: 1; padding: 15px; background: {tabActuel === t ? '#222' : 'none'}; color: {tabActuel === t ? '#3498db' : '#666'}; border: none; cursor: pointer; font-weight: bold; border-bottom: 2px solid {tabActuel === t ? '#3498db' : 'transparent'};">
        {t.toUpperCase()}
      </button>
    {/each}
  </nav>

  <div style="padding: 20px;">
    {#if tabActuel === 'Banque'}
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
        
        <div style="background: #0a0a0a; border: 1px solid #222; padding: 20px; border-radius: 8px;">
          <h2 style="color: #3498db; font-size: 0.9rem; margin-bottom: 20px;">SOLLICITER UN FINANCEMENT</h2>
          
          <p style="font-size: 0.7rem; color: #555;">MONTANT DU PRÊT ($)</p>
          <input type="number" bind:value={montantDemande} style="width: 100%; background: #000; border: 1px solid #333; color: #fff; padding: 10px; font-size: 1.2rem; margin-bottom: 20px;" />
          
          <div style="font-size: 0.75rem; color: #888; margin-bottom: 20px;">
            Capacité restante : <b style="color: #2ecc71;">{(capacitéEmprunt - dettesActuelles).toLocaleString()} $</b><br>
            Taux appliqué : <b style="color: #f1c40f;">{isPrestige ? '5% (Prestige)' : '15% (Standard)'}</b>
          </div>

          <button on:click={contracterPret} style="width: 100%; padding: 15px; background: #3498db; color: #000; border: none; font-weight: bold; cursor: pointer;">
            VALIDER L'EMPRUNT
          </button>
        </div>

        <div style="background: #0a0a0a; border: 1px solid #222; padding: 20px; border-radius: 8px; border-left: 4px solid #e74c3c;">
          <h2 style="color: #e74c3c; font-size: 0.9rem; margin-bottom: 20px;">ÉTAT D'ENDETTEMENT</h2>
          <div style="font-size: 2rem; font-weight: bold; color: #fff;">{dettesActuelles.toLocaleString()} $</div>
          <p style="font-size: 0.7rem; color: #444; margin-top: 10px;">Le remboursement est calculé sur vos bénéfices du dimanche minuit.</p>
        </div>

      </div>
    {/if}
  </div>

  <footer style="position: fixed; bottom: 0; width: 100%; background: #000; color: #2ecc71; padding: 10px; font-family: monospace; font-size: 0.7rem; border-top: 1px solid #222;">
    > {logs}
  </footer>
</main>
