/// <reference types="../../CTAutocomplete" />
/// <reference lib="es2015" />

import Settings from "../settings"

const SALVAGE_ITEMS = [
    "SLUG_BOOTS",
    "MOOGMA_LEGGINGS", 
    "FLAMING_CHESTPLATE", 
    "TAURUS_HELMET", 
    "BLADE_OF_THE_VOLCANO", 
    "STAFF_OF_THE_VOLCANO",
    "RAMPART_HELMET",
    "RAMPART_CHESTPLATE",
    "RAMPART_LEGGINGS",
    "RAMPART_BOOTS",
    "SWORD_OF_BAD_HEALTH"
]

const DO_NOT_SALVAGE = [
    "WITHER_CLOAK_SWORD",
    "DARK_CLAYMORE",
    "GIANTS_SWORD",
    "WITHER_HELMET",
    "WITHER_CHESTPLATE",
    "WITHER_LEGGINGS",
    "WITHER_BOOTS",
    "ICE_SPRAY_WAND"
]

// 2: salvage
// 1: allow salvage, but hesitate
// 0: don't allow salvage
function shouldSalvage(item) {
    let attributes = item?.getNBT()?.get("tag")?.get("ExtraAttributes")
    let id = attributes?.getString("id")
    let itemQuality = attributes?.getInteger("baseStatBoostPercentage")
    let stars = attributes?.getInteger("dungeon_item_level")

    if (SALVAGE_ITEMS.includes(id)) {
        return 2
    } else if ((DO_NOT_SALVAGE.includes(id)) || stars) {
        return 0
    } else if (itemQuality) {
        return (itemQuality == 50) ? 1 : 2
    } else {
        return 0
    }
}

register("command", (...args) => {
    ChatLib.chat(Player.getHeldItem().getNBT())
}).setCommandName("getNBT")


const ContainerChest = Java.type("net.minecraft.inventory.ContainerChest")
const InventoryPlayer = Java.type("net.minecraft.entity.player.InventoryPlayer")
const SALVAGE_CONFIRM_SLOT_INDEX = 31
const SALVAGE_ITEM_SLOT_INDEX = 22


function isSlotInPlayerInventory(slot) {
    return slot != null
        && slot.getInventory().inventory instanceof InventoryPlayer
}


// Executes cb function (container) => () iff the current container
// is a salvage menu in Hypixel Skyblock
function withSalvageMenu(cb) {
    let container = Player.getContainer()
    if (container?.container instanceof ContainerChest 
        && container.getName() == "Salvage Item"
    ) {
        cb(container)
    }
}


register("renderSlot", (slot, gui, event) => {
    if (!Settings.salvageHighlight) return
    withSalvageMenu((container) => {
        let slotItem = slot.getItem()

        let salvageStatus = shouldSalvage(slotItem)

        if (salvageStatus == 2) {
            Renderer.drawRect(Renderer.GREEN, slot.getDisplayX(), slot.getDisplayY(), 16, 16)
        } else if (salvageStatus == 1) {
            Renderer.drawRect(Renderer.YELLOW, slot.getDisplayX(), slot.getDisplayY(), 16, 16)
        }
        
    })
})

const mainDelay = 300
const topQualityDelay = 1000

register("guiClosed", () => {
    salvageStatus = Salvage.IDLE
    nextClickTime = Date.now()
})

const Salvage = {
    IDLE: "Idle",
    SLOT: "Slot",
    WAITING: "Waiting",
    CLICKED: "Clicked",
    CONFIRMING: "Confirming",
    CONFIRMED: "Confirmed"
}

let salvageStatus = Salvage.IDLE
let nextClickTime = Date.now()

