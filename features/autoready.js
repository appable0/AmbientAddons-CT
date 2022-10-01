/// <reference types="../../CTAutocomplete" />
/// <reference lib="es2015" />

import Settings from "../settings"

const CONTAINER_CHEST = Java.type("net.minecraft.inventory.ContainerChest")
const PLAYER_INVENTORY_SIZE = 36
const NAME_TAB_SLOTS = [1, 5, 9, 13, 17]
const READY_INV_SLOTS = [2, 3, 4, 5, 6]
const BLACK_STAINED_GLASS_ID = 160
const START_SLOT = 13
const DELAY_TIME = 100

let hasClickedReady = false
let hasClickedStart = false

register("worldLoad", () => {
    hasClickedReady = false
    hasClickedStart = false
})

register("postGuiRender", (x, y, gui) => {
    if (!Settings.autoReady) return
    let container = Player.getContainer()
    if (isChest(container)) {
        if (container.getName() === "Start Dungeon?") {
            if (!hasClickedStart && isGuiLoaded(container)) {
                if (!Settings.autoReadyCheckFull || getPlayerCount() === 5) {
                    hasClickedStart = true
                    new Thread(() => {
                        Thread.sleep(DELAY_TIME)
                        container.click(START_SLOT, false, "MIDDLE")
                    }).start()
                }
            }
        } else if (container.getName().startsWith("Catacombs - ")) {
            if (!hasClickedReady && isGuiLoaded(container)) {
                let username = Client.getMinecraft().func_110432_I().func_111285_a()
                let nameSlot = READY_INV_SLOTS.filter(slot => getUsernameFromItem(container.getStackInSlot(slot)) === username)[0]
                let clickSlot = nameSlot + 9
                hasClickedReady = true
                new Thread(() => {
                    Thread.sleep(DELAY_TIME)
                    container.click(clickSlot, false, "MIDDLE")
                }).start()
            }
        }
    } 
})

function getUsernameFromItem(item) {
    if (item.getID() == BLACK_STAINED_GLASS_ID) return null
    let itemName = ChatLib.removeFormatting(item.getName())
    let itemSplit = itemName.split(" ")
    return itemSplit[itemSplit.length - 1]
}

function isGuiLoaded(container) {
    let chestSize = container.getSize() - PLAYER_INVENTORY_SIZE
    return container.getStackInSlot(chestSize - 1) !== null
}

function isChest(container) {
    return container?.container instanceof CONTAINER_CHEST
}

function getPlayerCount() {
    let names = TabList.getNames()
    return NAME_TAB_SLOTS.filter(slot => names[slot] !== "§r").length
}

