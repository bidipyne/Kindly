export function getRandomMediumDarkColor() {
  const minBrightness = 40; // Minimum brightness value (0 to 255)
  const maxBrightness = 160; // Maximum brightness value (0 to 255)

  const randomBrightness = Math.floor(Math.random() * (maxBrightness - minBrightness + 1)) + minBrightness;
  const randomColor = Math.floor(Math.random()*16777215).toString(16); // Generate a random hex color

  const hexColor = `#${randomColor}`;
  return hexColor;
}
