<script>
  let capitalHolding = 15000000000; // 15 Milliards pour tester
  let isPrestige = false; // Toggle pour tester les deux modes
  let logs = "GEO EMPIRE : Système de compte Standard actif.";
  let categorieActuelle = "Bureaux";

  // Simulation du timer de refresh (toutes les heures)
  let tempsRestant = "59:54"; 

  // Générateur de bien
  function genererBien(cat) {
    const p = (Math.floor(Math.random() * 50) + 1) * 100000;
    return { id: Math.random(), n: `${cat} Type ${Math.floor(Math.random()*99)}`, p, l: p*0.03, c: p*0.005, i: p*0.002 };
  }

  // Catalogue limité pour Standard
  let catalogueStandard = Array.from({length: 3}, () => genererBien("Bureaux"));

  function acheterStandard(bien, index) {
    if (capitalHolding >= bien.p) {
      capitalHolding -= bien.p;
      // En standard, le slot devient "VENDU" jusqu'au prochain refresh
      catalogueStandard[index] = { ...bien, vendu: true };
      logs = `Achat effectué. Slot épuisé jusqu'au refresh.`;
    }
  }

  function achatMassePrestige() {
    if (!isPrestige) return;
    let montant = 5000000000; // 5 Milliards
    if (capitalHolding >= montant) {
      capitalHolding -= montant;
      logs = `🔥 PRESTIGE : 5 milliards d'actifs acquis instantanément !`;
    }
  }
</script>

<main style="background: #000; color: #eee; min-height: 100vh; font-family: sans-serif;">
  
  <header style="background: #111; padding: 20px; border-bottom: 3px solid {isPrestige ? '#f1c40f' : '#3498db'}; display: flex; justify-content: space-between; align-items: center;">
    <div>
      <div style="font-size: 0.6rem; color: #555;">CAPITAL HOLDING</div>
      <div style="font-size: 1.5rem; font-weight: bold; color: {isPrestige ? '#f1c40f' : '#3498db'};">
        {capitalHolding.toLocaleString()} $
      </div>
    </div>
    <div style="text-align: right;">
      <button on:click={() => isPrestige = !isPrestige} style="background: {isPrestige ? '#f1c40f' : '#222'}; color: #000; border: none; padding: 5px 10px; border-radius: 4px; font-weight: bold; font-size: 0.7rem; cursor: pointer;">
        {isPrestige ? 'MODE PRESTIGE' : 'PASSER PRESTIGE'}
      </button>
    </div>
  </header>

  <div style="padding: 15px;">
    
    {#if !isPrestige}
      <div style="background: #1a1a1a; padding: 10px; border-radius: 4px; display: flex; justify-content: space-between; align-items: center; border: 1px solid #333; margin-bottom: 20px;">
        <span style="font-size: 0.7rem; color: #888;">PROCHAIN ARRIVAGE DANS : <b style="color: #3498db;">{tempsRestant}</b></span>
        <span style="font-size: 0.6rem; color: #444;">(LIMITE : 3 BIENS / HEURE)</span>
      </div>
    {:else}
      <div style="background: #1a1500; padding: 20px; border-radius: 4px; border: 1px solid #f1c40f; margin-bottom: 20px; text-align: center;">
        <p style="color: #f1c40f; font-weight: bold; margin-bottom: 10px;">ACHAT INDUSTRIEL ILLIMITÉ</p>
        <button on:click={achatMassePrestige} style="background: #f1c40f; color: #000; border: none; padding: 12px 20px; font-weight: bold; border-radius: 4px; cursor: pointer; width: 100%;">
          INVESTIR 5 000 000 000 $ D'UN COUP
        </button>
      </div>
    {/if}

    <table style="width: 100%; border-collapse: collapse; font-size: 0.75rem;">
      <tr style="color: #444; text-align: left; border-bottom: 1px solid #222;">
        <th style="padding: 10px;">DESIGNATION</th>
        <th>PRIX</th>
        <th>ACTION</th>
      </tr>
      {#each catalogueStandard as bien, i}
        <tr style="border-bottom: 1px solid #111; opacity: {bien.vendu ? 0.3 : 1};">
          <td style="padding: 15px; font-weight: bold;">{bien.n}</td>
          <td style="color: #2ecc71;">{bien.p.toLocaleString()} $</td>
          <td>
            {#if bien.vendu}
              <span style="color: #e74c3c;">VENDU</span>
            {:else}
              <button on:click={() => acheterStandard(bien, i)} style="background: #333; color: #fff; border: 1px solid #444; padding: 5px 10px; cursor: pointer;">ACHETER</button>
            {/if}
          </td>
        </tr>
      {/each}
    </table>
  </div>

  <footer style="position: fixed; bottom: 0; width: 100%; background: #000; color: #2ecc71; padding: 10px; font-family: monospace; font-size: 0.7rem; border-top: 1px solid #222;">
    > {logs}
  </footer>
</main>
