<script>
    import { onMount } from 'svelte';
    
    // --- ÉTAT DU JOUEUR ---
    let player = {
        cash: 2500,
        level: 1,
        xp: 0,
        holdingName: "Ma Holding Royale",
        properties: [],
        skills: { braquage: 1, gestion: 1 }
    };

    let logs = ["Bienvenue dans Geo-Empire !"];
    let showMap = true;

    // --- SYSTÈME DE BRAQUAGE ---
    function tenterBraquage() {
        const chance = Math.random() * 100;
        if (chance < 30 + (player.skills.braquage * 5)) {
            const gain = Math.floor(Math.random() * 5000) + 1000;
            player.cash += gain;
            addLog(`✅ Braquage réussi ! +${gain}$`);
        } else {
            const amende = Math.floor(player.cash * 0.2);
            player.cash -= amende;
            addLog(`🚨 ÉCHEC ! La police t'a eu. Amende : -${amende}$`);
        }
    }

    // --- LOTERIE ---
    function jouerLoterie() {
        if (player.cash < 100) return addLog("Pas assez de cash pour le ticket (100$)");
        player.cash -= 100;
        if (Math.random() > 0.9) {
            player.cash += 10000;
            addLog("💎 JACKPOT ! Tu gagnes 10.000$ !");
        } else {
            addLog("❌ Ticket perdant...");
        }
    }

    // --- APPRENTISSAGE ---
    function apprendre(skill) {
        let cout = player.skills[skill] * 1000;
        if (player.cash >= cout) {
            player.cash -= cout;
            player.skills[skill]++;
            addLog(`📖 Niveau de ${skill} augmenté !`);
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
                <p>📍 LOCALISATION GPS ACTIVÉE</p>
                <div class="poi" style="top:20%; left:30%">🏦 Banque (Braquable)</div>
                <div class="poi" style="top:50%; left:60%">🏢 Entreprise à vendre</div>
            </div>
        </section>

        <section class="actions">
            <div class="tab">
                <h3>🏢 Holding & Business</h3>
                <button on:click={() => addLog("Achat d'entreprise en cours...")}>Scanner les sociétés</button>
                <button on:click={() => jouerLoterie()}>🎰 Loterie (100$)</button>
            </div>

            <div class="tab">
                <h3>🔥 Opérations Illégales</h3>
                <button class="danger" on:click={tenterBraquage}>Braquer la banque locale</button>
            </div>

            <div class="tab">
                <h3>📚 Centre d'Apprentissage</h3>
                <button on:click={() => apprendre('gestion')}>Former en Gestion ({player.skills.gestion * 1000}$)</button>
                <button on:click={() => apprendre('braquage')}>Entraînement Braquage ({player.skills.braquage * 1000}$)</button>
            </div>
        </section>
    </div>

    <div class="console">
        {#each logs as log}
            <p>{log}</p>
        {each}
    </div>
</main>

<style>
    :global(body) { margin: 0; background: #1a1a1a; color: white; font-family: sans-serif; }
    main { display: flex; flex-direction: column; height: 100vh; }
    .hud { background: #2c3e50; padding: 10px; border-bottom: 3px solid #f1c40f; text-align: center; }
    .stats { display: flex; justify-content: space-around; font-size: 0.9rem; }
    .game-container { display: flex; flex: 1; overflow: hidden; }
    .map-view { flex: 2; background: #34495e; position: relative; border-right: 2px solid #444; }
    .map-placeholder { height: 100%; display: flex; align-items: center; justify-content: center; background: radial-gradient(circle, #34495e 0%, #2c3e50 100%); }
    .poi { position: absolute; background: rgba(241, 196, 15, 0.8); padding: 5px; border-radius: 5px; font-size: 12px; cursor: pointer; border: 1px solid black; }
    .actions { flex: 1; padding: 15px; overflow-y: auto; background: #222; }
    .tab { background: #333; padding: 10px; border-radius: 8px; margin-bottom: 15px; border-left: 4px solid #3498db; }
    button { width: 100%; padding: 12px; margin: 5px 0; border: none; border-radius: 5px; cursor: pointer; font-weight: bold; background: #3498db; color: white; }
    .danger { background: #e74c3c; }
    .console { height: 100px; background: black; padding: 10px; font-family: monospace; font-size: 12px; color: #2ecc71; border-top: 2px solid #444; }
</style>
