<script>
  import { onMount } from 'svelte';

  // --- VARIABLES DE JEU (FULL ACCESS POUR BÊTA) ---
  let cash = 10000000;
  let crowns = 100;
  let vue = 'jeu';
  let feedback = { note: 5, texte: "", envoye: false };

  // --- CONSTITUTION & RÈGLES ---
  const articles = [
    { id: 1, t: "Souveraineté", d: "Le Magnat est seul propriétaire de ses actifs accumulés." },
    { id: 2, t: "Éthique", d: "L'usage de bots ou de modification de code est proscrit." },
    { id: 3, t: "Prestige", d: "Le Pack Prestige débloque les Crowns infinies après le Niv.10." },
    { id: 4, t: "Récompenses", d: "Le Casino est le seul lieu de conversion des Crowns en Fortune." }
  ];

  // --- LOGIQUE SAUVEGARDE ---
  function save() {
    localStorage.setItem('empire_beta_final', JSON.stringify({ cash, crowns }));
  }

  function gagner() { cash += 500000; crowns += 2; save(); }

  onMount(() => {
    const data = localStorage.getItem('empire_beta_final');
    if (data) { 
      const p = JSON.parse(data); 
      cash = p.cash; crowns = p.crowns; 
    }
    setInterval(save, 30000);
  });
</script>

<div class="app">
  <header class="top">
    <span class="gold">👑 {crowns}</span>
    <span class="green">{cash.toLocaleString()} ₲</span>
    <div class="beta-tag">BÊTA</div>
  </header>

  <main class="content">
    {#if vue === 'jeu'}
      <div class="card center">
        <h1>SALLE DE CONTRÔLE</h1>
        <button class="btn-main" on:click={gagner}>SIMULER ACTIVITÉ (+XP)</button>
        <p class="hint">Les données sont sauvegardées automatiquement.</p>
      </div>
    {/if}

    {#if vue === 'regles'}
      <div class="scroll-area">
        <h2 class="gold-t">📜 CONSTITUTION DE L'EMPIRE</h2>
        {#each articles as art}
          <div class="art">
            <span class="art-nb">ART. {art.id}</span>
            <h3>{art.t}</h3>
            <p>{art.d}</p>
          </div>
        {/each}
        <hr>
        <h2 class="gold-t">✍️ VOTRE AVIS</h2>
        {#if !feedback.envoye}
          <textarea bind:value={feedback.texte} placeholder="Améliorations, bugs..."></textarea>
          <button class="btn-gold" on:click={() => feedback.envoye = true}>ENVOYER L'AVIS</button>
        {:else}
          <p class="green-t">Merci ! Avis enregistré localement.</p>
        {/if}
      </div>
    {/if}
  </main>

  <nav class="nav">
    <button class={vue === 'jeu' ? 'active' : ''} on:click={() => vue = 'jeu'}>🎮 JEU</button>
    <button class={vue === 'regles' ? 'active' : ''} on:click={() => vue = 'regles'}>📜 LOIS & AVIS</button>
  </nav>
</div>

<style>
  :global(body) { background: #000; color: #fff; font-family: sans-serif; margin: 0; }
  .top { display: flex; justify-content: space-around; padding: 15px; border-bottom: 2px solid #d4af37; background: #050505; align-items: center; }
  .gold { color: #d4af37; font-weight: bold; }
  .green { color: #2ecc71; font-weight: bold; }
  .beta-tag { font-size: 0.6em; border: 1px solid #d4af37; padding: 2px 5px; color: #d4af37; }

  .content { padding: 20px; padding-bottom: 80px; max-width: 450px; margin: auto; }
  .scroll-area { background: #0a0a0a; padding: 20px; border-radius: 10px; border: 1px solid #222; }
  
  .gold-t { color: #d4af37; font-size: 0.9em; text-align: center; margin-bottom: 20px; }
  .art { margin-bottom: 20px; border-bottom: 1px solid #1a1a1a; padding-bottom: 10px; }
  .art-nb { font-size: 0.6em; color: #d4af37; font-weight: bold; }
  .art h3 { font-size: 0.85em; margin: 5px 0; color: #eee; }
  .art p { font-size: 0.75em; color: #888; margin: 0; }

  textarea { width: 100%; height: 80px; background: #000; border: 1px solid #333; color: #fff; border-radius: 5px; margin: 10px 0; padding: 10px; box-sizing: border-box; }
  .btn-gold { width: 100%; padding: 10px; background: #d4af37; border: none; font-weight: bold; border-radius: 5px; cursor: pointer; }

  .nav { position: fixed; bottom: 0; width: 100%; height: 60px; background: #000; border-top: 1px solid #222; display: flex; }
  .nav button { flex: 1; background: none; border: none; color: #555; font-weight: bold; cursor: pointer; }
  .nav button.active { color: #d4af37; border-top: 2px solid #d4af37; }
  
  .btn-main { width: 100%; padding: 20px; background: #d4af37; border: none; font-weight: 900; border-radius: 10px; cursor: pointer; }
  .hint { font-size: 0.7em; color: #444; margin-top: 15px; }
</style>