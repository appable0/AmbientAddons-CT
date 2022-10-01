/// <reference types="../../CTAutocomplete" />

import Skyblock from "../utils/skyblock"
import Settings from "../settings"

const mcBlocks = Java.type("net.minecraft.init.Blocks")
const Blocks = {
    unpowered_repeater: mcBlocks.field_150413_aR,
    powered_repeater: mcBlocks.field_150416_aS,
    sapling: mcBlocks.field_150345_g
}

register("hitBlock", (block, event) => {
    if (!Settings.foragingQOL) return
    if (Skyblock.location != "Private Island") return
    if ([Blocks.unpowered_repeater, Blocks.powered_repeater].includes(block.type.mcBlock)) {
        cancel(event)
        ChatLib.chat("&cBreaking repeaters is disabled! Disable Foraging QOL to allow.")
    }
})

register("playerInteract", (action, position, event) => {
    if (!Settings.foragingQOL) return
    if (Skyblock.location != "Private Island") return
    if (Skyblock.getSkyblockId(Player.getHeldItem()) === "ENCHANTED_BONE_MEAL") {
        if (event.action === InteractAction.RIGHT_CLICK_BLOCK) {
            let clickedBlock = World.getBlockAt(position.getX(), position.getY(), position.getZ())
            if (clickedBlock.type.mcBlock != Blocks.sapling) {
                cancel(event)
                ChatLib.chat(`&cPrevented bonemealing ${clickedBlock.type.getName()}! Disable Foraging QOL to allow.`)
            }
        }
    }
})

