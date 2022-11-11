/// <reference types="../../CTAutocomplete" />
/// <reference lib="es2015" />


// From UnclaimedBloom6, with *very slight* modifications 
// (make it symmetric and fix flickering)

import Settings from "../settings"
import Skyblock from "../utils/skyblock"

const BlockPoss = Java.type("net.minecraft.util.BlockPos")
const getDistance = (x1, y1, z1, x2, y2, z2) => (x2-x1)**2 + (y2-y1)**2 + (z2-z1)**2
const setAir = (x, y, z) => World.getWorld().func_175698_g(new BlockPoss(x, y, z))
const setBlockState = (x, y, z, state) => World.getWorld().func_175656_a(new BlockPoss(x, y, z), state)

let carpets = []
register("tick", () => {
    if (Settings.carpetQOL == 0) return
    if (Settings.carpetQOL == 2 && Skyblock.location != "Dungeon") return
    if (Settings.carpetQOL == 3 && (Skyblock.location != "Dungeon" || Skyblock.dungeonFloor == "F6" || Skyblock.dungeonFloor == "M6")) return

    for (let i = 0; i < carpets.length; i++) {
        let x = carpets[i][1]
        let y = carpets[i][2]
        let z = carpets[i][3]
        if (getDistance(Player.getX(), Player.getY(), Player.getZ(), x, y, z) >= 16) {
            setBlockState(x, y, z, carpets[i][0])
            carpets.splice(i, 1)
        }
    }

    pX = Math.floor(Player.getX() + 0.5)
    pY = Math.floor(Player.getY() + 0.5)
    pZ = Math.floor(Player.getZ() + 0.5)

    for (let x = pX-2; x <= pX+1; x++) {
        for (let y = pY-2; y <= pY+2; y++) {
            for (let z = pZ-2; z <= pZ+1; z++) {
                let block = World.getBlockAt(x, y, z)
                if (!block || block.type.getID() !== 171) continue
                carpets.push([block.getState(), x, y, z])
                setAir(x, y, z)
            }
        }
    }    
})
//
