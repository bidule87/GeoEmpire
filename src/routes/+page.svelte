<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Geo Empire Ultimate</title>
    <style>
        :root { --gold: #f1c40f; --red: #e74c3c; --bg: #000; --card: #111; }
        body { margin: 0; background: var(--bg); color: #fff; font-family: 'Segoe UI', sans-serif; overflow: hidden; }
        
        /* HEADER */
        .header { padding: 15px; border-bottom: 1px solid #222; background: #050505; }
        .logo { color: var(--gold); font-weight: 900; font-size: 1.2rem; }
        .stats { display: flex; gap: 10px; font-size: 0.7rem; margin-top: 5px; color: #aaa; }

        /* NAV */
        nav { display: flex; border-bottom: 2px solid var(--gold); background: #0a0a0a; }
        nav button { flex: 1; padding: 15px; background: none; border: none; color: #666; font-weight: bold; font-size: 0.7rem; cursor: pointer; }
        nav button.active { color: var(--gold); background: rgba(241, 196, 15, 0.1); }

        /* CONTENT */
        .content { height: calc(100vh - 130px); overflow-y: auto; padding: 15px; display: none; }
        .content.active { display: block; }

        /* SHOP CARDS */
        .shop-title { color: var(--gold); font-size: 0.8rem; letter-spacing: 2px; margin-bottom: 15px; }
        .p-card { display: flex; align-items: center; background: var(--card); padding: 12px; border-radius: 12px; margin-bottom: 10px; border: 1px solid #333; }
        .p-icon { font-size: 2rem; margin-right: 15px; min-width: 40px; text-align: center; }
        .p-info { flex: 1; }
        .p-info b { display: block; font-size: 0.8rem; }
        .p-info small { color: #666; font-size: 0.6rem; }
        .p-price { background: var(--gold); color: #000; border: none; padding: 8px 12px; border-radius: 6px; font-weight: 900; font-size: 0.75rem; cursor: pointer; }

        /* VARIANTES COULEURS */
        .elite { border-color: #fff; }
        .prestige { border-color: #00d4ff; }
        .crown { border-color: var(--gold); }
        .gtoken { border-color: #e67e22; }
        .teleport { border-color: #9b59b6; }

        /* RAID VIEW */
        .raid-box { background: var(--card); border-radius: 15px; overflow: hidden; border: 1px solid #333; }
        .raid-img { width: 100%; height: 120px; background: #222; display: flex; align-items: center; justify-content: center; font-size: 3rem; }
        .raid-details { padding: 15px; text-align: center; }
        .raid-btn { background: var(--red); color: #fff; border: none; width: 100%; padding: 15px; border-radius: 10px; font-weight: bold; margin-top: 10px; }

        /* LOGS */
        .footer-logs { position: fixed; bottom: 0; width: 100%; background: #000; padding: 10px; color: #2ecc71; border-top: 1px solid #222; font-family: monospace; font-size: 0.65rem; }
    </style>
</head>
<body>

    <div class="header">
        <div class="logo" id="logo">👑 GEO EMPIRE</div>
        <div class="stats">
            <span id="stat-geo">🟡 39,259</span> | 
            <span id="stat-tix">🎫 10</span> | 
            <span id="stat-crn">👑 0</span> | 
            <span id="stat-gtk">🧱 5,000</span>
        </div>
    </div>

    <nav>
        <button onclick="showTab('MAP', this)">📍 RADAR</button>
        <button onclick="showTab('SHOP', this)" class="active">🛒 SHOP</button>
        <button onclick="showTab('RAID', this)">🏴‍☠️ RAID</button>
    </nav>

    <div id="MAP" class="content">
        <div style="text-align: center; padding-top: 50px;">
            <div style="width:150px; height:150px; border:2px solid var(--gold); border-radius:50%; margin: 0 auto; position: relative;">
                <div style="position: absolute; width: 50%; height: 2px; background: var(--gold); top: 50%; left: 50%; transform-origin: left; animation: rotate 4s linear infinite;"></div>
            </div>
            <p style="color: #666; margin-top: 20px;">SCAN GPS PORTÉE 5KM...</p>
        </div>
    </div>

    <div id="SHOP" class="content active">
        <h3 class="shop-title">💎 BOUTIQUE PREMIUM (€)</h3>
        
        <div class="p-card elite">
            <div class="p-icon">📂</div>
            <div class="p-info"><b>PACK ÉLITE</b><small>Full Gestion + Export Excel</small></div>
            <button class="p-price" onclick="buy('ELITE')">9.99 €</button>
        </div>

        <div class="p-card prestige">
            <div class="p-icon">📦</div>
            <div class="p-info"><b>PACK PRESTIGE</b><small>100 Tickets + 5 000 G-Tokens</small></div>
            <button class="p-price" onclick="buy('PRESTIGE')">7.99 €</button>
        </div>

        <div class="p-card crown">
            <div class="p-icon">👑</div>
            <div class="p-info"><b>PACK CROWNS</b><small>10 Jetons Loterie Royale</small></div>
            <button class="p-price" onclick="buy('CROWN')">4.99 €</button>
        </div>

        <div class="p-card gtoken">
            <div class="p-icon">🧱</div>
            <div class="p-info"><b>PACK G-TOKEN</b><small>10 000 Lingots de Boost</small></div>
            <button class="p-price" onclick="buy('GTOKEN')">4.99 €</button>
        </div>

        <div class="p-card teleport">
            <div class="p-icon">🌀</div>
            <div class="p-info"><b>TÉLÉPORTATION</b><small>3 Sauts GPS Immédiats</small></div>
            <button class="p-price" onclick="buy('JUMP')">5.99 €</button>
        </div>
    </div>

    <div id="RAID" class="content">
        <div class="raid-box">
            <div class="raid-img">🏛️</div>
            <div class="raid-details">
                <h2>BANQUE CENTRALE</h2>
                <div style="background: var(--red); display: inline-block; padding: 5px 10px; border-radius: 5px; font-weight: bold;">42,500 G</div>
                <button class="raid-btn" onclick="addLog('Tentative d\'infiltration...')">INFILTRER (1 🎫)</button>
            </div>
        </div>
    </div>

    <div class="footer-logs" id="logs">> Système Empire prêt.</div>

    <script>
        let data = { geo: 39259, tix: 10, crn: 0, gtk: 5000, jmp: 0, elite: false };

        function showTab(tabId, btn) {
            document.querySelectorAll('.content').forEach(c => c.classList.remove('active'));
            document.querySelectorAll('nav button').forEach(b => b.classList.remove('active'));
            document.getElementById(tabId).classList.add('active');
            btn.classList.add('active');
        }

        function buy(type) {
            if(type === 'ELITE') { data.elite = true; document.getElementById('logo').innerText = "👑 GEO EMPIRE ★"; }
            if(type === 'PRESTIGE') { data.tix += 100; data.gtk += 5000; }
            if(type === 'CROWN') { data.crn += 10; }
            if(type === 'GTOKEN') { data.gtk += 10000; }
            if(type === 'JUMP') { data.jmp += 3; }
            updateStats();
            addLog("Achat effectué : " + type);
        }

        function updateStats() {
            document.getElementById('stat-geo').innerText = "🟡 " + data.geo.toLocaleString();
            document.getElementById('stat-tix').innerText = "🎫 " + data.tix;
            document.getElementById('stat-crn').innerText = "👑 " + data.crn;
            document.getElementById('stat-gtk').innerText = "🧱 " + data.gtk.toLocaleString();
        }

        function addLog(txt) {
            document.getElementById('logs').innerText = "> " + txt;
        }
    </script>

    <style>
        @keyframes rotate { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
    </style>
</body>
</html>
