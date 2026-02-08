<script>
    let cash = 2500;
    let logs = ["Bienvenue, Boss !"];
    function addLog(m) { logs = [m, ...logs].slice(0, 3); }

    function braquer() {
        if (Math.random() > 0.7) { cash += 2000; addLog("✅ BRAQUAGE RÉUSSI ! +2000$"); }
        else { cash -= 500; addLog("🚨 POLICE ! Amende -500$"); }
    }

    function loterie() {
        if (cash < 100) return;
        cash -= 100;
        if (Math.random() > 0.9) { cash += 5000; addLog("💎 JACKPOT ! +5000$"); }
        else { addLog("❌ Perdu..."); }
    }
</script>

<main>
    <div style="background:#2c3e50; color:white; padding:20px; text-align:center;">
        <h1>GEO-EMPIRE : HOLDING 👑</h1>
        <h2>💰 ARGENT : {cash} $</h2>
    </div>

    <div style="padding:20px; background:#f4f4f4; color:#333;">
        <h3>📍 ACTIONS DISPONIBLES</h3>
        <button on:click={braquer} style="background:red; color:white; width:100%; padding:15px; margin-bottom:10px; cursor:pointer;">🔥 BRAQUER UNE BANQUE</button>
        <button on:click={loterie} style="background:blue; color:white; width:100%; padding:15px; cursor:pointer;">🎰 JOUER LOTERIE (100$)</button>
        
        <div style="margin-top:20px; background:white; padding:10px; border:1px solid #ccc;">
            <strong>LOGS :</strong>
            {#each logs as log}<p>> {log}</p>{/each}
        </div>
    </div>
</main>

<style>
    :global(body) { margin: 0; font-family: sans-serif; }
    button { font-weight: bold; border: none; border-radius: 5px; }
</style>
