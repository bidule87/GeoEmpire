<div class="heist-modal">
  <div class="header-target">
    <img src={target.img || 'https://images.unsplash.com/photo-1554469384-e58fac16e23a?w=400'} alt="Cible" class="target-img" />
    <div class="target-info">
      <h3>{target.name}</h3>
      <p>Niveau de Sécurité : 🛡️ {target.securityLevel}</p>
    </div>
  </div>

  <div class="security-grid">
    {#each Array(target.locks) as _, i}
      <div class="lock-card">
        <span class="lock-icon">🔒</span>
        <div class="progress-bg"><div class="progress-bar" style="width: 0%"></div></div>
        <button class="hack-btn" on:click={() => startMiniGame(i)}>FORCER {i+1}</button>
      </div>
    {/each}
  </div>

  <div class="footer-actions">
    <button class="cancel">ANNULER</button>
    <button class="confirm">LANCER LE HACK (1 🎫)</button>
  </div>
</div>
