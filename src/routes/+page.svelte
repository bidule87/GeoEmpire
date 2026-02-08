<script>
    let player = {
        cash: 2500,
        level: 1,
        holdingName: "Ma Holding Royale",
        skills: { braquage: 1, gestion: 1 }
    };
    let logs = ["Système prêt. En attente d'ordres..."];

    function action(type) {
        if (type === 'braquage') {
            if (Math.random() > 0.6) {
                let g = 2000 * player.skills.braquage;
                player.cash += g;
                addLog(`✅ BRAQUAGE RÉUSSI : +${g}$`);
            } else {
                player.cash -= 500;
                addLog("🚨 ÉCHEC : Amende de 500$");
            }
        }
        if (type === 'loterie' && player.cash >= 100) {
            player.cash -= 100;
            if (Math.random() > 0.9) { player.cash += 10000; addLog("💎 JACKPOT : +10.000$"); }
            else { addLog("❌ Loterie perdante"); }
        }
    }

    function apprendre(s) {
        let cost = player.skills[s] * 1000;
        if (player.cash >= cost) {
            player.cash -= cost;
            player.skills[s]++;
            addLog(`🎓 ${s} monte au niveau ${player.skills[s]}`);
        }
    }

    function addLog(m) { logs = [m, ...logs].slice(0, 4); }
</script>

<main>
    <div class="header">
        <h1>{player.holdingName} 👑</h1>
        <div class="stats">💰 {player.cash} $ | 🎓 GESTION: {player.skills.gestion} | 🔫 BRAQUAGE: {player.skills.braquage}</div>
    </div>

    <div class="content">
        <div class="map">
            <div class="label">📍 SCANNER GPS : PARIS (SIMULÉ)</div>
            <div class="poi" style="top:20%; left:30%">🏦 Banque</div>
            <div class="poi" style="top:50%; left:60%">🏬 Filiale #1</div>
        </div>

        <div class="menu">
            <h3>🏢 GESTION HOLDING</h3>
            <button on:click={() => addLog("Recherche de filiales...")}>Scanner Entreprises</button>
            <button on:click={() => action('loterie')}>🎰 Loterie (100$)</button>
            
            <h3>🔥 OPÉRATIONS</h3>
            <button class="red" on:click={() => action('braquage')}>Braquer la Banque</button>

            <h3>📚 APPRENTISSAGE</h3>
            <button on:click={() => apprendre('gestion')}>Former Gestion ({player.skills.gestion * 1000}$)</button>
            <button on:click={() => apprendre('braquage')}>Entraîner Braquage ({player.skills.braquage * 1000}$)</button>
        </div>
    </div>

    <div class="console">
        {#each logs as l}<p>> {l}</p>{/each}
    </div>
</main>

<style>
    :global(body) { margin:0; background:#1a1a1a; color:white; font-family:sans-serif; }
    .header { background:#2c3e50; padding:15px; border-bottom:3px solid #f1c40f; text-align:center; }
    .content { display:flex; height:65vh; }
    .map { flex:2; background:#34495e; position:relative; display:flex; align-items:center; justify-content:center; border-right:2px solid #444; }
    .poi { position:absolute; background:#f1c40f; color:black; padding:5px; border-radius:10px; font-weight:bold; font-size:12px; }
    .menu { flex:1; padding:15px; background:#222; overflow-y:auto; }
    button { width:100%; padding:12px; margin:5px 0; border:none; border-radius:5px; background:#3498db; color:white; font-weight:bold; cursor:pointer; }
    .red { background:#e74c3c; }
    .console { background:#000; padding:10px; font-family:monospace; color:#2ecc71; height:100px; border-top:2px solid #444; }
</style>
