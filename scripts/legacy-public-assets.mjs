// Keep these URLs available for an older installed web app. The current
// application loads smaller content-hashed files with the same visual data.
export const replacementImageFormats = {
  "assets/aion-pixel.png": "png",
  "assets/study-world.png": "webp",
};
export const legacyPublicImages = Object.keys(replacementImageFormats);
