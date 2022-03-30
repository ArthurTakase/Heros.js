const editMenu = document.getElementById("edit-menu")
editMenu.style.display = "none"
var lastRightClickElement = null

let editValue = "edit"
let editValueColor = "edit-color"
let editValueObject = "edit-object"
let editValuePicture = "edit-picture"
let editValueSound = "edit-sound"
let editValueDialog = "edit-dialog"

document.oncontextmenu = function(e) {
    if (e.target.parentNode.classList.contains(editValue)) {
        e.preventDefault();

        editMenu.style.display = "flex"

        editMenu.style.top = e.clientY + "px"
        editMenu.style.left = e.clientX + "px"

        lastRightClickElement = e.target.parentNode
    } else {
        editMenu.style.display = "none"
    }

};

document.onclick = function(e) {
    try {
        if (e.target.parentNode.id == "edit-menu" || e.target.id == "edit-menu") {
            if (lastRightClickElement.classList.contains(editValueColor)) editColor(lastRightClickElement)
            else if (lastRightClickElement.classList.contains(editValueObject)) editObject(lastRightClickElement)
            else if (lastRightClickElement.classList.contains(editValuePicture)) editPicture(lastRightClickElement)
            else if (lastRightClickElement.classList.contains(editValueSound)) editSound(lastRightClickElement)
            else if (lastRightClickElement.classList.contains(editValueDialog)) editDialog(lastRightClickElement)
            window.scrollTo(0, 0);
        } else { editMenu.style.display = "none" }
    } catch { editMenu.style.display = "none" }
    editMenu.style.display = "none"
};

document.onscroll = function(e) {
    editMenu.style.display = "none"
}