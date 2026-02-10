<script>
  import { onMount } from "svelte";

  /* =========================
     1. ÉTAT GLOBAL
  ========================= */
  let capitalHolding = 6157.92;
  let logs = "GEO EMPIRE – Version BÊTA gratuite";
  let mktIdx = 1;
  let lastTick = localStorage.getItem("lastTick") || null;

  /* =========================
     2. MARKETING GLOBAL
  ========================= */
  const mkt = {
    1: { lab: "Local", prix: 100, m: 1.0, c: "#3498db" },
    2: { lab: "National", prix: 300, m: 1.15, c: "#2ecc71" },
    3: { lab: "International", p
