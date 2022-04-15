// 1. Randomly select a Star Wars or Pokemon
// 2. eventListener for a button to fetch that data every time the button is clicked
// 3. swapi.dev OR pokeapi.co
// 4. use fetch(), .then().then()
// 5. grab json to change the body (name, planet, movies)
// 6. querySelectors to target/select html elements (name, planet, movies) 

//this will be the new character object, generated with that event listener
let character = {};
let newListItems = {};
let move = {};
let ability = {};

// generate a random number
//I want to use this to grab the index of the character object 
const randomNumber = () => {
    return Math.floor(Math.random() * 100)
}

//button to generate character object
let button = document.querySelector("button")
//add the event listener when the user submits that button
button.addEventListener("click", (e) => {
    console.log("clicked")
    //it's not going to submit or refresh the page 
    e.preventDefault()
    //fetch is going to get the API for pokeapi.co
    //.then will run a callback function, using the response from the API as a parameter. 
    //there should be a console.log
    //the fetch will return the response in the form of JSON (it'll look like a javascript object)
    //this .then is saving the information 
    fetch("https://pokeapi.co/api/v2/pokemon?limit=100&offset=0")
        .then(function (res) {
            console.log("poke api called")
            return res.json();
        })
    //another .then using res (response)
    //this .then is reassigning the information to the global character variable
    //character.results.at is diving into the JSON, at a particular index number. That index number was our randomNumber generator
        .then(function (res) {
            console.log("response will be assigned to character")
            //this response is assigned to the empty character object we created at the top of the script
            character = res;
            //reassign character to match specific randomNumber results
            character = character.results.at(randomNumber()).name
            console.log(character)

            //create a new url to fetch more data based on this character now
            let newURL = `https://pokeapi.co/api/v2/pokemon/${character}`
            // console.log(newURL)
            // do another fetch with the specific character's api address
            fetch(newURL) 
                .then(function (res) {
                    console.log("another api call")
                    return res.json();
                })
                //fill newListItems with this response
                .then(function (res) {
                    console.log(newURL + " was saved")
                    newListItems = res;
                    //assign the first ability in this array
                    ability = newListItems.abilities[0].ability.name
                    console.log(ability)
                    //assign the first move in this array
                    move = newListItems.moves[0].move.name
                    console.log(move);


                    //assign main as a variable- this is to target the body of the page basically
                    const main = document.querySelector("main")
                    //create a display section within the html
                    const display = document.createElement("section");
                    display.classList.add("fetched-info");
                    display.innerHTML= `
                        <ul>
                            <li><h1>Name: ${character}</h1></li>
                            <li><h3>Ability: ${ability}</h1></li>
                            <li><h3>Move: ${move}</h1></li>
                            <li><img src="${newListItems.sprites.front_default}"></li>
                        </ul>
                    `;

                    let list = document.querySelectorAll("ul");
                        list.forEach((item) => {
                            item.addEventListener("mouseover", (e) => {
                                item.style.borderColor = "#323c96";
                                item.style.backgroundColor = "white";
                                
                            item.addEventListener("mouseout", (e) => {
                                item.style.borderColor = "transparent";
                                item.style.backgroundColor = "#ffdb38";
                            })
                        
                            }
                        )
                        // add each ul to the display section
                        display.append(item)
                    }
                        )
                    
                    //add display to the end of the main 
                    main.append(display);   
                    
                    //move the button to the bottom of the list, where the new characters are? 
                    // button.style.justifyContent = "flex-end"

                })

        })
            

    
    
})

//character is an array of 100 objects

