import os
import shutil

print("Starting complete organization of public assets...")

# 1. Create clean target directories
dirs = [
    'public/logos',
    'public/characters',
    'public/gallery',
    'public/hero-frames',
    'public/footer-frames',
]
for d in dirs:
    os.makedirs(d, exist_ok=True)

# 2. Organize logos
shutil.copyfile('public/doom-logo.png', 'public/logos/doom-mask-emblem.png')
shutil.copyfile('public/left intro logo (2).PNG', 'public/logos/doom-loader-left.png')
shutil.copyfile('public/right intro logo.PNG', 'public/logos/doom-loader-right.png')

# 3. Organize characters
shutil.copyfile('public/characters/doom.png', 'public/characters/doctor-doom.png')
shutil.copyfile('public/characters/reed.png', 'public/characters/mister-fantastic.png')
shutil.copyfile('public/characters/thor.png', 'public/characters/thor-odinson.png')
shutil.copyfile('public/characters/strange.png', 'public/characters/doctor-strange.png')

# 4. Organize gallery
shutil.copyfile('public/gallery section/1410160.jpg', 'public/gallery/incursion-collision.jpg')
shutil.copyfile('public/gallery section/25811764.jpg', 'public/gallery/latveria-citadel.jpg')
shutil.copyfile('public/gallery section/22845447.jpg', 'public/gallery/battleworld-wasteland.jpg')
shutil.copyfile('public/gallery section/1367972.png',  'public/gallery/god-emperor-ascendant.jpg')
shutil.copyfile('public/gallery section/1401620.jpg',  'public/gallery/multiversal-war.jpg')

# 5. Organize hero frames: 134 frames -> frame-001.jpg to frame-134.jpg
for idx, num in enumerate(range(67, 201)):
    src = f'public/frames/ezgif-frame-{num:03d}.jpg'
    dst = f'public/hero-frames/frame-{idx + 1:03d}.jpg'
    if os.path.exists(src):
        shutil.copyfile(src, dst)

print(f"Organized {len(os.listdir('public/hero-frames'))} hero frames in public/hero-frames/")

# 6. Organize footer frames: 277 frames -> frame-001.jpg to frame-277.jpg
for num in range(1, 278):
    src = f'public/footer section/ezgif-frame-{num:03d}.jpg'
    dst = f'public/footer-frames/frame-{num:03d}.jpg'
    if os.path.exists(src):
        shutil.copyfile(src, dst)

print(f"Organized {len(os.listdir('public/footer-frames'))} footer frames in public/footer-frames/")

# 7. Clean up legacy messy files and folders
legacy_dirs = ['public/frames', 'public/footer section', 'public/gallery section']
for ld in legacy_dirs:
    if os.path.exists(ld):
        shutil.rmtree(ld)
        print(f"Removed legacy directory: {ld}")

legacy_root_files = [
    'public/hulk.PNG',
    'public/jacob.PNG',
    'public/left intro logo (2).PNG',
    'public/right intro logo.PNG',
    'public/spider into logo.PNG',
    'public/spider logo.jpg',
    'public/spider-logo.jpg',
    'public/spider-logo.png',
    'public/spiderman.PNG',
    'public/Zendaya .PNG',
    'public/characters/doom.png',
    'public/characters/doom_raw.png',
    'public/characters/hulk.png',
    'public/characters/mj.png',
    'public/characters/ned.png',
    'public/characters/reed.png',
    'public/characters/spiderman.png',
    'public/characters/strange.png',
    'public/characters/thor.png',
    'app/components/SuitsSection.tsx',
]
for lf in legacy_root_files:
    if os.path.exists(lf):
        os.remove(lf)
        print(f"Removed legacy file: {lf}")

print("Workspace reorganization completed successfully!")
