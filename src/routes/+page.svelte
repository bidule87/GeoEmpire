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
  .content { padding: 15px; padding-bottom: 50px; }
  .card { background: #0a0a0a; border: 1px solid #222; border-radius: 8px; margin-bottom: 15px; overflow: hidden; }
  .card-head { padding: 12px; display: flex; justify-content: space-between; align-items: center; background: #151515; }
  .hold { font-size: 0.7rem; color: #666; }
  .mkt { font-size: 0.6rem; border: 1px solid; padding: 2px 6px; border-radius: 10px; font-weight: bold; }
  .tabs { display: flex; background: #080808; border-bottom: 1px solid #1a1a1a; }
  .tabs button { flex: 1; padding: 10px; background: none; border: none; color: #444; font-weight: bold; font-size: 0.7rem; cursor: pointer; }
  .tabs button.active { color: #f1c40f; background: #111; border-bottom: 2px solid #f1c40f; }
  .card-body { padding: 12px; }
  .row { display: flex; justify-content: space-between; margin-bottom: 8px; font-size: 0.8rem; }
  .green { color: #2ecc71; }
  .slider { margin-bottom: 12px; }
  .slider label { font-size: 0.7rem; color: #888; display: block; margin-bottom: 5px; }
  input[type=range] { width: 100%; accent-color: #f1c40f; }
  .btn { width: 100%; padding: 8px; border: none; border-radius: 4px; font-weight: bold; cursor: pointer; margin-top: 5px; font-size: 0.75rem; }
  .gold { background: #f1c40f; color: #000; }
  .gray { background: #222; color: #fff; }
  .console { position: fixed; bottom: 0; width: 100%; padding: 6px; background: #000; color: #2ecc71; font-family: monospace; font-size: 0.7rem; border-top: 1px solid #222; }
</style>
