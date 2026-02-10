<script>
  let tickets = 10;
  let gtokens = 5000;
  let crowns = 0;
  let jumps = 0;
  let activeTab = 'SHOP';
  let isElite = false; // Change à true lors de l'achat
  let log = "Système Empire connecté.";

  // Simulation d'inventaire pour l'export Excel
  let properties = [
    { nom: "Terrain Limoges Centre", prix: "4500 G", status: "Loué" },
    { nom: "Boutique Rue Haute", prix: "12000 G", status: "Libre" }
  ];

  function buy(pack, price) {
    if (pack === 'ELITE') isElite = true;
    if (pack === 'PRESTIGE') { tickets += 100; gtokens += 5000; }
    if (pack === 'CROWN') crowns += 10;
    if (pack === 'GTOKEN') gtokens += 10000;
    if (pack === 'JUMP') jumps += 3;
    log = `Pack ${pack} (${price}€) activé !`;
  }

  // Fonction Export Excel (format CSV)
  function exportExcel() {
    let csv = "Nom;Prix;Status\n";
    properties.forEach(p => { csv += `${p.nom};${p.prix};${p.status}\n`; });
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.setAttribute('href', url);
    a.setAttribute('download', 'empire_export.csv');
    a.click();
    log = "Fichier Excel (CSV) généré !";
  }
</script>

<main>
  <div class="hdr">
    <div class="logo">👑 GEO EMPIRE {isElite ? '★ ELITE' : ''}</div>
    <div class="stats">
      <span>🎫 {tickets}</span> | <span>🧱 {gtokens}</span> | <span>👑 {crowns}</span>
    </div>
  </div>

  <nav>
    <button class:act={activeTab === 'MAP'} on:click={() => activeTab = 'MAP'}>📍 RADAR</button>
    <button class:act={activeTab === 'SHOP'} on:click={() => activeTab = 'SHOP'}>🛒 SHOP</button>
    {#if isElite}
      <button class:act={activeTab === 'ELITE'} on:click={() => activeTab = 'ELITE'}>📂 GESTION</button>
    {/if}
  </nav>

  <div class="cnt">
    {#if activeTab === 'SHOP'}
      <h3 class="title">BOUTIQUE OFFICIELLE</h3>
      <div class="card elite" on:click={() => buy('ELITE', 9.99)}>
        <div class="info"><b>📂 PACK ÉLITE</b><p>Gestion totale + Export Excel</p></div>
        <div class="price">9.99 €</div>
      </div>
      <div class="card prestige" on:click={() => buy('PRESTIGE', 7.99)}>
        <div class="info"><b>📦 PACK PRESTIGE</b><p>100 Tickets + 5000 G-Tokens</p></div>
        <div class="price">7.99 €</div>
      </div>
      <div class="card crown" on:click={() => buy('CROWN', 4.99)}>
        <div class="info"><b>👑 PACK CROWNS</b><p>10 Jetons Loterie Royale</p></div>
        <div class="price">4.99 €</div>
      </div>

    {:else if activeTab === 'ELITE'}
      <div class="elite-zone">
        <h3 class="title">MENU GESTION ÉLITE</h3>
        <button class="btn-action" on:click={() => log = "Toutes les propriétés sont louées !"}>🏢 TOUT LOUER / RÉCOLTER</button>
        <button class="btn-action" on:click={() => log = "Vente groupée effectuée !"}>💰 TOUT VENDRE</button>
        <button class="btn-excel" on:click={exportExcel}>📊 EXPORTER VERS EXCEL (.CSV)</button>
        
        <div class="preview">
          <small>Aperçu de l'inventaire :</small>
          {#each properties as p}
            <div class="p-item"><span>{p.nom}</span> <b>{p.status}</b></div>
          {/each}
        </div>
      </div>

    {:else}
      <div class="radar">
        <div class="circle"></div>
        <p>SCAN EN COURS SUR LIMOGES...</p>
      </div>
    {/if}
  </div>

  <div class="cons">> {log}</div>
</main>

<style>
  :global(body) { margin: 0; background: #000; color: #fff; font-family: sans-serif; overflow: hidden; }
  .hdr { padding: 15px; border-bottom: 1px solid #222; text-align: center; background: #050505; }
  .logo { color: #f1c40f; font-weight: bold; font-size: 1.1rem; }
  .stats { font-size: 0.75rem; color: #888; margin-top: 5px; }
  
  nav { display: flex; border-bottom: 2px solid #f1c40f; }
  nav button { flex: 1; padding: 15px; background: #0a0a0a; border: none; color: #555; font-weight: bold; font-size: 0.7rem; }
  nav button.act { color: #f1c40f; background: rgba(241,196,15,0.05); }

  .cnt { padding: 15px; height: 75vh; overflow-y: auto; }
  .title { color: #f1c40f; font-size: 0.8rem; margin-bottom: 15px; opacity: 0.8; }

  .card { display: flex; justify-content: space-between; align-items: center; background: #111; padding: 15px; border-radius: 10px; margin-bottom: 12px; border: 1px solid #222; }
  .info b { display: block; font-size: 0.85rem; }
  .info p { margin: 0; font-size: 0.65rem; color: #777; }
  .price { background: #f1c40f; color: #000; padding: 6px 10px; border-radius: 6px; font-weight: bold; font-size: 0.75rem; }

  /* ELITE STYLES */
  .btn-action { width: 100%; padding: 12px; margin-bottom: 10px; border-radius: 8px; border: 1px solid #444; background: #1a1a1a; color: white; font-weight: bold; }
  .btn-excel { width: 100%; padding: 12px; border-radius: 8px; border: none; background: #27ae60; color: white; font-weight: bold; margin-top: 10px; }
  .preview { margin-top: 20px; border-top: 1px solid #222; padding-top: 10px; }
  .p-item { display: flex; justify-content: space-between; font-size: 0.7rem; padding: 5px 0; color: #aaa; }

  .radar { text-align: center; margin-top: 50px; }
  .circle { width: 80px; height: 80px; border: 2px solid #f1c40f; border-radius: 50%; margin: 0 auto; animation: pulse 2s infinite; }
  @keyframes pulse { 0% { opacity: 0.3; transform: scale(0.9); } 50% { opacity: 1; } 100% { opacity: 0.3; transform: scale(1.1); } }

  .cons { position: fixed; bottom: 0; width: 100%; padding: 10px; background: #000; color: #2ecc71; border-top: 1px solid #222; font-size: 0.65rem; font-family: monospace; }
</style>
