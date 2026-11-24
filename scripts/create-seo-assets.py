"""Create deterministic social preview and device icons from existing brand assets.

Only needed when the brand artwork changes; generated PNGs are committed in public/.
Requires Pillow. The normal JavaScript build does not depend on Python.
"""
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont

root = Path(__file__).resolve().parents[1]
output = root / 'public' / 'seo'
output.mkdir(exist_ok=True)

def font(size, bold=False):
    name = 'arialbd.ttf' if bold else 'arial.ttf'
    for candidate in [Path('C:/Windows/Fonts') / name, Path('/usr/share/fonts/truetype/dejavu') / ('DejaVuSans-Bold.ttf' if bold else 'DejaVuSans.ttf')]:
        if candidate.exists():
            return ImageFont.truetype(str(candidate), size)
    return ImageFont.load_default(size=size)

card = Image.new('RGB', (1200, 630), '#f5f8ff')
draw = ImageDraw.Draw(card)
draw.rectangle((0, 0, 1199, 11), fill='#0052cc')
draw.rounded_rectangle((860, 72, 1120, 560), radius=32, fill='#e4edff')
draw.arc((898, 170, 1240, 512), 80, 310, fill='#0052cc', width=18)
draw.arc((944, 216, 1194, 466), 80, 310, fill='#d49b28', width=14)
logo = Image.open(root / 'public' / 'yaazh-logo.png').convert('RGBA')
logo.thumbnail((350, 122), Image.Resampling.LANCZOS)
card.paste(logo, (72, 68), logo)
draw.text((72, 236), 'Digital Marketing', font=font(58, True), fill='#0a2558')
draw.text((72, 311), '& Software Solutions', font=font(58, True), fill='#0a2558')
draw.text((76, 423), 'Strategy. Design. Technology.', font=font(28), fill='#46556d')
draw.text((76, 490), 'Coimbatore, Tamil Nadu', font=font(24), fill='#46556d')
draw.text((76, 548), 'yaazh360digitech.in', font=font(24, True), fill='#0052cc')
card.save(output / 'yaazh360-social.png', optimize=True)

icon = Image.open(root / 'public' / 'favicon.png').convert('RGBA')
icon.thumbnail((144, 144), Image.Resampling.LANCZOS)
apple = Image.new('RGB', (180, 180), 'white')
apple.paste(icon, ((180-icon.width)//2, (180-icon.height)//2), icon)
apple.save(root / 'public' / 'apple-touch-icon.png', optimize=True)
