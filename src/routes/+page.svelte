<script>
  let targetPlayers = [
    { name: "Joueur_88", level: 5, loot: "2500 - 5000 G", security: "Basse" },
    { name: "Empire_Limoges", level: 12, loot: "8000 - 15000 G", security: "Haute" },
    { name: "Shadow_User", level: 3, loot: "1000 - 2000 G", security: "Inexistante" }
  ];

  function launchHeist(target) {
    if (tpCards >= 1) {
      tpCards -= 1; // Un braquage coûte 1 Carte TP
      let success = Math.random() > 0.4; // 60% de chance de réussite
      if (success) {
        let gain = Math.floor(Math.random() * 3000) + 1000;
        geo += gain;
        logs = [`🏴‍☠️ Succès ! Vous avez braqué ${target.name} pour ${gain} G.`, ...logs];
      } else {
        logs = [`🚫 Échec du braquage sur ${target.name}. La police était là !`, ...logs];
      }
    } else {
      logs = ["🎫 Pas assez de Cartes TP pour lancer un braquage !", ...logs];
    }
  }
</script>

{#if activeTab === 'HEIST'}
  <div class="list-view">
      <h3>CIBLES DISPONIBLES (5KM)</h3>
      {#each targetPlayers as target}
        <div class="card heist-card">
            <div class="card-info">
                <b>{target.name}</b> <small>(Niv.{target.level})</small><br>
                <span style="color:#f1c40f">Butin estimé: {target.loot}</span><br>
                <small>Sécurité: {target.security}</small>
            </div>
            <button class="attack-btn" on:click={() => launchHeist(target)}>BRAQUER (1 🎫)</button>
        </div>
      {/each}
      <p style="font-size:10px; color:#666; text-align:center; margin-top:20px;">
        Note: Les victimes assurées à 100% ne perdent rien, mais vous gagnez quand même le butin.
      </p>
  </div>
{/if}

<style>
  .heist-card { border-left: 4px solid #e74c3c; }
  .attack-btn { 
    background: #e74c3c; color: white; border: none; padding: 10px; 
    border-radius: 4px; font-weight: bold; width: auto; font-size: 10px;
  }
</style>
