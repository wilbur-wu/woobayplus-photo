from PIL import Image
import os

from PIL import Image

input_path = "/Users/wubeichi/Desktop/images/air/AIR_10.jpg"
output_path = "images/homepage.jpg"

MAX_WIDTH = 2400
QUALITY = 88   # 介于80–92之间是摄影网页常用范围

img = Image.open(input_path)

# 按比例将宽度压到2400
w, h = img.size
new_height = int(h * (MAX_WIDTH / w))
img = img.resize((MAX_WIDTH, new_height), Image.LANCZOS)

img.save(output_path, optimize=True, quality=QUALITY)
print("Done:", output_path)