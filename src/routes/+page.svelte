<script>
  import { onMount } from 'svelte';

  // --- ÉTAT GLOBAL ---
  let capitalHolding = 150000;
  let isPrestige = false;
  let logs = "GEO EMPIRE : Prêt pour expansion infinie.";
  let tabPrincipal = "Acheter"; // Onglets : Propriétés, Acheter, Travaux, etc.
  let catImmo = "Bureaux"; // Catégories : Bureaux, Commerciaux, Industriels...

  // --- CONFIGURATION ---
  const categories = ["Bureaux", "Commerciaux", "Industriels", "Terrain", "Transport", "Zones", "Espace"];
  
  // Générateur de biens (Infini)
  function genererBien(cat) {
    const p = (Math.floor(Math.random() * 50) + 5) * 50000;
    return {
      id: Math.random().toString(36).substr(2, 9),
      nom: `${cat} ${Math.floor(Math.random() * 999)}`,
      prix: p,
      loyer: Math.floor(p * 0.033),
      charges: Math.floor(p * 0.006),
      impots: Math.floor(p * 0.002),
      vendu: false
    };
  }

  // Catalogue initial
  let catalogue = Array.from({length: 5}, () => genererBien(catImmo));

  function changerCategorie(nouvelleCat) {
    catImmo = nouvelleCat;
    catalogue = Array.from({length: isPrestige ? 10 : 3}, () => genererBien(catImmo));
  }

  function acquerir(bien, index) {
    if (capitalHolding >= bien.prix) {
      capitalHolding -= bien.prix;
      if (isPrestige) {
        catalogue[index] = genererBien(catImmo); // Remplacement instantané
      } else {
        catalogue[index].vendu = true; // Bloqué jusqu'au refresh en Standard
      }
      logs = `Acquisition : ${bien.nom} confirmée.`;
    } else {
      logs = "Fonds insuffisants !";
    }
  }

  function achatMasse() {
    if (capitalHolding >= 5000000000) {
      capitalHolding -= 5000000000;
      logs = "Prestige : 5 Milliards investis dans le parc immobilier.";
    }
  }
</script>

<main style="background: #000; color: #eee; min-height: 100vh; font-family: sans-serif;">
  
  <header style="background: #fff; color: #000; padding: 15px; display: flex; justify-content: space-between; align-items: center;">
    <div>
      <h2 style="margin:0; font-size: 0.8rem; color: #666;">TRÉSORERIE HOLDING</h2>
      <div style="font-size: 1.4rem; font-weight: bold;">
        {capitalHolding.toLocaleString()} <small>N ∅</small>
      </div>
    </div>
    <button on:click={() => isPrestige = !isPrestige} style="background: {isPrestige ? '#f1c40f' : '#eee'}; border: 1px solid #ccc; padding: 8px 15px; font-weight: bold; cursor: pointer;">
      {isPrestige ? '⭐ PRESTIGE' : 'COMPTE STANDARD'}
    </button>
  </header>

  <div style="background: #f8f9fa; display: flex; justify-content: center; gap: 5px; padding: 10px; border-bottom: 1px solid #ddd;">
    {#each ['Propriétés', 'Acheter', 'Travaux', 'Assurance', 'Info'] as t}
      <button on:click={() => tabPrincipal = t} style="background: #fff; border: 1px solid #ddd; padding: 10px 15px; cursor: pointer; display: flex; flex-direction: column; align-items: center; min-width: 80px; {tabPrincipal === t ? 'border-bottom: 3px solid #000;' : ''}">
        <span style="font-size: 0.7rem; font-weight: bold; color: #333;">{t}</span>
      </button>
    {/each}
  </div>

  <div style="padding: 20px;">
    {#if tabPrincipal === 'Acheter'}
      <div style="background: #fff; color: #333; border-radius: 4px; border: 1px solid #ddd; overflow: hidden;">
        
        <div style="padding: 15px; background: #f1f1f1; display: flex; justify-content: space-between; align-items: center;">
          <select bind:value={catImmo} on:change={() => changerCategorie(catImmo)} style="padding: 8px; width: 200px;">
            {#each categories as c}
              <option value={c}>{c}</option>
            {/each}
          </select>
          {#if isPrestige}
            <button on:click={achatMasse} style="background: #f1c40f; border: none; padding: 8px 15px; font-weight: bold; cursor: pointer;">ACHAT MASSE (5 Mrd)</button>
          {/if}
        </div>

        <table style="width: 100%; border-collapse: collapse; text-align: left; font-size: 0.85rem;">
          <thead>
            <tr style="background: #fff; border-bottom: 1px solid #eee; color: #888;">
              <th style="padding: 12px;">Type</th>
              <th>Prix</th>
              <th>Loyer</th>
              <th>Charges</th>
              <th>Impôts</th>
              <th style="text-align: center;">Action</th>
            </tr>
          </thead>
          <tbody>
            {#each catalogue as bien, i}
              <tr style="border-bottom: 1px solid #f9f9f9; opacity: {bien.vendu ? 0.4 : 1}">
                <td style="padding: 12px; color: #3498db; font-weight: bold;">{bien.nom}</td>
                <td>{bien.prix.toLocaleString()} ∅</td>
                <td>{bien.loyer.toLocaleString()} ∅</td>
                <td>{bien.charges.toLocaleString()} ∅</td>
                <td>{bien.impots.toLocaleString()} ∅</td>
                <td style="text-align: center; padding: 8px;">
                  {#if bien.vendu}
                    <span style="color: #e74c3c; font-weight: bold;">VENDU</span>
                  {:else}
                    <button on:click={() => acquerir(bien, i)} style="background: #3498db; color: #fff; border: none; padding: 6px 12px; border-radius: 2px; cursor: pointer; font-weight: bold;">Acheter</button>
                  {/if}
                </td>
              </tr>
            {/each}
          </tbody>
        </table>
      </div>
    {:else}
      <div style="text-align: center; padding: 50px; color: #666;">Onglet {tabPrincipal} en cours de développement...</div>
    {/if}
  </div>

  <footer style="position: fixed; bottom: 0; width: 100%; background: #000; color: #2ecc71; padding: 10px; font-family: monospace; font-size: 0.7rem; border-top: 1px solid #333;">
    > {logs}
  </footer>
</main>
