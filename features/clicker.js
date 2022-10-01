/// <reference types="../../CTAutocomplete" />
/// <reference lib="es2015" />

import Settings from "../settings"
import Skyblock from "../utils/skyblock"


let lastTermClick = 0

register("tick", () => {
    if (!Settings.autoClick) return
    let mc = Client.getMinecraft()
    if (mc.field_71474_y.field_74313_G.func_151470_d()) {
        let delay = 1000 / Settings.autoClickCps
        let item = Player.getHeldItem()
        let sbId = Skyblock.getSkyblockId(item)
        if (sbId == "TERMINATOR") {
            if (lastTermClick == 0) {
                if (mc.field_71442_b.func_78769_a(mc.field_71439_g, mc.field_71441_e, item.itemStack)) {
                    mc.field_71460_t.field_78516_c.func_78445_c()
                }
                lastTermClick = Date.now()
            }
            if (Date.now() - lastTermClick >= delay) {
                if (mc.field_71442_b.func_78769_a(mc.field_71439_g, mc.field_71441_e, item.itemStack)) {
                    mc.field_71460_t.field_78516_c.func_78445_c()
                }
                lastTermClick = Date.now() - lastTermClick % delay
            }
        }
    }
})