import urllib.request
import urllib.parse
import json
import io
import os
from PIL import Image

headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'}

targets = [
    # Movies
    {'id': 'movie-10', 'file': 'movie-10-age-of-ultron.webp', 'query': 'Avengers Age of Ultron', 'expected_type': 'movie'},
    {'id': 'movie-11', 'file': 'movie-11-civil-war.webp', 'query': 'Captain America Civil War', 'expected_type': 'movie'},
    {'id': 'movie-12', 'file': 'movie-12-quantumania.webp', 'query': 'Ant-Man and the Wasp Quantumania', 'expected_type': 'movie'},
    {'id': 'movie-13', 'file': 'movie-13-wakanda-forever.webp', 'query': 'Black Panther Wakanda Forever', 'expected_type': 'movie'},
    {'id': 'movie-14', 'file': 'movie-14-the-marvels.webp', 'query': 'The Marvels', 'expected_type': 'movie'},
    {'id': 'movie-15', 'file': 'movie-15-shang-chi.webp', 'query': 'Shang-Chi and the Legend of the Ten Rings', 'expected_type': 'movie'},
    {'id': 'movie-16', 'file': 'movie-16-doctor-strange.webp', 'query': 'Doctor Strange 2016', 'expected_type': 'movie'},
    {'id': 'movie-17', 'file': 'movie-17-eternals.webp', 'query': 'Eternals 2021', 'expected_type': 'movie'},
    {'id': 'movie-18', 'file': 'movie-18-the-avengers.webp', 'query': 'The Avengers 2012', 'expected_type': 'movie'},
    
    # Series
    {'id': 'series-11', 'file': 'series-11-hawkeye.webp', 'query': 'Hawkeye', 'expected_type': 'tvMiniSeries'},
    {'id': 'series-12', 'file': 'series-12-she-hulk.webp', 'query': 'She-Hulk Attorney at Law', 'expected_type': 'tvSeries'},
    {'id': 'series-13', 'file': 'series-13-werewolf-by-night.webp', 'query': 'Werewolf by Night', 'expected_type': 'tvSpecial'},
    {'id': 'series-14', 'file': 'series-14-echo.webp', 'query': 'Echo', 'expected_type': 'tvMiniSeries'},
    {'id': 'series-15', 'file': 'series-15-ironheart.webp', 'query': 'Ironheart', 'expected_type': 'tvMiniSeries'},
]

dest_dirs = ['assets', 'public/assets']
for d in dest_dirs:
    os.makedirs(d, exist_ok=True)

success_count = 0
for item in targets:
    url = f"https://v3.sg.media-imdb.com/suggestion/x/{urllib.parse.quote(item['query'])}.json"
    req = urllib.request.Request(url, headers=headers)
    try:
        with urllib.request.urlopen(req, timeout=10) as resp:
            data = json.loads(resp.read().decode('utf-8'))
            matches = [d for d in data.get('d', []) if 'i' in d]
            if item.get('expected_type'):
                typed = [d for d in matches if d.get('qid') == item['expected_type']]
                if typed:
                    matches = typed
            if not matches:
                print(f"[FAIL] No image for {item['id']} ({item['query']})")
                continue
            
            target_match = matches[0]
            img_url = target_match['i']['imageUrl']
            print(f"[FETCH] {item['id']} -> {target_match.get('l')} ({target_match.get('y')})")
            
            img_req = urllib.request.Request(img_url, headers=headers)
            with urllib.request.urlopen(img_req, timeout=15) as img_resp:
                img_data = img_resp.read()
                img = Image.open(io.BytesIO(img_data)).convert('RGB')
                
                # Resize and crop to 380x562 (standard poster ratio)
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
                
                print(f"[SAVED] {item['file']} ({os.path.getsize(os.path.join('assets', item['file']))} bytes)")
                success_count += 1
    except Exception as e:
        print(f"[ERROR] {item['id']}: {e}")

print(f"\nDone! Successfully processed {success_count}/{len(targets)} posters.")
