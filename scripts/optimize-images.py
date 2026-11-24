"""Create web-sized WebP assets and update literal image imports.

Run with Python 3 and Pillow: python scripts/optimize-images.py
Original source images stay available; Vite only publishes imported assets.
"""
import json
import re
from concurrent.futures import ThreadPoolExecutor
from pathlib import Path

from PIL import Image, ImageOps, ImageSequence

ROOT = Path(__file__).resolve().parents[1]
PATTERN = re.compile(r"(['\"])(\.{1,2}/[^'\"\n]+\.(?:png|jpe?g|gif))\1", re.I)


def optimize(source):
    target = source.with_name(source.stem + '.optimized.webp')
    with Image.open(source) as image:
        animated = getattr(image, 'n_frames', 1) > 1
        # Logos and small icons use lossless encoding to keep edges/text sharp.
        lossless = not animated and ('Logo' in source.parts or max(image.size) <= 256)
        bounds = (640, 640) if 'Logo' in source.parts else (1920, 1920)
        if animated:
            frames, durations = [], []
            for frame in ImageSequence.Iterator(image):
                rgba = frame.convert('RGBA')
                rgba.thumbnail((720, 720), Image.Resampling.LANCZOS)
                frames.append(rgba)
                durations.append(frame.info.get('duration', 100))
            frames[0].save(target, 'WEBP', save_all=True, append_images=frames[1:],
                           duration=durations, loop=image.info.get('loop', 0),
                           quality=72, method=4, minimize_size=True)
        else:
            frame = ImageOps.exif_transpose(image).convert('RGBA')
            frame.thumbnail(bounds, Image.Resampling.LANCZOS)
            frame.save(target, 'WEBP', quality=80, method=6, lossless=lossless)
        # Decoding verifies output files, dimensions, alpha, and animation duration.
        with Image.open(target) as output:
            output.load()
            if animated:
                original_duration = sum(durations)
                result_duration = 0
                for output_frame in ImageSequence.Iterator(output):
                    output_frame.load()
                    result_duration += output_frame.info.get('duration', 0)
                assert original_duration == result_duration, source
            assert output.width <= bounds[0] and output.height <= bounds[1], source
        return {'source': source.relative_to(ROOT).as_posix(),
                'output': target.relative_to(ROOT).as_posix(),
                'before': source.stat().st_size, 'after': target.stat().st_size,
                'animated': animated}


def main():
    source_files = [p for p in (ROOT / 'src').rglob('*') if p.suffix in ('.tsx', '.ts', '.css')]
    sources = set()
    for file in source_files:
        for match in PATTERN.finditer(file.read_text(encoding='utf-8')):
            source = (file.parent / match[2]).resolve()
            if source.is_relative_to(ROOT / 'src' / 'assets') and source.is_file():
                sources.add(source)
    with ThreadPoolExecutor(max_workers=2) as workers:
        report = list(workers.map(optimize, sorted(sources)))
    replacements = {str((ROOT / item['source']).resolve()): ROOT / item['output'] for item in report}
    for file in source_files:
        text = file.read_text(encoding='utf-8')
        def replace(match):
            target = replacements.get(str((file.parent / match[2]).resolve()))
            return f'{match[1]}{match[2].rsplit(".", 1)[0]}.optimized.webp{match[1]}' if target else match[0]
        updated = PATTERN.sub(replace, text)
        if updated != text:
            file.write_text(updated, encoding='utf-8', newline='')
    output = ROOT / 'output' / 'optimization'
    output.mkdir(parents=True, exist_ok=True)
    # Preserve the original comparison on reruns after imports have changed.
    if report:
        (output / 'images.json').write_text(json.dumps(report, indent=2), encoding='utf-8')
    print(json.dumps({'images': len(report), 'before': sum(x['before'] for x in report),
                      'after': sum(x['after'] for x in report)}))


if __name__ == '__main__':
    main()
