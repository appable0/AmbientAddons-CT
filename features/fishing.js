/// <reference types="../../CTAutocomplete" />
/// <reference lib="es2015" />

import Settings from "../settings"
import Skyblock from "../utils/skyblock"

EntityIronGolem = Java.type("net.minecraft.entity.monster.EntityIronGolem")
EntityGuardian = Java.type("net.minecraft.entity.monster.EntityGuardian")
EntityArmorStand = Java.type("net.minecraft.entity.item.EntityArmorStand")
ItemSkull = Java.type("net.minecraft.item.ItemSkull")

const sparkTexture = "ewogICJ0aW1lc3RhbXAiIDogMTY0MzUwNDM3MjI1NiwKICAicHJvZmlsZUlkIiA6ICI2MzMyMDgwZTY3YTI0Y2MxYjE3ZGJhNzZmM2MwMGYxZCIsCiAgInByb2ZpbGVOYW1lIiA6ICJUZWFtSHlkcmEiLAogICJzaWduYXR1cmVSZXF1aXJlZCIgOiB0cnVlLAogICJ0ZXh0dXJlcyIgOiB7CiAgICAiU0tJTiIgOiB7CiAgICAgICJ1cmwiIDogImh0dHA6Ly90ZXh0dXJlcy5taW5lY3JhZnQubmV0L3RleHR1cmUvN2IzMzI4ZDNlOWQ3MTA0MjAzMjI1NTViMTcyMzkzMDdmMTIyNzBhZGY4MWJmNjNhZmM1MGZhYTA0YjVjMDZlMSIsCiAgICAgICJtZXRhZGF0YSIgOiB7CiAgICAgICAgIm1vZGVsIiA6ICJzbGltIgogICAgICB9CiAgICB9CiAgfQp9"

function isSpark(mcEntity) {
    if (mcEntity instanceof EntityArmorStand) {
        let itemStack = mcEntity.func_70694_bm()
        if (itemStack != null) {
            let mcItem = itemStack.func_77973_b()
            if (mcItem instanceof ItemSkull) {
                let item = new Item(itemStack)
                let texture = item
                    ?.getNBT()
                    ?.getCompoundTag("tag")
                    ?.getCompoundTag("SkullOwner")
                    ?.getCompoundTag("Properties")
                    ?.getTagList("textures", 10)
                    ?.func_150305_b(0)
                    ?.func_74779_i("Value")
                return sparkTexture === texture
            }
        }
    } 
    return false
}

const yellow = Java.type("java.awt.Color").YELLOW

register("renderEntity", (entity, position, ticks, number, event) => {
    if (Skyblock.location != "Crimson Isle") return
    if (!Settings.crimsonEsp) return

    let mcEntity = entity.entity
    if (mcEntity instanceof EntityIronGolem || mcEntity instanceof EntityGuardian) {
        let aabb = mcEntity.func_174813_aQ().func_72314_b(0.1, 0, 0.1)
        Skyblock.drawAABB(aabb, Settings.starredColor, true)
    } else if (isSpark(mcEntity)) {
        let aabb = mcEntity.func_174813_aQ().func_72317_d(-0.2, -0.5, -0.1).func_72314_b(-0.1, -0.85, -0.1)
        Skyblock.drawAABB(aabb, yellow, true)
    }
})
