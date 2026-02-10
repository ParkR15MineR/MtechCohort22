const listElement = document.getElementById('list-items');
const nameDisplay = document.getElementById('poke-name');
const spriteDisplay = document.getElementById('poke-sprite');
const nextBtn = document.getElementById('next-btn');
const prevBtn = document.getElementById('prev-btn');

let pokemonNames = [];
let currentIndex = 0;

// 1. Fetch the initial list (Limit set to 200)
async function initPokedex() {
    try {
        const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=200');
        const data = await response.json();
        
        // Save just the names for easy navigation
        pokemonNames = data.results.map(p => p.name);
        
        renderList();
        loadPokemon(pokemonNames[currentIndex]); // Load the first one
    } catch (error) {
        console.error("Oops, failed to fetch list:", error);
    }
}

// 2. Render the clickable list in the sidebar
function renderList() {
    pokemonNames.forEach((name, index) => {
        const li = document.createElement('li');
        li.textContent = name.toUpperCase();
        li.style.cursor = "pointer";
        li.onclick = () => {
            currentIndex = index;
            loadPokemon(name);
        };
        listElement.appendChild(li);
    });
}

// 3. Fetch specific details (Sprite + Name)
async function loadPokemon(name) {
    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
        const data = await response.json();
        
        // Update UI
        nameDisplay.textContent = data.name.toUpperCase();
        spriteDisplay.src = data.sprites.front_default;
        spriteDisplay.alt = data.name;
    } catch (error) {
        console.error("Error fetching Pokémon details:", error);
    }
}

// 4. Navigation Controls
nextBtn.onclick = () => {
    if (currentIndex < pokemonNames.length - 1) {
        currentIndex++;
        loadPokemon(pokemonNames[currentIndex]);
    }
};

prevBtn.onclick = () => {
    if (currentIndex > 0) {
        currentIndex--;
        loadPokemon(pokemonNames[currentIndex]);
    }
};

// Start the app
initPokedex();