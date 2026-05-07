function applyCommitClasses() {
    document.querySelectorAll("*").forEach(el => {

        el.classList.forEach(cls => {

            if (!cls.startsWith("commit-")) return;

            const val = cls.split("-");

            if (val[1] === "p") {
                el.style.padding = val[2] + "px";
            }

            if (val[1] === "bg") {
                el.style.background = val[2];
            }

            if (val[1] === "text") {
                el.style.color = val[2];
            }

            if (val[1] === "rounded") {
                el.style.borderRadius = val[2] + "px";
            }

        });

    });
}

window.addEventListener("DOMContentLoaded", applyCommitClasses);