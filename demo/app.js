const preview = document.getElementById("previewBox");
let prev = "";

function apply() {
    prev = preview.className;
    preview.className = document.getElementById("classInput").value;
}

function undo() {
    preview.className = prev;
}

function save() {
    localStorage.setItem("classes", document.getElementById("classInput").value);
    alert("Saved");
}

function load() {
    document.getElementById("classInput").value = localStorage.getItem("classes");
}

function copy() {
    navigator.clipboard.writeText(document.getElementById("classInput").value);
    alert("Copied");
}

function applyPreset(val) {
    document.getElementById("classInput").value = val;
    apply();
}

function scrollToPlayground() {
    document.getElementById("playground").scrollIntoView();
}

/* NAV */
function openDocs() {
    alert("Docs: commit-p-10, commit-bg-blue, commit-text-white");
}

function openGithub() {
    window.open("https://github.com/shiikharrr/CommitUi");
}

function openConfig() {
    alert("Edit commit.js for config");
}

function openAbout() {
    alert("Built by thecleancommit");
}

function openLicense() {
    alert("MIT License");
}

/* 🔥 CURSOR GLOW */
const glow = document.createElement("div");
glow.className = "cursor-glow";
document.body.appendChild(glow);

document.addEventListener("mousemove", (e) => {
    glow.style.left = e.clientX + "px";
    glow.style.top = e.clientY + "px";
});

/* ✨ PARTICLE TRAIL */
document.addEventListener("mousemove", (e) => {
    const particle = document.createElement("div");
    particle.className = "particle";
    particle.style.left = e.clientX + "px";
    particle.style.top = e.clientY + "px";

    document.body.appendChild(particle);

    setTimeout(() => particle.remove(), 500);
});