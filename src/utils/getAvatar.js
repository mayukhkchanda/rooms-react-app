import { createAvatar } from "@dicebear/avatars";
import * as style from "@dicebear/pixel-art";

export const getAvatarSvg = (seed) =>
  createAvatar(style, {
    seed,
    scale: 200,
  });
