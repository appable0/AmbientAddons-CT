/// <reference types="../../CTAutocomplete" />
/// <reference lib="es2015" />

import Settings from "../settings"
import PogObject from "../../PogData/index"
import Skyblock from "../utils/skyblock"

const data = new PogObject("../../AmbientAddons", {
    "enabled": true,
    "items": {
        // GENERAL
        "RECOMBOBULATOR_3000": 5e6,

        // M3
        "FIRST_MASTER_STAR": 1e9,

        // M4/
        "SECOND_MASTER_STAR": 1e9,
        "SPIRIT_WING": 1e9,
        "SPIRIT_STONE": 1e6,

        // M5
        "THIRD_MASTER_STAR": 1e9,
        "SHADOW_ASSASSIN_CHESTPLATE": 1e9,

        // M6
        "FOURTH_MASTER_STAR": 1e9,
        "GIANTS_SWORD": 1e9,
        // M7
        "DARK_CLAYMORE": 1e9,
        "NECRON_HANDLE": 1e9,
        "THUNDERLORD_7": 1e9,
        "WITHER_CHESTPLATE": 1e9,
        "FIFTH_MASTER_STAR": 1e9,
        "ULTIMATE_ONE_FOR_ALL_1": 1e9
    }
}, "autobuyItems.json")


let dungeonChests = [
    "Wood Chest",
    "Gold Chest",
    "Diamond Chest", 
    "Emerald Chest", 
    "Obsidian Chest", 
    "Bedrock Chest"
]

const kismetSlot = 50
const buySlot = 31

let hasOpenedChest = false

register("worldLoad", () => {
    let items = data.items
    if (items.hasOwnProperty("NECRONS_HANDLE")) {
        ChatLib.chat(`&a&m${ChatLib.getChatBreak("-")}`)

        ChatLib.chat("&cCorrecting Necron's Handle skyblock ID...")
        try {
            if (!items.hasOwnProperty("NECRON_HANDLE")) {
                ChatLib.chat("&bAdding skyblock ID: NECRON_HANDLE...")
                items["NECRON_HANDLE"] = items["NECRONS_HANDLE"]
            } else {
                ChatLib.chat("&bSkyblock ID: NECRON_HANDLE already exists!")
            }
            ChatLib.chat("&bRemoving skyblock ID: NECRONS_HANDLE...")
            delete items["NECRONS_HANDLE"]
            data.save()
            ChatLib.chat("&aSuccessfully fixed.")
        } catch (e) {
            ChatLib.chat("&cError fixing erroneous ID. Please manually edit Necron's Handle skyblock ID to &a/\"NECRON_HANDLE\".")
        }
        ChatLib.chat(`&a&m${ChatLib.getChatBreak("-")}`)
    }
})

register("command", (...args) => {
    const mode = args[0]
    const item = args[1]
    let price = (args[2] != undefined) ? args[2] : 1e9

    switch (mode) {
        case "add":
            if (item) {
                data["items"][item] = price
                ChatLib.chat("&bItem added.")
            } else {
                ChatLib.chat("&bNo item provided.")
            }
            break

        case "remove":
            if (item in data["items"]) {
                delete data["items"][item]
                ChatLib.chat("&bItem removed.")
            } else {
                ChatLib.chat("&bItem was not in list.")
            }
            break

        case "list":
            ChatLib.chat("&2&m-----------------------------------------------------")
            for (let item of Object.keys(data["items"])) {
                price = data["items"][item]
                if (price === 1e9) {
                    ChatLib.chat(`&a${item}: &bany price.`)
                } else {
                    ChatLib.chat(`&a${item}: &b${price} coins.`)
                }
            }
            ChatLib.chat("&2&m-----------------------------------------------------")
            break
        default:
            ChatLib.chat("&2&m-----------------------------------------------------")
            ChatLib.chat("&aAdd item: &b/autobuy add <Skyblock ID> [max allowable price]")
            ChatLib.chat("&aRemove item: &b/autobuy remove <Skyblock ID>")
            ChatLib.chat("&aGet list of items: &b/autobuy list")
            ChatLib.chat("&2&m-----------------------------------------------------")
            break
    }
    data.save()
}).setCommandName("autobuy")

register("guiMouseClick", (x, y, button, gui, event) => {
    if (Skyblock.location !== "Dungeon" || !Settings.blockKismet) return
    const container = Player.getContainer()
    const containerName = container?.getName()

    if (dungeonChests.includes(containerName)) {
        let slot = undefined
        try {
            slot = Client.currentGui.getSlotUnderMouse()
        } catch (error) {
            print("Failed to get slot: possibly in another GUI?")
            return
        }
        if (slot?.getIndex() == kismetSlot) {
            let isBedrockChest = containerName == "Bedrock Chest"
            let isObsidianChest = containerName == "Obsidian Chest"
            if (!isBedrockChest && !(Skyblock.dungeonFloor == "M4" && isObsidianChest)) {
                ChatLib.chat("&aThis chest should not be rerolled.")
                cancel(event)
            } 
        }
    }    
})

register("worldLoad", () => {
    hasOpenedChest = false
})

register("postGuiRender", (x, y, gui) => {
    if (Skyblock.location !== "Dungeon" || !Settings.autobuy) return
    const container = Player.getContainer()
    if (container) {
        let containerName = container.getName()
        if (containerName == "Wood Chest" && !hasOpenedChest) {
            container.click(31, false, "LEFT")
            hasOpenedChest = true
            Client.currentGui.close()
        } else if (dungeonChests.includes(containerName)) {
            let items = container.getItems()

            let chestPrice
            try {
                chestPrice = parseInt(items[buySlot].getLore()[7].substring(6).replace(/\D/g, ""))
                chestPrice = isNaN(chestPrice) ? 0 : chestPrice
            } catch (e) { chestPrice = 0 }

            const loot = items.slice(10, 17)
            const lootIds = loot.map(item => itemToLabel(item)).filter(id => id)
            const prices = lootIds.map(id => data["items"][id] ? data["items"][id] : -1)
            const maxAllowablePrice = Math.max(...prices)

            if (chestPrice <= maxAllowablePrice) {
                container.click(31, false, "LEFT")
                hasOpenedChest = true
                Client.currentGui.close()
            }
        }
    }
})

function itemToLabel(item) {
    let sbId = Skyblock.getSkyblockId(item)
	if (sbId === "ENCHANTED_BOOK") {
        return Skyblock.getEnchantment(item)
    } else if (sbId) {
        return sbId
    } else {
        return undefined
    }
}