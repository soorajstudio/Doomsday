import os

for root, dirs, files in os.walk('public'):
    print(f"Directory: {root} ({len(files)} files)")
    if 'frames' not in root:
        for f in sorted(files):
            print(f"   • {f}")
