<script>
  // Système de monnaie selon ton script
  let player = {
    geo: 50000,
    gToken: 10,
    crowns: 928,
    day: 1,
    gpsRadius: 5, // km
    properties: []
  };

  let activeTab = 'Braquages';
  let logs = ["Système sécurisé. Prêt pour infiltration."];
  
  // Variables pour le mini-jeu de braquage
  let heistStep = 0; // 0: choix, 1: crochetage
  let currentTarget = null;
  let lockProgress = 0;

  const targets = [
    { name: "Commerce (3 Cadenas)", risk: 10, reward: 2500, locks: 3 },
    { name: "Banque (6 Cadenas)", risk: 40, reward: 15000, locks: 6 },
    { name: "Holding (9 Cadenas)", risk: 80, reward: 85000, locks: 9 }
  ];

  function startHeist(t) {
    currentTarget = t;
    heistStep = 1;
    lockProgress = 0;
    logs = [`Tentative sur ${t.name}... Déverrouillage en cours.`, ...logs];
  }

  function pickLock() {
    lockProgress += (100 / currentTarget.locks);
    if (lockProgress >= 99) {
      player.geo += currentTarget.reward;
      logs = [`SUCCÈS ! +${currentTarget.reward} GEO récupérés.`, ...logs];
      resetHeist();
    }
  }

  function resetHeist() {
    heistStep = 0;
    currentTarget = null;
    lockProgress = 0;
  }

  const menu = ['Carte GPS', 'Mes Entreprises', 'Marché', 'Braquages'];
</script>

<main style="background-image: url('https://images.unsplash.com/photo-1514924013411-cbf25faa35bb?auto=format&fit=crop&w=1920&q=80');">
  
  <header class="hud">
    <div class="logo">👑 GEO EMPIRE</div>
    <div class="stats">
      <div class="stat"><span class="lbl">GEO</span><span class="val gold">{player.geo.toLocaleString()}</span></div>
      <div class="stat"><span class="lbl">G-TOKEN</span><span class="val blue">{player.gToken}</span></div>
      <div class="stat"><span class="lbl">CROWNS</span><span class="val pink">{
