import os
from PIL import Image, ImageOps, ImageDraw, ImageFilter, ImageEnhance
import numpy as np

def create_character_card(src_path, out_path, tint_color=(16, 185, 129), crop_box=None, zoom=1.0):
    im = Image.open(src_path).convert("RGBA")
    w, h = im.size
    
    if crop_box:
        im = im.crop(crop_box)
    else:
        # default center/top crop (portrait orientation)
        target_ratio = 0.75 # width / height
        current_ratio = w / h
        if current_ratio > target_ratio:
            new_w = int(h * target_ratio)
            left = (w - new_w) // 2
            im = im.crop((left, 0, left + new_w, h))
        else:
            new_h = int(w / target_ratio)
            top = 0
            im = im.crop((0, top, w, top + new_h))
            
    # Resize to standard crisp portrait resolution
    target_h = 1200
    target_w = int(target_h * 0.72)
    im = im.resize((target_w, target_h), Image.Resampling.LANCZOS)
    
    # Create smooth radial/edge fade mask so it blends cinematically without harsh square edges
    mask = Image.new("L", (target_w, target_h), 255)
    draw = ImageDraw.Draw(mask)
    
    # bottom gradient fade (last 20% fades to transparent)
    fade_start = int(target_h * 0.75)
    for y in range(fade_start, target_h):
        alpha = int(255 * (1.0 - (y - fade_start) / (target_h - fade_start)))
        draw.line([(0, y), (target_w, y)], fill=alpha)
        
    # top/side soft feathering
    edge_w = 40
    for x in range(edge_w):
        a = int(255 * (x / edge_w))
        for y in range(target_h):
            current = mask.getpixel((x, y))
            mask.putpixel((x, y), min(current, a))
            current_r = mask.getpixel((target_w - 1 - x, y))
            mask.putpixel((target_w - 1 - x, y), min(current_r, a))
            
    # Apply mask
    r, g, b, orig_a = im.split()
    combined_a = Image.new("L", (target_w, target_h))
    combined_a.paste(orig_a)
    
    # multiply masks
    arr_orig = np.array(orig_a, dtype=np.float32) / 255.0
    arr_mask = np.array(mask, dtype=np.float32) / 255.0
    final_a = Image.fromarray((arr_orig * arr_mask * 255.0).astype(np.uint8), mode="L")
    
    # Color grading: enhance contrast and saturation
    enhancer = ImageEnhance.Contrast(im)
    im = enhancer.enhance(1.15)
    
    result = Image.merge("RGBA", (*im.split()[:3], final_a))
    result.save(out_path, "PNG")
    print(f"Generated {out_path} ({result.size})")

if __name__ == '__main__':
    # 1. Doom (from 8K wallpaper or doom_opt_1)
    create_character_card('scripts/wallpaperaccess.jpg', 'public/characters/doom.png', tint_color=(16, 185, 129))
    create_character_card('scripts/wallpaperaccess.jpg', 'public/characters/spiderman.png', tint_color=(16, 185, 129))
    
    # 2. Reed Richards
    create_character_card('scripts/raw_reed.jpg', 'public/characters/reed.png', tint_color=(59, 130, 246))
    create_character_card('scripts/raw_reed.jpg', 'public/characters/mj.png', tint_color=(59, 130, 246))
    
    # 3. Thor
    create_character_card('scripts/raw_thor.jpg', 'public/characters/thor.png', tint_color=(234, 179, 8))
    create_character_card('scripts/raw_thor.jpg', 'public/characters/hulk.png', tint_color=(234, 179, 8))
    
    # 4. Doctor Strange
    create_character_card('scripts/raw_strange.jpg', 'public/characters/strange.png', tint_color=(249, 115, 22))
    create_character_card('scripts/raw_strange.jpg', 'public/characters/ned.png', tint_color=(249, 115, 22))
    
    print("All character portraits successfully generated!")
