<script>
    import { onMount } from 'svelte';
    
    let player = {
        cash: 2500,
        level: 1,
        holdingName: "Ma Holding Royale",
        properties: [],
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
            const amende = Math.floor(player.cash * 0.2);
            player.cash -= amende;
            addLog(`🚨 ÉCHEC ! Amende : -${amende}$`);
        }
    }

    function jouerLoterie() {
        if (player.cash < 100) return addLog("Pas assez de cash !");
        player.cash -= 100;
        if (Math.random() > 0.9) {
            player.cash += 10000;
            addLog("💎 JACKPOT ! +10.000$ !");
        } else {
            addLog("❌ Ticket perdant...");
        }
    }

    function apprendre(skill) {
        let cout = player.skills[skill] * 1000;
        if (player.cash >= cout) {
            player.cash -= cout;
            player.skills[skill]++;
            addLog(`📖 ${skill} niveau ${player.skills[skill]} !`);
        }
    }

    function addLog(msg) {
        logs = [msg, ...logs].slice(0, 5);
    }
</script>

<main>
    <div class="hud">
        <h1>{player.holdingName} <small>Nv.{player.level}</small></h1>
        <div class="stats">
            <span>💰 {player.cash}$</span>
            <span>🎓 Gestion: Nv.{player.skills.gestion}</span>
            <span>🔫 Braquage: Nv.{player.skills.braquage}</span>
        </div>
    </div>

    <div class="game-container">
        <section class="map-view">
            <div class="map-placeholder">
                <p>📍 GPS : Paris, France</p>
                <div class="poi" style="top:30%; left:40%">🏦 Banque</div>
                <div class="poi" style="top:60%; left:20%">🏢 Filiale</div>
            </div>
        </section>

        <section class="actions">
            <div class="tab">
                <h3>🏢 Holding</h3>
                <button on:click={() => addLog("Scan des entreprises...")}>Scanner la zone</button>
                <button on:click={jouerLoterie}>🎰 Loterie (100$)</button>
            </div>

            <div class="tab">
                <h3>🔥 Illégal</h3>
                <button class="danger" on:click={tenterBraquage}>Braquer la banque</button>
            </div>

            <div class="tab">
                <h3>📚 Apprentissage</h3>
                <button on:click={() => apprendre('gestion')}>Former Gestion ({player.skills.gestion * 1000}$)</button>
                <button on:click={() => apprendre('braquage')}>Entraîner Braquage ({player.skills.braquage * 1000}$)</button>
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
    :global(body) { margin: 0; background: #1a1a1a; color: white; font-family: 'Segoe UI', sans-serif; }
    main { display: flex; flex-direction: column; height: 100vh; }
    .hud { background: #2c3e50; padding: 15px; border-bottom: 4px solid #f1c40f; }
    .stats { display: flex; justify-content: space-around; font-weight: bold; }
    .game-container { display: flex; flex: 1; overflow: hidden; }
    .map-view { flex: 2; background: #34495e; position: relative; }
    .map-placeholder { height: 100%; display: flex; align-items: center; justify-content: center; }
    .poi { position: absolute; background: #f1c40f; color: black; padding: 5px 10px; border-radius: 20px; font-weight: bold; font-size: 12px; }
    .actions { flex: 1; padding: 20px; background: #222; overflow-y: auto; }
    .tab { background: #333; padding: 15px; border-radius: 10px; margin-bottom: 20px; }
    button { width: 100%; padding: 12px; margin: 8px 0; border: none; border-radius: 6px; cursor: pointer; font-weight: bold; background: #3498db; color: white; transition: 0.2s; }
    button:hover { filter
