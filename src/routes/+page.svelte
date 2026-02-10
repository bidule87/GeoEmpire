<script>
  let geo = 39259;
  let tix = 10;
  let crn = 0;
  let gtk = 5000;
  let jmp = 0;
  let elite = false;
  let tab = 'RAID';

  function buy(type, q, p) {
    if (type === 'E') elite = true;
    if (type === 'T') tix += q;
    if (type === 'C') crn += q;
    if (type === 'G') gtk += q;
    if (type === 'J') jmp += q;
  }
</script>

<main>
  <div style="background:#111; padding:10px; color:#f1c40f; font-weight:bold;">
    EMPIRE {elite ? 'ELITE' : ''} | 🟡{geo} | 🎫{tix} | 👑{crn} | 🧱{gtk}
  </div>

  <div style="display:flex; background:#222;">
    <button style="flex:1; padding:10px; color:#fff;" on:click={()=>tab='MAP'}>RADAR</button>
    <button style="flex:1; padding:10px; color:#fff;" on:click={()=>tab='SHOP'}>SHOP</button>
    <button style="flex:1; padding:10px; color:#fff;" on:click={()=>tab='RAID'}>RAID</button>
  </div>

  <div style="padding:20px;">
    {#if tab === 'MAP'}
      <div style="text-align:center;">
        <p>SCAN GPS EN COURS...</p>
        {#if jmp > 0}
          <button on:click={()=>{jmp--;}}>UTILISER SAUT ({jmp})</button>
        {/if}
      </div>
    {/if}

    {#if tab === 'SHOP'}
      <div>
        <h3 style="color:#f1c40f;">BOUTIQUE (€)</h3>
        <div style="background:#111; margin:5px; padding:10px; border:1px solid #fff;" on:click={()=>buy('E',1,9.99)}>PACK ELITE - 9.99€</div>
        <div style="background:#111; margin:5px; padding:10px; border:1px solid #00d4ff;" on:click={()=>buy('T',100,7.99)}>PRESTIGE (100🎫) - 7.99€</div>
        <div style="background:#111; margin:5px; padding:10px; border:1px solid #f1c40f;" on:click={()=>buy('C',10,4.99)}>CROWNS (10👑) - 4.99€</div>
        <div style="background:#111; margin:5px; padding:10px; border:1px solid #e67e22;" on:click={()=>buy('G',10000,4.99)}>G-TOKENS (10k🧱) - 4.99€</div>
        <div style="background:#111; margin:5px; padding:10px; border:1px solid #9b59b6;" on:click={()=>buy('J',3,5.99)}>TELEPORT (3🌀) - 5.99€</div>
      </div>
    {/if}

    {#if tab === 'RAID'}
      <div style="text-align:center; background:#111; padding:20px; border-radius:10px;">
        <h2>BANQUE CENTRALE</h2>
        <p>Butin: 42.500 G</p>
        <button style="background:#e74c3c; color:#fff; padding:15px; width:100%; border:none;" on:click={()=>geo+=42500}>INFILTRER (1 🎫)</button>
      </div>
    {/if}
  </div>
</main>

<style>
  :global(body) { margin:0; background:#000; color:#fff; font-family:sans-serif; }
  button { cursor:pointer; font-weight:bold; }
</style>