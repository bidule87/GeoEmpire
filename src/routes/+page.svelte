<div class="asset-card">
  <div class="info">
    <b>{bien.nom}</b>
    <span class="price-next">Prévu à minuit : {getPrixFinal(bien)} G</span>
  </div>

  <div class="controls">
    <input type="range" min="-20" max="20" bind:value={bien.marge}>
    <span>Marge: {bien.marge}%</span>
  </div>

  <div class="status-actions">
    {#if bien.ordreAttente}
      <div class="pending-badge">⏳ EN ATTENTE (MINUIT)</div>
      <button class="cancel-btn" on:click={annulerOrdre}>ANNULER</button>
    {:else}
      <button class="btn-l" on:click={preparerLocation}>LOCATION</button>
      <button class="btn-v" on:click={preparerVente}>VENTE</button>
    {/if}
  </div>
</div>
