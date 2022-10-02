/// <reference types="../CTAutocomplete" />
const File = Java.type("java.io.File")

let configDirectory = new File("./config/AmbientAddons")

if (!configDirectory.exists()) {
  configDirectory.mkdir()
}

import PogObject from "../PogData/index"
const loadingData = new PogObject("../../AmbientAddons", { firstTime: true }, "firstTime.json")
let steps = 0

if (loadingData.firstTime) {
  FileLib.delete("./config/AmbientAddons/config.toml")
  let oneTimeTrigger = register("step", (elapsed) => {
    if (steps > 0) {
      oneTimeTrigger.unregister()
      loadingData.firstTime = false
      loadingData.save()
    } else {
      ChatLib.chat(`§9§m${ChatLib.getChatBreak()}`)
      ChatLib.chat("§b§lThanks for installing AmbientAddons!")
      ChatLib.chat("")
      ChatLib.chat("§aUse §l/ambient §r§ato access the GUI.")
      ChatLib.chat("")
      ChatLib.chat("§e§oIf you previously used this mod, the config data has been reset")
      ChatLib.chat("§e§odue to internal changes. Sorry for the inconvinience.")
      ChatLib.chat(`§9§m${ChatLib.getChatBreak()}`)
    }
    steps++
  }).setDelay(1)
  
}

import Settings from "./settings"

import "./utils/skyblock"
import "./default/bonzo"
import "./default/keybinds"
import "./features/dungeonQol"
import "./features/carpet"
import "./features/dungeonHighlight"
import "./features/salvage"
import "./features/chest"
import "./features/shield"
import "./features/fishing"
import "./features/ontime"
import "./features/autoready"
import "./features/clicker"
import "./features/ping"
import "./features/customEndInfo"
import "./features/cat"
import "./features/foraging"
import "./features/farming"
import "./features/spiritBow"
import "./features/trapper"
import "./features/thunder"

register("command", (...args) => {
  let mode = args[0]
  if (mode == null) {
    Settings.openGUI()
  }
}).setCommandName("ambient")





