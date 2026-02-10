{:else if activeTab === 'SHOP'}
      <div class="shop-view">
        
        <h3 class="shop-title">🎫 PACKS DE TICKETS</h3>
        <div class="shop-grid">
            <div class="shop-item">
                <div class="item-info"><span>🎫 Pack Braqueur</span> <small>10 Tickets</small></div>
                <button on:click={() => buyTickets(10, 10000)}>10 000 G</button>
            </div>
            <div class="shop-item prestige">
                <div class="item-info"><span>💎 PACK PRESTIGE</span> <small>100 Tickets + Badge Gold</small></div>
                <button on:click={() => buyTickets(100, 75000)}>75 000 G</button>
            </div>
        </div>

        <h3 class="shop-title" style="margin-top:20px;">👑 ÉDITION CROWN</h3>
        <div class="shop-item crown">
            <div class="item-info">
                <span>👑 CROWN PASS</span> 
                <small>Multiplie les gains par 2 pendant 1h</small>
            </div>
            <button on:click={() => { if(geo >= 50000) { geo -= 50000; logs = ["👑 MODE CROWN ACTIVÉ ! Gains x2.", ...logs]; } }}>50 000 G</button>
        </div>

        <h3 class="shop-title" style="margin-top:20px;">🌀 NAVIGATION</h3>
        <div class="shop-item teleport">
            <div class="item-info">
                <span>🌀 PACK TÉLÉPORTATION</span> 
                <small>3 Sauts vers n'importe quelle ville</small>
            </div>
            <button on:click={() => { if(geo >= 30000) { geo -= 30000; logs = ["🌀 Téléportation prête. Choisissez une ville.", ...logs]; } }}>30 000 G</button>
        </div>

      </div>

<style>
  /* ... Tes styles précédents ... */

  .shop-title { font-size: 0.8rem; color: #f1c40f; letter-spacing: 2px; border-left: 3px solid #f1c40f; padding-left: 10px; margin-bottom: 15px; }
  
  .shop-item.prestige { border: 1px solid #00d4ff; background: rgba(0, 212, 255, 0.05); }
  .shop-item.prestige button { background: #00d4ff; color: #000; }

  .shop-item.crown { border: 1px solid #f1c40f; background: linear-gradient(90deg, rgba(241,196,15,0.1) 0%, rgba(0,0,0,1) 100%); }
  .shop-item.crown button { background: #f1c40f; color: #000; box-shadow: 0 0 10px #f1c40f; }

  .shop-item.teleport { border: 1px solid #9b59b6; background: rgba(155, 89, 182, 0.1); }
  .shop-item.teleport button { background: #9b59b6; color: #fff; }

  .shop-grid { display: grid; gap: 10px; }
</style>