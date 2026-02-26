const databaseURL = "https://raw.githubusercontent.com/kyowaiiii/database.json/refs/heads/main/database.json";
let scripts = [];

async function loadScripts(){
  try{
    const res = await fetch(databaseURL);
    scripts = await res.json();
    const today = new Date();
    scripts.forEach(sc=>{
      sc.isNew=false;
      if(sc.date){
        const scDate = new Date(sc.date);
        const diff = (today-scDate)/(1000*60*60*24);
        if(diff<=7) sc.isNew=true;
      }
    });
    scripts.sort((a,b)=>b.isNew - a.isNew);
    renderScripts(scripts);
    populateCategory();
  }catch(e){console.error(e);}
}

function renderScripts(data){
  const container = document.getElementById("script-container");
  container.innerHTML="";
  data.forEach(sc=>{
    const card = document.createElement("div");
    card.className="card";
    card.innerHTML=`
      ${sc.isNew?'<span class="tag-new">NEW</span>':''}
      <img src="${sc.image}">
      <div class="script-info">
        <div class="script-name">${sc.name}</div>
        <div class="script-desc">${sc.description}</div>
        <div class="script-category">${sc.category}</div>
        <a class="download" href="${sc.download}" target="_blank">Download</a>
      </div>
    `;
    container.appendChild(card);
  });
}

const searchInput=document.getElementById("search");
const searchLoading=document.getElementById("searchLoading");
searchInput.addEventListener("input",function(){
  searchLoading.style.display="block";
  setTimeout(()=>{
    const val=this.value.toLowerCase();
    const filtered = scripts.filter(sc=>sc.name.toLowerCase().includes(val));
    renderScripts(filtered);
    searchLoading.style.display="none";
  },300);
});

function populateCategory(){
  const filter=document.getElementById("categoryFilter");
  const cats=[...new Set(scripts.map(sc=>sc.category))];
  cats.forEach(cat=>{
    const opt=document.createElement("option");
    opt.value=cat;
    opt.textContent=cat;
    filter.appendChild(opt);
  });
}
document.getElementById("categoryFilter").addEventListener("change",function(){
  const val=this.value;
  const filtered=val?scripts.filter(sc=>sc.category===val):scripts;
  renderScripts(filtered);
});

// Terminal AI Navbar
const aiInput=document.getElementById("aiInput");
const aiSend=document.getElementById("aiSend");
const aiOutput=document.getElementById("aiOutput");

aiSend.addEventListener("click",async()=>{
  const query=aiInput.value;
  if(!query) return;
  aiOutput.style.display="block";
  aiOutput.innerHTML+='<div class="user">> '+query+'</div>';
  
  // Example fetch ke Gemini API
  const response=await fetch("https://api.gemini.example/ask?key=YOUR_API_KEY&q="+encodeURIComponent(query));
  const data=await response.json();
  
  aiOutput.innerHTML+='<div class="ai">AI: '+data.answer+'</div>';
  aiInput.value="";
  aiOutput.scrollTop=aiOutput.scrollHeight;
});
