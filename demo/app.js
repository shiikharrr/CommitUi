const input = document.getElementById("classInput");
const btn = document.getElementById("applyBtn");
const preview = document.getElementById("previewBox");

// apply classes
btn.onclick = () => {

    preview.className = "";

    input.value.split(" ").forEach(cls => {
        if (cls.startsWith("commit-")) {
            preview.classList.add(cls);
        }
    });

};


// enter support
input.addEventListener("keypress", (e) => {
    if (e.key === "Enter") btn.click();
});


// chip click autofill
document.querySelectorAll(".chips span")
.forEach(chip => {
    chip.onclick = () => {
        input.value += " " + chip.innerText;
    };
});