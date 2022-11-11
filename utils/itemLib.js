/// <reference types="../../CTAutocomplete" />
/// <reference lib="es2015" />

const getItemZLevel = () => Client.getMinecraft().func_175599_af().field_77023_b

export default class ItemLib {
    /**
     * Run callback function with managed state (z-level and GLStateManager settings).
     * 
     * @param {() => void} cb callback to render at a certain z level
     * @param {number?} z the z-level to render (defaults to itemOverlay layer)
     */
    static renderOnItem(cb, z = getItemZLevel() + 190) {
        Renderer.translate(0, 0, z)
        Tessellator.disableLighting()
        Tessellator.disableDepth()
        Tessellator.disableTexture2D()
        Tessellator.disableAlpha()
        Tessellator.disableBlend()
        Renderer.retainTransforms(true)
        cb()
        Renderer.retainTransforms(false)
        Tessellator.enableAlpha()
        Tessellator.enableTexture2D()
        Tessellator.enableDepth()
        Tessellator.enableLighting()
    }

    /**
     * Render arbitrary text in the vanilla item stack size format.
     * * x and y coordinates are typically from renderItemOverlayIntoGui trigger
     * * text should not be more than 3 characters for good results
     * 
     * @param {string} overlayText the string to render
     * @param {number?} x the x coordinate of the item
     * @param {number?} x the y coordinate of the item
     * @author Mojang
     */
    static renderItemStackSize(overlayText, x, y) {
        ItemLib.renderOnItem(() => {
            Renderer.drawStringWithShadow(overlayText, x + 17 - Renderer.getStringWidth(overlayText), y + 9)
        })
    }

    /**
     * Render item "durability" using the vanilla item durability display.
     * * x and y coordinates are typically from renderItemOverlayIntoGui trigger
     * 
     * @param {number} durability between 0 (no durability) and 1 (max durability)
     * @param {number?} x the x coordinate of the item
     * @param {number?} x the y coordinate of the item
     * @author Mojang
     */
    static renderItemDurability(durability, x, y) {
        ItemLib.renderOnItem(() => {
            let dmg = MathLib.clampFloat(durability, 0, 1)
            let barWidth = Math.round(13 * dmg)
            let barColorIdx = Math.round(255 * dmg)
    
            let bgColor = Renderer.color((255 - barColorIdx) / 4, 64, 0)
            let barColor = Renderer.color(255 - barColorIdx, barColorIdx, 0)
    
            Renderer.drawRect(Renderer.BLACK, x + 2, y + 13, 13, 2)
            Renderer.drawRect(bgColor, x + 2, y + 13, 12, 1)
            Renderer.drawRect(barColor, x + 2, y + 13, barWidth, 1)
        })
    }
}
