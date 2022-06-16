let randID
let pokemonTeam = []
let validation = []
let checkedNum = []


const generateTeam = async () => {
    
    try {
        validation = []
        while(pokemonTeam.length < 6){
            getRandomNum()
            
            const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0')
            const pokemon = response.data.results[randID]
            const response2 = await axios.get(pokemon.url)
            
            let type = extractTypes(pokemon, response2);

            if(checkTypes(validation, type)) {
                pokemonTeam.push(pokemon)
            }

            console.log(pokemonTeam)
        
        }

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

function checkTypes(arr, type) {
    if(arr.length < 1) {
        arr.push(type)
    } else {
        for(element of type) {
            if(arr[0].includes(element)) {
                return true;
            }
        }
    }

    return false;
}
let urls = []
const displayPictures = async (team) => {
    
    for(pokemon of team) {

        const response = await axios.get(pokemon.url)
        urls.push(response.data.sprites.front_default)
        
    }
    
    for(url of urls){
        let img = document.createElement('img')
        img.src=url
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