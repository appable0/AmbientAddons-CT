/// <reference types="../../CTAutocomplete" />
/// <reference lib="es2015" />

import Settings from "../settings"
import renderBeaconBeam from "../../BeaconBeam"
import Skyblock from "../utils/skyblock"

const EntitySheep = Java.type("net.minecraft.entity.passive.EntitySheep")
const EntityPig = Java.type("net.minecraft.entity.passive.EntityPig")
const EntityCow = Java.type("net.minecraft.entity.passive.EntityCow")
const EntityChicken = Java.type("net.minecraft.entity.passive.EntityChicken")
const EntityRabbit = Java.type("net.minecraft.entity.passive.EntityRabbit")

const Animals = [EntitySheep, EntityPig, EntityCow, EntityChicken, EntityRabbit]
const Color = Java.type("java.awt.Color")
const trapperRegex = /^&e\[NPC\] Trevor The Trapper&f: &rYou can find your &([0-9a-f])\w+ &fanimal near the &([0-9a-f])([\w ]+)&f.&r/

let isQuestActive = false
let color = null

register("worldUnload", () => {
    isQuestActive = false
    color = null
})

const isTrapperAnimal = (entity) => {
    return entity.field_70173_aa > 10
        && Animals.some((AnimalClass) => entity instanceof AnimalClass) 
        && [100, 500, 1000, 1024].includes(entity.func_110138_aP())
} 

register("chat", (event) => {
    if (Skyblock.location != "The Farming Islands") return
    if (Settings.autoTrevor) {
        let components = EventLib.getMessage(event).func_150253_a()
        if (components && components[0]) {
            let firstSiblingText = components[0].getText()
            if (firstSiblingText === "Accept the trapper's task to hunt the animal?") {
                let command = new TextComponent(components[3]).getClickValue().substring(1)
                ChatLib.command(command, false)
            }
        }
    }
    let message = ChatLib.getChatMessage(event, true)
    let trapperMatch = message.match(trapperRegex)

    if (trapperMatch) {
        isQuestActive = true
        let colorCode = Client.getMinecraft().func_175598_ae().func_78716_a().func_175064_b(trapperMatch[1])
        color = new Color(colorCode)
    } else {
        let unformatted = ChatLib.removeFormatting(message)
        if (
            unformatted.startsWith("Killing the animal rewarded you ") 
                || unformatted.startsWith("Your mob died randomly, you are rewarded ")
            ) {
            isQuestActive = false
        }
    }
})

register("renderWorld", (ticks) => {
    if (!Settings.trapperQOL) return
    if (Skyblock.location != "The Farming Islands") return
    if (!isQuestActive) return
    World.getAllEntities().forEach(entity => {
        if (isTrapperAnimal(entity.entity)) {
            if (!color) return
            Skyblock.drawAABB(entity.entity.func_174813_aQ(), color, true)
            let renderX = entity.getRenderX() - 0.5
            let renderY = entity.getRenderY() + entity.getHeight()
            let renderZ = entity.getRenderZ() - 0.5
            renderBeaconBeam(renderX, renderY, renderZ, color.getRed() / 255, color.getGreen() / 255, color.getBlue() / 255, 1, false)
        }
    })
})

