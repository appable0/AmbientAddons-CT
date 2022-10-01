/// <reference types="../../CTAutocomplete" />
/// <reference lib="es2015" />

const thirdPersonKey = new KeyBind("Toggle between first- and third-person.", Keyboard.KEY_NONE, "Perspective")
const secondPersonKey = new KeyBind("Toggle between first- and second-person.", Keyboard.KEY_NONE, "Perspective")

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
}).setPriority(Priority.LOWEST)