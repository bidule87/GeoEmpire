<script>
  let geoBalance = 6157.92;
  let logs = "Système GEO EMPIRE initialisé.";

  // Données issues de tes captures
  let entreprises = [
    { id: 1, nom: "Acier 1", holding: "La Tour Sucrée", mkt: 3, view: 'business', marge: 10 },
    { id: 2, nom: "Centrakor", holding: "MARIGNANT", mkt: 2, view: 'situation', marge: 0 }
  ];

  const mktData = {
    1: { label: "Médiocre", color: "#e74c3c" },
    2: { label: "Correct", color: "#f1c40f" },
    3: { label: "Excellent", color: "#2ecc71" }
  };

  function switchTab(id, tab) {
    entreprises = entreprises.map(e => e.id === id ? {...e, view: tab} : e);
  }
</script>

<main>
  <header class="topbar">
    <div class="logo">👑 GEO EMPIRE</div>
    <div class="money">{geoBalance.toLocaleString()} $ ∅</div>
  </header>

  <div class="content">
    {#each entreprises as ent}
      <div class="card">
        <div class="card-head">
          <div class="titles">
            <h3>{ent.nom}</h3>
            <span class="hold">{ent.holding}</span>
          </div>
          <div class="mkt" style="color: {mktData[ent.mkt].color}; border-color: {mktData[ent.mkt].color}">
            {mktData[ent.mkt].label}
          </div>
        </div>

        <nav class="tabs">
          <button class:active={ent.view === 'situation'} on:click={() => switchTab(ent.id, 'situation')}>SITUATION</button>
          <button class:active={ent.view === 'business'} on:click={() => switchTab(ent.id, 'business')}>BUSINESS</button>
        </nav>

        <div class="card-body">
          {#if ent.view === 'situation'}
            <div class="view-sit">
              <div class="row"><span>Revenus :</span> <b class="green">+4 309 $ ∅</b></div>
              <div class="row"><span>Trésorerie :</span> <b>12 500 $</b></div>
            </div>
          {:else}
            <div class="view-biz">
              <div class="slider">
                <label>Négociation : {ent.marge}%</label>
                <input type="range" min="-20" max="20" bind:value={ent.marge}>
              </div>
              <button class="btn gold">LOCATION (00:00)</button>
              <button class="btn gray">VENTE (00:00)</button>
            </div>
          {/if}
        </div>
      </div>
    {/each}
  </div>

  <footer class="console">> {logs}</footer>
</main>

<style>
  :global(body) { margin: 0; background: #000; color: #fff; font-family: sans-serif; }
  .topbar { display: flex; justify-content: space-between; padding: 15px; background: #111; border-bottom: 2px solid #f1c40f; }
  .money { color: #f1c40f; font-weight: bold; }
  .content { padding: 15px; padding
