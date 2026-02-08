/** @type {import('./$types').PageServerLoad} */
export async function load() {
    return {
        stats: {
            cash: 1000,
            crowns: 10,
            username: "Joueur"
        },
        properties: [
            { id: 1, name: "Petit Commerce", price: 500, income: 50 },
            { id: 2, name: "Banque Locale", price: 5000, income: 500 }
        ]
    };
}
