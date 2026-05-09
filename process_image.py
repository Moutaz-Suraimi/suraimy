import sys
from PIL import Image

def process_image(input_path, output_path):
    img = Image.open(input_path).convert("RGBA")
    data = img.getdata()
    
    new_data = []
    # Count black pixels
    black_count = 0
    total_pixels = len(data)
    
    for item in data:
        # Check if the pixel is black or very dark
        if item[0] < 20 and item[1] < 20 and item[2] < 20:
            black_count += 1
            # Make it transparent
            new_data.append((0, 0, 0, 0))
        else:
            new_data.append(item)
            
    print(f"Total pixels: {total_pixels}, Black pixels: {black_count}")
    
    img.putdata(new_data)
    # Crop to bounding box of non-transparent pixels
    bbox = img.getbbox()
    if bbox:
        print(f"Bounding box: {bbox}")
        img = img.crop(bbox)
        
    img.save(output_path, "PNG")
    print(f"Saved processed image to {output_path}")

if __name__ == "__main__":
    process_image('public/img/suriix_final.png', 'public/img/suriix_final_transparent.png')
