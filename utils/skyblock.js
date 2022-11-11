/// <reference types="../../CTAutocomplete" />
/// <reference lib="es2015" />

export default class Skyblock {
    location = null
    dungeonFloor = null

    static getSkyblockId(item) {
        return item?.getNBT()?.get("tag")?.get("ExtraAttributes")?.getString("id")
    }

    static getEnchantment(item) {
        let enchant = item?.getNBT()?.get("tag")?.get("ExtraAttributes").getCompoundTag("enchantments").toObject()
        let [enchantment, level] = Object.entries(enchant)[0]
        return enchantment.toUpperCase() + "_" + level
    }

    static drawStringWithOutline(str, x, y) {
        let reset = "&r" + str
        let raw = ChatLib.addColor(reset.replace(/[\u00a7&][0-9a-f]/, ""))
        let colored = ChatLib.addColor(reset)
        let fr = Renderer.getFontRenderer()
        fr.func_78276_b(raw, x-1, y, Renderer.BLACK)
        fr.func_78276_b(raw, x+1, y, Renderer.BLACK)
        fr.func_78276_b(raw, x, y-1, Renderer.BLACK)
        fr.func_78276_b(raw, x, y+1, Renderer.BLACK)
        fr.func_78276_b(colored, x, y, Renderer.WHITE)
    }

    static drawAABB(aabb, color, esp) {
        let r = color.getRed() / 255
        let g = color.getGreen() / 255
        let b = color.getBlue() / 255
        let a = color.getAlpha() / 255

        let minX = aabb.field_72340_a
        let minY = aabb.field_72338_b
        let minZ = aabb.field_72339_c
        let maxX = aabb.field_72336_d
        let maxY = aabb.field_72337_e
        let maxZ = aabb.field_72334_f
    
        let edges = [
            [[minX, minY, minZ], [minX, minY, maxZ]],
            [[minX, minY, minZ], [minX, maxY, minZ]],
            [[minX, minY, minZ], [maxX, minY, minZ]],
            [[maxX, maxY, maxZ], [minX, maxY, maxZ]],
            [[maxX, maxY, maxZ], [maxX, minY, maxZ]],
            [[maxX, maxY, maxZ], [maxX, maxY, minZ]],
            [[minX, maxY, minZ], [maxX, maxY, minZ]],
            [[minX, maxY, minZ], [minX, maxY, maxZ]],
            [[maxX, minY, maxZ], [minX, minY, maxZ]],
            [[maxX, minY, maxZ], [maxX, minY, minZ]],
            [[minX, minY, maxZ], [minX, maxY, maxZ]],
            [[maxX, minY, minZ], [maxX, maxY, minZ]]
        ]
        
        Tessellator.pushMatrix()
        GL11.glLineWidth(2)
        GL11.glEnable(GL11.GL_LINE_SMOOTH)
        GlStateManager.func_179090_x() // disableTexture2D
        GlStateManager.func_179147_l() // enableBlend
        GlStateManager.func_179140_f() // disableLighting
        GlStateManager.func_179120_a(770, 771, 0, 1); // blendFunc
        
        GlStateManager.func_179132_a(false); // depthMask
    
        if (esp) {
            Tessellator.disableDepth()
        }
    
        for (let edge of edges) {
            Tessellator.begin(3).colorize(r, g, b, a)
            Tessellator.pos(edge[0][0], edge[0][1], edge[0][2]).tex(0, 0)
            Tessellator.pos(edge[1][0], edge[1][1], edge[1][2]).tex(0, 0)
            Tessellator.draw()
        }
        
        if (esp) {
            Tessellator.enableDepth()
        }
        
        GlStateManager.func_179084_k(); // disableBlend
        GlStateManager.func_179132_a(true); // depthMask
        GlStateManager.func_179145_e()
        GlStateManager.func_179098_w(); // enableTexture2D
        Tessellator.popMatrix()
    }
}


register("step", (elapsed) => {
    try {
        let names = TabList?.getNames()
        let areaStr = names?.filter((str) => (str.includes("Area:")))
        if (areaStr && areaStr[0]) {
            Skyblock.location = ChatLib.removeFormatting(areaStr[0]).substring(6)
        } else if (names.some((str) => str.includes("Dungeon:"))) {
            Skyblock.location = "Dungeon"
        }
    } catch (e) {
        return
    }
    
}).setDelay(1)

register("worldLoad", () => {
    location = null
    dungeonFloor = null
    updateDungeonInformation()
})

register("chat", (...args) => {
    updateDungeonInformation()
}).setChatCriteria("Dungeon starts in 1 second.")

function updateDungeonInformation() {
    const lines = Scoreboard?.getLines(false)
    if (!lines) return
    for (let line of lines) {
        string = line.getName()
        if (string.includes("combs")) {
            Skyblock.dungeonFloor = string.substring(28, 30)
            return
        }
    } 
}
