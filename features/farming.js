/// <reference types="../../CTAutocomplete" />

import Skyblock from "../utils/skyblock"
import Settings from "../settings"


const mcBlocks = Java.type("net.minecraft.init.Blocks")
const Blocks = {
    melon_stem: mcBlocks.field_150394_bc,
    pumpkin_stem: mcBlocks.field_150393_bb,
    wheat: mcBlocks.field_150464_aj,
    carrot: mcBlocks.field_150459_bM,
    potato: mcBlocks.field_150469_bN,
    cocoa: mcBlocks.field_150375_by,
    nether_wart: mcBlocks.field_150388_bm,
    cactus: mcBlocks.field_150434_aF,
    reeds: mcBlocks.field_150436_aH,
    brown_mushroom: mcBlocks.field_150338_P,
    red_mushroom: mcBlocks.field_150337_Q,
    mycelium: mcBlocks.field_150391_bh,
    dirt: mcBlocks.field_150346_d
}

const stems = [Blocks.melon_stem, Blocks.pumpkin_stem]
const crops = [Blocks.wheat, Blocks.carrot, Blocks.potato, Blocks.cocoa, Blocks.nether_wart]
const talls = [Blocks.cactus, Blocks.reeds]
const shrooms = [Blocks.brown_mushroom, Blocks.red_mushroom]
const dirts = [Blocks.mycelium, Blocks.dirt]

let warnedLast = false

function cancelAndWarn(event, message) {
    if (!warnedLast) {
        ChatLib.chat(`&c&lAmbient &8» &c${message}`)
        World.playSound("random.pop", 1, 10)
    }
    warnedLast = true
    cancel(event)
}

let lastHeldItemIndex = -1
let usingFist = false
let currentItemHasReplenish = false

register("guiOpened", (event) => {
    lastHeldItemIndex = -1
    warnedLast = false
})

register("hitBlock", (block, event) => {
    if (!Settings.blockStemMisclicks) return
    if (Skyblock.location != "Private Island") return
    let heldItemIndex = Player.getHeldItemIndex()
    if (heldItemIndex != lastHeldItemIndex) {
        lastHeldItemIndex = heldItemIndex
        let item = Player.getHeldItem()
        usingFist = (item == null)
        currentItemHasReplenish = item
            ?.getNBT()
            ?.get("tag")
            ?.get("ExtraAttributes")
            ?.getCompoundTag("enchantments")
            ?.getInteger("replenish") === 1
    }
    let blockType = block.type.mcBlock
    if (usingFist) return
    if (stems.includes(blockType)) {
        cancelAndWarn(event, "Blocked breaking a stem!")
        return
    } else if (crops.includes(blockType)) {
        if (!currentItemHasReplenish) {
            cancelAndWarn(event, "Blocked breaking a crop without replenish!")
            return
        }
    } else if (talls.includes(blockType)) {
        let isSameBelow = World.getBlockAt(block.pos.down()).type.mcBlock == blockType
        if (!isSameBelow) {
            cancelAndWarn(event, "Blocked breaking the bottom block of a tall crop!")
            return
        }
    } else if (shrooms.includes(blockType)) {
        let belowPos = block.pos.down()
        let nw = isBlockDirt(belowPos.north().west())
        let n = isBlockDirt(belowPos.north())
        let ne = isBlockDirt(belowPos.north().east())
        let sw = isBlockDirt(belowPos.south().west())
        let s = isBlockDirt(belowPos.south())
        let se = isBlockDirt(belowPos.south().east())
        let e = isBlockDirt(belowPos.east())
        let w = isBlockDirt(belowPos.west())

        let isRowNorth = nw && n && ne
        let isRowSouth = sw && s && se
        let isRowEast = ne && e && se
        let isRowWest = nw && w && sw

        if (isRowNorth ||isRowSouth || isRowEast || isRowWest) {
            cancelAndWarn(event, "Blocked breaking a source mushroom!")
            return
        }
    }
    warnedLast = false
})

function isBlockDirt(pos) {
    return dirts.includes(World.getBlockAt(pos).type.mcBlock)
}