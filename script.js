function playClick(){
let sound=document.getElementById("clickSound")
sound.currentTime=0
sound.play()
}

function toggleCategory(){

playClick()

let list=document.getElementById("category-list")

if(list.style.display==="block"){
list.style.display="none"
}else{
list.style.display="block"
}

}

function downloadScript(){

playClick()

window.open(
"https://example.com",
"_blank"
)

}

function searchScript(){

let input=document
.getElementById("search")
.value.toLowerCase()

let cards=document
.querySelectorAll(".script-card")

cards.forEach(card=>{

let text=card
.innerText
.toLowerCase()

card.style.display=
text.includes(input)
? "block"
: "none"

})

}

const text="Initializing Senna Script..."

let i=0

function terminal(){

let term=document
.querySelector(".term-text")

if(i<text.length){

term.innerHTML+=text.charAt(i)

i++

setTimeout(terminal,50)

}

}

terminal()