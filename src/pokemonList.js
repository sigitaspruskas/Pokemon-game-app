const pokemons = [
    {
        id: 0,
        name: 'Pikachu',
        picture: 'https://img.pngio.com/pikachu-png-images-transparent-free-download-pngmartcom-pickachu-png-1600_1436.png',
        text: 'I Choose you, Pikachu!'
    },
    {
        id: 1,
        name: 'Squirtle',
        picture: 'https://i.pinimg.com/originals/93/48/9a/93489a169bffb800bcccef095c388fe0.png',
        text: 'I Choose you, Squirtle!'
    },
    {
        id: 2,
        name: 'Charmander',
        picture: 'https://www.pinclipart.com/picdir/big/31-313168_pokemon-clipart-charmander-pokemon-charmander-png-download.png',
        text: 'I Choose you, Charmander!'
    },
    {
        id: 3,
        name: 'Bulbasaur',
        picture: 'https://www.pinclipart.com/picdir/big/83-838231_youtube-thumbnail-bulbasaur-cartoon-images-kids-pokemon-evolution.png',
        text: 'I Choose you, Bulbasaur!'
    },
    {
        id: 4,
        name: 'Gengar',
        picture: 'https://www.pinclipart.com/picdir/big/392-3924436_pokemon-gengar-clipart.png',
        text: 'I Choose you, Gengar!'
    },
    {
        id: 5,
        name: 'Eevee',
        picture: 'https://www.pinclipart.com/picdir/big/62-622061_eevee-project-wiki-fandom-powered-by-wikia-pokemon.png',
        text: 'I Choose you, Eevee!'
    },
    {
        id: 6,
        name: 'Magikarp',
        picture: 'https://www.pinclipart.com/picdir/big/220-2203094_view-magikarp-pokemon-magikarp-clipart.png',
        text: 'I Choose you, Magikarp!'
    },
    {
        id: 7,
        name: 'Pidgeot',
        picture: 'https://www.pinclipart.com/picdir/big/65-652809_pidgeot-png-clipart.png',
        text: 'I Choose you, Pidgeot!'
    },
    {
        id: 8,
        name: 'Caterpie',
        picture: 'https://www.pinclipart.com/picdir/big/33-335296_pokemon-clipart-caterpie-caterpie-pokemon-png-download.png',
        text: 'I Choose you, Caterpie!'
    }
];

function setToDefaultPokemonDB() {
    localStorage.setItem('pokemons', JSON.stringify(pokemons))
}
// setToDefaultPokemonDB();

const getPokemonFromDB = (pokemon_id) => getPokemonsArray()[pokemon_id];

const getPokemonsArray = () => JSON.parse(localStorage.getItem('pokemons'));

function setPokemonsArray(pokemon) {
    let array = getPokemonsArray();
    // array[pokemon.id] = pokemon;

    array.forEach(pokemonFromDb => {
        if (pokemonFromDb.name === pokemon.name) {
            pokemonFromDb.controller = pokemon.controller; 
        } else {
            pokemonFromDb.controller = false;
        }
    });
    localStorage.setItem('pokemons', JSON.stringify(array))
};

if (!getPokemonsArray()) {
    localStorage.setItem('pokemons', JSON.stringify(pokemons));
}

pokemonDatabase = JSON.parse(localStorage.getItem('pokemons'));

// console.log(pokemonDatabase);