register("guiMouseClick", (x, y, button, gui, event) => {
    if (!Settings.salvageAuto) return
    withSalvageMenu((container) => {
        let clickSlot = Client.currentGui.getSlotUnderMouse()
        if (isSlotInPlayerInventory(clickSlot)) {
            cancel(event)
            return
        } else if (clickSlot.getIndex() === 22) {
            cancel(event)
            return
        } else if (clickSlot.getIndex() === 31) {
            if (Settings.salvageTrueAuto) return
            cancel(event)
            let color = container.getStackInSlot(53)?.getDamage() == 5 ? "Green" : "Red"
            if (Date.now() > nextClickTime) {
                if (salvageStatus === Salvage.SLOT && color === "Green") {
                    container.click(SALVAGE_CONFIRM_SLOT_INDEX, false, "LEFT")
                    salvageStatus = Salvage.CLICKED
                } else if (salvageStatus === Salvage.CONFIRMING) {
                    container.click(SALVAGE_CONFIRM_SLOT_INDEX, false, "LEFT")
                    salvageStatus = Salvage.IDLE
                    nextClickTime = Date.now() + mainDelay
                } else {
                    World.playSound("random.pop", 1, 1)
                }
            } else {
                World.playSound("random.pop", 1, 1)
            }

        }
    })
})

register("postGuiRender", (x, y, gui) => {
    if (!Settings.salvageAuto) return
    withSalvageMenu((container) => {
        let color = container.getStackInSlot(53)?.getDamage() == 5 ? "Green" : "Red"
        let isClay = container.getStackInSlot(SALVAGE_CONFIRM_SLOT_INDEX)?.getDamage() === 5
        if (Date.now() < nextClickTime) return
        if (salvageStatus === Salvage.IDLE) {
            playSound = true
            let index = getSalvagableIndex(container)
            if (index) {
                container.click(index, true, "LEFT")
                salvageStatus = Salvage.SLOT
            }
        } else if (salvageStatus === Salvage.SLOT && color === "Green") {
            if (Settings.salvageTrueAuto) {
                container.click(SALVAGE_CONFIRM_SLOT_INDEX, false, "LEFT")
                salvageStatus = Salvage.CLICKED
            } 
        } else if (salvageStatus === Salvage.CLICKED) {
            playSound = true
            if (color == "Red") {
                salvageStatus = Salvage.IDLE
                nextClickTime = Date.now() + mainDelay
            } else if (isClay) {
                salvageStatus = Salvage.CONFIRMING
                nextClickTime = Date.now() + topQualityDelay
            }
        } else if (salvageStatus === Salvage.CONFIRMING) {
            if (Settings.salvageTrueAuto) {
                container.click(SALVAGE_CONFIRM_SLOT_INDEX, false, "LEFT")
                salvageStatus = Salvage.IDLE
                nextClickTime = Date.now() + mainDelay * 2
            } 
        }
    })
})

function getSalvagableIndex(container) {
    for (let i = 54; i < 90; i++) {
        let item = container.getStackInSlot(i)
        if (shouldSalvage(item)) {
            return i
        }
    }
    return null
}


/*
register("guiMouseClick", (x, y, button, gui, event) => {
    if (!Settings.salvageAuto) return
    withSalvageMenu((container) => {
        let clickSlot = Client.currentGui.getSlotUnderMouse()
        if (isSlotInPlayerInventory(clickSlot)) {
            cancel(event)
            return
        }
        if (clickSlot.getIndex() == 31) {
            cancel(event)
            let damage = container.getStackInSlot(53)?.getDamage()
            if (damage == 5) {
                if (!waitingForSalvageRegister) {
                    container.click(SALVAGE_CONFIRM_SLOT_INDEX, false, "LEFT")
                    waitingForSalvageRegister = true
                    waitingForItemClickRegister = false
                }
            }
        }
    })
})

register("postGuiRender", (x, y, gui) => {
    withSalvageMenu((container) => {
        ChatLib.chat(Date.now() > cd + delay)
        let damage = container.getStackInSlot(53)?.getDamage()
        if (damage == 14) {
            if (waitingForSalvageRegister) {
                waitingForSalvageRegister = false
                cd = Date.now()
            } else if (!waitingForItemClickRegister && Date.now() > cd + delay) {
                let salvageIndex = null
                for (let i = 54; i < 90; i++) {
                    let item = container.getStackInSlot(i)
                    if (shouldSalvage(item)) {
                        salvageIndex = i
                        break
                    }
                }
                if (salvageIndex) {
                    container.click(salvageIndex, true, "LEFT")
                    ChatLib.chat("click")
                    waitingForItemClickRegister = true
                }
            }
        }
    })
})
*/