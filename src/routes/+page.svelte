<script>
  let tickets = 10;
  let gtokens = 5000;
  let crowns = 0;
  let jumps = 0;
  let activeTab = 'SHOP';
  let isElite = false;
  let log = "Système Empire connecté.";

  function buy(pack, price) {
    if (pack === 'ELITE') isElite = true;
    if (pack === 'PRESTIGE') { tickets += 100; gtokens += 5000; }
    if (pack === 'CROWN') crowns += 10;
    if (pack === 'GTOKEN') gtokens += 10000;
    if (pack === 'JUMP') jumps += 3;
    log = `Achat ${pack} (${price}€) réussi !`;
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
  </nav>

  <div class="cnt">
    {#if activeTab === 'SHOP'}
      <h3 class="title">BOUTIQUE OFFICIELLE</h3>

      <div class="card elite" on:click={() => buy('ELITE', 9.99)}>
        <div class="info">
          <b>📂 PACK ÉLITE</b>
          <p>Gestion totale + Export Excel</p>
        </div>
        <div class="price">9.99 €</div>
      </div>

      <div class="card prestige" on:click={() => buy('PRESTIGE', 7.99)}>
        <div class="info">
          <b>📦 PACK PRESTIGE</b>
          <p>100 Tickets + 5000 G-Tokens</p>
        </div>
        <div class="price">7.99 €</div>
      </div>

      <div class="card crown" on:click={() => buy('CROWN', 4.99)}>
        <div class="info">
          <b>👑 PACK CROWNS</b>
          <p>10 Jetons Loterie Royale</p>
        </div>
        <div class="price">4.99 €</div>
      </div>

      <div class="card gtoken" on:click={() => buy('GTOKEN', 4.99)}>
        <div class="info">
          <b>🧱 PACK G-TOKEN</b>
          <p>10 000 Briques de fortune</p>
        </div>
        <div class="price">4.99 €</div>
      </div>

      <div class="card jump" on:click={() => buy('JUMP', 5.99)}>
        <div class="info">
          <b>🌀 TÉLÉPORTATION</b>
          <p>3 Sauts GPS (Rayon 10km)</p>
        </div>
        <div class="price">5.99 €</div>
      </div>

    {:else}
      <div class="radar">
        <div class="circle"></div>
        <p>SCAN EN COURS SUR LIMOGES...</p>
        {#if jumps > 0}
          <button class="btn-jump" on:click={() => {jumps--; log="Saut utilisé !";}}>UTILISER UN SAUT ({jumps})</button>
        {/if}
      </div>
    {/if}
  </div>

  <div class="cons">> {log}</div>
</main>

<style>
  :global(body) { margin: 0; background: #000; color: #fff; font-family: sans-serif; overflow: hidden; }
  .hdr { padding: 15px; border-bottom: 1px solid #222; text-align: center; background: #050505; }
  .logo { color: #f1c40f; font-weight: bold; font-size: 1.1rem; letter-spacing: 1px; }
  .stats { font-size: 0.75rem; color: #888; margin-top: 5px; }
  
  nav { display: flex; border-bottom: 2px solid #f1c40f; }
  nav button { flex: 1; padding: 15px; background: #0a0a0a; border: none; color: #555; font-weight: bold; font-size: 0.75rem; }
  nav button.act { color: #f1c40f; background: rgba(241,196,15,0.05); }

  .cnt { padding: 15px; height: 75vh; overflow-y: auto; padding-bottom: 60px; }
  .title { color: #f1c40f; font-size: 0.8rem; margin-bottom: 15px; opacity: 0.8; }

  .card { display: flex; justify-content: space-between; align-items: center; background: #111; padding: 15px; border-radius: 10px; margin-bottom: 12px; border: 1px solid #222; }
  .info b { display: block; font-size: 0.85rem; margin-bottom: 2px; }
  .info p { margin: 0; font-size: 0.65rem; color: #777; }
  .price { background: #f1c40f; color: #000; padding: 6px 10px; border-radius: 6px; font-weight: bold; font-size: 0.75rem; min-width: 55px; text-align: center; }

  .elite { border-left: 4px solid #fff; }
  .prestige { border-left: 4px solid #00d4ff; }
  .crown { border-left: 4px solid #f1c40f; }
  .gtoken { border-left: 4px solid #e67e22; }
  .jump { border-left: 4px solid #9b59b6; }

  .radar { text-align: center; margin-top: 50px; }
  .circle { width: 100px; height: 100px; border: 2px solid #f1c40f; border-radius: 50%; margin: 0 auto; animation: pulse 2s infinite; }
  @keyframes pulse { 0% { opacity: 0.3; transform: scale(0.9); } 50% { opacity: 1; } 100% { opacity: 0.3; transform: scale(1.1); } }
  .btn-jump { margin-top: 20px; background: #9b59b6; border: none; color: #fff; padding: 10px 20px; border-radius: 20px; font-weight: bold; }

  .cons { position: fixed; bottom: 0; width: 100%; padding: 10px; background: #000; color: #2ecc71; border-top: 1px solid #222; font-size: 0.65rem; font-family: monospace; }
</style>