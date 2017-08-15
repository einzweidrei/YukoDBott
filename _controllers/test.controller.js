module.exports = class TestController {
    constructor() {
        this.HOLD = 'HOLD'
        this.TOGGLE = 'TOGGLE'
        this.CLICK = 'CLICK'
        this.CONTROL = 'CONTROL'
        this.SHIFT = 'SHIFT'
        this.ALT = 'ALT'
        this.DELAY = 200
        this.autoHotKey = ''
        this.hotKey = ''
        this.action = ''
        this.mainKey = ''
        this.mainCombo = ''
    }

    setCombo(delay, specialButton, combo, type) {
        this.setDelay(delay)
        this.setSpecialButton(specialButton)
        this.setCombo(combo)
        this.setType(type)
    }

    getCombo() {
        return this.mainCombo
    }

    setDelay(delay) {
        this.DELAY = delay
    }

    setCombo(combo) {
        var res = ''
        var temp = combo.split('/')
        temp.map(a => {
            var a = a.toUpperCase()
            if (a == 'RMB' || a == 'LMB') {
                res += '\n\tSleep ' + this.DELAY + ' \n\tLoop, 1 { \nClick' + (a == 'RMB' ? ', R' : '') + ' \n}'
            } else {
                res += '\n\tSleep ' + this.DELAY + ' \n\tLoop, 1 { \nSend, ' + a + ' \n}'
            }
        })
        this.hotKey = res
    }

    setType(strType) {
        var strType = strType.toUpperCase()
        var res = this.action
        if (strType == this.HOLD) {
            res += '\nwhile GetKeyState("' + this.mainKey + '", "P") {' + this.hotKey + '\n}'
        } else if (strType == this.CLICK) {
            res += '\n' + this.hotKey
        } else {
            res += '\nUse:=!Use \nif(Use) \nLoop {' + this.hotKey + '\n}'
        }

        this.mainCombo = res + '\nReturn \nF8::Suspend'
    }

    setSpecialButton(strButton) {
        var strButton = strButton.toUpperCase()
        var res = ''
        if (strButton.indexOf(this.CONTROL) > -1) {
            res = strButton.replace(this.CONTROL, '^')
        } else if (strButton.indexOf(this.ALT) > -1) {
            res = strButton.replace(this.ALT, '!')
        } else if (strButton.indexOf(this.SHIFT) > -1) {
            res = strButton.replace(this.SHIFT, '+')
        } else {
            res = (strButton == 'RMB' ? 'RButton' : strButton == 'LMB' ? 'LButton' : strButton)
        }

        this.mainKey = res
        this.action = '\n' + (strButton == 'RMB' || strButton == 'LMB' ? '$' + res : res) + '::'
    }
}