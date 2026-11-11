import urllib.request
import urllib.parse
import json

def search_commons(query, limit=10):
    url = f"https://commons.wikimedia.org/w/api.php?action=query&generator=search&gsrsearch={urllib.parse.quote(query)}&gsrlimit={limit}&prop=imageinfo&iiprop=url|size|mime&format=json"
    req = urllib.request.Request(url, headers={'User-Agent': 'DoomsdayApp/1.0 (contact@example.com)'})
    try:
        with urllib.request.urlopen(req, timeout=10) as r:
            data = json.loads(r.read().decode('utf-8'))
            pages = data.get('query', {}).get('pages', {})
            results = []
            for p_id, p_val in pages.items():
                info = p_val.get('imageinfo', [{}])[0]
                if info.get('url'):
                    results.append({
                        'title': p_val.get('title'),
                        'url': info.get('url'),
                        'width': info.get('width'),
                        'height': info.get('height'),
                        'mime': info.get('mime')
                    })
            return results
    except Exception as e:
        print(f"Error searching commons: {e}")
        return []

if __name__ == '__main__':
    for term in ['Doctor Doom', 'Robert Downey Jr', 'Pedro Pascal', 'Chris Hemsworth', 'Benedict Cumberbatch', 'Comic-Con Doctor Doom']:
        res = search_commons(term, limit=3)
        print(f"=== {term} ===")
        for r in res:
            print(r['title'], r['width'], 'x', r['height'], r['url'])
