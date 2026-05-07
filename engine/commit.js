import { commitConfig } from "./config.js";

function applyClass(el, cls) {
    if (!cls.startsWith("commit-")) return;

    const parts = cls.replace("commit-", "").split("-");
    const key = parts[0];
    const value = parts[1];

    switch (key) {

        case "p":
            el.style.padding = commitConfig.spacing[value] || value + "px";
            break;

        case "m":
            el.style.margin = commitConfig.spacing[value] || value + "px";
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
    }
}

function apply(el) {
    [...el.classList].forEach(cls => applyClass(el, cls));
}

function scanDOM() {
    document.querySelectorAll("*").forEach(apply);
}

function observe() {
    const observer = new MutationObserver(mutations => {
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