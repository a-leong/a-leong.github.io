window.addEventListener("load",_=>{
    loadResume();
})

const loadResume = () => {
    fetch("/r.txt")
        .then(response => response.text())
        .then((data) => parseText(data))
}

const parseText = (text) => {
    let i = 0;
    let j = text.indexOf("\n");
    let blockDiv;
    while (j != -1) {
        let delim = text.substring(i+1,i+2);
        if (delim==="=") {
            blockDiv = document.createElement("div");
            blockDiv.className = "block";
            document.getElementById("resume").appendChild(blockDiv);
        }
        const divClass = j-i===5 ? "br" : "line";
        const lineDiv = document.createElement("div");
        lineDiv.className = divClass;
        lineDiv.innerHTML = text.substring(i,j);
        blockDiv.appendChild(lineDiv);
        i = j;
        j = text.indexOf("\n", j+1);
        
    }
}