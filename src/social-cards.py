#!/usr/bin/env python3
"""
Renders one 1200x630 social/thumbnail PNG per tool from src/social-cards.html
into resources/social/.

    python3 src/social-cards.py            # render every card
    python3 src/social-cards.py matrix lcd # render just these slugs

Cards are defined in src/social-cards-data.js. Preview them in a browser with
src/social-cards.html#all before rendering.
"""
import os
import re
import subprocess
import sys

os.chdir(os.path.join(os.path.dirname(os.path.abspath(__file__)), '..'))

CHROME_CANDIDATES = [
    '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    '/Applications/Chromium.app/Contents/MacOS/Chromium',
    '/Applications/Brave Browser.app/Contents/MacOS/Brave Browser',
    '/usr/bin/google-chrome',
    '/usr/bin/chromium',
]

OUT_DIR = 'resources/social'
WIDTH, HEIGHT = 1200, 630


def find_chrome():
    for path in CHROME_CANDIDATES:
        if os.path.exists(path):
            return path
    sys.exit('Chrome not found. Add your browser path to CHROME_CANDIDATES.')


def read_cards():
    src = open('src/social-cards-data.js', encoding='utf-8').read()
    return re.findall(r"slug:\s*'([^']+)'.*?img:\s*'([^']+)'", src)


def shrink(path):
    """Flat vector art needs nowhere near 24-bit colour; a 256-colour palette
    halves the file with no visible difference. Skipped if Pillow is absent."""
    try:
        from PIL import Image
    except ImportError:
        return os.path.getsize(path) / 1024
    img = Image.open(path).convert('RGB')
    img.quantize(colors=256, method=Image.Quantize.MEDIANCUT,
                 dither=Image.Dither.FLOYDSTEINBERG).save(path, optimize=True)
    return os.path.getsize(path) / 1024


def main():
    chrome = find_chrome()
    os.makedirs(OUT_DIR, exist_ok=True)
    wanted = sys.argv[1:]
    cards = [c for c in read_cards() if not wanted or c[0] in wanted]
    if not cards:
        sys.exit('No matching cards. Known slugs: ' + ', '.join(s for s, _ in read_cards()))

    page = 'file://' + os.path.abspath('src/social-cards.html')
    for slug, img in cards:
        out = os.path.join(OUT_DIR, img)
        subprocess.run([
            chrome, '--headless=new', '--disable-gpu', '--hide-scrollbars',
            '--force-device-scale-factor=1',
            '--virtual-time-budget=4000',
            '--window-size=%d,%d' % (WIDTH, HEIGHT),
            '--screenshot=' + os.path.abspath(out),
            page + '#' + slug,
        ], check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
        before = os.path.getsize(out) / 1024
        after = shrink(out)
        print('%-14s -> %-52s %6.1f KB (from %.1f KB)' % (slug, out, after, before))


if __name__ == '__main__':
    main()
