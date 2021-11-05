function gameInfos() {
    var json = {}

    json.title = document.getElementById("title").value
    json.startNumber = parseInt(document.getElementById("startNumber").value)
    json.defeatNumber = parseInt(document.getElementById("defeatNumber").value)
    json.maxDice = parseInt(document.getElementById("maxDice").value)
    json.maxSkills = parseInt(document.getElementById("maxSkills").value)
    json.showPlayerAbility = document.getElementById("showPlayerAbility").value == "on" ? true : false
    json.showPlayerStmina = document.getElementById("showPlayerStamina").value == "on" ? true : false
    json.showPlayerSkills = document.getElementById("showPlayerSkills").value == "on" ? true : false
    json.showPlayerGold = document.getElementById("showPlayerGold").value == "on" ? true : false
    json.showPlayerInventory = document.getElementById("showPlayerInventory").value == "on" ? true : false

    return json
}

function music() {
    var json = {}

    json.hurt = [
        document.getElementById('hurt').value,
        parseInt(document.getElementById('volumeHurt').value) / 100
    ]
    json.victory = [
        document.getElementById('victory').value,
        parseInt(document.getElementById('volumeVictory').value) / 100
    ]
    json.defeat = [
        document.getElementById('defeat').value,
        parseInt(document.getElementById('volumeDefeat').value) / 100
    ]
    json.fight = [
        document.getElementById('fight').value,
        parseInt(document.getElementById('volumeFight').value) / 100
    ]

    return json
}

function gameplay() {
    var json = {}

    json.skills = skillsList
    json.objectsInventory = objectsList
    json.objectsSpecial = specialList

    return json
}

function data() {
    var json = {}

    json.picture = pictureJSON
    json.sound = soundJSON

    return json
}

function checkJSON(json) {
    if (json.gameInfos.title == "") {return "Error: No title"}
    if (json.gameInfos.startNumber == null ||
        json.gameInfos.startNumber == NaN ||
        json.gameInfos.startNumber == undefined) {return "Error: No Start Number"}

    return true
}

function submit() {
    var json = {}
    const returnDiv = document.getElementById("return")

    json.data = data()
    json.gameInfos = gameInfos()
    json.music = music()
    json.gameplay = gameplay()
    if (colorList.length != 0) {json.color = colorList}

    var check = checkJSON(json)

    // var check = "Error: No Start Number (<u>gameInfos.startNumber</u>)"

    if (check == true) {
        exportJSON(json)
        returnDiv.style.color = "green"
        returnDiv.innerHTML = "Done !"
    } else {
        returnDiv.style.color = "red"
        returnDiv.innerHTML = check
    }
}