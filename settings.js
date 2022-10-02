// config.js
import { 
    @Vigilant,
@TextProperty,
@ColorProperty,
@ButtonProperty,
@SwitchProperty,
@SelectorProperty,
@SliderProperty,
Color
} from "Vigilance";

@Vigilant("../../AmbientAddons")
class Settings {

  @SwitchProperty({
    name: "Thunder bottle dungeon warning",
    description: "Displays warning when entering dungeon with fully charged bottle.",
    category: "Pre/Post Dungeon",
    subcategory: "Thunder warning"
  })
  thunderNotification = false;

  @SelectorProperty({
    name: "Mask warning style",
    description: "Overlay if bonzo mask is being worn after it has popped.",
    options: ["Off", "Default", "Shadow", "Outline"],
    category: "Displays",
    subcategory: "Bonzo"
  })
  maskDisplay = 0;

  @SwitchProperty({
    name: "Trapper ESP",
    description: "Highlights trapper quest mobs (longer-range than SBA, typically). Recommended to disable SBA trapper entity outline.",
    category: "Skills",
    subcategory: "Trevor the Trapper"
  })
  trapperQOL = false;

  @SwitchProperty({
    name: "Automatically accept Trapper quests",
    description: "Automatically accepts trapper quests, like auto-renew crystal hollows pass.",
    category: "Skills",
    subcategory: "Trevor the Trapper"
  })
  autoTrevor = false;

  @SwitchProperty({
    name: "Foraging QOL",
    description: "Prevents breaking repeaters and bonemealing dirt.",
    category: "Skills",
    subcategory: "Foraging"
  })
  foragingQOL = false;

  @SwitchProperty({
    name: "Block stem misclicks",
    description: "Intelligent block misclicks for stems and crops. Bypass by punching with fist.",
    category: "Skills",
    subcategory: "Farming"
  })
  blockStemMisclicks = false;

  @SwitchProperty({
    name: "Cat",
    description: "draws cata69plague's wonderful cat, upgrade :D disabling is a crime, /movecat to move and scale",
    category: "Displays",
    subcategory: "Cat"
  })
  cat = true;

  @SwitchProperty({
    name: "Custom end info",
    description: "Modifies the dungeon end chat message: uses a more condensed layout with secrets found and extra stats.",
    category: "Pre/Post Dungeon",
    subcategory: "Custom End Info"
  })
  customEndInfo = true;

  @SelectorProperty({
    name: "Automatically start and ready dungeon",
    description: "Automatically starts and readies dungeon",
    category: "Pre/Post Dungeon",
    subcategory: "Autoready",
    options: ["Off", "Always", "5 Players"]
  })
  autoReady = 0;

  @SwitchProperty({
    name: "Terminator autoclick",
    description: "Autoclicks terminator when holding right click.",
    category: "Dungeon",
    subcategory: "Autoclick"
  })
  autoClick = false;

  @SliderProperty({
    name: "Autoclicker CPS",
    description: "Sets CPS of autoclicker, if enabled.",
    category: "Dungeon",
    subcategory: "Autoclick",
    min: 1,
    max: 50
  })
  autoClickCps = 10;

  @SwitchProperty({
    name: "Melody terminal helper",
    description: "Blocks misclicks on Melody/On Time terminal. Disables blocking temporarily if terminal throttles.",
    category: "Dungeon",
    subcategory: "Melody"
  })
  melodyTerminal = false;

  @SwitchProperty({
    name: "Spirit bow break timer",
    description: "Displays a timer that tells the player when the spirit bow will break in Floor 4. &c/movethorn&7 to move.",
    category: "Dungeon",
    subcategory: "Miscellaneous",
  })
  spiritBow = false;

  @SwitchProperty({
    name: "Send message when melody terminal opened",
    description: "Sends a message in party chat when melody terminal is opened.",
    category: "Dungeon",
    subcategory: "Melody"
  })
  melodyNotification = false;

  @TextProperty({
    name: "Melody terminal message",
    description: "Message to send when melody terminal is opened.",
    category: "Dungeon",
    subcategory: "Melody",
    placeholder: "Meowlody on me!",
    triggerActionOnInitialization: false,
  })
  melodyNotificationMessage = "Meowlody on me!";

  @SwitchProperty({
    name: "Send message when terminal throttled",
    description: "Sends a message in party chat when a terminal is throttled.",
    category: "Dungeon",
    subcategory: "Melody"
  })
  throttleNotification = false;

  @TextProperty({
    name: "Throttled terminal message",
    description: "Message to send when a terminal is throttled.",
    category: "Dungeon",
    subcategory: "Melody",
    placeholder: "Hi! This is Hypixel Support. We noticed that your runs are actually efficient so we're throttling this menu. Enjoy slower runs, dipshit. Hope Goldor kills you. Meow.",
    triggerActionOnInitialization: false,
  })
  throttleNotificationMessage = "Hi! This is Hypixel Support. We noticed that your runs are actually efficient so we're throttling this menu. Enjoy slower runs, dipshit. Hope Goldor kills you. Meow.";

