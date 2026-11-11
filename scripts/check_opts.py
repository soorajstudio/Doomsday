import os
from PIL import Image

for i in range(6):
    path = f'scripts/doom_opt_{i}.jpg'
    if os.path.exists(path):
        try:
            im = Image.open(path)
            print(f"{path}: size={im.size}, file_size={os.path.getsize(path)}")
        except Exception as e:
            print(f"{path} err: {e}")
