import urllib.request
import re

for slug in ['avengers-doomsday', 'dr-doom']:
    url = f'https://wallpaperaccess.com/{slug}'
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'})
    with urllib.request.urlopen(req, timeout=10) as r:
        html = r.read().decode('utf-8', errors='ignore')
        matches = list(dict.fromkeys(re.findall(r'/full/(\d+\.jpg)', html)))
        print(f"=== {slug} ({len(matches)} images) ===")
        for m in matches[:15]:
            print(f"https://wallpaperaccess.com/full/{m}")
