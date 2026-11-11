import os
from PIL import Image

paths = [
    'scripts/wallpaperaccess.jpg',
    'scripts/doom_opt_1.jpg',
    'scripts/doom_opt_5.jpg',
    'public/gallery section/1410160.jpg',
    'public/gallery section/22845447.jpg'
]

for p in paths:
    if os.path.exists(p):
        im = Image.open(p)
        print(f"{p}: {im.size}, mode={im.mode}")
    else:
        print(f"Missing: {p}")
