<script>
  // État global
  let geoBalance = 6157.92;
  let logs = "Système opérationnel. Prêt pour minuit.";

  // Liste des entreprises basée sur tes captures (Acier 1, Centrakor...)
  let entreprises = [
    { 
      id: 1, 
      nom: "Acier 1", 
      holding: "La Tour Sucrée",
      marketing: 3, 
      view: 'business', // 'situation' ou 'business'
      marge: 10
    },
    { 
      id: 2, 
      nom: "Centrakor", 
      holding: "MARIGNANT",
      marketing: 2, 
      view: 'situation',
      marge: 0
    }
  ];

  // Configuration Marketing (Code couleur de tes captures)
  const mktStatus = {
    1: { label: "Médiocre", color: "#e74c3c" },
    2: { label: "Correct", color: "#f1c40f" },
    3: { label: "Excellent", color: "#2ecc71" }
  };

  function setView(id, vue) {
    entreprises = entreprises.map(e => e.id === id ? {...e, view: vue} : e);
  }
</script>

<main>
  <header class="navbar">
    <div class="logo">👑 GEO EMPIRE</div>
    <div class="money">{geoBalance.toLocaleString()} $ ∅</div>
  </header>

  <div class="container">
    {#each entreprises as ent}
      <div class="card">
        <div class="card-head">
          <div class="titles">
            <h3>{ent.nom}</h3>
            <span class="hold-name">{ent.holding}</span>
          </div>
          <div class="mkt-tag" style="border-color: {mktStatus[ent.marketing].color}; color: {mktStatus[ent.marketing].color}">
            {mktStatus[ent.marketing].label}
          </div>
        </div>

        <nav class="tabs">
          <button class:active={ent.view === 'situation'} on:click={() => setView(ent.id, 'situation')}>
            📉 SITUATION
          </button>
          <button class:active={ent.view === 'business'} on:click={() => setView(ent.id, 'business')}>
            💼 BUSINESS
          </button>
        </nav>

        <div class="card-body">
          {#if ent.view === 'situation'}
            <div class="stats">
              <div class="row"><span>Revenus du mois :</span> <b class="green">+4 309 $ ∅</b></div>
              <div class="row"><span>Trésorerie filiale :</span> <b>12 500 $ ∅</b></div>
              <div class="row"><span>Mise à jour :</span> <b class="yellow">Minuit</b></div>
            </div>
          {:else}
            <div class="business">
              <div class="negoc">
                <label>Négociation molette : <b>{ent.marge}%</b></label>
                <input type="range" min="-20" max="20" bind:value={ent.marge}>
              </div>
              <button class="action-btn">LOCATION (MINUIT)</button>
              <button class="action-btn v-btn">VENTE (MINUIT)</
