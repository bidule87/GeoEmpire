<script>
    let cash = 1000;
    let crowns = 0;
    let properties = [];

    function buyProperty(name, price) {
        if (cash >= price) {
            cash -= price;
            properties = [...properties, name];
        } else {
            alert("Pas assez de cash !");
        }
    }
</script>

<main>
    <h1>Geo-Empire 👑</h1>
    <div class="stats">
        <p>Argent : {cash} $</p>
        <p>Crowns : {crowns}</p>
    </div>

    <section>
        <h2>Acheter des propriétés</h2>
        <button on:click={() => buyProperty('Petit Commerce', 500)}>
            Acheter Petit Commerce (500$)
        </button>
    </section>

    <section>
        <h2>Mes Propriétés</h2>
        <ul>
            {#each properties as prop}
                <li>{prop}</li>
            {/each}
        </ul>
    </section>
</main>

<style>
    main { font-family: sans-serif; text-align: center; padding: 2rem; }
    .stats { font-weight: bold; font-size: 1.5rem; color: green; }
    button { padding: 10px; margin: 10px; cursor: pointer; }
</style>
