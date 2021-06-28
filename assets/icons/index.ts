export const icons = {
  // Coin
  coin: require("./coin.png"),

  // Game Elements
  shell: require("./shell.png"),
  bomb: require("./bomb.png"),
  midMushroom: require("./mid-mushroom.png"),
  redMushroom: require("./red-mushroom.png"),
  mushroomUp: require("./mushroom-up.png"),
  cherry: require("./cherry.png"),
  attendanceAnchor: require("./attendance-anchor.png"),

  // Avatars
  mario: require("./mario.png"),
  superMario: require("./super-mario.png"),
  fireMario: require("./fire-mario.png"),
  capeMario: require("./cape-mario.png"),

  // Logo
  logo: require("./logo.png"),
};

export type IconTypes = keyof typeof icons;
