document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const pokemonId = urlParams.get('id');
    const pokemonType = urlParams.get('type');

    if (pokemonId) {
        fetchPokemonDetails(pokemonId);
    }

    if (pokemonType) {
        setBackgroundColor(pokemonType);
    }

    document.getElementById('backButton').addEventListener('click', () => {
        window.history.back();
    });
});

function fetchPokemonDetails(id) {
    fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
        .then(response => response.json())
        .then(pokemon => {
            const pokemonDetails = `
                <h1>${pokemon.name}</h1>
                <img src="${pokemon.sprites.other.dream_world.front_default}" alt="${pokemon.name}" />
                <p>Height: ${pokemon.height / 10} m</p>
                <p>Weight: ${pokemon.weight / 10} kg</p>
                <h2>Types:</h2>
                <ul>
                    ${pokemon.types.map(type => `<li>${type.type.name}</li>`).join('')}
                </ul>
                <h2>Abilities:</h2>
                <ul>
                    ${pokemon.abilities.map(ability => `<li>${ability.ability.name}</li>`).join('')}
                </ul>
                <h2>Stats:</h2>
                <ul>
                    ${pokemon.stats.map(stat => `<li>${stat.stat.name}: ${stat.base_stat}</li>`).join('')}
                </ul>
                <h2>Moves:</h2>
                <ul>
                    ${pokemon.moves.slice(0, 10).map(move => `<li>${move.move.name}</li>`).join('')}
                </ul>
            `;
            document.getElementById('pokemonDetails').innerHTML = pokemonDetails;
        })
        .catch(error => console.error('Erro ao carregar detalhes do Pokémon:', error));
}

function setBackgroundColor(type) {
    const typeColors = {
        grass: '#7AC74C',
        fire: '#F74343',
        water: '#6390F0',
        bug: '#A8B820',
        normal: '#A8A77A',
        electric: '#F7D02C',
        ground: '#E2BF65',
        fairy: '#D685AD',
        poison: '#A33EA1',
        fighting: '#C22E28',
        psychic: '#F95587',
        rock: '#B6A136',
        ice: '#96D9D6',
        dragon: '#6F35FC',
        dark: '#705746',
        steel: '#B7B7CE',
        ghost: '#735797'
    };

    document.body.style.backgroundColor = typeColors[type] || '#f6f8fc'; // Cor padrão se o tipo não for encontrado
}
