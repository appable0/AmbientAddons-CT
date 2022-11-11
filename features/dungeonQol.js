/// <reference types="../../CTAutocomplete" />
/// <reference lib="es2015" />

import Settings from "../settings"
import Skyblock from "../utils/skyblock"

const MCBlocks = Java.type("net.minecraft.init.Blocks")
const SPacketOpenWindow = Java.type("net.minecraft.network.play.server.S2DPacketOpenWindow")
const CPacketCloseWindow = Java.type("net.minecraft.network.play.client.C0DPacketCloseWindow")

const Hopper = MCBlocks.field_150438_bZ

register("playerInteract", (action, position, event) => {
  if (!Settings.cancelHopperClicks) return
  if (event.action == InteractAction.RIGHT_CLICK_BLOCK) {
    let block = World.getBlockAt(new BlockPos(event.pos))
    if (block.type.mcBlock == Hopper && Skyblock.location != "Private Island") {
      cancel(event)
    }
  }
})

register("packetReceived", (packet, event) => {
  if (Skyblock.location != "Dungeon") return
  if (!Settings.autoCloseChests) return
  if (packet instanceof SPacketOpenWindow) {
    if (packet.func_179840_c().func_150260_c() == "Chest") {
      let windowId = packet.func_148901_c()
      let cancelPacket = new CPacketCloseWindow(windowId)
      cancel(event)
      Client.getMinecraft().func_147114_u().func_147298_b().func_179290_a(cancelPacket)
    }
  }
})
