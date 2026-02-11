<script>
  let capitalHolding = 5000000;
  let tabActuel = "Gouvernance";
  let logs = "Système de délégation actif.";

  // --- ÉTAT DU DG ---
  let dgNom = "Jean Dupont";
  let dgSpecialisation = "Standard"; // Ou "Commercial"
  let salaireDG = 15000;

  // --- VARIABLES DE GESTION (FDG & PRIMES) ---
  let fondsDeGestion = 500000; // Réservé au PDG
  let primeAnnuelle = 0;

  function changerSpecialisation() {
    dgSpecialisation = dgSpecialisation === "Standard" ? "Commercial" : "Standard";
    logs = `Ordre PDG : Le DG est désormais en mode ${dgSpecialisation}.`;
  }

  function verserPrime() {
    if (capitalHolding >= 50000) {
      capitalHolding -= 50000;
      primeAnnuelle += 50000;
      logs = "PDG : Prime de performance versée aux équipes.";
    }
  }
</script>

<main style="background: #000; color: #eee; min-height: 100vh; font-family: 'Courier New', monospace;">
  
  <nav style="display: flex; background: #111; border-bottom: 1px solid #333;">
    {#each ['Acheter', 'Banque', 'DRH', 'Gouvernance'] as t}
      <button on:click={() => tabActuel = t} style="flex: 1; padding: 15px; background: {tabActuel === t ? '#222' : 'none'}; color: {tabActuel === t ? '#3498db' : '#666'}; border: none; cursor: pointer; font-weight: bold; font-size: 0.7rem;">
        {t.toUpperCase()}
      </button>
    {/each}
  </nav>

  <div style="padding: 20px;">
    {#if tabActuel === 'Gouvernance'}
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
        
        <div style="background: #0a0a0a; border: 1px solid #3498db; padding: 20px; border-radius: 8px;">
          <h2 style="color: #3498db; font-size: 0.9rem; margin-bottom: 20px;">💎 BUREAU DU PDG</h2>
          
          <div style="background: #111; padding: 15px; border-radius: 4px; margin-bottom: 15px;">
            <p style="font-size: 0.7rem; color: #555; margin: 0;">FONDS DE GESTION (FDG)</p>
            <b style="font-size: 1.2rem; color: #fff;">{fondsDeGestion.toLocaleString()} $</b>
          </div>

          <p style="font-size: 0.7rem; color: #888; margin-bottom: 10px;">Actions exclusives PDG/Actionnaires :</p>
          <button on:click={verserPrime} style="width: 100%; padding: 10px; background: #3498db; color: #000; border: none; font-weight: bold; cursor: pointer; margin-bottom: 10px;">
            VERSER UNE PRIME
          </button>
          <button style="width: 100%; padding: 10px; background: #222; color: #3498db; border: 1px solid #3498db; font-weight: bold; cursor: pointer;">
            AJUSTER LES FDG
          </button>
        </div>

        <div style="background: #0a0a0a; border: 1px solid #f1c40f; padding: 20px; border-radius: 8px;">
          <div style="display: flex; justify-content: space-between; align-items: flex-start;">
            <h2 style="color: #f1c40f; font-size: 0.9rem; margin-bottom: 20px;">👤 DIRECTEUR GÉNÉRAL</h2>
            <span style="background: #f1c40f; color: #000; padding: 2px 6px; font-size: 0.6rem; font-weight: bold;">{dgSpecialisation}</span>
          </div>

          <div style="margin-bottom: 20px;">
            <b style="display: block; font-size: 1.1rem;">{dgNom}</b>
            <span style="font-size: 0.7rem; color: #555;">Salaire fixe : {salaireDG}$ / mois</span>
          </div>

          <div style="background: #111; padding: 10px; border-radius: 4px; font-size: 0.7rem; margin-bottom: 20px;">
            <b style="color: #f1c40f;">AUTORISATIONS :</b>
            <ul style="margin: 5px 0; padding-left: 15px; color: #888;">
              <li>Gestion des Biens / Filiales : ✅</li>
              <li>Banque & Assurances : ✅</li>
              <li>DRH & Embauches : ✅</li>
              <li><span style="color: #e74c3c;">Primes & FDG : ❌</span></li>
            </ul>
          </div>

          <button on:click={changerSpecialisation} style="width: 100%; padding: 10px; background: #f1c40f; color: #000; border: none; font-weight: bold; cursor: pointer;">
            PASSER EN MODE {dgSpecialisation === "Standard" ? "COMMERCIAL" : "STANDARD"}
          </button>
        </div>

      </div>
    {/if}
  </div>

  <footer style="position: fixed; bottom: 0; width: 100%; background: #000; color: #2ecc71; padding: 10px; font-family: monospace; font-size: 0.7rem; border-top: 1px solid #222;">
    > {logs}
  </footer>
</main>
