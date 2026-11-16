import urllib.request
import io
import os
from PIL import Image

headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'}

targets = [
    {
        'id': 'series-12',
        'file': 'series-12-she-hulk.webp',
        'img_url': 'https://m.media-amazon.com/images/M/MV5BNjg4ZTQ1MjctNzEyMS00YWM2LTk1ZTQtNDU3ZDJjNjhhMDhkXkEyXkFqcGc@._V1_.jpg'
    },
    {
        'id': 'series-13',
        'file': 'series-13-werewolf-by-night.webp',
        'img_url': 'https://m.media-amazon.com/images/M/MV5BODUzMGFkYzgtYzhjNC00ZmFjLTg3ZTYtYWJkMWRjMzJmYTQ2XkEyXkFqcGc@._V1_.jpg'
    }
]

dest_dirs = ['assets', 'public/assets']

for item in targets:
    req = urllib.request.Request(item['img_url'], headers=headers)
    with urllib.request.urlopen(req, timeout=15) as img_resp:
        img_data = img_resp.read()
        img = Image.open(io.BytesIO(img_data)).convert('RGB')
        
        target_w, target_h = 380, 562
        img_ratio = img.width / img.height
        target_ratio = target_w / target_h
        
        if img_ratio > target_ratio:
            new_w = int(img.height * target_ratio)
            offset = (img.width - new_w) // 2
            img = img.crop((offset, 0, offset + new_w, img.height))
        else:
            new_h = int(img.width / target_ratio)
            offset = (img.height - new_h) // 2
            img = img.crop((0, offset, img.width, offset + new_h))
        
        img = img.resize((target_w, target_h), Image.Resampling.LANCZOS)
        
        for dest in dest_dirs:
            out_path = os.path.join(dest, item['file'])
            img.save(out_path, 'WEBP', quality=88)
        
        print(f"[REPLACED] {item['file']} ({os.path.getsize(os.path.join('assets', item['file']))} bytes)")
