<script>
  import { onMount } from "svelte";

  /* =========================
     1. ÉTAT GLOBAL
  ========================= */
  let capitalHolding = 6157.92;
  let logs = "GEO EMPIRE – Version BÊTA gratuite";
  let mktIdx = 1;
  let lastTick = null;

  /* =========================
     2. MARKETING
  ========================= */
  const mkt = {
    1: { lab: "Local", prix: 100, m: 1.0, c: "#3498db" },
    2: { lab: "National", prix: 300, m: 1.15, c: "#2ecc71" },
    3: { lab: "International", prix: 800, m: 1.3, c: "#e67e22" },
    4: { lab: "Viral / Expert", prix: 2000, m: 1.5, c: "#e74c3c" }
  };

  /* =========================
     3. FILIALES
  ========================= */
  let filiales = [
    {
      id: 1,
      nom: "Acier 1",
      locked: false,
      treso: 12500,
      biens: [{ n: "Entrepôt Forge", v: 85000, m: 10 }]
    },
    {
      id: 2,
      nom: "Projet Alpha",
      locked: true,
      treso: 0,
      biens: []
    }
  ];

  /* =========================
     4. CALCULS
  ========================= */
  $: active = mkt[mktIdx];
  $: nbFilActive = filiales.filter(f => !f.locked).length;
  $: fraisTotalMkt = active.prix * nbFilActive;

  /* =========================
     5. ACTIONS
  ========================= */
  function unlock(id) {
    if (capitalHolding < 5000) return;
    capitalHolding -= 5000;
    filiales = filiales.map(f =>
      f.id === id ? { ...f, locked: false, treso: 1000 } : f
    );
    logs = "Filiale débloquée.";
    saveGame();
  }

  /* =========================
     6. TICK JOURNALIER
  ========================= */
  function dailyTick() {
    filiales = filiales.map(f => {
      if (f.locked) return f;

      let revenus = 0;
      f.biens.forEach(b => {
        revenus += b.v * (1 + b.m / 100) * active.m * 0.01;
      });

      const charges = revenus * 0.15;
      const resultat = Math.floor(revenus - charges);
      const impot = resultat > 0 ? resultat * 0.25 : 0;

      capitalHolding += impot;

      return { ...f, treso: f.treso + (resultat - impot) };
    });

    lastTick = new Date().toISOString().split("T")[0];
    logs = "Tick journalier exécuté (00h).";
    saveGame();
  }

  function checkTick() {
    const today = new Date().toISOString().split("T")[0];
    if (lastTick !== today) dailyTick();
  }

  /* =========================
     7. SAUVEGARDE (CLIENT ONLY)
  ========================= */
  function saveGame() {
    if (typeof window === "undefined") return;
    localStorage.setItem(
      "geoEmpireSave",
      JSON.stringify({ capitalHolding, filiales, mktIdx, lastTick })
    );
  }

  function loadGame() {
    const save = localStorage.getItem("geoEmpireSave");
    if (!save) return;
    const data = JSON.parse(save);
    capitalHolding = data.capitalHolding;
    filiales = data.filiales;
    mktIdx = data.mktIdx;
    lastTick = data.lastTick;
  }

  /* =========================
     8. MOUNT
  ========================= */
  onMount(() => {
    loadGame();
    checkTick();
  });
</script>

<main style="background:#000;color:#eee;min-height:100vh;font-family:sans-serif;--theme:{active.c};padding-bottom:40px;">

<header style="background:#111;padding:15px;border-bottom:3px solid var(--theme);display:flex;justify-content:space-between;">
  <div>
    <div style="font-size:0.7rem;color:#666;">HOLDING</div>
    <div style="font-size:1.6rem;font-weight:bold;color:var(--theme);">
      {capitalHolding.toLocaleString()} $
    </div>
  </div>
  <button on:click={dailyTick} style="background:#222;color:#fff;border:1px solid #555;padding:8px;border-radius:4px;">
    🔁 Tick (test)
  </button>
</header>

<section style="padding:15px;">
  <div style="display:flex;gap:5px;margin-bottom:20px;">
    {#each [1,2,3,4] as i}
      <button on:click={() => mktIdx = i}
        style="flex:1;padding:10px;background:{mktIdx===i?mkt[i].c:'#111'};border:1px solid #333;color:#fff;">
        {mkt[i].lab}
      </button>
    {/each}
  </div>

  {#each filiales as f}
    <div style="background:#0a0a0a;border:1px solid #222;border-radius:8px;margin-bottom:20px;position:relative;">
      {#if f.locked}
        <div style="position:absolute;inset:0;background:rgba(0,0,0,0.9);display:flex;flex-direction:column;justify-content:center;align-items:center;">
          🔒
          <button on:click={() => unlock(f.id)} style="margin-top:10px;padding:10px 20px;background:var(--theme);border:none;">
            Débloquer (5 000 $)
          </button>
        </div>
      {/if}

      <div style="padding:12px;border-left:5px solid var(--theme);">
        <b>{f.nom}</b> — <span style="color:#2ecc71">{f.treso.toLocaleString()} $</span>
      </div>
    </div>
  {/each}
</section>

<footer style="position:fixed;bottom:0;width:100%;background:#111;color:#2ecc71;padding:8px;font-family:monospace;font-size:0.7rem;">
  &gt; {logs}
</footer>

</main>
