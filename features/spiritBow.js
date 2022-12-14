/// <reference types="../../CTAutocomplete" />

import Settings from "../settings"
import Skyblock from "../utils/skyblock"
import PogObject from "../../PogData/index"

/*
const thornMove = new Gui()
let lastPickedUpBow = -1

const data = new PogObject("../../AmbientAddons", {
  thornScale: 100,
  thornX: 10,
  thornY: 10
}, "thorn.json")

register("dragged", (dx, dy, x, y) => {
  if (thornMove.isOpen()) {
    data.thornX = x
    data.thornY = y
    data.save()
  }
})

register("scrolled", (x, y, dir) => {
  if (thornMove.isOpen()) {
    if (dir == 1) {
      data.thornScale += 5
    } else {
      data.thornScale -= 5
    }
    data.save()
  }
})

register("command", () => {
  thornMove.open()
}).setCommandName("moveThorn")

register("chat", (...args) => {
  if (lastPickedUpBow == -1) {
    lastPickedUpBow = Date.now()
  }
}).setChatCriteria("You picked up the Spirit Bow! Use it to attack Thorn!")

register("renderOverlay", (...args) => {
  Renderer.translate(data.thornX, data.thornY)
  Renderer.scale(data.thornScale / 100)
  if (thornMove.isOpen()) {
    Renderer.drawString((20).toFixed(2), 0, 0)
  } else {
    let diff = (Date.now() - lastPickedUpBow) / 1000
    if (diff > 20) {
      lastPickedUpBow = -1
    } else {
      Renderer.drawString((20 - diff).toFixed(2), 0, 0)

    }
  }
  Renderer.finishDraw()
})

*/