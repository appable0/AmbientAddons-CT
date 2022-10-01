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
    category: "Dungeons",
    subcategory: "Thunder warning"
  })
  thunderNotification = false;

  @SwitchProperty({
    name: "Bonzo and spirit mask warning",
    description: "Overlay if bonzo or spirit mask is being worn after it has popped.",
    category: "Misc",
    subcategory: "Bonzo warning"
  })
  maskOverlay = false;

  @SelectorProperty({
    name: "Mask warning style",
    description: "Sets display style of mask warning",
    options: ["Default", "Shadow", "Outline"],
    category: "Misc",
    subcategory: "Bonzo warning"
  })
  maskDisplay = 2;

  @SwitchProperty({
    name: "Trapper ESP",
    description: "Highlights trapper quest mobs (longer-range than SBA, typically). Recommended to disable SBA trapper entity outline.",
    category: "Misc",
    subcategory: "Trevor the Trapper"
  })
  trapperQOL = false;

  @SwitchProperty({
    name: "Automatically accept Trapper quests",
    description: "Automatically accepts trapper quests, like auto-renew crystal hollows pass.",
    category: "Misc",
    subcategory: "Trevor the Trapper"
  })
  autoTrevor = false;

  @SwitchProperty({
    name: "Foraging QOL",
    description: "Prevents breaking repeaters and bonemealing dirt.",
    category: "Island",
    subcategory: "Foraging"
  })
  foragingQOL = false;

  @SwitchProperty({
    name: "Block stem misclicks",
    description: "Block misclicking stems and crops. Bypass by punching with fist.",
    category: "Island",
    subcategory: "Farming"
  })
  blockStemMisclicks = false;

  @SwitchProperty({
    name: "Cat",
    description: "draws cata69plague's wonderful cat, upgrade :D disabling is a crime, /movecat to move and scale",
    category: "Misc",
    subcategory: "Cat"
  })
  cat = true;

  @SwitchProperty({
    name: "Custom end info",
    description: "Modifies the dungeon end chat message: uses a more condensed layout with secrets found and extra stats.",
    category: "Dungeons",
    subcategory: "Custom End Info"
  })
  customEndInfo = true;

  @SwitchProperty({
    name: "Automatically start and ready dungeon",
    description: "Automatically starts and readies dungeon",
    category: "Dungeons",
    subcategory: "Autoready"
  })
  autoReady = false;

  @SwitchProperty({
    name: "Player count check",
    description: "If enabled, waits until 5 players are present before starting.",
    category: "Dungeons",
    subcategory: "Autoready"
  })
  autoReadyCheckFull = false;

  @SwitchProperty({
    name: "Terminator autoclick",
    description: "Autoclicks terminator when holding right click.",
    category: "Dungeons",
    subcategory: "Autoclick"
  })
  autoClick = false;

  @SliderProperty({
    name: "Autoclicker CPS",
    description: "Sets CPS of autoclicker, if enabled.",
    category: "Dungeons",
    subcategory: "Autoclick",
    min: 1,
    max: 30
  })
  autoClickCps = 10;

  @SwitchProperty({
    name: "Melody terminal helper",
    description: "Blocks misclicks on Melody/On Time terminal. Disables blocking temporarily if terminal throttles.",
    category: "Melody",
    subcategory: "Block misclicks"
  })
  melodyTerminal = false;

  @SwitchProperty({
    name: "Send message when melody terminal opened",
    description: "Sends a message in party chat when melody terminal is opened.",
    category: "Melody",
  })
  melodyNotification = false;

  @TextProperty({
    name: "Melody terminal message",
    description: "Message to send when melody terminal is opened.",
    category: "Melody",
    placeholder: "Meowlody on me!",
    triggerActionOnInitialization: false,
  })
  melodyNotificationMessage = "Meowlody on me!";

  @SwitchProperty({
    name: "Send message when terminal throttled",
    description: "Sends a message in party chat when a terminal is throttled.",
    category: "Melody",
  })
  throttleNotification = false;

  @TextProperty({
    name: "Throttled terminal message",
    description: "Message to send when a terminal is throttled.",
    category: "Melody",
    placeholder: "Hi! This is Hypixel Support. We noticed that your runs are actually efficient so we're throttling this menu. Enjoy slower runs, dipshit. Hope Goldor kills you. Meow.",
    triggerActionOnInitialization: false,
  })
  throttleNotificationMessage = "Hi! This is Hypixel Support. We noticed that your runs are actually efficient so we're throttling this menu. Enjoy slower runs, dipshit. Hope Goldor kills you. Meow.";

  @SwitchProperty({
    name: "Highlight salvageable items",
    description: "Highlights salvageable items.",
    category: "Salvaging"
  })
  salvageHighlight = true;

  @SwitchProperty({
    name: "Legit autosalvage",
    description: "Automatically moves items to salvage menu (still requires one click per item).",
    category: "Salvaging"
  })
  salvageAuto = false;

  @SwitchProperty({
    name: "Unlegit autosalvage",
    description: "Automatically salvages items in inventory.",
    category: "Salvaging"
  })
  salvageTrueAuto = false;

  @SwitchProperty({
    name: "Starred mob highlight",
    description: "Enable starred mob highlight",
    category: "Dungeon highlights",
    subcategory: "Starred Mob Highlight"
  })
  starredHighlight = false;

  @SwitchProperty({
    name: "Starred mob ESP",
    description: "Also highlight starred mobs through walls",
    category: "Dungeon highlights",
    subcategory: "Starred Mob Highlight"
  })
  starredEsp = false;

  @ColorProperty({
    name: "Starred mob highlight color",
    description: "Color of starred mob highlight",
    category: "Dungeon highlights",
    subcategory: "Starred Mob Highlight"
  })
  starredColor = Color.CYAN;

  @SwitchProperty({
    name: "Bestiary highlight",
    description: "Highlight snipers and cellar spiders",
    category: "Dungeon highlights",
    subcategory: "Bestiary Highlight"
  })
  bestiaryHighlight = false;

  @SwitchProperty({
    name: "Bestiary ESP",
    description: "Also highlight bestiary mobs through walls",
    category: "Dungeon highlights",
    subcategory: "Bestiary Highlight"
  })
  bestiaryEsp = false;

  @ColorProperty({
    name: "Bestiary highlight color",
    description: "Color of bestiary highlight",
    category: "Dungeon highlights",
    subcategory: "Bestiary Highlight"
  })
  bestiaryColor = Color.MAGENTA;

  @SwitchProperty({
    name: "Shadow assassin highlight",
    description: "Highlight shadow assassins in dungeons",
    category: "Dungeon highlights",
    subcategory: "Shadow Assassin Highlight"
  })
  miniHighlight = false;

  @SwitchProperty({
    name: "Shadow assassin ESP",
    description: "Also highlight shadow assassins through walls",
    category: "Dungeon highlights",
    subcategory: "Shadow Assassin Highlight"
  })
  miniEsp = false;

  @ColorProperty({
    name: "Shadow assassin highlight color",
    description: "Color of shadow assassin highlight",
    category: "Dungeon highlights",
    subcategory: "Shadow Assassin Highlight"
  })
  miniColor = Color.CYAN;

  @SwitchProperty({
    name: "Bat highlight",
    description: "Show bat secrets",
    category: "Dungeon highlights",
    subcategory: "Bat Highlight"
  })
  batHighlight = false;

  @SwitchProperty({
    name: "Bat ESP",
    description: "Also bat secrets through walls",
    category: "Dungeon highlights",
    subcategory: "Bat Highlight"
  })
  batEsp = false;

  @ColorProperty({
    name: "Bat highlight color",
    description: "Color of bat highlight",
    category: "Dungeon highlights",
    subcategory: "Bat Highlight"
  })
  batColor = Color.CYAN;



  @SelectorProperty({
    name: "Carpet QOL",
    description: "Hides carpets client-side to prevent lagback. Credit to UnclaimedBloom6.",
    category: "Dungeons",
    subcategory: "Dungeon QOL",
    options: ["Never", "Always", "Dungeons", "Dungeons except F6"],
  })
  carpetQOL = 1;

  @SwitchProperty({
    name: "Auto-close chests",
    description: "Automatically close chests inside dungeons. Credit to Floppa Client for concept and implementation.",
    category: "Dungeons",
    subcategory: "Dungeon QOL",
  })
  autoCloseChests = false;

  @SwitchProperty({
    name: "Ignore hopper interactions",
    description: "Don't interact with hoppers outside private island. Credit to Floppa Client for concept.",
    category: "Dungeons",
    subcategory: "Dungeon QOL",
  })
  cancelHopperClicks = false;

  @SwitchProperty({
    name: "Highlight Thunder, Sparks, and Jawbus",
    description: "Highlights rare sea creature locations, including through walls. Also highlights Thunder sparks.",
    category: "Misc",
    subcategory: "Fishing"
  })
  crimsonEsp = false;

  @SwitchProperty({
    name: "Block kismets on bad chests",
    description: "Blocks using kismets on chests that don't make sense to reroll.",
    category: "Dungeons",
    subcategory: "Chest QOL"
  })
  blockKismet = false;

  @SwitchProperty({
    name: "Auto-buy profitable chests",
    description: "Automatically purchases profitable chests. Use &b/autobuy&r to edit.",
    category: "Dungeons",
    subcategory: "Chest QOL"
  })
  autobuy = false;

  @SwitchProperty({
    name: "Wither shield overlay",
    description: "Shows time until wither shield expires over crosshair.",
    category: "Misc",
    subcategory: "Wither Shield"
  })
  shieldOverlay = false;

  @SelectorProperty({
    name: "Display style",
    description: "Sets display style of wither shield overlay",
    options: ["Default", "Shadow", "Outline"],
    category: "Misc",
    subcategory: "Wither Shield"
  })
  shieldDisplay = 2;

  @SwitchProperty({
    name: "Ping and TPS overlay",
    description: "Shows ping and TPS in overlay and enables ping command. &c/amPing &7to get ping; &c/movePing &7to move.",
    category: "Misc",
    subcategory: "Ping Display"
  })
  pingOverlay = false;

  @SelectorProperty({
    name: "Ping and TPS style",
    description: "Sets display style of ping and TPS display",
    options: ["None", "Default", "Shadow", "Outline"],
    category: "Misc",
    subcategory: "Ping Display"
  })
  pingDisplay = 3;

  constructor() {
    this.initialize(this);
  }
}

export default new Settings();
