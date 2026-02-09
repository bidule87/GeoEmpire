<script>
  // Variables de ton empire
  let geo = 50000;
  let gToken = 10;
  let tpCards = 0; 
  let radius = 5;
  let activeTab = 'GPS';
  let logs = ["Système prêt. Radar calibré."];
  let loots = []; 

  // Simulation d'apparition de cartes gratuites sur le radar
  function spawnLoot() {
    if (activeTab === 'GPS' && loots.length < 3) {
      loots = [...loots, { id: Math.random(), x: Math.random()*80+10, y: Math.random()*80+10 }];
    }
  }
  setInterval(spawnLoot, 12000);

  function collectLoot(id) {
    tpCards += 1;
    loots = loots.filter(l => l.id !== id);
    logs = ["CARTE TP RÉCUPÉRÉE sur le terrain !", ...logs];
  }

  // ACHAT DU PACK PREMIUM 10 CARTES (4.99€)
  function buyTPPack() {
    // Ici on simulerait le paiement
    tpCards += 10;
    logs = ["PACK VOYAGEUR ACTIVÉ : +10 Cartes TP !", ...logs];
    alert("Merci pour votre achat du Pack Voyageur (4.99€) !");
  }

  function useTP() {
    if (tpCards > 0) {
      tpCards--;
      logs = ["TÉLÉPORTATION... Nouvelle zone débloquée !", ...logs];
    }
  }
</script>

<main>
  <div class="bg-image"></div>

  <header>
    <div class="logo">👑 GEO EMPIRE</div>
    <div class="stats">
      <div class="s"><span>GEO</span><b>{geo.toLocaleString()}</b></div>
      <div class="s"><span>TP CARDS</span><b class="green">{tpCards}</b></div>
      <div class="s"><span>ZONE</span><b class="gold">{radius}km</b></div>
    </div>
    <button class="buy-premium" on:click={buyTPPack}>PACK 10x 🎫 (4.99€)</button>
  </header>

  <div class="container">
    <nav>
      <button class:atv={activeTab==='GPS'} on:click={()=>activeTab='GPS'}>📍 RADAR GPS</button>
      <button class:atv={activeTab==='Braquages'}
