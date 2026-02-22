// TERMINAL ANIMATION

const lines = [
"root@senna:~$ initializing system",
"loading database...",
"checking security...",
"loading scripts...",
"system ready ✔"
]

let index = 0
let terminal = document.getElementById("terminalText")

function typeLine(){

if(index < lines.length){

let line = lines[index]
let char = 0

let typing = setInterval(()=>{

terminal.innerHTML += line[char]

char++

if(char === line.length){

clearInterval(typing)
terminal.innerHTML += "\n"
index++

setTimeout(typeLine,500)

}

},40)

}

}

typeLine()


// SEARCH SCRIPT

const search = document.getElementById("search")
const loader = document.getElementById("loader")
const cards = document.querySelectorAll(".card")

search.addEventListener("keypress", function(e){

if(e.key === "Enter"){

loader.style.display="block"

setTimeout(()=>{

loader.style.display="none"

let value = search.value.toLowerCase()

cards.forEach(card=>{

let name = card.innerText.toLowerCase()

if(name.includes(value)){
card.style.display="block"
}else{
card.style.display="none"
}

})

},1500)

}

})