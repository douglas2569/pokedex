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
               
        const ul = document.createElement('ul')
        ul.setAttribute('class',`types`)    
        pokemon.types.forEach(type => {
            const li = document.createElement('li')
            li.setAttribute('class',`type ${type}`)        
            li.appendChild(document.createTextNode(`${type}`))
            ul.appendChild(li)
        });

        return [
            img, span1, span2, ul
        ]
    }

    static convertPokemonToLi(pokemon) {  

        const [img, span1, span2, ul] = Helper.convertPokemonToLiBase(pokemon)
       
        const a = document.createElement('a')
        a.setAttribute('href',`${config.host}/pokedex/detail.html?id=${pokemon.number}`)      
    
        const li = document.createElement('li')
        li.setAttribute('class',`pokemon ${pokemon.type}`)     
            
        li.appendChild(img)
        li.appendChild(span1)
        li.appendChild(span2) 
        
        li.appendChild(ul)
        a.appendChild(li)
        return a        
       
    }

    static convertPokemonToLiDetail(pokemon) {  
        const [img, span1, span2, ul] = Helper.convertPokemonToLiBase(pokemon)
        
        const header = document.createElement('header')
        header.setAttribute('class',`pokemon ${pokemon.type}`) 

        const arrowBack = document.createElement('img')
        arrowBack.setAttribute('src',`${config.host}/pokedex/assets/images/icons/arrow_back_edit.png`)

        const a = document.createElement('a')
        a.setAttribute('href',`${config.host}/pokedex/`) 
        a.appendChild(arrowBack)

        const body = document.createElement('div')
        body.setAttribute('class',`pokemon`) 

        const p = document.createElement('p')
        p.setAttribute('class',`description`)
        p.appendChild(document.createTextNode(`${pokemon.description}`))
        
        const title = document.createElement('div')
        title.setAttribute('class',`title`)
        
        header.appendChild(a)
        header.appendChild(img)
        body.appendChild(span1)
        title.appendChild(span2)
        title.appendChild(ul)        
        body.appendChild(title)       
        body.appendChild(p)       
    
    
        return [header, body]
       
    }
}