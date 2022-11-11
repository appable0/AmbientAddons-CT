/// <reference types="../../CTAutocomplete" />
/// <reference lib="es2015" />

import Settings from "../settings"
import Skyblock from "../utils/skyblock"
import PogObject from "../../PogData/index"


let averageTps = 20
const tpsWindow = 10
let tpsSampleCount = 0

const S03_PACKET_TIME_UPDATE = Java.type("net.minecraft.network.play.server.S03PacketTimeUpdate")
const pingMove = new Gui()
let prevTime = null

const data = new PogObject("../../AmbientAddons", {
  pingX: 10,
  pingY: 10
}, "ping.json")

register("dragged", (dx, dy, x, y) => {
  if (pingMove.isOpen()) {
    data.pingX = x
    data.pingY = y
    data.save()
  }
})

function drawString(text, x, y) {
  switch (Settings.pingDisplay) {
    case 1:
      break
    case 2:
      Renderer.drawString(text, x, y)
      break
    case 3:
      Renderer.drawStringWithShadow(text, x, y)
      break
    case 4:
      Skyblock.drawStringWithOutline(text, x, y)
  }
}

function colorizeTps(tps) {
  if (tps > 19) {
    return "&a"
  } else if (tps > 18) {
    return "&2"
  } else if (tps > 17) {
    return "&e"
  } else if (tps > 15) {
    return "&6"
  } else {
    return "&c"
  }
}

function colorizePing(ping) {
  if (ping < 50) {
    return "&a"
  } else if (ping < 100) {
    return "&2"
  } else if (ping < 150) {
    return "&e"
  } else if (ping < 250) {
    return "&6"
  } else {
    return "&c"
  }
}

register("worldLoad", () => {
  prevTime = null
  tpsSampleCount = 0
  pingSampleCount = 0
  averageTps = 20
  averagePing = 0
})

register("packetReceived", (packet, event) => {
  if (packet instanceof S03_PACKET_TIME_UPDATE) {
    if (prevTime !== null) {
      let time = Date.now() - prevTime
      let instantTps = MathLib.clampFloat(20000 / time, 0, 20)
      tpsSampleCount++
      let alpha = 2 / (tpsWindow + 1)
      averageTps = instantTps * alpha + averageTps * (1 - alpha)
    }
    prevTime = Date.now()
  }
})

const C16PacketClientStatus = Java.type("net.minecraft.network.play.client.C16PacketClientStatus")
const S37PacketStatistics = Java.type("net.minecraft.network.play.server.S37PacketStatistics")
const S01PacketJoinGame = Java.type("net.minecraft.network.play.server.S01PacketJoinGame")
const System = Java.type("java.lang.System")

let pingStartTime = 0
let isPinging = false
let pingSampleCount = 0
let averagePing = 0
let instantPing = 0
const pingWindow = 5

register("command", () => {
  if (Settings.pingDisplay <= 1) {
    ChatLib.chat(`&9&lAmbient &7» &cFeature disabled; open settings to enable!`)
  }
  pingMove.open()
}).setCommandName("movePing")

register("command", () => {
  if (Settings.pingDisplay == 0) {
    ChatLib.chat(`&9&lAmbient &7» &cFeature disabled; open settings to enable!`)
    return
  }
  ChatLib.chat(`&9&lAmbient &7» ${colorizePing(instantPing)}${instantPing.toFixed(1)}&7 ms (${colorizeTps(averageTps)}${averageTps.toFixed(1)}&7 tps)`)
}).setCommandName("amping")

register("step", () => {
  if (Settings.pingDisplay == 0) return
  sendPing(false)
}).setDelay(2)


function sendPing(fromCommand) {
  if (isPinging) {
    if (fromCommand) {
      ChatLib.chat("&cAlready pinging!")
    }
  } else {
    let packet = new C16PacketClientStatus(C16PacketClientStatus.EnumState.REQUEST_STATS)
    pingStartTime = System.nanoTime()
    isPinging = true
    Client.sendPacket(packet)
  }
}

register("packetReceived", (packet, event) => {
  if (Settings.pingDisplay == 0) return
  if (packet instanceof S37PacketStatistics) {
    isPinging = false
    instantPing = (System.nanoTime() - pingStartTime) / 1e6
    pingSampleCount++
    let alpha = 2 / (pingWindow + 1)
    averagePing = instantPing * alpha + averagePing * (1 - alpha)

  } else if (packet instanceof S01PacketJoinGame) {
    isPinging = false
    instantPing = 0
    pingSampleCount = 0
    averagePing = 0
  }
})


register("renderOverlay", (event) => {
  if (Settings.pingDisplay == 0) return
  let tpsName = "&bTPS:"
  let tpsValue = `${colorizeTps(averageTps)}${averageTps.toFixed(1)}`
  let pingName = "&bPing:"
  let pingValue = `${colorizePing(averagePing)}${averagePing.toFixed(1)}`

  let tpsWidth = Renderer.getStringWidth(tpsValue)
  let pingWidth = Renderer.getStringWidth(pingValue)

  drawString(tpsValue, data.pingX + 53 - tpsWidth, data.pingY + 10, 2)
  drawString(pingValue, data.pingX + 53 - pingWidth, data.pingY, 2)

  drawString(tpsName, data.pingX, data.pingY + 10, 2)
  drawString(pingName, data.pingX, data.pingY, 2)
})


