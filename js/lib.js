/***********************************/
/*            VARIABLES            */
/***********************************/

let gameTitle
let currentNumber
let maxDice
let maxSkill
let allDialog = []
let skillList = []
let inventoryList = []
let specialList = []
let player = null
// Affichage
let showTitleHUD = true
let showPlayerAbility = true
let showPlayerStamina = true
let showPlayerSkills = true
let showPlayerGold = true
let showPlayerInventory = true
let showPlayerSpecial = true

/***********************************/
/*          LIB FUNCTIONS          */
/***********************************/

function randomFromList(liste) {
    return liste[Math.floor(Math.random()*liste.length)]
}

function randomFromListUnique(liste, target) {
    var temp
    var random = Math.floor(Math.random() * liste.length)
    var origin = random

    temp = liste[random]
    while (target.includes(temp)) {
        random++
        if (random >= liste.length)
            random = 0
        if (random == origin)
            return null
        temp = liste[random]
    } 
    return temp
}

function getFromName(item, list) {
    for (i in list) {
        if (list[i].name == item) {
            return list[i]
        }
    }
    return null
}

function randomInRange(min, max) {
    return Math.floor(Math.random() * max) + min
}

function setInt(objetValue) {
    if (typeof objetValue === 'string') {
        if (objetValue.startsWith("RANDOM")) {
            var value = objetValue.split(',')
            if (value[2] == "DICE") {
                return randomInRange(parseInt(value[1]), maxDice)
            } else {
                return randomInRange(parseInt(value[1]), parseInt(value[2]))
            }
        }
        return -1
    } else {
        return objetValue
    }
}

function removeFromPlayer(object, list) {
    var temp

    console.log(list)
    
    if (object == "RANDOM_IN_CLASS") {
        temp = Math.floor(Math.random() * list.length)
        console.log(list[temp])
        player.removeStuffBonus(list[temp])
        list.splice(temp, 1)
    } else {
        console.log("else")
        for (i in list) {
            if (list[i].name == object) {
                player.removeStuffBonus(list[i])
                list.splice(i, 1)
                break
            }
        }
    }
    console.log(list)
}

function newObject(object, list, playerData) {
    var temp

    if (object == "RANDOM_IN_CLASS") {
        player.addStuff(randomFromList(list))
    } else if (object == "RANDOM_IN_CLASS_UNIQUE") {
        temp = randomFromListUnique(list, playerData)
        if (temp != null)
            player.addStuff(temp)
    } else if (typeof object === 'string') {
        temp = getFromName(object, list)
        if(temp != null)
            player.addStuff(temp)
    } else {
        player.addStuff(
            new Object(
                object.name,
                object.type,
                object.data
            )
        )
    }
}