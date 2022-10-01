/// <reference types="../../CTAutocomplete" />
/// <reference lib="es2015" />

import ItemLib from "../utils/itemLib"
import Skyblock from "../utils/skyblock"
import Settings from "../settings"

let lastBonzoProc = 0
let lastFraggedBonzoProc = 0
let lastSpiritProc = 0

register("worldLoad", () => {
    lastBonzoProc = 0
    lastFraggedBonzoProc = 0
    lastSpiritProc = 0
})

register("renderOverlay", (event) => {
    if (!Settings.maskOverlay) return
    let item = Skyblock.getSkyblockId(Player.armor.getHelmet())
    let warningString = "&cMask!"
    let x = (Renderer.screen.getWidth() - Renderer.getStringWidth(warningString)) / 2 + 1
    let y = Renderer.screen.getHeight() / 2 - 20
    if ((item == "BONZO_MASK" && Date.now() - lastBonzoProc < 180000)
        || (item == "FRAGGED_BONZO_MASK" && Date.now() - lastFraggedBonzoProc < 180000)
        || (item == "SPIRIT_MASK" && Date.now() - lastSpiritProc < 30000)
    ) {
        if (Settings.maskDisplay == 0) {
            Renderer.drawString("&cMask!", x, y)
        } else if (Settings.maskDisplay == 1) {
            Renderer.drawStringWithShadow("&cMask!", x, y)
        } else if (Settings.maskDisplay == 2) {
            Skyblock.drawStringWithOutline("&cMask!", x, y)
        }
    }
})

register("chat", (event) => {
    lastSpiritProc = Date.now()
}).setChatCriteria("Second Wind Activated! Your Spirit Mask saved your life!")

register("chat", (item) => {
    if (item === "Bonzo's Mask") {
        lastBonzoProc = Date.now()
    } else {
        lastFraggedBonzoProc = Date.now()
    }
}).setChatCriteria("Your ${item} saved your life!")

register("renderItemOverlayIntoGui", (item, x, y) => {
    let sbId = item?.getNBT()?.get("tag")?.get("ExtraAttributes")?.getString("id")
    let durability = 1

    if (sbId === "BONZO_MASK") {
        durability = (Date.now() - lastBonzoProc) / 180000
    } else if (sbId === "STARRED_BONZO_MASK") {
        durability = (Date.now() - lastFraggedBonzoProc) / 180000
    } else if (sbId === "SPIRIT_MASK") {
        durability = (Date.now() - lastSpiritProc) / 30000
    }

    if (durability < 1) ItemLib.renderItemDurability(durability, x, y)
})

