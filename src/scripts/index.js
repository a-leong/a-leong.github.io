window.addEventListener("load", (_) => {
  loadBanner();
  loadResume();
});

const loadBanner = () => {
  document.getElementById("banner").innerHTML = banner;
};

const loadResume = () => {
  fetch("/r_lg.txt")
    .then((response) => response.text())
    .then((data) => parseText(data, "lg"));
  fetch("/r_sm.txt")
    .then((response) => response.text())
    .then((data) => parseText(data, "sm"));
};

const parseText = (text, size) => {
  let i = 0;
  let j = text.indexOf("\n");
  let blockDiv;
  while (j !== -1) {
    let delim = text.substring(i + 1, i + 2);
    if (delim === "=") {
      blockDiv = document.createElement("div");
      blockDiv.classList.add("block");
      blockDiv.onclick = toggleChilrden;
      document.getElementById("resume_" + size).appendChild(blockDiv);
    }
    const lineDiv = document.createElement("div");
    if (delim === "*") {
      lineDiv.classList.add("emphasis");
      lineDiv.innerHTML = "&nbsp;" + text.substring(i + 2, j);
    } else if (delim === "=") {
      lineDiv.classList.add("header");
      lineDiv.innerHTML = text.substring(i, j);
    } else if (delim === "@") {
      lineDiv.classList.add("email");
      lineDiv.innerHTML = "&nbsp;" + text.substring(i + 2, j);
      lineDiv.onclick = copyEmail;
    } else {
      lineDiv.innerHTML = text.substring(i, j);
    }
    if (j - i === 5) {
      //br
      lineDiv.classList.add("br");
      blockDiv.appendChild(lineDiv);
    } else {
      //line
      lineDiv.className += " line";
      const lineContainerDiv = document.createElement("div");
      lineContainerDiv.classList.add("lineContainer");
      lineContainerDiv.appendChild(lineDiv);
      blockDiv.appendChild(lineContainerDiv);
    }
    i = j;
    j = text.indexOf("\n", j + 1);
  }
};

const copyEmail = (event) => {
  const target = event.target;
  if (target.className === "email line") {
    copyTextToClipboard("adl88@cornell.edu");
    target.classList.add("copied");
    setTimeout(() => {
      target.classList.remove("copied");
    }, 1000);
  }
};

const toggleChilrden = (event) => {
  const target = event.target;
  if (target.className !== "header line") {
    return;
  }
  if (
    target.parentElement.parentElement.getElementsByClassName("line")[1].style
      .display !== "none"
  ) {
    hideChildren(target.parentElement.parentElement);
  } else {
    showChildren(target.parentElement.parentElement);
  }
};

const fallbackCopyTextToClipboard = (text) => {
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
    var successful = document.execCommand("copy");
    var msg = successful ? "successful" : "unsuccessful";
    console.log("Fallback: Copying text command was " + msg);
  } catch (err) {
    console.error("Fallback: Oops, unable to copy", err);
  }

  document.body.removeChild(textArea);
};
const copyTextToClipboard = (text) => {
  if (!navigator.clipboard) {
    fallbackCopyTextToClipboard(text);
    return;
  }
  navigator.clipboard.writeText(text).then(
    () => {
      console.log("Async: Copying to clipboard was successful!");
    },
    (err) => {
      console.error("Async: Could not copy text: ", err);
    }
  );
};

const hideChildren = (parent) => {
  const lines = parent.getElementsByClassName("line");
  const breaks = parent.getElementsByClassName("br");
  for (var i = lines.length - 1; i > 0; i--) {
    lines[i].style.display = "none";
  }
  for (var i = breaks.length - 1; i > 0; i--) {
    breaks[i].style.display = "none";
  }
};

const showChildren = (parent) => {
  const lines = parent.getElementsByClassName("line");
  const breaks = parent.getElementsByClassName("br");
  for (var i = lines.length - 1; i > 0; i--) {
    lines[i].style.display = "";
  }
  for (var i = breaks.length - 1; i > 0; i--) {
    breaks[i].style.display = "";
  }
};

