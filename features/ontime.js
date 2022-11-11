/// <reference types="../../CTAutocomplete" />
/// <reference lib="es2015" />

import Settings from "../settings"

let shouldSayMelody = true
let shouldSayThrottled = true
let shouldBlockClicks = true
let completedStageRegex = /^[A-za-z0-9_]{3,16} (?:completed|activated) a (?:lever|terminal|device)! \((?:[07]\/7|[08]\/8)\)/

register("chat", (event) => {
    let message = ChatLib.getChatMessage(event)
    if (completedStageRegex.test(message)) {
        shouldBlockClicks = true
        shouldSayMelody = true
        shouldSayThrottled = true
    } else if (message.startsWith("This menu has been throttled!")) {
        shouldBlockClicks = false
        if (shouldSayThrottled && Settings.throttleNotification) {
          ChatLib.command(`pc ${Settings.throttleNotificationMessage}`, false)
          shouldSayThrottled = false
        }
    }
})

register("worldUnload", () => {
    shouldBlockClicks = true
    shouldSayMelody = true
    shouldSayThrottled = true
})

register("postGuiRender", (x, y, gui) => {
  let container = Player.getContainer()
  if (container?.getName() !== "Click the button on time!") return
  if (shouldSayMelody && Settings.melodyNotification) {
    ChatLib.command(`pc ${Settings.melodyNotificationMessage}`, false)
    shouldSayMelody = false
  }
})

register("guiMouseClick", (x, y, button, gui, event) => {
    try {
        let container = Player.getContainer()
        if (container?.getName() !== "Click the button on time!") return 

        if (!Settings.melodyTerminal) return
        if (!shouldBlockClicks) return

        let items = container.getItems()
        
        if (items?.length >= 54) {
            items = items.slice(0, 54)
        } else {
            return
        }

        colors = items.map(item => item.getDamage())

        targetPaneIdx = colors.indexOf(10)
        movingPaneIdx = colors.indexOf(5)

        movingPaneCol = movingPaneIdx % 9

        currentRow = Math.floor(movingPaneIdx / 9)
        allowedClickSlot = currentRow * 9 + 7

        isNotAligned = targetPaneIdx !== movingPaneCol
        isNotCorrectClay = allowedClickSlot !== gui?.getSlotUnderMouse()?.slotIndex

        if (isNotAligned || isNotCorrectClay) {
            cancel(event)
            if (isNotAligned) {
                World.playSound("random.pop", 1, 0)
                ChatLib.chat("&aMoving pane in incorrect location, cancelled.")
            } else {
                World.playSound("random.pop", 1, 10)
                ChatLib.chat("&aWrong block clicked, cancelled.")
            }
        }

    } catch (e) {
        print(e.toString())
    }  
})