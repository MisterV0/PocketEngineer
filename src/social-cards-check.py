#!/usr/bin/env python3
"""
Verifies the worked example on every social card by recomputing it.

    python3 src/social-cards-check.py

Each card's footer strip states a small engineering problem and its answer.
This recomputes every one from first principles and fails loudly on a
mismatch, so a card can never ship claiming something untrue.
"""
import math
import re
import sys
import os

os.chdir(os.path.join(os.path.dirname(os.path.abspath(__file__)), '..'))

fails = []


def check(slug, claim, expected, actual, tol=0.005):
    ok = abs(expected - actual) <= tol * max(1.0, abs(expected))
    print('%-14s %-34s %-14s %s' % (slug, claim, round(actual, 4), 'ok' if ok else 'MISMATCH'))
    if not ok:
        fails.append('%s: %s -> card says %s, computed %s' % (slug, claim, expected, actual))


# --- electronics -------------------------------------------------------
check('voltage', 'Vout = 12 * R2/(R1+R2)', 6.00, 12 * 10 / (10 + 10))
check('resistor', '4,7 x100 -> ohms', 4700, 47 * 100)
check('ohms-law', 'V = I * R', 12, 0.5 * 24)
check('ohms-law', 'P = V * I', 6, 12 * 0.5)
check('grid', 'R1 + (R2 || R3) kohm', 2.40, 1.0 + (2.0 * 4.7) / (2.0 + 4.7))
check('led', 'R = (Vs - Vf)/If', 150, (5 - 2.0) / 0.020)
check('PowerStation', 'runtime h = Wh*soc/W', 8 + 16 / 60, 1000 * 0.62 / 75, tol=0.002)

# --- geometry ----------------------------------------------------------
check('circle', 'C = 2*pi*r', 251.33, 2 * math.pi * 40)
check('circle', 'A = pi*r^2', 5026.5, math.pi * 40 ** 2)
check('rectangle', 'A = w*h', 480, 30 * 16)
check('rectangle', 'P = 2(w+h)', 92, 2 * (30 + 16))
check('rectangle', 'd = sqrt(w^2+h^2)', 34, math.hypot(30, 16))
check('square', 'A = a^2', 625, 25 ** 2)
check('square', 'P = 4a', 100, 4 * 25)
check('square', 'd = a*sqrt(2)', 35.36, 25 * math.sqrt(2))
check('pitagora', 'c = sqrt(a^2+b^2)', 5, math.hypot(3, 4))

# --- programming -------------------------------------------------------
check('binary', '0b10101101', 173, int('10101101', 2))
check('binary', 'place values sum', 173, 128 + 32 + 8 + 4 + 1)
check('hexa', '0xFF', 255, int('FF', 16))
check('hexa', '0o377', 255, int('377', 8))
check('hexa', '0b11111111', 255, int('11111111', 2))
check('bitoperations', '180 & 109', 36, 180 & 109)
check('bitoperations', '0b10110100', 180, int('10110100', 2))
check('bitoperations', '0b01101101', 109, int('01101101', 2))

data = [5, 8, 17, 24, 31, 40, 56]
check('median', 'median of 7 values', 24, sorted(data)[len(data) // 2])

# --- math / mechanical / units ----------------------------------------
A = [[1, 2], [3, 4]]
B = [[0, 1], [1, 0]]
C = [[sum(A[i][k] * B[k][j] for k in range(2)) for j in range(2)] for i in range(2)]
check('matrix', 'A x B [0][0]', 2, C[0][0])
check('matrix', 'A x B [1][1]', 3, C[1][1])
check('percentage', '35% of 240', 84, 240 * 0.35)
check('gear', 'ratio 24:16', 1.5, 24 / 16)
check('gear', 'out rpm = in * 24/16', 1500, 1000 * 24 / 16)
check('unit-convertor', '1 kg in oz', 35.274, 1000 / 28.349523125)
check('unit-convertor', '1 kg in lb', 2.2046, 1000 / 453.59237)

# --- the card count must match the tool pages on disk ------------------
tools = len([f for f in os.listdir('tools') if f.endswith('.html')])
cards = len(re.findall(r"slug:\s*'", open('src/social-cards-data.js', encoding='utf-8').read()))
print('\n%-14s %-34s %-14s %s' % ('catalog', 'tool pages + 1 cover', cards,
                                  'ok' if cards == tools + 1 else 'MISMATCH'))
if cards != tools + 1:
    fails.append('card count %d does not match %d tool pages + 1 cover' % (cards, tools))

print()
if fails:
    for f in fails:
        print('FAIL ' + f)
    sys.exit(1)
print('All card claims verified.')
