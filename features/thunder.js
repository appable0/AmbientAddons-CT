/// <reference types="../../CTAutocomplete" />
/// <reference lib="es2015" />

import Skyblock from "../utils/skyblock"
import Settings from "../settings"

let shouldDisplay = false

register("chat", (event) => {
    if (!Settings.thunderNotification) return

    let message = ChatLib.removeFormatting(ChatLib.getChatMessage(event, false))

    if (message == "[NPC] Mort: Talk to me to change your class and ready up."
        && Player.getInventory().getItems().some((item) => Skyblock.getSkyblockId(item) == "THUNDER_IN_A_BOTTLE" )
    ) {
        shouldDisplay = true
    }

})

register("tick", (event) => {
    if (shouldDisplay) {
        Client.showTitle("&dThunder bottle charged!", "", 20, 60, 20)
        World.playSound("random.explode", 1, -1)
        shouldDisplay = false
    }
})
