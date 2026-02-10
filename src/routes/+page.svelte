{:else if activeTab === 'SHOP'}
      <div class="shop-view">
        <h3 class="stitle">👑 EXCLUSIVITÉS RÉELLES (€)</h3>
        
        <div class="premium-grid">
            <div class="premium-card elite">
                <div class="p-icon">📂</div>
                <div class="p-name">PACK ÉLITE</div>
                <div class="p-desc">Gestion Full + Export Excel + 9 Cadenas</div>
                <button class="p-buy">9.99 €</button>
            </div>

            <div class="premium-card prestige">
                <div class="p-icon">📦</div>
                <div class="p-name">PACK PRESTIGE</div>
                <div class="p-desc">100 Tickets Raid + 5 000 G-Tokens</div>
                <button class="p-buy">7.99 €</button>
            </div>

            <div class="premium-card crown-pack">
                <div class="p-icon">👑</div>
                <div class="p-name">PACK CROWNS</div>
                <div class="p-desc">10 Jetons pour la Loterie Royale</div>
                <button class="p-buy">4.99 €</button>
            </div>

            <div class="premium-card gtoken">
                <div class="p-icon">🧱</div>
                <div class="p-name">PACK G-TOKENS</div>
                <div class="p-desc">10 000 Lingots (Boost Patrimoine)</div>
                <button class="p-buy">4.99 €</button>
            </div>

             <div class="premium-card teleport">
                <div class="p-icon">🌀</div>
                <div class="p-name">TÉLÉPORTATION</div>
                <div class="p-desc">3 Sauts GPS (Rayon 10km)</div>
                <button class="p-buy">5.99 €</button>
            </div>
        </div>

        <h3 class="stitle" style="margin-top:20px;">💰 ÉCHANGE DE GEO (JEU)</h3>
        <div class="sitem" on:click={() => buyItem('TICKET', 10, 10000)}>
            <span>🎫 Coffre de Tickets (10)</span> <button>10k G</button>
        </div>
      </div>