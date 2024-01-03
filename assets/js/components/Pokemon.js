import { config } from "../../../config.js";

export default class Pokemon extends HTMLElement {
    constructor() {
      super();          
      const shadow = this.attachShadow({ mode: "close" }) 
      
      shadow.appendChild(this.build())
      shadow.appendChild(this.styles())
     
    }

    build(){       
        console.log(this.getAttribute("photo"))
        const img = document.createElement('img')        
        img.setAttribute('src',this.getAttribute("photo"))        
        img.setAttribute('alt',this.getAttribute("name"))
        

        const span1 = document.createElement('span')
        span1.setAttribute('class',`number`)        
        span1.appendChild(document.createTextNode(`#${this.getAttribute("name")}`))
    
        const span2 = document.createElement('span')
        span2.setAttribute('class',`name`)
        span2.appendChild(document.createTextNode(`${this.getAttribute("name")}`))
               
        const ul = document.createElement('ul')
        ul.setAttribute('class',`types`)    
        // this.getAttribute("types").forEach(type => {
        //     const li = document.createElement('li')
        //     li.setAttribute('class',`type ${type}`)        
        //     li.appendChild(document.createTextNode(`${type}`))
        //     ul.appendChild(li)
        // });
       
       
        const a = document.createElement('a')
        a.setAttribute('href',`${config.host}/pokedex/detail.html?id=${this.getAttribute("number")}`)      
    
        const li = document.createElement('li')
        li.setAttribute('class',`pokemon ${this.getAttribute("type")}`)     
            
        li.appendChild(img)
        li.appendChild(span1)
        li.appendChild(span2) 
        
        li.appendChild(ul)
        a.appendChild(li)


        return a         
    }

    styles(){
        const style = document.createElement("style")

        style.textContent = `        
            .pokemon {
                display: flex;
                flex-direction: column;    
                padding: var(--padding-external-sides);
                border-radius: 1rem;   
                margin-bottom: 5rem;     
            }

            .pokemon img {
                max-width: 100%;
                height: 200px;
                margin-top: -5rem;
            }

            .pokemon .number {
                color: var(--black-color);
                opacity: .8;    
            }

            .pokemon .name {
                text-transform: capitalize;
                color: var(--black-color);
                margin-bottom: .25rem;
            }
            .pokemon .types {
                display: flex;
                flex-direction: row;    
                justify-content: space-around;    
            }
            
            .pokemon .types .type {
                display: flex;
                justify-content: center;
                align-items: center;
                
                color: var(--black-color);
                padding: .25rem 2.5rem;
                margin: .25rem 0;
                font-size: 1rem;
                border-radius: 1rem;    
            }`
        
        return style
    }

  }
  
  customElements.define("pokemon-compoment", Pokemon)   