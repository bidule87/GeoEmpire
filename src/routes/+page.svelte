<script>
    let player = {
        cash: 2500,
        level: 1,
        holdingName: "Ma Holding Royale",
        skills: { braquage: 1, gestion: 1 }
    };

    let logs = ["Bienvenue dans Geo-Empire !"];

    function tenterBraquage() {
        const chance = Math.random() * 100;
        if (chance < 30 + (player.skills.braquage * 5)) {
            const gain = Math.floor(Math.random() * 5000) + 1000;
            player.cash += gain;
            addLog(`✅ Braquage réussi ! +${gain}$`);
        } else {
            player.cash -= Math.floor(player.cash * 0.2);
            addLog(`🚨 ÉCHEC ! La police t'a eu.`);
        }
    }

    function jouerLoterie() {
        if (player.cash < 100) return;
        player.cash -= 100;
        if (Math.random() > 0.9) {
            player.cash += 10000;
            addLog("💎 JACKPOT ! +10.000$");
        } else {
            addLog("❌ Ticket perdant.");
        }
    }

    function addLog(msg) {
        logs = [msg, ...logs].slice(0, 5);
    }
</script>

<main>
    <div class="hud">
        <h1>{player.holdingName}</h1>
        <div class="stats">
            <span>💰 {player.cash}$</span>
            <span>🎓 Nv.{player.skills.gestion}</span>
            <span>🔫 Nv.{player.skills.braquage}</span>
        </div>
    </div>

    <div class="game">
        <section class="map">
            <div class="poi" style="top:20%; left:30%">🏦 Banque</div>
        </section>

        <section class="actions">
            <div class="box">
                <h3>🏢 Business</h3>
                <button on:click={jouerLoterie}>🎰 Loterie (100$)</button>
            </div>
            <div class="box">
                <h3>🔥 Illégal</h3>
                <button class="red" on:click={tenterBraquage}>Braquer la banque</button>
            </div>
        </section>
    </div>

    <div class="console">
        {#each logs as log}
            <p>> {log}</p>
        {/each}
    </div>
</main>

<style>
    :global(body) { margin: 0; background: #1a1a1a; color: white; font-family: sans-serif; }
    .hud { background: #2c3e50; padding: 10px; border-bottom: 3px solid #f1c40f; text-align: center; }
    .stats { display: flex; justify-content: space-around; font-weight: bold; }
    .game { display: flex; height: 60vh; }
    .map { flex: 2; background: #34495e; position: relative; display: flex; align-items: center; justify-content: center; }
    .poi { position: absolute; background: #f1c40f; color: black; padding: 5px; border-radius: 10px; font-size: 12px; }
    .actions { flex: 1; padding: 10px; background: #222; }
    .box { background: #333; padding: 10px; border-radius: 5px; margin-bottom: 10px; }
    button { width: 100%; padding: 10px; margin: 5px 0; border: none; border-radius: 5px; background: #3498db; color: white; font-weight: bold; cursor: pointer; }
    .red { background: #e74c3c; }
    .console { background: #000; padding: 10px; font-family: monospace; color: #2ecc71; min-height: 100px; }
</style>
