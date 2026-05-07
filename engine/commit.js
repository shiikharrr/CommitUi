import { commitConfig } from "./config.js";

function parseClass(el, cls) {

    if (!cls.startsWith("commit-")) return;

    const parts = cls.replace("commit-", "").split("-");
    const key = parts[0];
    const value = parts[1];

    switch (key) {

        case "p":
            el.style.padding = commitConfig.spacing[value] || value + "px";
            break;

        case "bg":
            el.style.backgroundColor = commitConfig.colors[value] || value;
            break;

        case "text":
            if (["center", "left", "right"].includes(value)) {
                el.style.textAlign = value;
            } else {
                el.style.color = commitConfig.colors[value] || value;
            }
            break;

        case "rounded":
            el.style.borderRadius = commitConfig.radius[value] || value + "px";
            break;

        case "flex":
            el.style.display = "flex";
            break;

        case "items":
            el.style.alignItems = value;
            break;

        case "justify":
            el.style.justifyContent = value;
            break;

        case "w":
            el.style.width = value + "px";
            break;

        case "h":
            el.style.height = value + "px";
            break;
    }
}


// apply to element
function apply(el) {
    [...el.classList].forEach(cls => parseClass(el, cls));
}


// scan DOM
function scanDOM() {
    document.querySelectorAll("*").forEach(apply);
}


// mutation observer (🔥 core feature)
function observe() {
    const observer = new MutationObserver((mutations) => {
        mutations.forEach(m => {

            m.addedNodes.forEach(node => {
                if (node.nodeType === 1) {
                    apply(node);
                    node.querySelectorAll("*").forEach(apply);
                }
            });

            if (m.type === "attributes") {
                apply(m.target);
            }

        });
    });

    observer.observe(document.body, {
        childList: true,
        subtree: true,
        attributes: true
    });
}


document.addEventListener("DOMContentLoaded", () => {
    scanDOM();
    observe();
});