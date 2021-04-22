const inputManager = new InputManager();

// Test
inputManager.set("test:playSound", new Input(Input.keyDown(false, Keyboard.KEY_SPACE)));

// Player Controls
inputManager.set("player:up", new Input(Input.keyDown(false, Keyboard.KEY_W, Keyboard.KEY_UP)))
inputManager.set("player:down", new Input(Input.keyDown(false, Keyboard.KEY_S, Keyboard.KEY_DOWN)))
inputManager.set("player:left", new Input(Input.keyDown(false, Keyboard.KEY_A, Keyboard.KEY_LEFT)))
inputManager.set("player:right", new Input(Input.keyDown(false, Keyboard.KEY_D, Keyboard.KEY_RIGHT)))
inputManager.set("player:fire", new Input(Input.keyDown(false, Keyboard.KEY_SPACE)))