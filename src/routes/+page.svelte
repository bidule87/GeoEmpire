C'est un point crucial que je n'avais pas encore intégré : le **cycle temporel**. Ton jeu ne fonctionne pas en "instantané" (clic = argent), mais en **cycle de 24h**.

Toutes les décisions de gestion prises durant la journée (réglage de la molette, mise en vente, mise en location) sont des **ordres en attente**. Ils ne sont exécutés par le moteur financier qu'à **minuit**, lors de la mise à jour journalière.

Voici ton **DOX de conception finalisé**, incluant la règle de minuit et le bilan prévisionnel. C'est le document de référence absolu pour ton projet.

---

# 📜 DOC DE CONCEPTION : GEO EMPIRE (V3 - Final)

## 1. Hiérarchie Financière

* **HOLDING** : Consolidation globale de la fortune.
* **FILIALE (Entreprise)** : Entité autonome avec sa **Trésorerie**, son **Compte de Résultat** et son **Bilan Prévisionnel**.

## 2. Le Cycle Journalier (La Règle de Minuit)

* **Actions Différées** : Les boutons **VENTE** et **LOCATION** ne sont pas immédiats. Ils enregistrent un "ordre de transaction".
* **Mise à jour journalière** : À **00:00**, le jeu traite tous les ordres :
* Les biens en attente de **Vente** sont vendus (le cash entre en tréso).
* Les biens en attente de **Location** signent leurs baux (les loyers sont calculés pour le nouveau cycle).


* **Bilan Prévisionnel** : Indique au joueur ce qu'il touchera au prochain passage à minuit en fonction de ses réglages actuels.

## 3. Gestion par Filiale (Menu Déroulant)

Chaque entreprise possède son propre tableau de bord :

* **Marketing (Code Couleur)** : Définit la probabilité de succès de la transaction à minuit (Rouge/Jaune/Vert).
* **Molette de Marge (-20% à +20%)** : Ajuste le prix de l'ordre.
* **Calculateur Élite** : Le bonus (+20%) est calculé et affiché dans le prévisionnel de minuit.

## 4. Vocabulaire Officiel

* **Vente** : Action de céder l'actif à minuit.
* **Location** : Action de mettre en bail pour générer un revenu journalier (reçu chaque jour à minuit).

---

### 💻 Aperçu de l'interface "Ordre en attente"

Dans le code, quand tu cliqueras sur "LOCATION", le bouton changera d'état pour montrer que l'action est prévue pour minuit :

```svelte
<div class="asset-card">
  <div class="info">
    <b>{bien.nom}</b>
    <span class="price-next">Prévu à minuit : {getPrixFinal(bien)} G</span>
  </div>

  <div class="controls">
    <input type="range" min="-20" max="20" bind:value={bien.marge}>
    <span>Marge: {bien.marge}%</span>
  </div>

  <div class="status-actions">
    {#if bien.ordreAttente}
      <div class="pending-badge">⏳ EN ATTENTE (MINUIT)</div>
      <button class="cancel-btn" on:click={annulerOrdre}>ANNULER</button>
    {:else}
      <button class="btn-l" on:click={preparerLocation}>LOCATION</button>
      <button class="btn-v" on:click={preparerVente}>VENTE</button>
    {/if}
  </div>
</div>

```

**C'est parfait pour ton dossier DOX ?** Avec cette règle de minuit, le jeu devient beaucoup plus stratégique.

Veux-tu que je te prépare le **système de compte à rebours** (le timer qui affiche : *"Prochaine mise à jour dans : 04h 22min"*) pour l'afficher en haut de l'écran ?
