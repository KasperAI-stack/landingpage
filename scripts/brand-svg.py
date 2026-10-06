"""Bygger Hey Ottos glasbobler som rene SVG'er, i en version til lyst og en til mørkt tema.

Kør fra projektets rod:  python3 scripts/brand-svg.py site/assets/brand
Filerne i site/assets/brand bliver overskrevet. Selve siden har intet build-step, SVG'erne ligger færdige i repoet.
"""
import os, sys

OUT = sys.argv[1] if len(sys.argv) > 1 else 'site/assets/brand'
ONYX, TAAGE = '#0F0E13', '#F4F2F8'

# Glasbobler (billede 2 og 3). Én version til lyst tema og én til mørkt tema.
IRIS = [(0, '#7C3AED'), (.2, '#38BDF8'), (.4, '#34D399'), (.6, '#FDE047'), (.8, '#FB7185'), (1, '#C026D3')]

def bubble(name, W, H, d, shadow_dx, shadow_dy, hls, iris, dark=False):
    ink = TAAGE if dark else ONYX
    fill_a = (.03, .07) if dark else (.07, .14)
    cres_a = .5 if dark else .96
    rim_a = .55 if dark else .5
    defs = [
        f'<radialGradient id="in" cx=".62" cy=".38" r=".75"><stop offset="0" stop-color="{ink}" stop-opacity="{fill_a[0]}"/><stop offset="1" stop-color="{ink}" stop-opacity="{fill_a[1]}"/></radialGradient>',
        '<filter id="b6" x="-20%" y="-20%" width="140%" height="140%"><feGaussianBlur stdDeviation="7"/></filter>',
        '<filter id="b2" x="-20%" y="-20%" width="140%" height="140%"><feGaussianBlur stdDeviation="1.6"/></filter>',
        '<filter id="b1" x="-10%" y="-10%" width="120%" height="120%"><feGaussianBlur stdDeviation=".7"/></filter>',
        f'<path id="p" d="{d}"/>',
        f'<clipPath id="cp"><use href="#p"/></clipPath>',
        f'<mask id="cr" maskUnits="userSpaceOnUse" x="0" y="0" width="{W}" height="{H}"><use href="#p" fill="#fff"/><use href="#p" fill="#000" transform="translate({shadow_dx} {shadow_dy})" filter="url(#b4)"/></mask>',
        '<filter id="b4" x="-20%" y="-20%" width="140%" height="140%"><feGaussianBlur stdDeviation="4"/></filter>',
        '<linearGradient id="ir" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="70" y2="40" spreadMethod="reflect">' + ''.join(f'<stop offset="{o}" stop-color="{c}"/>' for o, c in IRIS) + '</linearGradient>',
    ]
    body = [
        '<use href="#p" fill="url(#in)"/>',
        f'<g clip-path="url(#cp)"><use href="#p" fill="{ink}" fill-opacity="{cres_a}" mask="url(#cr)" filter="url(#b2)"/></g>',
        f'<use href="#p" fill="none" stroke="{ink}" stroke-opacity="{rim_a * .55}" stroke-width="10" filter="url(#b2)"/>',
        f'<use href="#p" fill="none" stroke="{ink}" stroke-opacity="{rim_a}" stroke-width="2"/>',
    ]
    for cx, cy, rx, ry, rot, a in hls:
        body.append(f'<ellipse cx="{cx}" cy="{cy}" rx="{rx}" ry="{ry}" transform="rotate({rot} {cx} {cy})" fill="#fff" fill-opacity="{a}" filter="url(#b1)"/>')
    for start, length in iris:
        body.append(f'<path d="{d}" fill="none" stroke="url(#ir)" stroke-width="3.5" stroke-linecap="round" pathLength="100" stroke-dasharray="{length} {100 - length}" stroke-dashoffset="{-start}" opacity=".9"/>')
    svg = (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {W} {H}" width="{W}" height="{H}">\n'
           f'<defs>{"".join(defs)}</defs>\n{"".join(body)}\n</svg>\n')
    open(os.path.join(OUT, name + ('-moerk' if dark else '') + '.svg'), 'w').write(svg)

def bobler():
    # Boble 1: lidt skæv, med tyk mørk kant nederst til venstre
    d1 = 'M245 22C378 16 466 112 468 248C470 386 380 478 252 488C150 496 74 448 38 360C8 282 12 182 62 112C106 52 170 25 245 22Z'
    for dark in (False, True):
        bubble('boble-1', 500, 510, d1, 26, -22,
               [(120, 130, 70, 50, -42, .97), (392, 412, 50, 38, -30, .9)],
               [(56, 9), (31, 5)], dark)
    # Boble 2: næsten rund og let skrå, med højlys øverst til højre
    d2 = 'M250 20C378 18 476 104 478 232C480 362 386 462 252 470C120 478 22 384 20 252C18 120 122 22 250 20Z'
    for dark in (False, True):
        bubble('boble-2', 500, 490, d2, 14, -12,
               [(330, 110, 78, 50, 22, .95), (395, 175, 14, 9, 40, .6)],
               [(62, 10)], dark)

bobler()
