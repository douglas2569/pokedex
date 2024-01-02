import { config } from "../../config.js";

export default class Helper{

   static setLoading(mainContainer) {

        const imgContainer = document.createElement('div');    
        imgContainer.setAttribute('class', 'loading')
        
        const img = document.createElement('img');    
        img.setAttribute('src', `${config.host}/pokedex/assets/images/gifs/01-loading.gif`)
        
        imgContainer.appendChild(img)    
        mainContainer.insertAdjacentElement('afterbegin', imgContainer)
    
        return imgContainer
    }
    
    static removeLoading(imgContainer, mainContainer) {
        mainContainer.removeChild(imgContainer)
    }

    static urlIdExtractor(url){
        
       return ( url.split('id='))[1]
    }

    static convertPokemonToLiBase(pokemon){
        const img = document.createElement('img')
        img.setAttribute('src',`${pokemon.photo}`)
        img.setAttribute('alt',`${pokemon.name}`)

        const span1 = document.createElement('span')
        span1.setAttribute('class',`number`)
        span1.appendChild(document.createTextNode(`#${pokemon.number}`))
    
        const span2 = document.createElement('span')
        span2.setAttribute('class',`name`)
        span2.appendChild(document.createTextNode(`${pokemon.name}`))

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

        return [
            img, span1, span2, div, ul
        ]
    }

    static convertPokemonToLi(pokemon) {  

        const [img, span1, span2, div, ul] = Helper.convertPokemonToLiBase(pokemon)
       
        const a = document.createElement('a')
        a.setAttribute('href',`${config.host}/pokedex/detail.html?id=${pokemon.number}`)      
    
        const li = document.createElement('li')
        li.setAttribute('class',`pokemon ${pokemon.type}`)     
            
        li.appendChild(img)
        li.appendChild(span1)
        li.appendChild(span2)           
    
        div.appendChild(ul)
        li.appendChild(div)
        a.appendChild(li)
        return a        
       
    }

    static convertPokemonToLiDetail(pokemon) {  
        const [img, span1, span2, div, ul] = Helper.convertPokemonToLiBase(pokemon)
                               
        const container = document.createElement('div')
        container.setAttribute('class',`pokemon ${pokemon.type}`)  

        const p = document.createElement('p')
        p.setAttribute('class',`description`)
        p.appendChild(document.createTextNode(`${pokemon.description}`))
    
        container.appendChild(img)
        container.appendChild(span1)
        container.appendChild(span2)
        container.appendChild(p)
    
        div.appendChild(ul)
        container.appendChild(div)
    
        return container
       
    }
}