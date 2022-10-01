/// <reference types="../CTAutocomplete" />

import Settings from "./settings"
const File = Java.type("java.io.File")

let configDirectory = new File("./config/AmbientAddons")

if (!configDirectory.exists()) {
  configDirectory.mkdir()
}

import "./utils/skyblock"
import "./default/bonzo"
import "./default/togglePerspective"
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





