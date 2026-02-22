function playClick(){

let sound=document.getElementById("clickSound")

sound.currentTime=0

sound.play()

}

function downloadScript(){

playClick()

window.open(
"https://sub4unlock.co/2usaL",
"_blank"
)

}

/* SEARCH */

function searchScript(){

playClick()

let input=document
.getElementById("search")
.value
.toLowerCase()

let cards=document
.querySelectorAll(".script-card")

let bar=document
.getElementById("searchLoading")

bar.style.width="100%"

setTimeout(()=>{

cards.forEach(card=>{

let text=card.innerText.toLowerCase()

card.style.display=
text.includes(input)
? "flex"
: "none"

})

bar.style.width="0%"

},400)

}

/* TERMINAL COMMAND */

const lines=[

"root@senna:~$ initializing system...",
"root@senna:~$ loading modules...",
"root@senna:~$ connecting database...",
"root@senna:~$ verifying scripts...",
"root@senna:~$ system ready"

]

let terminal=document.getElementById("terminalText")

let i=0

function runTerminal(){

if(i<lines.length){

terminal.innerHTML+=lines[i]+"<br>"

i++

setTimeout(runTerminal,800)

}

}

runTerminal()