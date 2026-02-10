<script>
  let tickets = 10;
  let gtokens = 5000;
  let activeTab = 'SHOP';
  let isElite = false; 
  let geoBalance = 39259;
  let log = "Système Élite prêt.";

  // Liste de tes propriétés (exemple)
  let properties = [
    { id: 1, nom: "Banque de Limoges", prixBase: 50000, status: "Libre", loyer: 1500 },
    { id: 2, nom: "Immeuble Rue de la Paix", prixBase: 120000, status: "Loué", loyer: 4200 },
    { id: 3, nom: "Hôtel de Ville", prixBase: 250000, status: "Libre", loyer: 8000 }
  ];

  function buyElite() {
    isElite = true;
    log = "Statut ÉLITE activé : Bonus de vente +20% appliqué !";
  }

  // Calcul du prix de vente avec bonus Élite
  function getVentePrice(prixBase) {
    // Si Élite : +20% (prix * 1.20), sinon prix normal
    return isElite ? Math.floor(prixBase * 1.20) : prixBase;
  }

  function louer(id) {
    properties = properties.map(p => p.id === id ? {...p, status: "Loué"} : p);
    log = "Propriété mise en location.";
  }

  function vendre(p) {
    const prixFinal = getVentePrice(p.prixBase);
    geoBalance += prixFinal;
    properties = properties.filter(item => item.id !== p.id);
    log = `Vendu pour ${prixFinal.toLocaleString()} G (Bonus inclus) !`;
  }
</script>

<main>
  <div class="hdr">
    <div class="logo">👑 GEO EMPIRE {isElite ? '★ ELITE' : ''}</div>
    <div class="stats">
      <span>🟡 {geoBalance.toLocaleString()}</span> | <span>🎫 {tickets}</span> | <span>🧱 {gtokens}</span>
    </div>
  </div>

  <nav>
    <button class:act={activeTab === 'SHOP'} on:click={() => activeTab = 'SHOP'}>🛒 SHOP</button>
    <button class:act={activeTab === 'ELITE'} on:click={() => activeTab = 'ELITE'}>🏢 GESTION {isElite ? 'ÉLITE' : ''}</button>
  </nav>

  <div class="cnt">
    {#if activeTab === 'SHOP'}
      <div class="card elite" on:click={buyElite}>
        <div class="info"><b>📂 PACK ÉLITE</b><p>Gestion par bien + Bonus Vente 20%</p></div>
        <div class="price">9.99 €</div>
      </div>

    {:else if activeTab === 'ELITE'}
      <div class="management-list">
        <h3 class="title">TES PROPRIÉTÉS</h3>
        {#each properties as p}
          <div class="prop-card">
            <div class="prop-header">
              <b>{p.nom}</b>
              <span class="status-tag" class:rented={p.status === "Loué"}>{p.status}</span>
            </div>
            
            <div class="prop-details">
              <span>Valeur: {p.prixBase.toLocaleString()} G</span>
              {#if isElite}
                <span class="bonus">Prix Élite: {getVentePrice(p.prixBase).toLocaleString()} G (+20%)</span>
              {/if}
            </div>

            <div class="prop-actions">
              {#if p.status === "Libre"}
                <button class="btn louer" on:click={() => louer(p.id)}>LOUER</button>
              {:else}
                <button class="btn recolter" on:click={() => log = "Loyer récolté !"}>RÉCOLTER</button>
              {/if}
              <button class="btn vendre" on:click={() => vendre(p)}>VENDRE</button>
            </div>
          </div>
        {/each}
      </div>
    {/if}
  </div>

  <div class="cons">> {log}</div>
</main>

<style>
  :global(body) { margin: 0; background: #000; color: #fff; font-family: sans-serif; }
  .hdr { padding: 15px; border-bottom: 1px solid #222; text-align: center; background: #050505; }
  .logo { color: #f1c40f; font-weight: bold; }
  .stats { font-size: 0.75rem; color: #aaa; margin-top: 5px; }
  
  nav { display: flex; border-bottom: 2px solid #f1c40f; }
  nav button { flex: 1; padding: 15px; background: #0a0a0a; border: none; color: #555; font-weight: bold; }
  nav button.act { color: #f1c40f; }

  .cnt { padding: 15px; height: 75vh; overflow-y: auto; }
  .title { color: #f1c40f; font-size: 0.8rem; margin-bottom: 15px; }

  /* CARTES DE PROPRIÉTÉ */
  .prop-card { background: #111; border: 1px solid #333; border-radius: 12px; padding: 15px; margin-bottom: 15px; }
  .prop-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px; }
  .status-tag { font-size: 0.6rem; padding: 2px 6px; border-radius: 4px; background: #444; }
  .status-tag.rented { background: #27ae60; color: white; }
  
  .prop-details { font-size: 0.75rem; color: #888; margin-bottom: 15px; display: flex; flex-direction: column; }
  .bonus { color: #f1c40f; font-weight: bold; margin-top: 4px; }

  .prop-actions { display: flex; gap: 10px; }
  .btn { flex: 1; padding: 10px; border: none; border-radius: 6px; font-weight: bold; font-size: 0.7rem; cursor: pointer; }
  .louer { background: #3498db; color: white; }
  .recolter { background: #2ecc71; color: white; }
  .vendre { background: #e74c3c; color: white; }

  .card { display: flex; justify-content: space-between; align-items: center; background: #111; padding: 15px; border-radius: 10px; border: 1px solid #fff; }
  .price { background: #f1c40f; color: #000; padding: 5px; border-radius: 5px; font-weight: bold; }
  .cons { position: fixed; bottom: 0; width: 100%; padding: 10px; background: #000; color: #2ecc71; border-top: 1px solid #222; font-size: 0.7rem; font-family: monospace; }
</style>
