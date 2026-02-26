const databaseURL = "https://raw.githubusercontent.com/kyowaiiii/database.json/refs/heads/main/database.json";
const GEMINI_API_KEY = "AIzaSyCBrcQ60kpFBDjrHexRsBGcbUF53dnLEec";

let scripts = [];

// LOAD SCRIPTS
async function loadScripts(){
    try{
        const res = await fetch(databaseURL);
        const data = await res.json();
        scripts = data;

        // SORT NEW di atas (asumsi database urut terbaru)
        scripts = scripts.sort((a,b)=> new Date(b.date || 0) - new Date(a.date || 0));

        renderScripts(scripts);
        populateCategory();
    }catch(e){
        console.error("Failed to load scripts", e);
    }
}

// RENDER SCRIPT CARDS
function renderScripts(data){
    const container = document.getElementById("script-container");
    container.innerHTML="";
    data.forEach((sc,i)=>{
        const card = document.createElement("div");
        card.className="card";
        card.innerHTML=`
            ${i===0?'<span class="tag-new">NEW</span>':''}
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

// SEARCH SCRIPT + LOADING ANIMATION
const searchInput = document.getElementById("search");
const searchLoading = document.getElementById("searchLoading");
searchInput.addEventListener("input", function(){
    searchLoading.style.display="block";
    setTimeout(()=>{
        const value = this.value.toLowerCase();
        const filtered = scripts.filter(sc=>sc.name.toLowerCase().includes(value));
        renderScripts(filtered);
        searchLoading.style.display="none";
    },300);
});

// POPULATE CATEGORY FILTER
function populateCategory(){
    const filter = document.getElementById("categoryFilter");
    const categories = [...new Set(scripts.map(sc=>sc.category))];
    categories.forEach(cat=>{
        const option = document.createElement("option");
        option.value = cat;
        option.textContent = cat;
        filter.appendChild(option);
    });
}
document.getElementById("categoryFilter").addEventListener("change", function(){
    const value = this.value;
    const filtered = value ? scripts.filter(sc=>sc.category===value) : scripts;
    renderScripts(filtered);
});

// TERMINAL AI
const terminalOutput = document.getElementById("terminal-output");
const terminalInput = document.getElementById("terminal-input");

terminalInput.addEventListener("keypress", async function(e){
    if(e.key==="Enter"){
        const prompt = terminalInput.value.trim();
        if(!prompt) return;
        appendTerminal("> "+prompt);
        terminalInput.value="";
        await queryAI(prompt);
    }
});

function appendTerminal(text){
    const p = document.createElement("div");
    p.textContent=text;
    terminalOutput.appendChild(p);
    terminalOutput.scrollTop = terminalOutput.scrollHeight;
}

async function queryAI(prompt){
    appendTerminal("AI: ...");
    try{
        const res = await fetch("https://api.gemini.com/v1/ask", {
            method:"POST",
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer "+GEMINI_API_KEY
            },
            body: JSON.stringify({prompt: prompt})
        });
        const data = await res.json();
        terminalOutput.lastChild.textContent = "AI: ";
        await typeText(data.answer || "No response");
    }catch(e){
        terminalOutput.lastChild.textContent = "AI: Error fetching response";
        console.error(e);
    }
}

function typeText(text){
    return new Promise(resolve=>{
        const p = terminalOutput.lastChild;
        let i=0;
        const interval = setInterval(()=>{
            p.textContent += text[i];
            i++;
            if(i>=text.length){
                clearInterval(interval);
                resolve();
            }
        },20);
    });
}

loadScripts();
