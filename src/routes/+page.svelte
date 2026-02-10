<script>
  let capitalHolding = 150000;
  let marketingGlobalNiveau = 2; // National par défaut
  let logs = "Système Holding : Couleurs synchronisées avec le Marketing.";

  // LES COULEURS DU SCRIPT (À ajuster si tu veux des codes HEX précis)
  const mktConfigs = {
    1: { label: "Local", base: 100, multi: 1.0, color: "#2ecc71" },    // VERT
    2: { label: "National", base: 300, multi: 1.15, color: "#f1c40f" }, // JAUNE
    3: { label: "International", base: 800, multi: 1.30, color: "#e67e22" }, // ORANGE
    4: { label: "Viral / Expert", base: 2000, multi: 1.50, color: "#e74c3c" } // ROUGE
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

<main>
  <header class="holding-header" style="border-bottom: 3px solid {themeColor}">
    <div class="top">
      <h1>🏦 HOLDING CONTROL</h1>
      <div class="cap">CAPITAL: <span style="color: {themeColor}">{capitalHolding.toLocaleString()} $</span></div>
    </div>

    <div class="mkt-selector">
      <p>SÉLECTION STRATÉGIQUE :</p>
      <div class="btn-group">
        {#each [1, 2, 3, 4] as n}
          <button 
            class:active={marketingGlobalNiveau === n} 
            on:click={() => marketingGlobalNiveau = n}
            style="--c: {mktConfigs[n].color}">
            {mktConfigs[n].label}
          </button>
        {/each}
      </div>
      <div class="cost">Coût de fonctionnement : <b>{coutTotalMkt}$</b></div>
    </div>
  </header>

  <div class="container">
    {#each filiales as fil}
      <section class="filiale-card" style="--accent: {themeColor}">
        <div class="card-header" style="background: {themeColor}">
          <h3>{fil.nom}</h3>
          <span class="status-pill">MODE {mktConfigs[marketingGlobalNiveau].label}</span>
        </div>

        <nav class="tabs">
          <button class:active={fil.ongletActif === 'situation'} on:click={() => fil.ongletActif = 'situation'}>SITUATION</button>
          <button class:active={fil.ongletActif === 'business'} on:click={() => fil.ongletActif = 'business'}>BUSINESS</button>
          <button class:active={fil.ongletActif === 'marketing'} on:click={() => fil.ongletActif = 'marketing'}>MARKETING</button>
        </nav>

        <div class="card-body">
          {#if fil.ongletActif === 'situation'}
            <div class="data">
              <p>Trésorerie filiale : <b>{fil.treso.toLocaleString()} $</b></p>
            </div>
          {:else if fil.ongletActif === 'business'}
            {#each fil.biens as bien}
              <div class="asset">
                <div class="name">{bien.nom}</div>
                <input type="range" min="-20" max="20" bind:value={bien.marge}>
                <div class="price">Prix estimé : <span style="color: {themeColor}">{calculerPrix(bien).toLocaleString()} $</span></div>
              </div>
            {/each}
          {:else if fil.ongletActif === 'marketing'}
            <div class="mkt-info">
              <h2 style="color: {themeColor}">+{ (mktConfigs[marketingGlobalNiveau].multi - 1) * 100 }%</h2>
              <p>Rentabilité
