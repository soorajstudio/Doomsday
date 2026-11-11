import time
import numpy as np
from PIL import Image

t0 = time.time()
w, h = 1920, 1080
# generate a smooth gradient + noise + vignette
y, x = np.mgrid[0:h, 0:w]
cx, cy = w / 2, h / 2
dist = np.sqrt((x - cx)**2 + (y - cy)**2) / (np.sqrt(cx**2 + cy**2))

r = np.clip(20 * (1 - dist), 0, 255).astype(np.uint8)
g = np.clip(80 * (1 - dist) + 40 * np.sin(x / 50.0), 0, 255).astype(np.uint8)
b = np.clip(50 * (1 - dist), 0, 255).astype(np.uint8)

img_arr = np.dstack((r, g, b))
im = Image.fromarray(img_arr)
im.save('scripts/test_speed.jpg', 'JPEG', quality=85)
t1 = time.time()
print(f"Time to generate 1 frame: {t1 - t0:.3f}s")
