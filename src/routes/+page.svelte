<script>
  let activeTab = 'entreprises'; // Onglet par défaut
  let geoBalance = 6157.92;
  let logs = "Système financier opérationnel.";

  // Structure pour coller aux captures
  let holdings = [
    { nom: "BlackStar", niveau: 0, classement: 72 },
    { nom: "La Tour Sucrée", niveau: 0, classement: 108 }
  ];

  let filiales = [
    { nom: "Acier 1", niveau: 7, holding: "La Tour Sucrée", marketing: 3 },
    { nom: "Centrakor", niveau: 7, holding: "MARIGNANT", marketing: 2 }
  ];

  function setTab(tab) { activeTab = tab; }
</script>

<main>
  <header class="topbar">
    <div class="user-stats">
      <span>👤 Joueur</span>
      <span>💰 {geoBalance.toLocaleString()} $ ∅</span>
      <span>🏆 108e place</span>
      <span>📊 Niveau 0</span>
    </div>
  </header>

  <nav class="main-nav">
    <button class:active={activeTab === 'accueil'} on:click={() => setTab('accueil')}>🏠 Accueil</button>
    <div class="dropdown">
      <button class:active={activeTab === 'situation'}>📉 Situation ▼</button>
      <div class="dropdown-content">
        <button on:click={() => setTab('finances')}>Finances</button>
        <button on:click={() => setTab('ressources')}>Ressources</button>
      </div>
    </div>
    <button class:active={activeTab === 'entreprises'} on:click={() => setTab('entreprises')}>🏢 Entreprises</button>
    <button class:active={activeTab === 'business'} on:click={() => setTab('business')}>💼 Business</button>
  </nav>

  <div class="content">
    {#if activeTab === 'entreprises'}
      <div class="grid">
        {#each filiales as fil}
          <div class="card-pro">
            <div class="card-header">
              <img src="https://via.placeholder.com/50" alt="icon">
              <div>
                <h3>{fil.nom}</h3>
                <small>Niveau: {fil.niveau} | Holding: {fil.holding}</small>
              </div>
            </div>
            <div class="card-footer">
              <button class="manage-btn">Gérer Business</button>
            </div>
          </div>
        {/each}
      </div>
    {/if}

    {#if activeTab === 'finances'}
      <div class="finance-view">
        <h2>Trésorerie</h2>
        <div class="stat-box">
          <p>Solde actuel: <b>{geoBalance} $ ∅</b></p>
          <p>Revenus prévus à minuit: <span class="green">+4 309 $ ∅</span></p>
        </div>
      </div>
    {/if}
  </div>

  <div class="terminal">> {logs}</div>
</main>

<style>
  :global(body) { margin:0; background:#f4f7f6; color:#333; font-family:'Segoe UI', sans-serif; }
  
  .topbar { background:#fff; padding:10px; border-bottom:1px solid #ddd; display:flex; justify-content:center; }
  .user-stats { display:flex; gap:20px; font-size:0.85rem; font-weight:bold; color:#555; }

  .main-nav { background:#e9ecef; display:flex; border-bottom:1px solid #ccc; }
  .main-nav button { border:none; background:none; padding:12px 20px; cursor:pointer; font-weight:600; font-size:0.9rem; color:#444; }
  .main-nav button.active { background:#fff; border-bottom:3px solid #3498db; color:#3498db; }

  .content { padding:20px; max-width:1200px; margin:auto; }
  
  .grid { display:grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap:20px; }
  
  .card-pro { background:#fff; border:1px solid #ddd; border-radius:4px; padding:15px; box-shadow:0 2px 4px rgba(0,0,0,0.05); }
  .card-header { display:flex; gap:15px; border-bottom:1px solid #eee; padding-bottom:10px; }
  .card-header h3 { margin:0; font-size:1rem; color:#2c3e50; }
  
  .manage-btn { width:100%; margin-top:10px; background:#f8f9fa; border:1px solid #ddd; padding:5px; border-radius:3px; cursor:pointer; }
  .manage-btn:hover { background:#eee; }

  /* Dropdown simple pour l'esprit capture */
  .dropdown { position: relative; display: inline-block; }
  .dropdown-content { display: none; position: absolute; background-color: #f9f9f9; min-width: 160px; box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2); z-index: 1; }
  .dropdown:hover .dropdown-content { display: block; }
  .dropdown-content button { width: 100%; text-align: left; }

  .terminal { position:fixed; bottom:0; width:100%; padding:8px; background:#333; color:#2ecc71; font-family:monospace; font-size:0.75rem; }
</style>
