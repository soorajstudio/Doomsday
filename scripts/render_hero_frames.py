import os
import math
import random
from PIL import Image, ImageEnhance, ImageFilter, ImageDraw

os.makedirs('public/frames', exist_ok=True)

print("Loading 1080p source plates...")
plate_wide = Image.open('scripts/doom_opt_4.jpg').convert('RGB').resize((1920, 1080), Image.Resampling.LANCZOS)
plate_mid  = Image.open('scripts/doom_opt_2.jpg').convert('RGB').resize((1920, 1080), Image.Resampling.LANCZOS)
plate_doom = Image.open('scripts/doom_opt_0.jpg').convert('RGB').resize((1920, 1080), Image.Resampling.LANCZOS)

FIRST_FRAME = 67
LAST_FRAME  = 200
TOTAL_FRAMES = LAST_FRAME - FIRST_FRAME + 1

# Pre-generate persistent particle coordinates (so they drift smoothly across frames)
NUM_PARTICLES = 140
particles = []
for p in range(NUM_PARTICLES):
    particles.append({
        'x': random.uniform(0, 1920),
        'y': random.uniform(0, 1080),
        'vx': random.uniform(-1.5, 1.5),
        'vy': random.uniform(-2.5, -0.6), # floating upward like cosmic embers
        'size': random.uniform(1.5, 3.5),
        'alpha': random.uniform(0.35, 0.85),
        'color': random.choice([(16, 185, 129), (52, 211, 153), (212, 175, 55), (110, 231, 183), (245, 158, 11)])
    })

def smoothstep(edge0, edge1, x):
    t = max(0.0, min(1.0, (x - edge0) / (edge1 - edge0)))
    return t * t * (3.0 - 2.0 * t)

print(f"Rendering {TOTAL_FRAMES} hero frames (ezgif-frame-{FIRST_FRAME:03d}.jpg to {LAST_FRAME:03d}.jpg)...")

for frame_idx, frame_num in enumerate(range(FIRST_FRAME, LAST_FRAME + 1)):
    t = frame_idx / float(TOTAL_FRAMES - 1) # 0.0 to 1.0
    
    if t < 0.45:
        # Subtle slow cinematic zoom on plate_wide
        zoom = 1.0 + 0.12 * smoothstep(0.0, 0.45, t)
        cw, ch = int(1920 / zoom), int(1080 / zoom)
        x1 = (1920 - cw) // 2
        y1 = (1080 - ch) // 2
        base = plate_wide.crop((x1, y1, x1 + cw, y1 + ch)).resize((1920, 1080), Image.Resampling.BILINEAR)
    elif t < 0.70:
        # Crossfade from plate_wide to plate_mid
        blend = smoothstep(0.45, 0.70, t)
        zoom_w = 1.12 + 0.06 * blend
        cw_w, ch_w = int(1920 / zoom_w), int(1080 / zoom_w)
        crop_w = plate_wide.crop(((1920 - cw_w)//2, (1080 - ch_w)//2, (1920 + cw_w)//2, (1080 + ch_w)//2)).resize((1920, 1080), Image.Resampling.BILINEAR)
        
        zoom_m = 1.0 + 0.10 * blend
        cw_m, ch_m = int(1920 / zoom_m), int(1080 / zoom_m)
        crop_m = plate_mid.crop(((1920 - cw_m)//2, (1080 - ch_m)//2, (1920 + cw_m)//2, (1080 + ch_m)//2)).resize((1920, 1080), Image.Resampling.BILINEAR)
        
        base = Image.blend(crop_w, crop_m, blend)
    else:
        # Crossfade from plate_mid to plate_doom with dramatic push to mask
        blend = smoothstep(0.70, 0.88, t)
        zoom_m = 1.10 + 0.05 * blend
        cw_m, ch_m = int(1920 / zoom_m), int(1080 / zoom_m)
        crop_m = plate_mid.crop(((1920 - cw_m)//2, (1080 - ch_m)//2, (1920 + cw_m)//2, (1080 + ch_m)//2)).resize((1920, 1080), Image.Resampling.BILINEAR)
        
        doom_t = smoothstep(0.70, 1.0, t)
        zoom_d = 1.0 + 0.22 * doom_t
        cw_d, ch_d = int(1920 / zoom_d), int(1080 / zoom_d)
        crop_d = plate_doom.crop(((1920 - cw_d)//2, int((1080 - ch_d)*0.4), (1920 + cw_d)//2, int((1080 - ch_d)*0.4) + ch_d)).resize((1920, 1080), Image.Resampling.BILINEAR)
        
        if blend < 1.0:
            base = Image.blend(crop_m, crop_d, blend)
        else:
            base = crop_d

    # Pulse of arcane lightning
    pulse = 0.0
    for burst_t in [0.28, 0.52, 0.76, 0.95]:
        dist = abs(t - burst_t)
        if dist < 0.035:
            pulse = max(pulse, math.sin((1.0 - dist / 0.035) * (math.pi / 2)))

    # Draw drifting embers & particles
    draw = ImageDraw.Draw(base, "RGBA")
    for pt in particles:
        px = (pt['x'] + pt['vx'] * frame_idx * 1.5) % 1920
        py = (pt['y'] + pt['vy'] * frame_idx * 1.5) % 1080
        s = pt['size']
        alpha = int(255 * pt['alpha'] * (0.7 + 0.3 * math.sin(frame_idx * 0.2 + pt['x'])))
        col = (*pt['color'], alpha)
        draw.ellipse([px - s, py - s, px + s, py + s], fill=col)

    if pulse > 0.05:
        surge = Image.new("RGBA", (1920, 1080), (16, 185, 129, int(pulse * 55)))
        base = Image.alpha_composite(base.convert("RGBA"), surge).convert("RGB")

    out_filename = f"public/frames/ezgif-frame-{frame_num:03d}.jpg"
    base.save(out_filename, "JPEG", quality=86)
    
    if frame_idx % 30 == 0 or frame_idx == TOTAL_FRAMES - 1:
        print(f"Rendered frame {frame_idx + 1}/{TOTAL_FRAMES} -> {out_filename}")

print("Hero frames rendering complete!")
