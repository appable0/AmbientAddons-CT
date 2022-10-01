/// <reference types="../../CTAutocomplete" />
/// <reference lib="es2015" />

import PogObject from "../../PogData"
import Skyblock from "../utils/skyblock"
import Settings from "../settings"

let data = {}
let readingStats = false

let messageId = new PogObject("../../AmbientAddons", {
    extraStats: 1e7,
    secrets: 2e7,
}, "customEndInfo.json")

let hasPrintedFirstMessage = false

register("worldLoad", () => {
    data = {}
    readingStats = false
    hasPrintedFirstMessage = false
})

const floorToBoss = {
    Entrance: "The Watcher",
    1: "Bonzo",
    2: "Scarf",
    3: "The Professor",
    4: "Thorn",
    5: "Livid",
    6: "Sadan",
    7: "The Wither Lords"
}

const romanToInt = {
    I: 1,
    II: 2,
    III: 3,
    IV: 4,
    V: 5,
    VI: 6,
    VII: 7
}

register("chat", (event) => {
    if (!Settings.customEndInfo) return
    if (Skyblock.location != "Dungeon") return

    let components = EventLib.getMessage(event)
    let formattedMessage = components.func_150254_d()

    if (formattedMessage === "§r§r                             §6> §e§lEXTRA STATS §6<§r") {
        cancel(event)
    } else if (formattedMessage === "§r§a§l▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬§r") {
        if (readingStats && !hasPrintedFirstMessage) {
            fetchTabInfo()
            displayEndInfo(false)
            hasPrintedFirstMessage = true
        }
        cancel(event)
    } else {
        let str = ChatLib.removeFormatting(components.func_150260_c()).trim().replaceAll(",", "")
        if (str.startsWith("Master Mode Catacombs - ")) {
            if (!data.floor) {
                data.floor = romanToInt[str.slice(30)] ?? "Entrance"
                data.mode = "Master"
                readingStats = true
                scheduleShowStats()
            }
            cancelAndLog(str, event)
        } else if (str.startsWith("The Catacombs - ")) {
            if (!data.floor) {
                data.floor = romanToInt[str.slice(22)] ?? "Entrance"
                data.mode = "Normal"
                readingStats = true
                scheduleShowStats()
            }
            cancelAndLog(str, event)
        } else if (!readingStats) {
            return
        } else if (str === "") {
            cancelAndLog(str, event)
        } else if (str.startsWith("Team Score:")) {
            let index = str.indexOf("(")
            data.score = data.score ?? parseInt(str.slice(12, index - 1))
            data.grade = data.grade ?? str.charAt(index + 1)
            cancelAndLog(str, event)
        } else if (str.startsWith("☠ Defeated")) {
            let index = str.search("in")
            data.time = parseInt(str.slice(index + 3, index + 5)) * 60 
            data.time += parseInt(str.slice(index + 7, index + 9))
            cancelAndLog(str, event)
        } else if (str.startsWith("+")) {
            let firstIndex = str.indexOf(" ")
            let num = parseFloat(str.slice(1, firstIndex))
            if (str.includes("Experience")) {
                if (num === 0) {
                    data.cataXp = 0
                } else {
                    let secondIndex = str.indexOf(" ", firstIndex + 1)
                    let type = str.slice(firstIndex + 1, secondIndex)
                    if (type === "Catacombs") {
                        data.cataXp = num
                    } else if (data.teamClasses == null) {
                        data.class = type
                        data.classXp = num
                        data.teamClasses = []
                    } else {
                        data.teamClasses.push(type)
                        data.teamXp = num
                    }
                }
            } else {
                data.bits = num
            }
            cancelAndLog(str, event)
        } else if (str.startsWith("Total Damage as ")) {
            let index = str.indexOf(":")
            data.class = str.slice(16, index)
            data.totalDamage = parseInt(str.slice(index + 2))
            cancelAndLog(str, event)
        } else if (str.startsWith("Ally Healing:")) {
            data.allyHealing = parseInt(str.slice(14))
            cancelAndLog(str, event)
        } else if (str.startsWith("Enemies Killed:")) {
            data.enemiesKilled = parseInt(str.slice(16))
            cancelAndLog(str, event)
        } else if (str.startsWith("Deaths:")) {
            data.deaths = parseInt(str.slice(8))
            cancelAndLog(str, event)
        } else if (str.startsWith("Secrets Found:")) {
            data.secretsFound = parseInt(str.slice(15))
            readingStats = false
            displayEndInfo(true)
            cancelAndLog(str, event)
        }
    }    
})

function scheduleShowStats() {
    new Message("§8> EXTRA STATS <").setRecursive(true).chat()
    let count = 0
    let hasDeletedChat = false
    let trigger = register("tick", () => {
        if (count >= 5 && hasDeletedChat == false) {
            ChatLib.deleteChat("> EXTRA STATS <")
            hasDeletedChat = true
        } else if (count >= 10) {
            ChatLib.command("showextrastats", false)
            trigger.unregister()
        }
        count++
    })
}

function cancelAndLog(str, event) {
    cancel(event)
    print(`[CustomEndInfo] ${str}`)
}

function displayEndInfo(shouldEditLast) {
    if (!Settings.customEndInfo) return
    let formattedMode = data.mode == "Normal" ? "The Catacombs" : "Master Mode Catacombs"
    let formattedFloor = (data.floor === "Entrance") ? "Entrance" : `Floor ${data.floor}`
    let title = `&c&l${formattedMode} &8&l- &e&l${formattedFloor}`
    if (data.class != null) title += ` &7(${data.class}&7)`

    let chatBreak = `&a&m${ChatLib.getChatBreak("-")}`

    let formattedBoss = floorToBoss[data.floor]
    let bossStr = null
    if (data.time != null) {
        let min = Math.floor(data.time / 60)
        let sec = (data.time % 60).toString().padStart(2, "0")
        bossStr = `&eDefeated &c${formattedBoss} &ein &a${min}&7:&a${sec}`
    } else {
        bossStr = `&cFailed to defeat &c${formattedBoss}!`
    }

    let formattedGrade = scoreToGrade(data.score)
    let scoreStr = `&eScore: &a${data.score} &7(${formattedGrade}&7)`

    let totalSecretStr = (data.totalSecretsFound == data.totalSecrets) ? "&a&lALL!" : data.totalSecrets
    let formattedSecrets = data.secretsFound != null ? `&a${data.secretsFound}` : "&7?"
    let secretStr = `&eSecrets found: ${formattedSecrets}&7/&a${data.totalSecretsFound} &7(${totalSecretStr}&7)`

    let experienceFormatStr = "XP"
    if (data.teamClasses && data.teamClasses.length >= 3) experienceFormatStr = "Experience"
    let cataXpStr = `&7+&b${formatNumber(data.cataXp) ?? "0"} &3Catacombs ${experienceFormatStr}`

    let classXpStr = (data.classXp != null) ? `&7+&b${formatNumber(data.classXp)} &3${data.class} ${experienceFormatStr}` : null
    let teamXpStr = null
    if (data.teamClasses != null && (data.teamClasses.length > 0)) {
        let classesStr = data.teamClasses.join("&7/&3")
        teamXpStr = `&7+&b${formatNumber(data.teamXp)} &3${classesStr} XP`
    }

    let extraStatsStr = `&7» &e&lExtra Stats &7«`
    let extraStatsData = "&cNot loaded!"
    if (data.totalDamage != null) {
        extraStatsData = `&a${formatNumber(data.totalDamage) ?? 0} &edamage\n`
        extraStatsData += `&a${formatNumber(data.allyHealing) ?? 0} &ehealing\n`
        extraStatsData += `&a${formatNumber(data.enemiesKilled) ?? 0} &e${(data.enemiesKilled == 1) ? "enemy" : "enemies"} killed\n`
        extraStatsData += `&c${formatNumber(data.deaths) ?? 0} &e${(data.deaths == 1) ? "death" : "deaths"} \n`
        extraStatsData += `&b${formatNumber(data.bits) ?? 0} &ebits gained`
    }
    let extraStatsMessage = new Message(
        new TextComponent(ChatLib.getCenteredText(extraStatsStr)).setHover("show_text", extraStatsData)
    ).setChatLineId(messageId.extraStats)

    let secretMessage = new Message(ChatLib.getCenteredText(secretStr))

    if (!shouldEditLast) {
        ChatLib.chat(chatBreak)
        ChatLib.chat(ChatLib.getCenteredText(title))
        ChatLib.chat("")
        ChatLib.chat(ChatLib.getCenteredText(bossStr))
        ChatLib.chat(ChatLib.getCenteredText(scoreStr))
        messageId.secrets = messageId.secrets + 1
        secretMessage.setChatLineId(messageId.secrets)
        ChatLib.chat(secretMessage)
        ChatLib.chat("")
        ChatLib.chat(ChatLib.getCenteredText(cataXpStr))
        if (classXpStr) ChatLib.chat((ChatLib.getCenteredText(classXpStr)))
        if (teamXpStr) ChatLib.chat(ChatLib.getCenteredText(teamXpStr))
        messageId.extraStats = messageId.extraStats + 1
        extraStatsMessage.setChatLineId(messageId.extraStats)
        ChatLib.chat("")
        ChatLib.chat(extraStatsMessage)
        ChatLib.chat(chatBreak)
        messageId.save()
    } else {
        ChatLib.editChat(messageId.secrets, secretMessage)
        ChatLib.editChat(messageId.extraStats, extraStatsMessage)
    }

    print(JSON.stringify(data, null, 4))
}

function scoreToGrade(score) {
    if (score >= 300) {
        return "&6&lS+"
    } else if (score >= 270) {
        return "&bS"
    } else if (score >= 230) {
        return "&aA"
    } else if (score >= 160) {
        return "&eB"
    } else if (score >= 100) {
        return "&cC"
    } else {
        return "&4D"
    }
}

function fetchTabInfo() {
    let names = TabList.getNames()
    data.totalSecretsFound = parseInt(ChatLib.removeFormatting(names[31]).slice(15)) ?? "?"
    let percentSecretsFound = parseFloat(ChatLib.removeFormatting(names[44]).slice(15, -1)) / 100
    data.totalSecrets = ((percentSecretsFound == 0) ? "?" : Math.round(data.totalSecretsFound / percentSecretsFound)) ?? "?"
}

function formatNumber(num) {
    let str = ""
    if (num == null) {
        return null
    } else if (Number.isInteger(num)) {
        str = num.toString()
    } else {
        str = num.toFixed(1).toString()
    }
    return str.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
}
