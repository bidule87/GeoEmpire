// On initialise les niveaux des 3 cadenas
let lock1 = 0; let lock2 = 0; let lock3 = 0;
let heistActive = false;

function startHeist() {
    heistActive = true;
    // Boucle qui fait redescendre les jauges (la difficulté)
    const decay = setInterval(() => {
        if (!heistActive) clearInterval(decay);
        if (lock1 > 0) lock1 -= 1.5;
        if (lock2 > 0) lock2 -= 1.5;
        if (lock3 > 0) lock3 -= 1.5;
    }, 1000);
}

function tapLock(id) {
    if (id === 1 && lock1 < 100) lock1 += 8;
    if (id === 2 && lock2 < 100) lock2 += 8;
    if (id === 3 && lock3 < 100) lock3 += 8;
}