const banner = `<span style=";color:#aaa;background-color:#fff">&#160;&#160;.&#160;&#160;&#160;&#160;.&#160;&#160;&#160;.&#160;.&#160;&#160;&#160;.&#160;&#160;&#160;&#160;.&#160;&#160;&#160;&#160;&#160;.&#160;&#160;..&#160;&#160;&#160;..&#160;.&#160;&#160;.&#160;&#160;&#160;.&#160;&#160;&#160;&#160;.&#160;&#160;.&#160;&#160;.&#160;&#160;&#160;.&#160;&#160;&#160;&#160;..&#160;.&#160;&#160;&#160;&#160;&#160;&#160;.&#160;&#160;&#160;</span><br />
<span style=";color:#aaa;background-color:#fff">&#160;.;</span><span style=";color:#fff;background-color:#aaa">&#160;</span><span style=";color:#f55;background-color:#aaa">X</span><span style=";color:#aaa;background-color:#f55">8</span><span style=";color:#f55;background-color:#aaa">X</span><span style=";color:#fff;background-color:#aaa">&#160;</span><span style=";color:#aaa;background-color:#fff">8;&#160;&#160;..</span><span style=";color:#aaa;background-color:#ff5">;</span><span style=";color:#aaa;background-color:#fff">:</span><span style=";color:#aaa;background-color:#ff5">:</span><span style=";color:#aaa;background-color:#fff">..&#160;.&#160;t8</span><span style=";color:#fff;background-color:#aaa">%%X</span><span style=";color:#aaa;background-color:#fff">8:&#160;&#160;&#160;8</span><span style=";color:#5ff;background-color:#aaa">X</span><span style=";color:#aaa;background-color:#55f">8</span><span style=";color:#0aa;background-color:#aaa">8</span><span style=";color:#5ff;background-color:#aaa">@</span><span style=";color:#fff;background-color:#aaa">.</span><span style=";color:#aaa;background-color:#fff">:&#160;&#160;&#160;.</span><span style=";color:#aaa;background-color:#f5f">t</span><span style=";color:#f5f;background-color:#aaa">S</span><span style=";color:#aaa;background-color:#f5f">&#160;</span><span style=";color:#aaa;background-color:#fff">;..&#160;.;</span><span style=";color:#fff;background-color:#aaa">X</span><span style=";color:#ff5;background-color:#aaa">8</span><span style=";color:#a50;background-color:#aaa">8</span><span style=";color:#ff5;background-color:#aaa">8</span><span style=";color:#fff;background-color:#aaa">&#160;</span><span style=";color:#aaa;background-color:#fff">S..&#160;@</span><span style=";color:#555;background-color:#aaa">8</span><span style=";color:#a0a;background-color:#555">&#160;&#160;&#160;</span><span style=";color:#555;background-color:#aaa">S</span><span style=";color:#aaa;background-color:#fff">X&#160;.&#160;;@888X.&#160;&#160;</span><br />
<span style=";color:#aaa;background-color:#fff">&#160;%</span><span style=";color:#a0a;background-color:#f55">&#160;</span><span style=";color:#a00;background-color:#f55">&#160;</span><span style=";color:#f5f;background-color:#f55">X</span><span style=";color:#ff5;background-color:#f55">S</span><span style=";color:#f5f;background-color:#f55">%</span><span style=";color:#a00;background-color:#f55">&#160;&#160;</span><span style=";color:#aaa;background-color:#fff">8%:</span><span style=";color:#a50;background-color:#ff5">&#160;</span><span style=";color:#aaa;background-color:#ff5">t;;;;;</span><span style=";color:#aaa;background-color:#fff">.&#160;8</span><span style=";color:#fff;background-color:#aaa">&#160;</span><span style=";color:#f5f;background-color:#aaa">S</span><span style=";color:#fff;background-color:#aaa">&#160;</span><span style=";color:#f5f;background-color:#aaa">%</span><span style=";color:#fff;background-color:#aaa">&#160;</span><span style=";color:#f5f;background-color:#aaa">S</span><span style=";color:#fff;background-color:#aaa">&#160;</span><span style=";color:#aaa;background-color:#fff">t&#160;</span><span style=";color:#0aa;background-color:#aaa">S</span><span style=";color:#00a;background-color:#55f">&#160;&#160;</span><span style=";color:#0aa;background-color:#55f">&#160;&#160;&#160;&#160;</span><span style=";color:#aaa;background-color:#5ff">8</span><span style=";color:#aaa;background-color:#fff">:.</span><span style=";color:#aaa;background-color:#f5f">;</span><span style=";color:#a0a;background-color:#f5f">:</span><span style=";color:#aaa;background-color:#f5f">%:%</span><span style=";color:#a0a;background-color:#f5f">&#160;.</span><span style=";color:#f5f;background-color:#aaa">X</span><span style=";color:#aaa;background-color:#fff">&#160;%</span><span style=";color:#ff5;background-color:#a50">.</span><span style=";color:#f55;background-color:#a50">88</span><span style=";color:#ff5;background-color:#a50">:</span><span style=";color:#a50;background-color:#f55">t</span><span style=";color:#ff5;background-color:#a50">%</span><span style=";color:#f55;background-color:#a50">8</span><span style=";color:#fff;background-color:#aaa">8</span><span style=";color:#aaa;background-color:#fff">&#160;</span><span style=";color:#fff;background-color:#aaa">%</span><span style=";color:#a00;background-color:#000">:</span><span style=";color:#0a0;background-color:#000">.</span><span style=";color:#00a;background-color:#000">:</span><span style=";color:#a00;background-color:#000">.</span><span style=";color:#00a;background-color:#000">:</span><span style=";color:#a00;background-color:#000">.</span><span style=";color:#00a;background-color:#000">;</span><span style=";color:#fff;background-color:#aaa">8</span><span style=";color:#aaa;background-color:#fff">&#160;@</span><span style=";color:#fff;background-color:#aaa">%</span><span style=";color:#f5f;background-color:#aaa">S</span><span style=";color:#aaa;background-color:#fff">8</span><span style=";color:#aaa;background-color:#f5f">8</span><span style=";color:#aaa;background-color:#fff">8</span><span style=";color:#aaa;background-color:#f5f">8</span><span style=";color:#aaa;background-color:#fff">8S&#160;</span><br />
<span style=";color:#aaa;background-color:#fff">&#160;%</span><span style=";color:#a0a;background-color:#f55">&#160;</span><span style=";color:#aaa;background-color:#f55">8</span><span style=";color:#a50;background-color:#f55">&#160;</span><span style=";color:#aaa;background-color:#f55">8</span><span style=";color:#a00;background-color:#f55">&#160;</span><span style=";color:#aaa;background-color:#f55">8</span><span style=";color:#a00;background-color:#f55">&#160;</span><span style=";color:#f55;background-color:#aaa">S</span><span style=";color:#aaa;background-color:#fff">.:</span><span style=";color:#a50;background-color:#ff5">&#160;</span><span style=";color:#aaa;background-color:#ff5">%:;</span><span style=";color:#fff;background-color:#ff5">8</span><span style=";color:#aaa;background-color:#ff5">t;</span><span style=";color:#aaa;background-color:#fff">:&#160;</span><span style=";color:#fff;background-color:#aaa">%&#160;&#160;</span><span style=";color:#f5f;background-color:#aaa">S</span><span style=";color:#fff;background-color:#aaa">&#160;</span><span style=";color:#f5f;background-color:#aaa">%</span><span style=";color:#fff;background-color:#aaa">&#160;&#160;</span><span style=";color:#aaa;background-color:#fff">X&#160;</span><span style=";color:#55f;background-color:#aaa">8</span><span style=";color:#0aa;background-color:#55f">&#160;</span><span style=";color:#5ff;background-color:#0aa">;</span><span style=";color:#5ff;background-color:#55f">8</span><span style=";color:#0aa;background-color:#55f">.</span><span style=";color:#0aa;background-color:#5ff">:</span><span style=";color:#00a;background-color:#55f">..</span><span style=";color:#aaa;background-color:#fff">&#160;&#160;</span><span style=";color:#aaa;background-color:#f5f">tS%SSX</span><span style=";color:#a0a;background-color:#f5f">&#160;</span><span style=";color:#aaa;background-color:#f5f">%</span><span style=";color:#aaa;background-color:#fff">&#160;%</span><span style=";color:#f55;background-color:#a50">8</span><span style=";color:#a50;background-color:#ff5">S</span><span style=";color:#aaa;background-color:#a50">8</span><span style=";color:#f55;background-color:#a50">8</span><span style=";color:#aaa;background-color:#ff5">@</span><span style=";color:#555;background-color:#a50">8</span><span style=";color:#ff5;background-color:#a50">.</span><span style=";color:#ff5;background-color:#aaa">X</span><span style=";color:#aaa;background-color:#fff">.</span><span style=";color:#555;background-color:#aaa">;</span><span style=";color:#a00;background-color:#000">::</span><span style=";color:#00a;background-color:#000">:</span><span style=";color:#a00;background-color:#000">.</span><span style=";color:#0a0;background-color:#000">.</span><span style=";color:#a00;background-color:#000">;</span><span style=";color:#0a0;background-color:#000">:</span><span style=";color:#fff;background-color:#aaa">&#160;</span><span style=";color:#aaa;background-color:#fff">&#160;8</span><span style=";color:#aaa;background-color:#f5f">8</span><span style=";color:#aaa;background-color:#fff">8</span><span style=";color:#aaa;background-color:#f5f">8</span><span style=";color:#aaa;background-color:#fff">8</span><span style=";color:#f5f;background-color:#aaa">S</span><span style=";color:#aaa;background-color:#fff">8</span><span style=";color:#aaa;background-color:#f5f">8</span><span style=";color:#aaa;background-color:#fff">&#160;&#160;</span><br />
<span style=";color:#aaa;background-color:#fff">&#160;&#160;8</span><span style=";color:#aaa;background-color:#f55">8</span><span style=";color:#f5f;background-color:#f55">S</span><span style=";color:#a50;background-color:#f55">&#160;</span><span style=";color:#aaa;background-color:#f55">8</span><span style=";color:#f5f;background-color:#f55">S</span><span style=";color:#fff;background-color:#aaa">&#160;</span><span style=";color:#aaa;background-color:#fff">@&#160;.;</span><span style=";color:#aaa;background-color:#ff5">;</span><span style=";color:#fff;background-color:#ff5">8</span><span style=";color:#aaa;background-color:#ff5">tt</span><span style=";color:#fff;background-color:#ff5">8</span><span style=";color:#aaa;background-color:#fff">:&#160;.t8</span><span style=";color:#f5f;background-color:#aaa">S</span><span style=";color:#ff5;background-color:#aaa">S</span><span style=";color:#aaa;background-color:#f5f">8</span><span style=";color:#aaa;background-color:#ff5">8</span><span style=";color:#fff;background-color:#f5f">8</span><span style=";color:#aaa;background-color:#fff">8;&#160;;</span><span style=";color:#5ff;background-color:#aaa">8</span><span style=";color:#00a;background-color:#55f">&#160;</span><span style=";color:#0aa;background-color:#55f">.</span><span style=";color:#55f;background-color:#0aa">8</span><span style=";color:#a0a;background-color:#55f">:</span><span style=";color:#0aa;background-color:#aaa">X</span><span style=";color:#aaa;background-color:#fff">8.&#160;&#160;</span><span style=";color:#aaa;background-color:#f5f">%%S%SX</span><span style=";color:#aaa;background-color:#fff">&#160;&#160;&#160;8</span><span style=";color:#f55;background-color:#a50">8</span><span style=";color:#aaa;background-color:#a50">@</span><span style=";color:#ff5;background-color:#a50">.</span><span style=";color:#a50;background-color:#f55">;</span><span style=";color:#aaa;background-color:#ff5">@</span><span style=";color:#ff5;background-color:#aaa">S</span><span style=";color:#aaa;background-color:#fff">%.;</span><span style=";color:#555;background-color:#aaa">8</span><span style=";color:#555;background-color:#000">@</span><span style=";color:#a00;background-color:#000">.</span><span style=";color:#00a;background-color:#000">.:</span><span style=";color:#555;background-color:#000">8</span><span style=";color:#555;background-color:#aaa">@</span><span style=";color:#aaa;background-color:#fff">..t88</span><span style=";color:#f5f;background-color:#fff">8</span><span style=";color:#55f;background-color:#5ff">8</span><span style=";color:#f5f;background-color:#fff">8</span><span style=";color:#5ff;background-color:#fff">8</span><span style=";color:#aaa;background-color:#fff">8;&#160;</span><br />
<span style=";color:#aaa;background-color:#fff">&#160;&#160;.&#160;&#160;&#160;.&#160;.&#160;.&#160;&#160;&#160;..&#160;.&#160;.&#160;;t;%;;.:.&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;.&#160;.&#160;&#160;&#160;...&#160;&#160;&#160;&#160;&#160;&#160;.&#160;&#160;:.&#160;&#160;..&#160;t@t&#160;.&#160;&#160;.%Xt&#160;t.::&#160;</span><br />`;
