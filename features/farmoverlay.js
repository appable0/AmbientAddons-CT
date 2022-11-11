/// <reference types="../../CTAutocomplete" />


import Skyblock from "../utils/skyblock"
import Settings from "../settings"

let x = 5
let y = 90

let cultivatingCount = 0
let lastCultivatingCount = 0
let lastCultivatingTime = Date.now()

let ewma = 0
const window = 10
const alpha = 2 / (window + 1)


register("tick", (elapsed) => {
    rawCount = Player.getHeldItem()?.getNBT()?.get("tag")?.get("ExtraAttributes")?.getInteger("farmed_cultivating")
    if (rawCount) {
        if (elapsed % 4 == 0) {
            cultivatingDiff = rawCount - lastCultivatingCount
            timeDiff = (Date.now() - lastCultivatingTime) / 1000
    
            let rate = cultivatingDiff / timeDiff * 60
    
            ewma = rate * alpha + (1 - alpha) * ewma
    
            lastCultivatingTime = Date.now()
            lastCultivatingCount = rawCount
        } 
        cultivatingCount = rawCount
    }
})



register("renderOverlay", (event) => {
    let cultivatingString = `&e${cultivatingCount?.toString()?.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")}`
    let ewmaString = `&e${ewma?.toFixed(0)?.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")}`

    Skyblock.drawStringWithOutline(`${cultivatingString} crops`, x, y + 33)
    Skyblock.drawStringWithOutline(`${ewmaString} crops/min`, x, y + 44)

})