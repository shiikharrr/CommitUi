const input = document.getElementById("classInput");
const applyBtn = document.getElementById("applyBtn");
const preview = document.getElementById("previewBox");

let historyStack = [];


function flash(el) {
    el.style.boxShadow = "0 0 30px #0ea5e9";

    setTimeout(() => {
        el.style.boxShadow = "";
    }, 200);
}

// APPLY
applyBtn.onclick = () => {

    const current = input.value;

    historyStack.push(current);

    preview.className = "";

    current.split(" ").forEach(cls => {
        if (cls.startsWith("commit-")) {
            preview.classList.add(cls);
        }
    });

    const params = new URLSearchParams();
    params.set("styles", input.value);
    window.history.replaceState({}, "", "?" + params.toString());
};


// UNDO
document.getElementById("undoBtn").onclick = () => {

    if (historyStack.length < 2) {
        return alert("Nothing to undo");
    }

    historyStack.pop();
    const previous = historyStack[historyStack.length - 1];

    input.value = previous;
    applyBtn.click();
};


// SAVE
document.getElementById("savePreset").onclick = () => {
    localStorage.setItem("commit-preset", input.value);
    alert("Saved!");
};


// LOAD
document.getElementById("loadPreset").onclick = () => {
    const data = localStorage.getItem("commit-preset");

    if (!data) return alert("No preset found");

    input.value = data;
};


// COPY
document.getElementById("copyBtn").onclick = () => {
    navigator.clipboard.writeText(input.value);
    alert("Copied!");
};


// NAV
document.getElementById("githubBtn").onclick = () => {
    window.open("https://github.com/shiikharrr/CommitUi", "_blank");
};

document.getElementById("docsBtn").onclick = () => alert("Docs coming soon");
document.getElementById("configBtn").onclick = () => alert("Config coming soon");
document.getElementById("aboutBtn").onclick = () => alert("Built by thecleancommit 🚀");


// AUTO LOAD FROM URL
window.onload = () => {
    const params = new URLSearchParams(window.location.search);
    const styles = params.get("styles");

    if (styles) {
        input.value = styles;
        applyBtn.click();
    }
};