const API_KEY="AIzaSyC3rSP1NQu-Tj-LmE9MMbvve8koifPJwwA"

async function sendAI(){

const input=document.getElementById("ai-input")
const output=document.getElementById("terminal-output")

let text=input.value
if(!text)return

output.innerHTML+=`<p>> ${text}</p>`

input.value=""

const res=await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${API_KEY}`,{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({
contents:[
{
parts:[{text:text}]
}
]
})

})

const data=await res.json()

let reply=data.candidates?.[0]?.content?.parts?.[0]?.text||"AI Error"

typeText(reply)

}

function typeText(text){

const output=document.getElementById("terminal-output")

let p=document.createElement("p")

output.appendChild(p)

let i=0

let typing=setInterval(()=>{

p.textContent+=text[i]

i++

output.scrollTop=output.scrollHeight

if(i>=text.length){
clearInterval(typing)
}

},15)

}