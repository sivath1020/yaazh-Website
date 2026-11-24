import os

dist_assets = 'dist/assets'
large_images = []

for f in os.listdir(dist_assets):
    ext = os.path.splitext(f)[1].lower()
    if ext in ['.png', '.jpg', '.jpeg', '.webp', '.gif']:
        p = os.path.join(dist_assets, f)
        size = os.path.getsize(p)
        if size > 100 * 1024:
            large_images.append((f, size))

large_images.sort(key=lambda x: x[1], reverse=True)
print(f"Total images > 100 kB in dist: {len(large_images)}")
for name, sz in large_images:
    print(f"  {name}: {sz / 1024:.1f} kB")
