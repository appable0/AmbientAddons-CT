# ~~AmbientAddons-CT~~
A collection of QOL features for Hypixel Skyblock in a ChatTriggers module, largely related to dungeons. 

## Discontinuation
**The ChatTriggers module has been discontinued. Further support and new features will continue for the Forge mod available at [appable0/AmbientAddons](https://github.com/appable0/AmbientAddons).**

### Commands
* /ambient: open main settings GUI
* /moveCat: move catplague's wonderful cat.
* /movePing: move the ping and TPS display.
* /amPing: Send current ping and TPS in chat.
<img src="https://user-images.githubusercontent.com/16139460/193432699-d2ec5ef0-c906-4542-b464-ac4a0c8aed39.png" width="300">

### Autobuy
Note that Autobuy comes with a number of profitable drops preconfigured. If you are ironman, please reconsider this list or leave the feature disabled.
* /autobuy list: show current autobuy list.
* /autobuy add <Skyblock ID> [Max price to buy at]: add an item to automatically purchase.
* /autobuy remove <Skyblock ID>: don't autobuy an item.
Default list:
<img src="https://user-images.githubusercontent.com/16139460/193432764-7507b65c-d78e-4ae5-8c98-25ea4b655c1e.png" width="400">

## Features
* Keybind to re-send last message in party chat. Unbound by default.
* Keybind to toggle perspective between first-person and third-person behind the player. Unbound by default.
* Bonzo and spirit mask timer: rendered as an item durability bar.
<img src="https://user-images.githubusercontent.com/16139460/193432138-0ffdfbc5-ef8d-4eb2-875a-32a0488d0b54.png" width="40">

### Displays
* Bonzo mask display: when wearing a procced bonzo mask.
* Cat display: draws catplague's wonderful cat upgrade.
* Ping and TPS display: A display of the current (estimated) ping and TPS, using the Skytils method of determining ping.
* Wither shield display: Draws the current time remaining with the wither shield ability below the crosshair.

### Dungeon features
* Terminator autoclick: Clicks repeatedly when use-item button is held while holding terminator. Adjustable from 0 to 50 CPS.
* Melody terminal helper: Blocks clicks on Melody terminal when not aligned.
* Melody terminal announcements: Customizable party chat message when Melody terminal is opened and/or throttled.
* Carpet QOL: Removes nearby carpets (credit UnclaimedBloom6).
* Auto-close chests: Blocks opening secret chests inside dungeons (credit Floppa Client).
* Ignore hopper interactions: Allows using items with abilities when looking at a hopper (credit Floppa Client). Disabled when on a private island.

### Dungeon highlights
All dungeon highlights can be off, highlight-only, or ESP.
* Bat highlight: shows secret bats, and optionally bats during thorn boss.
* Starred mob highlight: shows starred mobs.
* Shadow assassin highlight: highlights shadow assassins (as these are inconsistent with normal starred mob highlight).
* Bestiary highlight: shows Snipers and Cellar Spiders (longer-range than armor stand detection).

### Pre/Post dungeon features
* Automatically start dungeon: Can be enabled always, or only when 5 players are in dungeon.
* Chest QOL: opens chests with certain items automatically (with optional price threshold).
* Block kismets on bad chests: Prevents rerolling non-Bedrock chests (allows Obsidian chest on M4 only).
* Salvaging features: allows highlighting salvagable items, or automatically placing them in salvage menu (and optionally also clicking salvage button).
* Thunder bottle warning: Warns when starting a dungeon with a full thunder bottle in inventory.
* Custom end info: displays end info in a custom format, showing secrets obtained.
<img src="https://user-images.githubusercontent.com/16139460/193431973-70211649-ddb6-4687-8a20-2db48c8fc94a.png" width="400">

### Skills
* Smart crop misclick prevention: checks whether items has replenish (which works correctly with laggy servers and counter updating), and blocks only source mushrooms for the two common styles of mushroom farms.
* Highlight Thunder, Jawbus, and Sparks: highlights rare sea creatures in the Crimson Isles within render distance.
* Foraging QOL: prevent misclicks for island foraging (though legit island foraging is terrible: don't do this).
* Trapper auto-start quest: automatically starts trapper quests.
* Trapper ESP: Renders position of trapper mobs from reasonably large distance.
<img src="https://user-images.githubusercontent.com/16139460/193432076-da692f74-dcc5-4b6f-9604-f04ed03a2fcd.png" width="400">

## Notes
* The config folder is saved in the .minecraft config folder, unlike most ChatTriggers modules, so that updating manually is simple without resetting config.
* If you have used previous versions of AmbientAddons, the configuration was unfortunately reset because of a large number of breaking changes to the save files.

