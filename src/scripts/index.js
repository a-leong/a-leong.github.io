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
            blockDiv.classList.add("block");
            blockDiv.onclick = toggleChilrden;
            document.getElementById("resume").appendChild(blockDiv);
        }
        const lineDiv = document.createElement("div");
        if (delim==="*") {
            lineDiv.classList.add("emphasis");
            lineDiv.innerHTML = "&nbsp;"+text.substring(i+2,j);
        } else if (delim==="=") {
            lineDiv.classList.add("header");
            lineDiv.innerHTML = text.substring(i,j);
        } else if (delim==="@"){
            lineDiv.classList.add("email");
            lineDiv.innerHTML = "&nbsp;"+text.substring(i+2,j);
            lineDiv.onclick = copyEmail;
        } else {
            lineDiv.innerHTML = text.substring(i,j);
        }
        if (j-i===5) {
            //br
            lineDiv.classList.add("br");
            blockDiv.appendChild(lineDiv)
        } else {
            //line
            lineDiv.className += " line";
            const lineContainerDiv = document.createElement("div");
            lineContainerDiv.classList.add("lineContainer");
            lineContainerDiv.appendChild(lineDiv);
            blockDiv.appendChild(lineContainerDiv);
        }
        i = j;
        j = text.indexOf("\n", j+1);
        
    }
    const infoBlocks = document.getElementsByClassName("block");
    for (var k = infoBlocks.length - 1; k > 0; k--) {
        hideChildren(infoBlocks[k]);
    }
}

const copyEmail = (event) => {
    const target = event.target;
    if (target.className === "email line") {
        copyTextToClipboard("adl88@cornell.edu");
        target.classList.add('copied');
        setTimeout(() => { target.classList.remove('copied'); }, 1500);
    }
}

const toggleChilrden = (event) => {
    const target = event.target;
    if (target.className !== "header line") { return; }
    if (target.parentElement.parentElement.getElementsByClassName("line")[1].style.display !== "none") {
        hideChildren(target.parentElement.parentElement);
    } else {
        showChildren(target.parentElement.parentElement);
    }
}

function fallbackCopyTextToClipboard(text) {
  var textArea = document.createElement("textarea");
  textArea.value = text;
  
  // Avoid scrolling to bottom
  textArea.style.top = "0";
  textArea.style.left = "0";
  textArea.style.position = "fixed";

  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();

  try {
    var successful = document.execCommand('copy');
    var msg = successful ? 'successful' : 'unsuccessful';
    console.log('Fallback: Copying text command was ' + msg);
  } catch (err) {
    console.error('Fallback: Oops, unable to copy', err);
  }

  document.body.removeChild(textArea);
}
function copyTextToClipboard(text) {
  if (!navigator.clipboard) {
    fallbackCopyTextToClipboard(text);
    return;
  }
  navigator.clipboard.writeText(text).then(function() {
    console.log('Async: Copying to clipboard was successful!');
  }, function(err) {
    console.error('Async: Could not copy text: ', err);
  });
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