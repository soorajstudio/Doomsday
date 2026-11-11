import urllib.request
import os
from PIL import Image, ImageEnhance, ImageFilter, ImageOps, ImageDraw

os.makedirs('public/characters', exist_ok=True)
os.makedirs('public/gallery section', exist_ok=True)

headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'}

def download_image(url, target_path):
    print(f"Downloading {url} -> {target_path}...")
    req = urllib.request.Request(url, headers=headers)
    with urllib.request.urlopen(req, timeout=15) as r:
        with open(target_path, 'wb') as f:
            f.write(r.read())
    print(f"Saved {target_path} ({os.path.getsize(target_path)} bytes)")

# 1. Download gallery images
gallery_urls = [
    ('public/gallery section/1410160.jpg', 'https://wallpaperaccess.com/full/22193958.jpg'), # Doomsday poster 1
    ('public/gallery section/25811764.jpg', 'https://wallpaperaccess.com/full/22193942.jpg'), # Doctor Doom incursion
    ('public/gallery section/22845447.jpg', 'https://wallpaperaccess.com/full/22193962.jpg'), # Battleworld / Doom
    ('public/gallery section/1367972.png',  'https://wallpaperaccess.com/full/1450166.jpg'), # Dr Doom comic epic
    ('public/gallery section/1401620.jpg',  'https://wallpaperaccess.com/full/22194016.jpg'), # Multiverse battle
]

for target, url in gallery_urls:
    try:
        download_image(url, target)
    except Exception as e:
        print(f"Failed {target}: {e}")

# Also download character base images
char_downloads = [
    ('scripts/raw_doom.jpg',    'https://wallpaperaccess.com/full/22193954.jpg'),
    ('scripts/raw_reed.jpg',    'https://wallpaperaccess.com/full/4861449.jpg'), # Pedro Pascal
    ('scripts/raw_thor.jpg',    'https://wallpaperaccess.com/full/222132.jpg'),  # Thor
    ('scripts/raw_strange.jpg', 'https://wallpaperaccess.com/full/1089833.jpg'), # Doctor Strange
]

for target, url in char_downloads:
    try:
        download_image(url, target)
    except Exception as e:
        print(f"Failed {target}: {e}")

print("Assets download completed!")
