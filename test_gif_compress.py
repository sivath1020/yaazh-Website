from PIL import Image, ImageSequence
import os

gif_path = 'src/assets/Services Content/social-media-management.gif'
out_path = 'test_gif.gif'

with Image.open(gif_path) as im:
    frames = []
    durations = []
    for frame in ImageSequence.Iterator(im):
        f = frame.copy().convert('P', palette=Image.Palette.ADAPTIVE, colors=64)
        f.thumbnail((360, 360))
        frames.append(f)
        durations.append(frame.info.get('duration', 100))
    frames[0].save(out_path, save_all=True, append_images=frames[1:], duration=durations, loop=0, optimize=True)

print("Original size:", os.path.getsize(gif_path) / 1024, "kB")
print("Compressed size:", os.path.getsize(out_path) / 1024, "kB")
os.remove(out_path)
