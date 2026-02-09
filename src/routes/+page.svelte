// On va créer des variables pour chaque cadenas
let progress1 = 0;
let progress2 = 0;
let progress3 = 0;

function hackLock(id) {
    // Chaque clic fait avancer la barre de 10%
    if (id === 1) progress1 += 10;
    if (id === 2) progress2 += 10;
    if (id === 3) progress3 += 10;
    
    // Si la barre atteint 100%, le cadenas est forcé !
}
