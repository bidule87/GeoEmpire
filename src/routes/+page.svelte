<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <title>Geo Empire Ultimate</title>
    <style>
        :root { --gold: #f1c40f; --red: #e74c3c; --blue: #3498db; --bg: #000; --card: #111; }
        body { margin: 0; background: var(--bg); color: #fff; font-family: 'Segoe UI', sans-serif; overflow: hidden; }
        
        /* HEADER */
        .header { padding: 15px; border-bottom: 1px solid #222; background: #050505; text-align: center; }
        .logo { color: var(--gold); font-weight: 900; font-size: 1.4rem; letter-spacing: 2px; }
        .stats { display: flex; justify-content: center; gap: 12px; font-size: 0.8rem; margin-top: 10px; color: #ddd; }
        .stat-item { background: #1a1a1a; padding: 4px 10px; border-radius: 5px; border: 1px solid #333; }

        /* NAVIGATION */
        nav { display: flex; border-bottom: 2px solid var(--gold); background: #0a0a0a; }
        nav button { flex: 1; padding: 15px; background: none; border: none; color: #666; font-weight: bold; font-size: 0.75rem; cursor: pointer; transition: 0.3s; }
        nav button.active { color: var(--gold); background: rgba(241, 196, 15, 0.1); }

        /* CONTENU */
        .page { display: none; height: calc(100vh - 145px); overflow-y: auto; padding: 15px; }
        .page.active { display: block; }

        /* BOUTIQUE */
        .shop-title { color: var(--gold); font-size: 0.9rem; letter-spacing: 2px; margin: 15px 0; border-left: 4px solid var(--gold); padding-left: 10px; }
        .p-card { display: flex; align-items: center; background: var(--card); padding: 15px; border-radius: 12px; margin-bottom: 12px; border: 1px solid #333; position: relative; }
        .p-icon { font-size: 2.2rem; margin-right: 15px; min-width: 45px; text-align: center; }
        .p-info { flex: 1; }
        .p-info b { display: block; font-size: 0.9rem; margin-bottom: 3px; }
        .p-info small { color: #888; font-size: 0.65rem; line-height: 1.2; display: block; }
        .p-price { background: var(--gold); color: #000; border: none; padding: 10px 15px; border-radius: 8px; font-weight: 900; font-size: 0.8rem; cursor: pointer; }

        /* VARIANTES PACKS */
        .elite { border-color: #fff; box-shadow: 0 0 10px rgba(255,255,255,0.1); }
        .prestige { border-color: #00d4ff; }
        .crown { border-color: var(--gold); }
        .gtoken { border-color: #e67e22; }
        .teleport { border-color: #9b59b6; }

        /* RADAR GPS */
        .radar-box { text-align: center; padding-top: 40px; }
        .radar-disc { width: 180px; height: 180px; border: 2px solid var(--gold); border-radius: 50%; margin: 0 auto; position: relative; background: radial-gradient(circle, #001a00 0%, #000 80%); overflow: hidden; }
        .radar-sweep { position: absolute; width: 50%; height: 2px; background: var(--gold); top: 50%; left: 50%; transform-origin: left; animation: scan 4s linear infinite; box-shadow: 0 0 15px var(--gold); }
        @keyframes scan { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        .btn-jump { margin-top: 30px; background: #9b59b6; color: white; border: none; padding: 12px 25px; border-radius: 25px; font-weight: bold; cursor: pointer; }

        /* FOOTER CONSOLE */
        .console { position: fixed; bottom: 0; width: 100%; background: #000; padding: 10px 15px; color: #2ecc71; border-top: 1px solid #222; font-family: monospace; font-size: 0.7rem; box-sizing: border-box; }
    </style>
</head>
<body>

    <div class="header">
        <div class="logo" id="main-logo">👑 GEO EMPIRE</div>
        <div class="stats">
            <div class="stat-item" id="stat-geo">🟡 39,259</div>
            <div class="stat-item" id="stat-tix">🎫 10</div>
            <div class="stat-item" id="stat-crn">👑 0</div>
            <div class="stat-item" id="stat-gtk">🧱 5,000</div>
        </div>
    </div>

    <nav>
        <button onclick="changeTab('MAP', this)">📍 RADAR</button>
        <button onclick="changeTab('SHOP', this)" class="active">🛒 SHOP</button>
        <button onclick="changeTab('RAID', this)">🏴‍☠️ RAID</button>
    </nav>

    <div id="MAP" class="page">
        <div class="radar-box">
            <div class="radar-disc"><div class="radar-sweep"></div></div>
            <p style="color: var(--gold); font-weight: bold; margin-top: 20px;">SCAN GPS EN COURS (Limoges)...</p>
            <div id="jump-container"></div>
        </div>
    </div>

    <div id="SHOP" class="page active">
        <h3 class="shop-title">💎 PRIVILÈGES PRESTIGE (€)</h3>
        
        <div class="p-card elite">
            <div class="p-icon">📂</div>
            <div class="p-info">
                <b>PACK ÉLITE</b>
                <small>Full Gestion : Tout louer/vendre<br>Export Excel + 9 Cadenas</small>
            </div>
            <button class="p-price" onclick="buy('ELITE')">9.99 €</button>
        </div>

        <div class="p-card prestige">
            <div class="p-icon">📦</div>
            <div class="p-info">
                <b>PACK PRESTIGE</b>
                <small>100 Tickets de Raid<br>+ 5 000 G-Tokens Bonus</small>
            </div>
            <button class="p-price" onclick="buy('PRESTIGE')">7.99 €</button>
        </div>

        <div class="p-card crown">
            <div class="p-icon">👑</div>
            <div class="p-info">
                <b>PACK CROWNS</b>
                <small>10 Jetons Loterie Royale<br>Tirage G-Tokens & Impôts</small>
            </div>
            <button class="p-price" onclick="buy('CROWN')">4.99 €</button>
        </div>

        <div class="p-card gtoken">
            <div class="p-icon">🧱</div>
            <div class="p-info">
                <b>PACK G-TOKEN</b>
                <small>10 000 Lingots d'or<br>Boost de patrimoine rapide</small>
            </div>
            <button class="p-price" onclick="buy('GTOKEN')">4.99 €</button>
        </div>

        <div class="p-card teleport">
            <div class="p-icon">🌀</div>
            <div class="p-info">
                <b>TÉLÉPORTATION</b>
                <small>3 Sauts GPS (Rayon 10km)<br>Changement de zone immédiat</small>
            </div>
            <button class="p-price" onclick="buy('JUMP')">5.99 €</button>
        </div>
    </div>

    <div id="RAID" class="page">
        <div style="background: #111; padding: 20px; border-radius: 15px; border: 1px solid #333; text-align: center;">
            <div style="font-size: 4rem; margin-bottom: 10px;">🏛️</div>
            <h2>BANQUE CENTRALE</h2>
            <div style="color: var(--red); font-weight: bold; font-size: 1.2rem;">42,500 G</div>
            <button class="p-price" style="background: var(--red); color: white; margin-top: 15px; width: 100%;" onclick="addLog('Infiltration lancée...')">BRAQUER (1 🎫)</button>
        </div>
    </div>

    <div class="console" id="logs">> Connexion cryptée établie...</div>

    <script>
        let game = { geo: 39259, tix: 10, crn: 0, gtk: 5000, jmp: 0, elite: false };

        function changeTab(tabId, btn) {
            document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
            document.querySelectorAll('nav button').forEach(b => b.classList.remove('active'));
            document.getElementById(tabId).classList.add('active');
            btn.classList.add('active');
        }

        function buy(type) {
            if(type === 'ELITE') { 
                game.elite = true; 
                document.getElementById('main-logo').innerHTML = "👑 GEO EMPIRE <span style='color:white; font-size:0.7rem;'>★ ELITE</span>";
            }
            if(type === 'PRESTIGE') { game.tix += 100; game.gtk += 5000; }
            if(type === 'CROWN') { game.crn += 10; }
            if(type === 'GTOKEN') { game.gtk += 10000; }
            if(type === 'JUMP') { 
                game.jmp += 3; 
                renderJumpButton();
            }
            updateUI();
            addLog("Pack " + type + " activé avec succès !");
        }

        function renderJumpButton() {
            const container = document.getElementById('jump-container');
            if (game.jmp > 0) {
                container.innerHTML = `<button class="btn-jump" onclick="useJump()">🌀 UTILISER SAUT (${game.jmp})</button>`;
            } else {
                container.innerHTML = "";
            }
        }

        function useJump() {
            if(game.jmp > 0) {
                game.jmp--;
                addLog("🌀 Téléportation vers une nouvelle zone GPS...");
                renderJumpButton();
            }
        }

        function updateUI() {
            document.getElementById('stat-geo').innerText = "🟡 " + game.geo.toLocaleString();
            document.getElementById('stat-tix').innerText = "🎫 " + game.tix;
            document.getElementById('stat-crn').innerText = "👑 " + game.crn;
            document.getElementById('stat-gtk').innerText = "🧱 " + game.gtk.toLocaleString();
        }

        function addLog(txt) {
            document.getElementById('logs').innerText = "> " + txt;
        }
    </script>
</body>
</html>
