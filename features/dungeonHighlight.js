/// <reference types="../../CTAutocomplete" />
/// <reference lib="es2015" />

import Settings from "../settings"
import Skyblock from "../utils/skyblock"

const EntityArmorStand = Java.type("net.minecraft.entity.item.EntityArmorStand")
const EntityPlayer = Java.type("net.minecraft.entity.player.EntityPlayer")
const EntityWither = Java.type("net.minecraft.entity.boss.EntityWither")
const EntityCaveSpider = Java.type("net.minecraft.entity.monster.EntityCaveSpider")
const EntitySkeleton = Java.type("net.minecraft.entity.monster.EntitySkeleton")
const EntityBat = Java.type("net.minecraft.entity.passive.EntityBat")

let hasEnteredThorn = false

register("worldLoad", () => {
  hasEnteredThorn = false
})

register("chat", (event) => {
  hasEnteredThorn = true
}).setChatCriteria("[BOSS] Thorn: Welcome Adventurers! I am Thorn, the Spirit! And host of the Vegan Trials!")

register("renderEntity", (entity, position, ticks, event) => {
  if (Skyblock.location != "Dungeon") return
  let mcEntity = entity.entity

  if (mcEntity instanceof EntityArmorStand) {
    if ((Settings.starredHighlight == 0) || !entity.getName().includes("✯") || hasEnteredThorn) return
    let entityList = World.getWorld().func_72839_b(mcEntity, mcEntity.func_174813_aQ().func_72317_d(0, -1, 0))
    entityList.forEach((e) => {
      if (shouldDrawBox(e)) {
        let aabb = e.func_174813_aQ().func_72314_b(0, 0, 0)
        Skyblock.drawAABB(aabb, Settings.starredColor, Settings.starredHighlight == 2)
      }
    })
  } else {
    let aabb = mcEntity.func_174813_aQ().func_72314_b(0, 0, 0)
    if (!hasEnteredThorn && (Settings.bestiaryHighlight != 0) && mcEntity instanceof EntityCaveSpider) {
      Skyblock.drawAABB(aabb, Settings.bestiaryColor, Settings.bestiaryHighlight == 2)
    } else if (!hasEnteredThorn && (Settings.miniHighlight != 0) && mcEntity instanceof EntityPlayer) {
      let heldItem = mcEntity.func_70694_bm()
      if (heldItem != null && Skyblock.getSkyblockId(new Item(heldItem)) == "SILENT_DEATH") {
        Skyblock.drawAABB(aabb, Settings.miniColor, Settings.miniHighlight == 2)
      } else {
        let boots = mcEntity.func_82169_q(0)
        if (boots != null) {
          if (boots.func_77973_b()?.func_82814_b(boots) == 6029470) {
            Skyblock.drawAABB(aabb, Settings.miniColor, Settings.miniHighlight == 2)
          }
        }
      }
    } else if (!hasEnteredThorn && (Settings.bestiaryHighlight != 0) && mcEntity instanceof EntitySkeleton) {
      if (hasEnteredThorn) return
      let helmet = mcEntity.func_82169_q(3)
      if (helmet != null) {
        if (Skyblock.getSkyblockId(new Item(helmet)) == "SNIPER_HELMET") {
          Skyblock.drawAABB(aabb, Settings.bestiaryColor, Settings.bestiaryHighlight == 2)
        }
      }
    } else if ((Settings.batHighlight != 0) && mcEntity instanceof EntityBat && !mcEntity.field_70128_L) {
      let hp = mcEntity.func_110138_aP()
      if (!hasEnteredThorn && [100, 200, 400, 800].includes(hp)) {
        Skyblock.drawAABB(aabb, Settings.batColor, (Settings.batHighlight != 0))
      } else if (hasEnteredThorn && !mcEntity.func_82150_aj()) {
        Skyblock.drawAABB(aabb, Settings.batColor, (Settings.batHighlight != 0))
      }
    }
  }
})

function shouldDrawBox(mcEntity) {
  if (mcEntity instanceof EntityArmorStand) {
    return false
  } else if (mcEntity instanceof EntityPlayer) {
    return mcEntity != Client.getMinecraft().field_71439_g
  } else if (mcEntity instanceof EntityWither) {
    return false
  }
  return true
}

