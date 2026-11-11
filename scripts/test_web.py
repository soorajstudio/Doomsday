import urllib.request

try:
    req = urllib.request.Request('http://127.0.0.1:3000', headers={'User-Agent': 'Mozilla/5.0'})
    with urllib.request.urlopen(req, timeout=5) as r:
        html = r.read().decode('utf-8', errors='ignore')
        print(f"Status: {r.status}, length: {len(html)}")
        if 'DOOMSDAY' in html:
            print("Verified: DOOMSDAY is present in HTML!")
        if 'Doctor Doom' in html:
            print("Verified: Doctor Doom is present in HTML!")
        if 'Spider-Man' in html:
            print("Warning: Spider-Man still found in HTML")
        else:
            print("Verified: No Spider-Man found in rendered page!")
except Exception as e:
    print(f"Connection error: {e}")
