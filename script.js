const githubAPI="https://raw.githubusercontent.com/kyowaiiii/database.json/refs/heads/main/database.json"

async function loadScripts(){

const res=await fetch(githubAPI)
const data=await res.json()

data.sort((a,b)=>new Date(b.date)-new Date(a.date))

const container=document.getElementById("script-list")
container.innerHTML=""

data.forEach((sc,index)=>{

let tag=index===0?`<span class="new-tag">NEW</span>`:""

const card=document.createElement("div")

card.className="card"

card.innerHTML=`

<div class="img-box">
<img src="${sc.image}">
${tag}
</div>

<h3>${sc.name}</h3>

<p>${sc.desc}</p>

<p>${sc.category}</p>

<a class="download" href="${sc.download}" target="_blank">
Download
</a>

`

container.appendChild(card)

})

}

loadScripts()

// SEARCH

document.getElementById("search").addEventListener("input",function(){

let value=this.value.toLowerCase()

document.querySelectorAll(".card").forEach(card=>{

card.style.display=
card.innerText.toLowerCase().includes(value)
?"block":"none"

})

})