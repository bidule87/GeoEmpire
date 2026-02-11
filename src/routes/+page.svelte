<script>
  import { onMount } from 'svelte';

  let capitalHolding = 6157.92;
  let logs = "GEO EMPIRE : En attente d'investissement marketing...";
  
  // Variables de la filiale
  let tresoFiliale = 12500;
  let gainJournalierEstime = 8500; // Ce que la filiale rapporte avant marketing
  
  // LE JOUEUR DOIT ENTRER CE CHIFFRE
  let investissementMkt = 0; 
  let boostMarketing = 1.0; // Le multiplicateur final

  // LOGIQUE CACHÉE (Calcul du boost selon tes règles 10% - 20%)
  $: {
    let ratio = investissementMkt / gainJournalierEstime;
    
    if (ratio <= 0) {
      boostMarketing = 1.0;
    } else if (ratio < 0.10) {
      boostMarketing = 1.05; // Faible impact
    } else if (ratio >= 0.10 && ratio <= 0.20) {
      boostMarketing = 1.25; // Impact Optimal (Le joueur a trouvé le bon réglage)
    } else {
      boostMarketing = 1.50; // Gros impact mais coûte cher
    }
  }

  // --- CYCLE AUTOMATIQUE ---
  onMount(() => {
    const interval = setInterval(() => {
      // Le gain net prend en compte le boost et retire l'investissement choisi
      let gainParSeconde = (gainJournalierEstime * boostMarketing) / 3600; 
      let coutMktParSeconde = investissementMkt / 3600;
      
      capitalHolding += (gainParSeconde - coutMktParSeconde);
    }, 1000);
    return () => clearInterval(interval);
  });
</script>

<main style="background: #000; color: #eee; min-height: 100vh; font-family: sans-serif;">
  
  <header style="background: #111; padding: 20px; border-bottom: 3px solid #3498db; display: flex; justify-content: space-between;">
    <div>
      <h1 style="margin:0; font-size: 0.8rem; color: #555;">HOLDING CONTROLE</h1>
      <div style="font-size: 1.6rem; font-weight: bold; color: #3498db;">{capitalHolding.toLocaleString(undefined, {maximumFractionDigits: 2})} $</div>
    </div>
  </header>

  <div style="padding: 15px;">
    <div style="background: #0a0a0a; border: 1px solid #222; border-radius: 8px; overflow: hidden;">
      
      <div style="background: #151515; padding: 15px; border-left: 5px solid #3498db;">
        <h3 style="margin:0;">Acier 1</h3>
      </div>

      <div style="padding: 20px;">
        <div style="background: #111; padding: 20px; border-radius: 8px; border: 1px solid #333; text-align: center;">
          <p style="color: #888; font-size: 0.8rem; margin-bottom: 15px;">SAISIR VOTRE BUDGET MARKETING JOURNALIER</p>
          
          <input 
            type="number" 
            bind:value={investissementMkt} 
            placeholder="Entrez un montant..." 
            style="background: #000; border: 2px solid #3498db; color: #fff; padding: 15px; font-size: 1.5rem; width: 80%; text-align: center; border-radius: 4px;"
          />

          <div style="margin-top: 20px; display: flex; justify-content: space-around;">
            <div>
              <span style="display: block; font-size: 0.6rem; color: #666;">GAIN FILIALE</span>
              <b style="color: #2ecc71;">{gainJournalierEstime} $</b>
            </div>
            <div>
              <span style="display: block; font-size: 0.6rem; color: #666;">BOOST ACTUEL</span>
              <b style="color: #3498db;">x {boostMarketing}</b>
            </div>
          </div>
        </div>

        <div style="margin-top: 20px; padding: 10px; background: #050505; border: 1px dashed #222; font-size: 0.75rem; color: #444;">
          Note stratégique : Le marketing est efficace s'il est proportionnel à vos gains. Testez différents montants pour optimiser votre rentabilité.
        </div>
      </div>
    </div>
  </div>

  <footer style="position: fixed; bottom: 0; width: 100%; background: #000; color: #2ecc71; padding: 10px; font-family: monospace; font-size: 0.7rem; border-top: 1px solid #222;">
    > {logs}
  </footer>
</main>
