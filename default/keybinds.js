/// <reference types="../../CTAutocomplete" />
/// <reference lib="es2015" />

/*
const thirdPersonKey = new KeyBind("Toggle between first- and third-person.", Keyboard.KEY_NONE, "AmbientAddons")
const secondPersonKey = new KeyBind("Toggle between first- and second-person.", Keyboard.KEY_NONE, "AmbientAddons")
const sendLastMessage = new KeyBind("Sends last message in party chat.", Keyboard.KEY_NONE, "AmbientAddons")

let lastMessageSent = null

register("messageSent", (message, event) => {
  if (message.startsWith("/pc")) {
    lastMessageSent = message.substring(4)
  } else if (!message.startsWith("/")) {
    lastMessageSent = message
  }
})

register("tick", () => {
  const thirdPersonPressed = thirdPersonKey.isPressed()
  if (thirdPersonPressed || secondPersonKey.isPressed()) {
    settings = Client.getMinecraft().field_71474_y // gameSettings
    if (settings.field_74320_O == 0) { // thirdPersonView
      settings.field_74320_O = thirdPersonPressed ? 1 : 2
    } else {
      settings.field_74320_O = 0
    }
  } 
  if (sendLastMessage.isPressed()) {
    if (lastMessageSent) {
      ChatLib.say(`/pc ${lastMessageSent}`)
    }
    
  }
}).setPriority(Priority.LOWEST)

*/