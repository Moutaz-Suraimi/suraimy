const sharp = require('sharp');
const fs = require('fs');

async function padImage(inputPath, outputPath, bg) {
  try {
    const metadata = await sharp(inputPath).metadata();
    const size = Math.max(metadata.width, metadata.height);
    const newSize = Math.floor(size * 1.5); // Add 50% padding (25% on each side)
    
    const xOffset = Math.floor((newSize - metadata.width) / 2);
    const yOffset = Math.floor((newSize - metadata.height) / 2);
    
    await sharp({
      create: {
        width: newSize,
        height: newSize,
        channels: 4,
        background: bg
      }
    })
    .composite([{ input: inputPath, top: yOffset, left: xOffset }])
    .png()
    .toFile(outputPath);
    
    console.log(`Successfully padded ${inputPath} to ${outputPath}`);
  } catch (error) {
    console.error(`Error processing ${inputPath}:`, error);
  }
}

async function main() {
  // Pad SURIIX logo
  await padImage(
    'C:\\Users\\ASUS\\Desktop\\SURIIX\\public\\img\\suriix2.png', 
    'C:\\Users\\ASUS\\Desktop\\SURIIX\\public\\img\\suriix2_padded.png', 
    { r: 0, g: 0, b: 0, alpha: 0 }
  );

  // Pad Tayebat logo
  await padImage(
    'C:\\Users\\ASUS\\Downloads\\nourish-thrive-main\\public\\tayebat.png', 
    'C:\\Users\\ASUS\\Downloads\\nourish-thrive-main\\public\\tayebat_padded.png', 
    { r: 255, g: 255, b: 255, alpha: 1 }
  );
}

main();
