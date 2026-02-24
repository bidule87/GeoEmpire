<script>
    const headerImage = "https://raw.githubusercontent.com/bidule87/GeoEmpire/refs/heads/main/hearder.jpg";
</script>

<style>
    /* --- HEADER HERO --- */
    .hero {
        position: relative;
        width: 100%;
        height: 380px;
        background-image: url("https://raw.githubusercontent.com/bidule87/GeoEmpire/refs/heads/main/hearder.jpg");
        background-size: cover;
        background-position: center;
        background-repeat: no-repeat;
        overflow: hidden;
        display: flex;
        align-items: center;
        justify-content: center;
        animation: zoom 18s ease-in-out infinite;
    }

    /* Effet zoom lent */
    @keyframes zoom {
        0% { transform: scale(1); }
        50% { transform: scale(1.07); }
        100% { transform: scale(1); }
    }

    /* Glow bleu autour du texte */
    .hero-title {
        font-size: 3rem;
        font-weight: 800;
        color: white;
        text-shadow: 0 0 15px #00c8ff, 0 0 30px #00c8ff;
        z-index: 2;
    }

    /* Overlay bleu léger */
    .hero::after {
        content: "";
        position: absolute;
        inset: 0;
        background: rgba(0, 40, 70, 0.35);
        backdrop-filter: blur(1px);
        z-index: 1;
    }

    /* --- IMAGE AFFICHÉE DANS LA PAGE --- */
    .banner {
        width: 100%;
        margin-top: 30px;
        border-radius: 12px;
        box-shadow: 0 0 25px rgba(0, 200, 255, 0.25);
    }
</style>

<!-- HEADER ANIMÉ -->
<div class="hero">
    <div class="hero-title">PREMIUM PACK BOUTIQUE</div>
</div>

<!-- IMAGE AFFICHÉE DANS LA PAGE -->
<img class="banner" src={headerImage} alt="Premium Banner" />
