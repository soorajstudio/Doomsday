import urllib.request

urls = [
    'http://127.0.0.1:3000/logos/doom-mask-emblem.png',
    'http://127.0.0.1:3000/logos/doom-loader-left.png',
    'http://127.0.0.1:3000/characters/doctor-doom.png',
    'http://127.0.0.1:3000/characters/mister-fantastic.png',
    'http://127.0.0.1:3000/gallery/incursion-collision.jpg',
    'http://127.0.0.1:3000/hero-frames/frame-001.jpg',
    'http://127.0.0.1:3000/footer-frames/frame-001.jpg',
]

for u in urls:
    try:
        with urllib.request.urlopen(u, timeout=5) as r:
            print(f"OK ({r.status}): {u.split('/')[-1]} ({len(r.read())} bytes)")
    except Exception as e:
        print(f"FAILED: {u} -> {e}")