  @SelectorProperty({
    name: "Salvaging features",
    description: "Enable various salvaging features. Legit autosalvage automatically moves items into salvaging menu; full autosalvage also clicks salvage button.",
    category: "Pre/Post Dungeon",
    subcategory: "Salvaging",
    options: ["Off", "Highlight", "Legit", "Autosalvage"]
  })
  autoSalvage = 0;

  @SelectorProperty({
    name: "Starred mob highlight",
    description: "Enable starred mob highlight",
    category: "Dungeon Highlights",
    subcategory: "Starred Mob Highlight",
    options: ["Off", "Highlight", "ESP"]
  })
  starredHighlight = 0;

  @ColorProperty({
    name: "Starred mob highlight color",
    description: "Color of starred mob highlight",
    category: "Dungeon Highlights",
    subcategory: "Starred Mob Highlight"
  })
  starredColor = Color.CYAN;

  @SelectorProperty({
    name: "Bestiary highlight",
    description: "Highlight snipers and cellar spiders",
    category: "Dungeon Highlights",
    subcategory: "Bestiary Highlight",
    options: ["Off", "Highlight", "ESP"]
  })
  bestiaryHighlight = 0;

  @ColorProperty({
    name: "Bestiary highlight color",
    description: "Color of bestiary highlight",
    category: "Dungeon Highlights",
    subcategory: "Bestiary Highlight"
  })
  bestiaryColor = Color.MAGENTA;

  @SelectorProperty({
    name: "Shadow assassin highlight",
    description: "Highlight shadow assassins in dungeons",
    category: "Dungeon Highlights",
    subcategory: "Shadow Assassin Highlight",
    options: ["Off", "Highlight", "ESP"]
  })
  miniHighlight = 0;

  @ColorProperty({
    name: "Shadow assassin highlight color",
    description: "Color of shadow assassin highlight",
    category: "Dungeon Highlights",
    subcategory: "Shadow Assassin Highlight"
  })
  miniColor = Color.CYAN;

  @SelectorProperty({
    name: "Bat highlight",
    description: "Show bat secrets",
    category: "Dungeon Highlights",
    subcategory: "Bat Highlight",
    options: ["Off", "Highlight", "ESP"]
  })
  batHighlight = 0;

  @SwitchProperty({
    name: "Show bat in thorn",
    description: "Also highlight bats in thorn",
    category: "Dungeon Highlights",
    subcategory: "Bat Highlight"
  })
  showBatInThorn = false;

  @ColorProperty({
    name: "Bat highlight color",
    description: "Color of bat highlight",
    category: "Dungeon Highlights",
    subcategory: "Bat Highlight"
  })
  batColor = Color.CYAN;

  @SelectorProperty({
    name: "Carpet QOL",
    description: "Hides carpets client-side to prevent lagback. Credit to UnclaimedBloom6.",
    category: "Dungeon",
    subcategory: "Miscellaneous",
    options: ["Never", "Always", "Dungeons", "Dungeons except F6"],
  })
  carpetQOL = 0;

  @SwitchProperty({
    name: "Auto-close chests",
    description: "Automatically close chests inside dungeons. Credit to Floppa Client for concept and implementation.",
    category: "Dungeon",
    subcategory: "Miscellaneous",
  })
  autoCloseChests = false;

  @SwitchProperty({
    name: "Ignore hopper interactions",
    description: "Don't interact with hoppers outside private island. Credit to Floppa Client for concept.",
    category: "Dungeon",
    subcategory: "Miscellaneous",
  })
  cancelHopperClicks = false;

  @SwitchProperty({
    name: "Highlight Thunder, Sparks, and Jawbus",
    description: "Highlights rare sea creature locations, including through walls. Also highlights Thunder sparks.",
    category: "Skills",
    subcategory: "Fishing"
  })
  crimsonEsp = false;

  @SwitchProperty({
    name: "Block kismets on bad chests",
    description: "Blocks using kismets on chests that don't make sense to reroll.",
    category: "Pre/Post Dungeon",
    subcategory: "Chest QOL"
  })
  blockKismet = false;

  @SwitchProperty({
    name: "Auto-buy profitable chests",
    description: "Automatically purchases profitable chests. Use &b/autobuy&r to edit.",
    category: "Pre/Post Dungeon",
    subcategory: "Chest QOL"
  })
  autobuy = false;

  @SelectorProperty({
    name: "Display style",
    description: "Sets display style of wither shield overlay",
    options: ["Off", "Default", "Shadow", "Outline"],
    category: "Displays",
    subcategory: "Wither Shield"
  })
  shieldDisplay = 0;

  @SelectorProperty({
    name: "Ping and TPS style",
    description: "Shows ping and TPS in overlay and enables ping command. &c/amPing &7to get ping; &c/movePing &7to move.",
    options: ["None", "Command Only", "Default", "Shadow", "Outline"],
    category: "Displays",
    subcategory: "Ping Display"
  })
  pingDisplay = 0;

  constructor() {
    this.initialize(this);
  }
}

export default new Settings();
