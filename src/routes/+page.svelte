<div class="heist-screen">
    <div class="target-header">
        <img src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1000&auto=format&fit=crop" 
             alt="Entreprise Cible" class="main-target-img" />
        <div class="overlay-info">
            <h2>BANQUE CENTRALE Z-01</h2>
            <span class="sec-badge">SÉCURITÉ : ÉLEVÉE 🛡️🛡️🛡️</span>
        </div>
    </div>

    <div class="security-systems">
        <h3>SYSTÈME DE SÉCURITÉ EN LIGNE</h3>
        <div class="locks-grid">
            {#each [1, 2, 3] as lockId}
                <div class="lock-box">
                    <div class="lock-status">CADENAS 0{lockId}</div>
                    <div class="mini-game-area">
                        <div class="jauge-container">
                            <div class="jauge-fill" style="width: 45%"></div>
                        </div>
                    </div>
                    <button class="hack-action-btn">FORCER LE VERROU</button>
                </div>
            {/each}
        </div>
    </div>

    <div class="actions-bar">
        <button class="btn-cancel">ANNULER</button>
        <button class="btn-hack-start">DÉCRYPTAGE NEURAL (1 🎫)</button>
    </div>
</div>

<style>
    .heist-screen { background: #050505; min-height: 100%; color: white; padding-bottom: 20px; }
    
    /* Image en grand format */
    .target-header { position: relative; width: 100%; height: 250px; overflow: hidden; border-bottom: 3px solid #e74c3c; }
    .main-target-img { width: 100%; height: 100%; object-fit: cover; opacity: 0.7; }
    .overlay-info { position: absolute; bottom: 15px; left: 15px; text-shadow: 2px 2px 10px black; }
    .sec-badge { background: #e74c3c; padding: 4px 8px; border-radius: 4px; font-size: 10px; font-weight: bold; }

    /* Grille de sécurité */
    .security-systems { padding: 15px; }
    .locks-grid { display: grid; grid-template-columns: 1fr; gap: 15px; margin-top: 10px; }
    .lock-box { background: #111; border: 1px solid #333; padding: 15px; border-radius: 10px; border-left: 5px solid #e74c3c; }
    .lock-status { font-size: 12px; font-weight: bold; margin-bottom: 10px; color: #aaa; }
    
    .jauge-container { width: 100%; height: 10px; background: #222; border-radius: 5px; margin-bottom: 10px; overflow: hidden; }
    .jauge-fill { height: 100%; background: linear-gradient(to right, #e74c3c, #f1c40f); }

    .hack-action-btn { background: #222; border: 1px solid #e74c3c; color: #e74c3c; font-size: 10px; padding: 8px; border-radius: 5px; font-weight: bold; }
    
    .actions-bar { display: flex; gap: 10px; padding: 0 15px; margin-top: 20px; }
    .btn-cancel { flex: 1; background: #333; border: none; color: white; padding: 12px; border-radius: 8px; }
    .btn-hack-start { flex: 2; background: #e74c3c; border: none; color: white; padding: 12px; border-radius: 8px; font-weight: bold; }
</style>
