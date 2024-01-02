import Helper from "./helper.js"
import { pokeApi } from "./poke-api.js"

const ulPokemons = document.querySelector('.pokemons')
const loadMoreButton = document.getElementById('loadMoreButton')
const mainContainer = document.querySelector('main section.content')

let pokemonList = []

const maxRecords = 151
const limit = 9
let offsetGlobal = 0;

function loadPokemonItensHome(offset, limit) {
    const imgLoading = Helper.setLoading(mainContainer)

    pokeApi.getPokemons(offset, maxRecords).then((pokemons = []) => {
        Helper.removeLoading(imgLoading, mainContainer)
        loadMoreButton.style.display = "block"
        pokemonList = pokemons.map(Helper.convertPokemonToLi)                 
        addPokemonItens(ulPokemons, pokemonList, offset, limit)        
    })
}

function addPokemonItens(ulPokemons, pokemonList, offset, limit){    
    for (let index = offset; index < offset+limit; ++index) {
        try {
            ulPokemons.appendChild(pokemonList[index])
        } catch (error) {
            try {
                loadMoreButton.parentElement.removeChild(loadMoreButton)                
            } catch (error) {
                
            }            
        }       
    }

    offsetGlobal = offset + limit
}

function searchItem(){ 
    const searchItem = document.querySelector('.search');

        if(searchItem == null){            
            return;
        }

        searchItem.addEventListener('keyup',()=>{
            let input = document.querySelector('.search').value
            input=input.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "");            
            let pokemonArray = pokemonList.filter((pokemon)=> pokemon.querySelector('.types').outerText.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "").includes(input))  
            ulPokemons.innerHTML = ''            

            if (searchItem.value) {                
                if(pokemonArray.length <= 0){                
                    document.querySelector('.No-Pokemon-found').style.display = 'block'
                }else{                
                    document.querySelector('.No-Pokemon-found').style.display = 'none'
                    addPokemonItens(ulPokemons, pokemonArray, 0, 151)
                }
            }else{
                loadPokemonItensHome(0, limit)
                const pagination = document.querySelector('.pagination')
                pagination.appendChild(loadMoreButton)
                document.querySelector('.No-Pokemon-found').style.display = 'none'
            }

        });      
}

loadMoreButton.addEventListener('click', () => { 
    addPokemonItens(ulPokemons, pokemonList, offsetGlobal, limit)    
})

loadPokemonItensHome(offsetGlobal, limit)
searchItem()