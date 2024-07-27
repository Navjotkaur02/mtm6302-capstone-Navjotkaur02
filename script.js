document.addEventListener('DOMContentLoaded', () => {
    const pokemonContainer = document.getElementById('pokemonContainer');
    const loadMoreButton = document.getElementById('loadMore');
    const pokemonDetails = document.getElementById('pokemonDetails');
    let offset = 0;
    const limit = 20;
    const caughtPokemon = JSON.parse(localStorage.getItem('caughtPokemon')) || [];

    loadMoreButton.addEventListener('click', loadMorePokemon);

    function loadMorePokemon() {
        fetch(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`)
            .then(response => response.json())
            .then(data => {
                displayPokemon(data.results);
                offset += limit;
            })
            .catch(error => console.error('Error:', error));
    }

    function displayPokemon(pokemonList) {
        pokemonList.forEach(pokemon => {
            const pokemonCard = document.createElement('div');
            pokemonCard.className = 'col-md-3 pokemon-card';
            pokemonCard.innerHTML = `
                <h5 class="text-center">${pokemon.name}</h5>
            `;
            pokemonCard.addEventListener('click', () => loadPokemonDetails(pokemon.url));
            pokemonContainer.appendChild(pokemonCard);
        });
    }

    function loadPokemonDetails(url) {
        fetch(url)
            .then(response => response.json())
            .then(data => {
                displayPokemonDetails(data);
            })
            .catch(error => console.error('Error:', error));
    }

    function displayPokemonDetails(pokemon) {
        const isCaught = caughtPokemon.includes(pokemon.name);
        pokemonDetails.innerHTML = `
            <h5>${pokemon.name}</h5>
            <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}">
            <p>Height: ${pokemon.height}</p>
            <p>Weight: ${pokemon.weight}</p>
            <button id="toggleCaught" class="btn ${isCaught ? 'btn-danger' : 'btn-success'}">
                ${isCaught ? 'Release' : 'Catch'}
            </button>
        `;
        document.getElementById('toggleCaught').addEventListener('click', () => toggleCaughtPokemon(pokemon.name));
    }

    function toggleCaughtPokemon(pokemonName) {
        const index = caughtPokemon.indexOf(pokemonName);
        if (index > -1) {
            caughtPokemon.splice(index, 1);
        } else {
            caughtPokemon.push(pokemonName);
        }
        localStorage.setItem('caughtPokemon', JSON.stringify(caughtPokemon));
        displayPokemonDetails({ name: pokemonName, height: 0, weight: 0, sprites: { front_default: '' } });
        alert(`${pokemonName} has been ${index > -1 ? 'released' : 'caught'}`);
    }

    // Load initial set of pokemon
    loadMorePokemon();
});
