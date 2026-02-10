<script>
  let capitalHolding = 6157.92;
  let marketingGlobalNiveau = 1; 
  let logs = "Liaison établie. Système prêt.";

  // Les 4 nuances de BLEU pour ton interface
  const mktConfigs = {
    1: { label: "Local", base: 100, multi: 1.0, color: "#D6EAF8" },    
    2: { label: "National", base: 300, multi: 1.15, color: "#85C1E9" }, 
    3: { label: "International", base: 800, multi: 1.30, color: "#3498DB" }, 
    4: { label: "Viral / Expert", base: 2000, multi: 1.50, color: "#1A5276" } 
  };

  let filiales = [
    { 
      id: 1, 
      nom: "Acier 1", 
      treso: 12500, 
      ongletActif: 'business',
      biens: [{ nom: "Entrepôt Forge", valeur: 85000, marge: 10, type: "LOCATION" }] 
    }
  ];

  $: nbFiliales = filiales.length;
  $: coutTotalMkt = mktConfigs[marketingGlobalNiveau].base * nbFiliales;
  $: themeColor = mktConfigs[marketingGlobalNiveau].color;

  function calculerPrix(bien) {
    return Math.floor(bien.valeur * (1 + bien.marge / 100) * mktConfigs[marketingGlobalNiveau].multi);
  }
</script>

<main style="--theme: {themeColor}">
  <header class="h-panel">
    <div class="h-top">
      <h1>🏦 GESTION HOLDING</h1>
      <div class="h-cap">CAPITAL: <span style="color: {themeColor}">{capitalHolding.toLocaleString()} $ ∅</span></div>
    </div>

    <div class="mkt-selector">
      <p class="label">STRATÉGIE MARKETING GLOBALE (4 NIVEAUX)</p>
      <div class="btn-grid">
        {#each [1, 2, 3, 4] as n}
          <button 
            class:active={marketingGlobalNiveau === n} 
            on:click={() => marketingGlobalNiveau = n}
            style="--c: {mktConfigs[n].color}">
            {mktConfigs[n].label}
          </button>
        {/each}
      </div>
      <div class="mkt-cost">Coût calculé : <b>{coutTotalMkt} $ / jour</b></div>
    </div>
  </header>

  <div class="container">
    {#each filiales as fil}
      <section class="f-card">
        <div class="f-header" style="background: {themeColor}; color: {marketingGlobalNiveau > 2 ? 'white' : '#222'}">
          <h3>{fil.nom}</h3>
          <span class="f-badge">MODE {mktConfigs[marketingGlobalNiveau].label}</span>
        </div>

        <nav class="f-tabs">
          <button class:active={fil.ongletActif === 'situation'} on:click={() => fil.ongletActif = 'situation'}>SITUATION</button>
          <button class:active={fil.ongletActif === 'business'} on:click={() => fil.ongletActif = 'business'}>BUSINESS</button>
          <button class:active={fil.ongletActif === 'marketing'} on:click={() => fil.ongletActif = 'marketing'}>MARKETING</button>
        </nav>

        <div class="f-body">
          {#if fil.ongletActif === 'situation'}
            <div class="pane">
              <div class="row"><span>Trésorerie filiale :</span> <b>{fil.treso.toLocaleString()} $</b></div>
              <div class="row"><span>Status fiscal :</span> <b style="color: {themeColor}">En règle</b></div>
            </div>
          {:else if fil.ongletActif === 'business'}
            <div class="pane">
              {#each fil.biens as bien}
                <div class="asset-box">
                  <div class="asset-info">
                    <b>{bien.nom}</b>
                    <span class="type-tag">{bien.type}</span>
                  </div>
                  <input type="range" min="-20" max="20" bind:value={bien.marge}>
                  <div class="asset-price">Estimation Minuit : <b style="color:
