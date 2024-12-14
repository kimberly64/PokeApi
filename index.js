// Espera a que el DOM esté cargado
document.addEventListener('DOMContentLoaded', () => {
    const searchBtn = document.getElementById('searchBtn');
    const result = document.getElementById('result');

    // Evento para buscar Pokémon
    searchBtn.addEventListener('click', async () => {
        const pokemonName = document.getElementById('pokemonName').value.toLowerCase().trim();

        // Validar entrada vacía
        if (!pokemonName) {
            result.innerHTML = '<p class="text-danger">Por favor, ingresa un nombre o ID de Pokémon.</p>';
            return;
        }

        try {
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
            
            if (!response.ok) {
                throw new Error('Pokémon no encontrado');
            }

            const data = await response.json();
            displayPokemon(data);
        } catch (error) {
            result.innerHTML = `<p class="text-danger">Error: ${error.message}</p>`;
        }
    });

    // Función para mostrar el Pokémon en la pantalla
    const displayPokemon = (data) => {
        result.innerHTML = `
            <div class="card text-center" style="width: 18rem;">
                <img src="${data.sprites.front_default}" class="card-img-top" alt="${data.name}">
                <div class="card-body">
                    <h5 class="card-title text-capitalize">${data.name}</h5>
                    <p class="card-text">Tipo: ${data.types.map(type => type.type.name).join(', ')}</p>
                    <p class="card-text">Peso: ${data.weight / 10} kg</p>
                    <p class="card-text">Altura: ${data.height / 10} m</p>
                </div>
            </div>
        `;
    };
});
