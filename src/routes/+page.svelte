<script>
  import { onMount } from 'svelte';

  // --- ÉTAT GLOBAL ---
  let capitalHolding = 6157.92;
  let mktIdx = 1; 
  let logs = "GEO EMPIRE : Système fiscal et charges activés.";

  const mkt = {
    1: { lab: "Local", prix: 100, m: 1.0, c: "#3498db" },
    2: { lab: "National", prix: 300, m: 1.15, c: "#2ecc71" },
    3: { lab: "International", prix: 800, m: 1.3, c: "#e67e22" },
    4: { lab: "Viral / Expert", prix: 2000, m: 1.5, c: "#e74c3c" }
  };

  let filiales = [
    { id: 1, nom: "Acier 1", type: "ENTREPRISE", locked: false, treso: 12500, tab: 'sit', biens: [{ n: "Forge", v: 85000, m: 10 }] }
  ];

  // Paramètres fiscaux (exemples basés sur tes captures)
  const TAUX_IMPOT = 0.20; // 20% d'impôts sur le bénéfice
  const FRAIS_BUREAU_FIXE = 1960; // Tiré de ta capture "Débits"

  $: active = mkt[mktIdx];
  $: nbActive = filiales.filter(f => !f.locked).length;
  $: fraisMktTotal = active.prix * nbActive;

  // --- LOGIQUE FINANCIÈRE AUTOMATIQUE ---
  onMount(() => {
    const interval = setInterval(() => {
      let gainBrutTick = 0;

      filiales.forEach(f => {
        if (!f.locked) {
          f.biens.forEach(b => {
            // Gain de base (simulé) + boost marketing
            let baseGain = (b.v / 5000); 
            gainBrutTick += baseGain * (1 + b.m / 100) * active.m;
          });
        }
      });

      // Calcul des charges (Marketing + Bureau) ramenées au tick
      let chargesTick = (fraisMktTotal + FRAIS_BUREAU_FIXE) / 60;
      
      // Résultat avant impôts
      let resultatAvantImpot = gainBrutTick - chargesTick;
      
      // On ne paye des impôts que si on gagne de l'argent
      let impotTick = resultatAvantImpot > 0 ? (resultatAvantImpot * TAUX_IMPOT) : 0;
      
      // Résultat NET final
      let gainNetTick = resultatAvantImpot - impotTick;

      capitalHolding += gainNetTick;
    }, 1000);

    return () => clearInterval(interval);
  });
</script>

<main style="background: #000; color: #eee; min-height: 100vh; font-family: sans-serif; --theme: {active.c};">
  
  <header style="background: #111; padding: 20px; border-bottom: 3px solid var(--theme); display: flex; justify-content: space-between; align-items: center;">
    <div>
      <h1 style="margin:0; font-size: 0.8rem; color: #555; text-transform: uppercase;">Holding Finance</h1>
      <div style="font-size: 1.6rem; font-weight: bold; color: var(--theme);">{capitalHolding.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})} $ ∅</div>
    </div>
    <div style="text-align: right; font-size: 0.7rem;">
      <div style="color: #e74c3c;">Charges : -{(fraisMktTotal + FRAIS_BUREAU_FIXE).toLocaleString()} $</div>
      <div style="color: #f1c40f;">Impôts : {Math.round(TAUX_IMPOT * 100)}%</div>
    </div>
  </header>

  <div style="padding: 15px;">
    <div style="background: #0a0a0a; padding: 15px; border: 1px solid #222; border-radius: 8px; margin-bottom: 20px;">
      <div style="display: flex; gap: 5px;">
        {#each [1, 2, 3, 4] as i}
          <button on:click={() => mktIdx = i} style="flex: 1; padding: 10px; border: 1px solid {mktIdx === i ? mkt[i].c : '#333'}; background: {mktIdx === i ? mkt[i].c : '#111'}; color: white; font-weight: bold; font-size: 0.7rem; cursor: pointer;">
            {mkt[i].lab}
          </button>
        {/each}
      </div>
    </div>

    <div style="text-align: center; padding: 40px 0;">
       <h2 style="color: var(--theme); font-size: 3rem; margin: 0;">
         +{Math.round((active.m - 1) * 100)}% 
       </h2>
       <p style="color: #666; font-size: 0.9rem;">Boost de rentabilité Holding actif</p>
    </div>

    {#each filiales as f}
      <div style="background: #0a0a0a; border: 1px solid #222; border-radius: 8px; overflow: hidden;">
        <div style="background: #151515; padding: 15px; border-left: 5px solid var(--theme); display: flex; justify-content: space-between;">
          <h3 style="margin:0; font-size: 1rem; color: var(--theme);">{f.nom}</h3>
          <span style="color: #444; font-size: 0.7rem; font-weight: bold;">MODE {active.lab.toUpperCase()}</span>
        </div>
        
        <nav style="display: flex; background: #050505; border-bottom: 1px solid #222;">
          <button on:click={() => f.tab = 'sit'} style="flex: 1; padding: 12px; border: none; background: none; color: {f.tab === 'sit' ? active.c : '#555'}; font-weight: bold; font-size: 0.7rem; cursor: pointer;">SITUATION</button>
          <button on:click={() => f.tab = 'biz'} style="flex: 1; padding: 12px; border: none; background: none; color: {f.tab === 'biz' ? active.c : '#555'}; font-weight: bold; font-size: 0.7rem; cursor: pointer;">BUSINESS</button>
        </nav>

        <div style="padding: 20px;">
          {#if f.tab === 'sit'}
            <div style="display: flex; justify-content: space-between; margin-bottom: 10px;">
              <span style="color: #888;">Trésorerie filiale :</span>
              <b style="color: #2ecc71;">{f.treso.toLocaleString()} $</b>
            </div>
            <div style="color: #555; font-size: 0.75rem; border-top: 1px solid #222; padding-top: 10px;">
              Note : Les impôts et frais de bureaux sont déduits en temps réel du flux Holding.
            </div>
          {:else}
            <p style="color: #666; font-size: 0.8rem;">Gestion des actifs automatisée.</p>
          {/if}
        </div>
      </div>
    {/each}
  </div>

  <footer style="position: fixed; bottom: 0; width: 100%; background: #000; color: #2ecc71; padding: 10px; font-family: monospace; font-size: 0.7rem; border-top: 1px solid #222;">> {logs}</footer>
</main>
