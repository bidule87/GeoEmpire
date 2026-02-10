<script>
  let capitalHolding = 6157.92;
  let marketingGlobalNiveau = 1; 
  let logs = "Système Holding prêt.";

  // Couleurs basées sur tes captures (Bleu clair, Bleu Empire, etc.)
  const mktConfigs = {
    1: { label: "Local", base: 100, multi: 1.0, color: "#7fb3d5" },    
    2: { label: "National", base: 300, multi: 1.15, color: "#5499c7" }, 
    3: { label: "International", base: 800, multi: 1.30, color: "#2980b9" }, 
    4: { label: "Viral / Expert", base: 2000, multi: 1.50, color: "#1a5276" } 
  };

  let filiales = [
    { 
      id: 1, 
      nom: "Acier 1", 
      treso: 12500, 
      ongletActif: 'business',
      biens: [{ nom: "Entrepôt Forge", valeur: 85000, marge: 10 }] 
    }
  ];

  $: nbFiliales = filiales.length;
  $: coutTotalMkt = mktConfigs[marketingGlobalNiveau].base * nbFiliales;
  $: themeColor = mktConfigs[marketingGlobalNiveau].color;

  function calculerPrix(bien) {
    return Math.floor(bien.valeur * (1 + bien.marge / 100) * mktConfigs[marketingGlobalNiveau].multi);
  }
</script>

<main>
  <header class="h-panel" style="border-bottom: 3px solid {themeColor}">
    <div class="h-top">
      <h1>🏦 ESPACE HOLDINGS</h1>
      <div class="h-cap">SOLDE: <span style="color: {themeColor}">{capitalHolding.toLocaleString()} $ ∅</span></div>
    </div>

    <div class="mkt-box">
      <p class="section-title">MARKETING GLOBAL (CALCULÉ PAR FILIALE)</p>
      <div class="mkt-grid">
        {#each [1, 2, 3, 4] as n}
          <button class:active={marketingGlobalNiveau === n} on:click={() => marketingGlobalNiveau = n} style="--active-c: {mktConfigs[n].color}">
            {mktConfigs[n].label}
          </button>
        {/each}
      </div>
      <div class="mkt-cost">Frais : {coutTotalMkt} $ ∅ / jour</div>
    </div>
  </header>

  <div class="content">
    {#each filiales as fil}
      <section class="f-card" style="border-left: 5px solid {themeColor}">
        <div class="f-header" style="background: {themeColor}">
          <h3>{fil.nom}</h3>
          <span class="f-badge">MODE {mktConfigs[marketingGlobalNiveau].label}</span>
        </div>

        <nav class="f-tabs">
          <button class:active={fil.ongletActif === 'situation'} on:click={() => fil.ongletActif = 'situation'}>SITUATION</button>
          <button class:active={fil.ongletActif === 'business'} on:click={() =>
