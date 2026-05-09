import sys
from PIL import Image

def analyze_bars(input_path):
    img = Image.open(input_path).convert("RGBA")
    
    top_mid = img.getpixel((img.width // 2, 0))
    bottom_mid = img.getpixel((img.width // 2, img.height - 1))
    
    print(f"Top-mid pixel: {top_mid}")
    print(f"Bottom-mid pixel: {bottom_mid}")

if __name__ == "__main__":
    analyze_bars('public/img/suriix_final.png')
