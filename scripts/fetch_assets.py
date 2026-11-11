import urllib.request
import urllib.parse
import json
import re
import os

os.makedirs('scripts', exist_ok=True)

def get_ddg_images(query):
    try:
        url = 'https://duckduckgo.com/?q=' + urllib.parse.quote(query)
        req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'})
        with urllib.request.urlopen(req, timeout=10) as r:
            html = r.read().decode('utf-8', errors='ignore')
        m = re.search(r'vqd=([0-9-]+)', html)
        if not m:
            m = re.search(r'vqd=["\']([0-9-]+)["\']', html)
        if not m:
            print(f'no vqd for {query}')
            return []
        vqd = m.group(1)
        params = urllib.parse.urlencode({
            'l': 'us-en',
            'o': 'json',
            'q': query,
            'vqd': vqd,
            'f': ',,,',
            'p': '1'
        })
        img_url = f'https://duckduckgo.com/i.js?{params}'
        req2 = urllib.request.Request(img_url, headers={'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'})
        with urllib.request.urlopen(req2, timeout=10) as r2:
            data = json.loads(r2.read().decode('utf-8', errors='ignore'))
            return data.get('results', [])
    except Exception as e:
        print(f"Error searching {query}: {e}")
        return []

if __name__ == '__main__':
    results = get_ddg_images('Avengers Doomsday Doctor Doom Robert Downey Jr poster wallpaper')
    print(f"Found {len(results)} results")
    for r in results[:8]:
        print(r.get('image'), r.get('width'), 'x', r.get('height'))
