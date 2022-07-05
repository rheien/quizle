/** changes the visibility of the buttons */

export function hideButton(button: string) {
    let element = document.getElementById(button);
    let hidden = element?.getAttribute("hidden");

    if (hidden) {
        element?.removeAttribute("hidden");
    }
    else {
        element?.setAttribute("hidden", "true");
    }
};