class Fight {
    constructor(data) {
        this.ability = setInt(data[0])
        this.stamina = setInt(data[1])
        this.reward = data[2]
        this.zoneEffect = setInt(data[3])
        this.img = data[4]
        this.background = data[5]
        this.title = data[6]
        this.quotient = player.ability - this.ability
    }

    show() {
        var img = '<div class="hero-js-dialog-img"><img src="' + this.img + '">\
        <div id="fight-stats">🗡️' + this.ability + '  ❤️' + this.stamina + '  ⭐️' + this.zoneEffect + '</div>\
        </div>'
        var buttons = '<button class="hero-js-button hero-js-activate" onclick="attack()">Attaquer</button>\n'
        buttons += '<button class="hero-js-button hero-js-not-activate">Fuir</button>\n'
        var title = '<div class="hero-js-dialog-header">' + this.title + '</div>'

        setBackground(this.background)
        document.getElementById('hero-js-all').innerHTML = img +
                                                        '<div class="hero-js-dialog">' +
                                                        title +
                                                        '<div class="hero-js-dialog-button-zone">' + buttons + '</div>\
                                                        </div>'
        if (showTitleHUD) {showTitle()}
        if (player != null) {player.show()}
    }

    checkVictory() {
        if (this.stamina <= 0 || this.quotient > fightLimite) {
            setEffect(10, null, null, [this.reward[0]])
            setEffect(11, null, null, [this.reward[1]])
            setEffect(4, null, null, [this.reward[2]])
            setEffect(6, null, null, [this.reward[3]])
            allDialog[currentNumber].show(player)
            return true
        }
        if (player.stamina <= 0 || this.quotient < 0 - fightLimite) {
            showTitleHUD = false
            showPlayerAbility = false
            showPlayerStamina = false
            showPlayerSkills = false
            showPlayerGold = false
            showPlayerInventory = false
            showPlayerSpecial = false
            allDialog[defeatNumber].show(player)
            return true
        }
    }

}

function launchFight(data) {
    fight = new Fight(data)
    if (fight.checkVictory()) {return}
    fight.show()
}

function attack() {
    if (fight.checkVictory()) {return}

    var dice = randomInRange(0, maxDice)

    var data = fightTable[fight.quotient + fightLimite][dice]
    fight.stamina -= Math.floor(data[0] * fight.zoneEffect)
    player.stamina -= data[1]

    if (fight.checkVictory()) {return}

    fight.show()
}