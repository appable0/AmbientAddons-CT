/// <reference types="../../CTAutocomplete" />

import Settings from "../settings"
import PogObject from "../../PogData/index"

const File = Java.type("java.io.File")
const catFile = new File("./config/ChatTriggers/modules/AmbientAddons/assets/kittycatmodule.png")

const catMove = new Gui()

register("command", () => {
    if (!Settings.cat) {
        ChatLib.chat("&cEnable cat to use!")
    } else {
        catMove.open()
    }
}).setCommandName("moveCat")

const data = new PogObject("../../AmbientAddons", {
    catX: 10,
    catY: 10,
    catScale: 100
}, "cat.json")

register("dragged", (dx, dy, x, y) => {
    if (catMove.isOpen()) {
        data.catX = x
        data.catY = y
        data.save()
    }
})

register("scrolled", (x, y, dir) => {
    if (catMove.isOpen()) {
        if (dir == 1) {
            data.catScale += 1
        } else {
            data.catScale -= 1
        }
        data.save()
    }
})

const image = new Image(catFile)

register("renderOverlay", (event) => {
    if (!Settings.cat) return
    if (image) {
        image.draw(data.catX, data.catY, data.catScale, data.catScale)
    }
})