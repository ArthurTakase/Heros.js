function exportJSON(data) {
    data = JSON.stringify(data)
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(data));
    element.setAttribute('download', gameTitle + "-save.json");
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
}

function reloadSave(json) {
    if (json.save == undefined) { return }

    if (player != null) {
        player.inventory = []
        player.skills = []

        player.ability = json.save.player.ability
        player.stamina = json.save.player.stamina
        player.maxStamina = json.save.player.maxStamina
        player.extra = json.save.player.extra
        player.gold = json.save.player.gold

        for (item in json.save.player.inventory)
            newObject(json.save.player.inventory[item], inventoryList, player.inventory)

        for (i in json.save.player.skill)
            player.setSkill(getFromName(json.save.player.skills[i], skillList))
    }

    currentNumber = json.save.currentNumber
}

function save() {
    var temp = defaultJSON

    temp.save = {}
    temp.save.currentNumber = currentNumber

    if (player != null) {
        var inventory = []
        var skills = []

        temp.save.player = {}
        temp.save.player.ability = player.ability
        temp.save.player.stamina = player.stamina
        temp.save.player.maxStamina = player.maxStamina
        temp.save.player.extra = player.extra
        temp.save.player.gold = player.gold

        for (item in player.inventory)
            inventory.push(player.inventory[item].name)

        for (i in player.skill)
            skills.push(player.skill[i].name)

        temp.save.player.inventory = inventory
        temp.save.player.skills = skills
    }

    exportJSON(temp)
}