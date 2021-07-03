const AWS_BUCKET = "http://3.15.27.56/assets";

export const icons = {
  // Coin
  coin: `${AWS_BUCKET}/coin.png`,

  // Game REWARDS
  midMushroom: `${AWS_BUCKET}/mid-mushroom.png`,
  redMushroom: `${AWS_BUCKET}/red-mushroom.png`,
  mushroomUp: `${AWS_BUCKET}/mushroom-up.png`,
  cherry: `${AWS_BUCKET}/cherry.png`,
  attendanceAnchor: `${AWS_BUCKET}/attendance-anchor.png`,

  // Game PENALTIES
  bomb: `${AWS_BUCKET}/bomb.png`,
  shell: `${AWS_BUCKET}/shell.png`,
  autobomb: `${AWS_BUCKET}/auto-bomb.png`,

  // Avatars
  mario: `${AWS_BUCKET}/mario.png`,
  superMario: `${AWS_BUCKET}/super-mario.png`,
  fireMario: `${AWS_BUCKET}/fire-mario.png`,
  capeMario: `${AWS_BUCKET}/cape-mario.png`,

  // Logo
  logo: `${AWS_BUCKET}/logo.png`,
};

export type IconTypes = keyof typeof icons;
