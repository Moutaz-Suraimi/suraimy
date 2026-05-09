const sharp = require('sharp');
const fs = require('fs');

async function processImage() {
  const inputPath = 'C:\\Users\\ASUS\\Desktop\\SURIIX\\public\\img\\suriix2.png';
  const outputPath = 'C:\\Users\\ASUS\\Desktop\\SURIIX\\public\\img\\suriix2_padded.png';

  try {
    const metadata = await sharp(inputPath).metadata();
    
    // Get top-left pixel color to use as background
    const { data } = await sharp(inputPath)
      .extract({ left: 0, top: 0, width: 1, height: 1 })
      .raw()
      .toBuffer({ resolveWithObject: true });
    
    let bgColor = { r: 0, g: 0, b: 0, alpha: 1 };
    if (data.length >= 3) {
      bgColor = { r: data[0], g: data[1], b: data[2], alpha: data.length === 4 ? data[3] / 255 : 1 };
    }
    
    console.log("Background color detected:", bgColor);

    const size = Math.max(metadata.width, metadata.height);
    const newSize = Math.floor(size * 1.5); // Add 50% padding
    
    const xOffset = Math.floor((newSize - metadata.width) / 2);
    const yOffset = Math.floor((newSize - metadata.height) / 2);
    
    await sharp({
      create: {
        width: newSize,
        height: newSize,
        channels: 4,
        background: bgColor
      }
    })
    .composite([{ input: inputPath, top: yOffset, left: xOffset }])
    .png()
    .toFile(outputPath);
    
    console.log("Padded with matched background color successfully.");
  } catch (error) {
    console.error("Error:", error);
  }
}

processImage();
