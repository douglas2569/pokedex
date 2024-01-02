import Helper from "./helper.js"
import { pokeApi } from "./poke-api.js"

function loadPokemonItensHome() {
    const mainContainer = document.querySelector('main section.content')
    const imgLoading = Helper.setLoading(mainContainer)    
    const pokemonUrl = {
        url: `https://pokeapi.co/api/v2/pokemon/${Helper.urlIdExtractor(window.location.href)}`
    }

    pokeApi.getPokemonDetail(pokemonUrl).then((pokemon)=>{ 
        const elementsPokemon = Helper.convertPokemonToLiDetail(pokemon)
        addPokemonItem(mainContainer, elementsPokemon)  
        Helper.removeLoading(imgLoading, mainContainer)
    })    
}

function addPokemonItem(container, elementsPokemon){  
    elementsPokemon.forEach(element => {
        container.appendChild(element)        
    });   
}

loadPokemonItensHome()