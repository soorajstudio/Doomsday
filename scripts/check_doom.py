import urllib.request
from PIL import Image

headers = {'User-Agent': 'Mozilla/5.0'}

doom_urls = [
    'https://wallpaperaccess.com/full/1450163.jpg',
    'https://wallpaperaccess.com/full/1450164.jpg',
    'https://wallpaperaccess.com/full/1450172.jpg',
    'https://wallpaperaccess.com/full/1450174.jpg',
    'https://wallpaperaccess.com/full/171008.jpg',
    'https://wallpaperaccess.com/full/783549.jpg',
]

for i, u in enumerate(doom_urls):
    req = urllib.request.Request(u, headers=headers)
    try:
        with urllib.request.urlopen(req, timeout=10) as r:
            with open(f'scripts/doom_opt_{i}.jpg', 'wb') as f:
                f.write(r.read())
            im = Image.open(f'scripts/doom_opt_{i}.jpg')
            print(f"doom_opt_{i}: {im.size}, {im.format}")
    except Exception as e:
        print(f"opt {i} error: {e}")
