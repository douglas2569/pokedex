const ulPokemons = document.querySelector('.pokemons')
const loadMoreButton = document.getElementById('loadMoreButton')
const mainContainer = document.querySelector('main section.content')

let pokemonList = []

const maxRecords = 151
const limit = 9
let offsetGlobal = 0;

function convertPokemonToLi(pokemon) {    

    const li = document.createElement('li')
    li.setAttribute('class',`pokemon ${pokemon.type}`)     
    
    const img = document.createElement('img')
    img.setAttribute('src',`${pokemon.photo}`)
    img.setAttribute('alt',`${pokemon.name}`)
    
    const span1 = document.createElement('span')
    span1.setAttribute('class',`number`)
    span1.appendChild(document.createTextNode(`#${pokemon.number}`))

    const span2 = document.createElement('span')
    span2.setAttribute('class',`name`)
    span2.appendChild(document.createTextNode(`#${pokemon.name}`))

    const div = document.createElement('div')
    div.setAttribute('class',`detail`)
    
    const ul = document.createElement('ul')
    ul.setAttribute('class',`types`)    
    pokemon.types.forEach(type => {
        const li = document.createElement('li')
        li.setAttribute('class',`type ${type}`)        
        li.appendChild(document.createTextNode(`${type}`))
        ul.appendChild(li)
    });

    li.appendChild(img)
    li.appendChild(span1)
    li.appendChild(span2)

    div.appendChild(ul)
    li.appendChild(div)

    return li
}

function setLoading(mainContainer) {   
    
    const imgContainer = document.createElement('div');    
    imgContainer.setAttribute('class', 'loading')
    
    const img = document.createElement('img');
    img.setAttribute('src', 'http://localhost/pokedex/assets/images/gifs/01-loading.gif')
    
    imgContainer.appendChild(img)    
    mainContainer.insertAdjacentElement('afterbegin', imgContainer)

    return imgContainer
}

function removeLoading(imgContainer, mainContainer) {
    mainContainer.removeChild(imgContainer)
}

function loadPokemonItensHome(offset, limit) {
    const imgLoading = setLoading(mainContainer)

    pokeApi.getPokemons(offset, maxRecords).then((pokemons = []) => {
        removeLoading(imgLoading, mainContainer)
        pokemonList = pokemons.map(convertPokemonToLi)            
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

            if(pokemonArray.length <= 0){                
                document.querySelector('.No-Pokemon-found').style.display = 'block'
            }else{                
                document.querySelector('.No-Pokemon-found').style.display = 'none'
                addPokemonItens(ulPokemons, pokemonArray, 0, 151)
            }
        });      
}

loadMoreButton.addEventListener('click', () => {   
    
    addPokemonItens(ulPokemons, pokemonList, offsetGlobal, limit)    
})

loadPokemonItensHome(offsetGlobal, limit)
searchItem()