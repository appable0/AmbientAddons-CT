/// <reference types="../../CTAutocomplete"/>
/// <reference lib="es2015"/>

import Settings from "../settings"
import Skyblock from "../utils/skyblock"

let witherImpactEndTime = null

register("renderOverlay", (event) => {
    if ((Settings.shieldDisplay == 0) || witherImpactEndTime == null) return
    let diff = (witherImpactEndTime - Date.now()) / 1000
    if (diff > 0) {
        let display = Math.ceil(diff).toString()

        let x = (Renderer.screen.getWidth() - Renderer.getStringWidth(display)) / 2 + 1
        let y = Renderer.screen.getHeight() / 2 + 10

        if (Settings.shieldDisplay == 1) {
            Renderer.drawString(display, x, y)
        } else if (Settings.shieldDisplay == 2) {
            Renderer.drawStringWithShadow(display, x, y)
        } else if (Settings.shieldDisplay == 3) {
            Skyblock.drawStringWithOutline(display, x, y)
        }
    } else {
        witherImpactEndTime = null
    }

})

register("actionBar", (event) => {
    if (!Settings.shieldOverlay) return
    if (witherImpactEndTime === null) {
        witherImpactEndTime = Date.now() + 5000
    }
}).setChatCriteria(/.*Wither Impact.*/)

