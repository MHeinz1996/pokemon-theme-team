let randID
let pokemonTeam = []
let validation = []
let checkedNum = []


const generateTeam = async () => {
    // console.log(document.getElementById('picture')) == null
    
    if(document.getElementById('picture') != null) {
        while(document.getElementById('picture') != null){
            var image_x = document.getElementById('picture');
            image_x.parentNode.removeChild(image_x);
        }
    }

    

    

    try {
        validation = []
        pokemonTeam = []
        checkedNum = []

        // const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0')
        // const pokemon = response.data.results[2]
        // const response2 = await axios.get(pokemon.url)
        // let type = extractTypes(pokemon, response2);
        // pokemonTeam.push(pokemon)
        // console.log(pokemon)

        while(pokemonTeam.length < 6){
            getRandomNum()
            
            const response3 = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0')
            const pokemon2 = response3.data.results[randID]
            const response4 = await axios.get(pokemon2.url)
            
            let type = extractTypes(pokemon2, response4);

            if(checkTypes(type)) {
                pokemonTeam.push(pokemon2)
            }

        }
        console.log(pokemonTeam)
        displayPictures(pokemonTeam);
        

    } catch(e) {
        console.log('Error:', e)
    }

    

}

function getRandomNum() {
    
    randID = Math.floor(Math.random() * 1126)
    colisionDetector(randID)
    return randID
}

function checkTypes(type) {
    if(validation.length === 0) {
        validation = type.slice(0)
        console.log("validation", validation)
        console.log("validation.length",validation.length)
    } else {
        for(element of type) {
            console.log('validation[0]', validation[0])
            console.log('element', element)
            if(validation[0].includes(element)) {
                console.log("Success")
                return true;
            }
        }
    }

    return false;
}

const displayPictures = async (team) => {
    let urls = []
    for(pokemon of team) {

        const response = await axios.get(pokemon.url)
        urls.push(response.data.sprites.front_default)
        
    }
    
    for(url of urls){
        let img = document.createElement('img')
        img.src=url
        img.id=('picture')
        document.body.appendChild(img)
    }

}

function extractTypes(pokemon, response2) {
    let extractedType = []
   
    for(element of response2.data.types) {
        extractedType.push(element.type.name)
        
    }

    return extractedType
}

function colisionDetector(randID){
    if(checkedNum.length<1){
        checkedNum.push(randID)
        return true
    } else if(checkedNum.includes(randID)){
        getRandomNum();
    } else {
        checkedNum.push(randID)
    }

    return false
}

generateTeam();