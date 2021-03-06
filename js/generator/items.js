// let objectsList = []
let objectsJson = {}

function reloadObjectList(liste) {
    var lang = localStorage.getItem("lang");
    var name = language[lang]["Name"];
    var abi = language[lang]["ShowAbility"];
    var sta = language[lang]["ShowStamina"];
    var gold = language[lang]["ShowGold"];

    liste.innerHTML = '<tr class="tableHeader"><th id="ItemNameTable">' + name + '</th><th id="ItemAbilityTable">' + abi + '</th><th id="ItemStaminaTable">' + sta + '</th><th id="ItemGoldTable">' + gold + '</th><th>Extra</th></tr>'
    for (object in objectsJson) {
        try {
            liste.innerHTML += '<tr class="' + editValue + ' ' + editValueObject + '"><td>' +
                objectsJson[object].name + '</td><td>' +
                objectsJson[object].data[0] + '</td><td>' +
                objectsJson[object].data[1] + '</td><td>' +
                objectsJson[object].data[2] + '</td><td>' +
                objectsJson[object].data[3] + '</td></tr>'
        } catch { continue }
    }
}

function addObjectFromJSON(element) {
    const liste = document.getElementById('objectList')

    if (jsonLen(objectsJson)) { liste.classList.add("table") }

    objectsJson[element.name] = element
    reloadObjectList(liste)
}

function addObject() {
    const liste = document.getElementById('objectList')
    var objectName = document.getElementById('objectName')
    var objectAbility = document.getElementById('itemAbility')
    var objectStamina = document.getElementById('itemStamina')
    var objectGold = document.getElementById('itemGold')
    var objectExtra = document.getElementById('itemExtra')
    var json = {}

    if (objectAbility.value == "" ||
        objectGold.value == "" ||
        objectStamina.value == "" ||
        objectExtra.value == "" ||
        objectName.value == "") { return }
    if (jsonLen(objectsJson)) { liste.classList.add("table") }

    json.name = objectName.value
    json.data = [
        isnum(objectAbility.value) ? parseInt(objectAbility.value) : objectAbility.value,
        isnum(objectStamina.value) ? parseInt(objectStamina.value) : objectStamina.value,
        isnum(objectGold.value) ? parseInt(objectGold.value) : objectGold.value,
        isnum(objectExtra.value) ? parseInt(objectExtra.value) : objectExtra.value
    ]

    objectsJson[objectName.value] = json

    reloadObjectList(liste)

    // Reset des valeurs de l'input
    objectAbility.value = ""
    objectGold.value = ""
    objectExtra.value = ""
    objectName.value = ""
    objectStamina.value = ""
    objectName.focus()

    // try {document.getElementById('playerInventoryList').innerHTML += "<option>" + json.name + "</option>"} catch(e) {}
}

function updateObjects() {
    var objectListOption = ""

    for (object in objectsJson) { objectListOption += "<option>" + object + "</option>" }

    //Ajouter les autres parties ?? update ici
    const playerList = document.getElementById('playerInventoryList')
    var conditionList = document.getElementById('conditionValue')
    var effectList = document.getElementById('effectValue')

    try { playerList.innerHTML = objectListOption } catch (e) {}
    try { conditionList.innerHTML = objectListOption } catch (e) {}
    try { effectList.innerHTML = objectListOption } catch (e) {}
}