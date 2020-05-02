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
    while (j !== -1) {
        let delim = text.substring(i+1,i+2);
        if (delim==="=") {
            blockDiv = document.createElement("div");
            blockDiv.className = "block";
            blockDiv.onclick = toggleChilrden;
            document.getElementById("resume").appendChild(blockDiv);
        }
        const divClass = j-i===5 ? "br" : "line";
        const lineDiv = document.createElement("div");
        if (delim==="*") {
            lineDiv.className = divClass + " emphasis";
            lineDiv.innerHTML = "&nbsp;"+text.substring(i+2,j);
        } else {
            lineDiv.className = divClass;
            lineDiv.innerHTML = text.substring(i,j);
        }
        
        blockDiv.appendChild(lineDiv);
        i = j;
        j = text.indexOf("\n", j+1);
        
    }
    const infoBlocks = document.getElementsByClassName("block");
    for (var k = infoBlocks.length - 1; k > 0; k--) {
        hideChildren(infoBlocks[k]);
    }
}

const toggleChilrden = (event) => {
    const target = event.target;
    console.log(target);

    if (target.className === "block") { return; }
    if (target.parentElement.getElementsByClassName("line")[1].style.display !== "none") {
        hideChildren(target.parentElement);
    } else {
        showChildren(target.parentElement);
    }
}

const hideChildren = (parent) => {
    const lines = parent.getElementsByClassName("line");
    const breaks = parent.getElementsByClassName("br");
    for (var i = lines.length - 1; i > 0; i--) {
        lines[i].style.display = "none";
    }
    for (var i = breaks.length - 1; i > 0; i--) {
        breaks[i].style.display = "none";
    }
}

const showChildren = (parent) => {
    const lines = parent.getElementsByClassName("line");
    const breaks = parent.getElementsByClassName("br");
    for (var i = lines.length - 1; i > 0; i--) {
        lines[i].style.display = "";
    }
    for (var i = breaks.length - 1; i > 0; i--) {
        breaks[i].style.display = "";
    }
}