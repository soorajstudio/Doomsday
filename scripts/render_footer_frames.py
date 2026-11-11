import os
import math
import random
from PIL import Image, ImageEnhance, ImageFilter, ImageDraw

os.makedirs('public/footer section', exist_ok=True)

print("Loading footer source plates...")
plate_cosmic = Image.open('scripts/doom_opt_2.jpg').convert('RGB').resize((1920, 1080), Image.Resampling.LANCZOS)
plate_doom   = Image.open('scripts/doom_opt_0.jpg').convert('RGB').resize((1920, 1080), Image.Resampling.LANCZOS)
plate_crest  = Image.open('scripts/doom_opt_4.jpg').convert('RGB').resize((1920, 1080), Image.Resampling.LANCZOS)

# Load Doom mask overlay for the climax of the footer sequence
mask_logo = Image.open('public/doom-logo.png').convert('RGBA')

TOTAL_FRAMES = 277

# Pre-generate drifting ember particles
NUM_PARTICLES = 160
particles = []
for p in range(NUM_PARTICLES):
    particles.append({
        'x': random.uniform(0, 1920),
        'y': random.uniform(0, 1080),
        'vx': random.uniform(-1.8, 1.8),
        'vy': random.uniform(-2.8, -0.7),
        'size': random.uniform(1.2, 3.8),
        'alpha': random.uniform(0.3, 0.9),
        'color': random.choice([(16, 185, 129), (52, 211, 153), (212, 175, 55), (167, 139, 250), (245, 158, 11)])
    })

def smoothstep(edge0, edge1, x):
    t = max(0.0, min(1.0, (x - edge0) / (edge1 - edge0)))
    return t * t * (3.0 - 2.0 * t)

print(f"Rendering {TOTAL_FRAMES} footer frames (ezgif-frame-001.jpg to ezgif-frame-{TOTAL_FRAMES:03d}.jpg)...")

for frame_idx in range(TOTAL_FRAMES):
    frame_num = frame_idx + 1
    t = frame_idx / float(TOTAL_FRAMES - 1)
    
    if t < 0.40:
        # Phase 1: Cosmic Incursion & Eclipse drift
        zoom = 1.0 + 0.15 * smoothstep(0.0, 0.40, t)
        cw, ch = int(1920 / zoom), int(1080 / zoom)
        x1 = (1920 - cw) // 2
        y1 = (1080 - ch) // 2
        base = plate_cosmic.crop((x1, y1, x1 + cw, y1 + ch)).resize((1920, 1080), Image.Resampling.BILINEAR)
    elif t < 0.70:
        # Phase 2: Crossfade to plate_doom with rising arcane energy
        blend = smoothstep(0.40, 0.70, t)
        zoom_c = 1.15 + 0.05 * blend
        cw_c, ch_c = int(1920 / zoom_c), int(1080 / zoom_c)
        crop_c = plate_cosmic.crop(((1920 - cw_c)//2, (1080 - ch_c)//2, (1920 + cw_c)//2, (1080 + ch_c)//2)).resize((1920, 1080), Image.Resampling.BILINEAR)
        
        zoom_d = 1.0 + 0.12 * blend
        cw_d, ch_d = int(1920 / zoom_d), int(1080 / zoom_d)
        crop_d = plate_doom.crop(((1920 - cw_d)//2, (1080 - ch_d)//2, (1920 + cw_d)//2, (1080 + ch_d)//2)).resize((1920, 1080), Image.Resampling.BILINEAR)
        
        base = Image.blend(crop_c, crop_d, blend)
    else:
        # Phase 3: Transition to plate_crest with centered glowing emblem emergence
        blend = smoothstep(0.70, 0.88, t)
        zoom_d = 1.12 + 0.06 * blend
        cw_d, ch_d = int(1920 / zoom_d), int(1080 / zoom_d)
        crop_d = plate_doom.crop(((1920 - cw_d)//2, (1080 - ch_d)//2, (1920 + cw_d)//2, (1080 + ch_d)//2)).resize((1920, 1080), Image.Resampling.BILINEAR)
        
        crest_t = smoothstep(0.70, 1.0, t)
        zoom_cr = 1.0 + 0.15 * crest_t
        cw_cr, ch_cr = int(1920 / zoom_cr), int(1080 / zoom_cr)
        crop_cr = plate_crest.crop(((1920 - cw_cr)//2, (1080 - ch_cr)//2, (1920 + cw_cr)//2, (1080 + ch_cr)//2)).resize((1920, 1080), Image.Resampling.BILINEAR)
        
        if blend < 1.0:
            base = Image.blend(crop_d, crop_cr, blend)
        else:
            base = crop_cr

    # Draw animated swirling particles & embers
    draw = ImageDraw.Draw(base, "RGBA")
    for pt in particles:
        px = (pt['x'] + pt['vx'] * frame_idx * 1.2) % 1920
        py = (pt['y'] + pt['vy'] * frame_idx * 1.2) % 1080
        s = pt['size']
        alpha = int(255 * pt['alpha'] * (0.65 + 0.35 * math.sin(frame_idx * 0.15 + pt['x'])))
        col = (*pt['color'], alpha)
        draw.ellipse([px - s, py - s, px + s, py + s], fill=col)

    # Periodic arcane pulse waves
    pulse = 0.0
    for burst_t in [0.20, 0.45, 0.72, 0.90]:
        dist = abs(t - burst_t)
        if dist < 0.03:
            pulse = max(pulse, math.sin((1.0 - dist / 0.03) * (math.pi / 2)))

    if pulse > 0.05:
        surge = Image.new("RGBA", (1920, 1080), (16, 185, 129, int(pulse * 60)))
        base = Image.alpha_composite(base.convert("RGBA"), surge).convert("RGB")

    out_filename = f"public/footer section/ezgif-frame-{frame_num:03d}.jpg"
    base.save(out_filename, "JPEG", quality=86)
    
    if frame_num % 50 == 0 or frame_num == TOTAL_FRAMES:
        print(f"Rendered footer frame {frame_num}/{TOTAL_FRAMES}")

print("Footer frames rendering complete!")
