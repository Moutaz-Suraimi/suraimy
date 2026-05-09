import sys
from PIL import Image

def analyze_image(input_path):
    img = Image.open(input_path).convert("RGBA")
    
    # Get corner pixels
    corners = [
        img.getpixel((0, 0)),
        img.getpixel((img.width - 1, 0)),
        img.getpixel((0, img.height - 1)),
        img.getpixel((img.width - 1, img.height - 1))
    ]
    
    print(f"Corner pixels: {corners}")
    
    # Count transparent pixels
    transparent_count = 0
    data = img.getdata()
    for item in data:
        if item[3] < 10:
            transparent_count += 1
            
    print(f"Total transparent pixels: {transparent_count} out of {len(data)}")

if __name__ == "__main__":
    analyze_image('public/img/suriix_final.png')
