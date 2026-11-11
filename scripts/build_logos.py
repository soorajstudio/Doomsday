import os
from PIL import Image, ImageDraw, ImageFilter, ImageOps
import numpy as np

def draw_doom_mask(size=(800, 800), glow_color=(16, 185, 129)):
    w, h = size
    im = Image.new("RGBA", size, (0, 0, 0, 0))
    draw = ImageDraw.Draw(im)
    
    cx, cy = w // 2, h // 2
    
    # Outer Hood / Arcane aura glow
    glow = Image.new("RGBA", size, (0, 0, 0, 0))
    glow_draw = ImageDraw.Draw(glow)
    
    # Outer halo
    for r in range(280, 160, -10):
        alpha = int(45 * (1.0 - (r - 160) / 120))
        glow_draw.ellipse([cx - r, cy - r, cx + r, cy + r], fill=(*glow_color, alpha))
        
    glow = glow.filter(ImageFilter.GaussianBlur(18))
    im.paste(glow, (0, 0), glow)
    
    # Hood polygon (Dark emerald hood wrapping around head)
    hood_pts = [
        (cx, cy - 260),
        (cx + 170, cy - 190),
        (cx + 210, cy - 30),
        (cx + 180, cy + 180),
        (cx + 120, cy + 240),
        (cx + 70, cy + 210),
        (cx - 70, cy + 210),
        (cx - 120, cy + 240),
        (cx - 180, cy + 180),
        (cx - 210, cy - 30),
        (cx - 170, cy - 190),
    ]
    draw.polygon(hood_pts, fill=(8, 48, 30, 255), outline=(16, 185, 129, 200), width=4)
    
    # Inner hood shadow
    hood_inner = [
        (cx, cy - 220),
        (cx + 140, cy - 150),
        (cx + 160, cy - 10),
        (cx + 130, cy + 150),
        (cx, cy + 190),
        (cx - 130, cy + 150),
        (cx - 160, cy - 10),
        (cx - 140, cy - 150),
    ]
    draw.polygon(hood_inner, fill=(3, 14, 10, 255))
    
    # Titanium Mask Faceplate
    # Crown & forehead
    mask_pts = [
        (cx, cy - 170),
        (cx + 105, cy - 125),
        (cx + 120, cy - 30),
        (cx + 95, cy + 65),
        (cx + 70, cy + 160),
        (cx + 40, cy + 175),
        (cx, cy + 155),
        (cx - 40, cy + 175),
        (cx - 70, cy + 160),
        (cx - 95, cy + 65),
        (cx - 120, cy - 30),
        (cx - 105, cy - 125),
    ]
    # Metallic gradient / shaded fill
    draw.polygon(mask_pts, fill=(160, 175, 185, 255), outline=(220, 235, 245, 255), width=3)
    
    # Cheek / jaw plates (Iron facets)
    left_cheek = [
        (cx - 100, cy - 25),
        (cx - 30, cy + 30),
        (cx - 45, cy + 130),
        (cx - 85, cy + 60),
    ]
    draw.polygon(left_cheek, fill=(110, 125, 135, 255), outline=(190, 205, 215, 255), width=2)
    
    right_cheek = [
        (cx + 100, cy - 25),
        (cx + 30, cy + 30),
        (cx + 45, cy + 130),
        (cx + 85, cy + 60),
    ]
    draw.polygon(right_cheek, fill=(130, 145, 155, 255), outline=(220, 235, 245, 255), width=2)
    
    # Forehead central crest & rivets
    draw.line([(cx, cy - 165), (cx, cy - 40)], fill=(70, 80, 90, 255), width=4)
    for ry in range(cy - 140, cy - 40, 25):
        draw.ellipse([cx - 4, ry - 4, cx + 4, ry + 4], fill=(230, 240, 250, 255), outline=(50, 60, 70, 255))
        
    # Eye Sockets (Menacing angular Doctor Doom eye slits)
    left_eye = [
        (cx - 80, cy - 50),
        (cx - 25, cy - 40),
        (cx - 28, cy - 18),
        (cx - 75, cy - 25),
    ]
    draw.polygon(left_eye, fill=(0, 0, 0, 255), outline=(40, 50, 60, 255), width=3)
    
    right_eye = [
        (cx + 80, cy - 50),
        (cx + 25, cy - 40),
        (cx + 28, cy - 18),
        (cx + 75, cy - 25),
    ]
    draw.polygon(right_eye, fill=(0, 0, 0, 255), outline=(40, 50, 60, 255), width=3)
    
    # Glowing Emerald Arcane Eye energy inside sockets
    left_pupil = [
        (cx - 70, cy - 42),
        (cx - 35, cy - 35),
        (cx - 37, cy - 26),
        (cx - 67, cy - 30),
    ]
    draw.polygon(left_pupil, fill=(52, 211, 153, 255))
    
    right_pupil = [
        (cx + 70, cy - 42),
        (cx + 35, cy - 35),
        (cx + 37, cy - 26),
        (cx + 67, cy - 30),
    ]
    draw.polygon(right_pupil, fill=(52, 211, 153, 255))
    
    # Center eye gleam
    draw.line([(cx - 60, cy - 36), (cx - 42, cy - 33)], fill=(255, 255, 255, 255), width=2)
    draw.line([(cx + 42, cy - 33), (cx + 60, cy - 36)], fill=(255, 255, 255, 255), width=2)
    
    # Nose bridge & vents
    draw.polygon([(cx - 15, cy - 25), (cx + 15, cy - 25), (cx + 18, cy + 20), (cx, cy + 32), (cx - 18, cy + 20)],
                 fill=(140, 155, 165, 255), outline=(80, 95, 105, 255), width=2)
    draw.line([(cx - 8, cy + 18), (cx - 8, cy + 26)], fill=(20, 25, 30, 255), width=2)
    draw.line([(cx + 8, cy + 18), (cx + 8, cy + 26)], fill=(20, 25, 30, 255), width=2)
    
    # Grim Mouth Grille (Horizontal metal slits)
    mouth_y = cy + 70
    draw.polygon([(cx - 42, mouth_y - 8), (cx + 42, mouth_y - 8), (cx + 36, mouth_y + 40), (cx - 36, mouth_y + 40)],
                 fill=(25, 30, 35, 255), outline=(180, 195, 205, 255), width=2)
    for my in range(mouth_y, mouth_y + 36, 8):
        draw.line([(cx - 32, my), (cx + 32, my)], fill=(160, 175, 185, 255), width=2)
        
    # Rivets around jawline
    for (rx, ry) in [
        (cx - 65, cy + 145), (cx - 40, cy + 160), (cx, cy + 145), (cx + 40, cy + 160), (cx + 65, cy + 145),
        (cx - 95, cy + 50), (cx + 95, cy + 50), (cx - 110, cy - 20), (cx + 110, cy - 20)
    ]:
        draw.ellipse([rx - 3, ry - 3, rx + 3, ry + 3], fill=(220, 230, 240, 255), outline=(40, 50, 60, 255))
        
    return im

if __name__ == '__main__':
    mask = draw_doom_mask((800, 800))
    mask.save('public/spider-logo.png', 'PNG')
    mask.save('public/doom-logo.png', 'PNG')
    
    # Save RGB versions for jpg
    bg_black = Image.new("RGB", (800, 800), (4, 6, 8))
    bg_black.paste(mask, (0, 0), mask)
    bg_black.save('public/spider-logo.jpg', 'JPEG')
    bg_black.save('public/spider logo.jpg', 'JPEG')
    
    # Create split left & right intro logos for Loader.tsx
    w, h = mask.size
    left_half = mask.crop((0, 0, w // 2, h))
    right_half = mask.crop((w // 2, 0, w, h))
    
    left_half.save('public/left intro logo (2).PNG', 'PNG')
    right_half.save('public/right intro logo.PNG', 'PNG')
    
    # Favicon
    fav = mask.resize((48, 48), Image.Resampling.LANCZOS)
    fav.save('app/favicon.ico', 'ICO')
    
    print("Logos, loader doors, and favicon generated successfully!")
