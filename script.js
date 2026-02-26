const databaseURL="https://raw.githubusercontent.com/kyowaiiii/database.json/refs/heads/main/database.json"

let scripts=[]

async function loadScripts(){

const res=await fetch(databaseURL)
const data=await res.json()

scripts=data

renderScripts(data)

}

function renderScripts(data){

const container=document.getElementById("script-container")

container.innerHTML=""

data.forEach(sc=>{

const card=document.createElement("div")

card.className="card"

card.innerHTML=`

<img src="${sc.image}">

<div class="script-info">

<div class="script-name">${sc.name}</div>

<div class="script-desc">${sc.description}</div>

<div class="script-category">${sc.category}</div>

<a class="download" href="${sc.download}" target="_blank">
Download
</a>

</div>

`

container.appendChild(card)

})

}

document.getElementById("search").addEventListener("input",function(){

const value=this.value.toLowerCase()

const filtered=scripts.filter(sc =>
sc.name.toLowerCase().includes(value)
)

renderScripts(filtered)

})

loadScripts()
