"""Bygger Hey Ottos brand-elementer som rene SVG'er: farvede felter bag rillet glas og glasbobler.

Kør fra projektets rod:  python3 scripts/brand-svg.py site/assets/brand
Filerne i site/assets/brand bliver overskrevet. Selve siden har intet build-step, SVG'erne ligger færdige i repoet.
"""
import math, random, sys, os

OUT = sys.argv[1] if len(sys.argv) > 1 else 'site/assets/brand'
VIOLET, DEEP, ORCHID, ONYX, TAAGE = '#7C3AED', '#4C1D95', '#C026D3', '#0F0E13', '#F4F2F8'
# Lilla mellem Violet og Orkidé (samme farve som i trinenes ikoner), så felterne får samme lyse lilla som originalerne
LILLA = '#9333EA'

def f(x):
    s = f'{x:.2f}'.rstrip('0').rstrip('.')
    return s if s not in ('-0', '') else '0'

def stops(lst):
    return ''.join(f'<stop offset="{f(o)}" stop-color="{c}" stop-opacity="{f(a)}"/>' for o, c, a in lst)

def radial(gid, cx, cy, rx, ry, st, rot=0):
    return (f'<radialGradient id="{gid}" gradientUnits="userSpaceOnUse" cx="0" cy="0" r="1" '
            f'gradientTransform="translate({f(cx)} {f(cy)}) rotate({f(rot)}) scale({f(rx)} {f(ry)})">{stops(st)}</radialGradient>')

def blob(gid, cx, cy, rx, ry, color, a, rot=0, core=0.0):
    """Blød plet: fuld styrke i midten (op til 'core'), som toner ud mod kanten."""
    st = [(0, color, a), (core, color, a), (core + (1 - core) * .45, color, a * .55), (1, color, 0)]
    return radial(gid, cx, cy, rx, ry, st, rot)

def ring(gid, cx, cy, r, w, color, a):
    o = r / (r + w)
    st = [(0, color, a * .25), (max(o - .35, 0), color, a * .1), (o, color, a), (min(o + (1 - o) * .55, .99), color, a * .35), (1, color, 0)]
    return radial(gid, cx, cy, r + w, r + w, st)

def fluted(name, W, H, layers, angle=0, rib=(10, 20), k=(.55, .8), shift=3, shade=(.7, 1, .82),
           edge=('rect', .1), seed=1, sheen=False):
    """layers: liste af (gradient-def, id). Hver lag fylder hele fladen med sin gradient.
    angle: rillernes retning (0 = lodrette riller, 90 = vandrette).
    k: hvor meget hver rille presser billedet bag sig sammen. shade: lysstyrke over hver rille."""
    rnd = random.Random(seed)
    cx, cy = W / 2, H / 2
    if angle == 0:
        x0, x1, y0, y1 = 0, W, 0, H
    elif angle == 90:  # vandrette riller: akserne byttes
        x0, x1, y0, y1 = cx - H / 2, cx + H / 2, cy - W / 2, cy + W / 2
    else:  # skrå riller: dæk hele diagonalen
        D = math.hypot(W, H)
        x0, x1, y0, y1 = cx - D / 2, cx + D / 2, cy - D / 2, cy + D / 2
    defs, strips, shades = [], [], []
    base = [l for l in layers if len(l) == 2]
    hl = [l for l in layers if len(l) == 3]
    for l in layers:
        defs.append(l[0])
    scene = ''.join(f'<rect x="{f(-W)}" y="{f(-H)}" width="{f(3*W)}" height="{f(3*H)}" fill="url(#{l[1]})"/>' for l in base)
    defs.append(f'<g id="s">{scene}</g>')
    if hl:
        defs.append('<g id="h">' + ''.join(f'<rect x="{f(-W)}" y="{f(-H)}" width="{f(3*W)}" height="{f(3*H)}" fill="url(#{l[1]})"/>' for l in hl) + '</g>')
    rot = f' rotate({f(-angle)} {f(cx)} {f(cy)})' if angle else ''
    tr_in = f' transform="{rot.strip()}"' if angle else ''
    x, n = x0, 0
    while x < x1:
        w = rnd.uniform(*rib)
        c = x + w / 2
        kk = rnd.uniform(*k)
        s = rnd.uniform(-shift, shift)
        defs.append(f'<clipPath id="c{n}"><rect x="{f(x)}" y="{f(y0)}" width="{f(w + .6)}" height="{f(y1 - y0)}"/></clipPath>')
        strips.append(f'<g clip-path="url(#c{n})"><use href="#s" transform="translate({f(c + s)} 0) scale({f(kk)} 1) translate({f(-c)} 0){rot}"/></g>')
        shades.append(f'<rect x="{f(x)}" y="{f(y0)}" width="{f(w + .6)}" height="{f(y1 - y0)}"/>')
        x += w
        n += 1
    g = lambda v: '#%02x%02x%02x' % ((round(255 * v),) * 3)
    if len(shade) == 3:
        shade = [(0, shade[0]), (.55, shade[1]), (1, shade[2])]
    defs.append('<linearGradient id="sh">' + ''.join(f'<stop offset="{f(o)}" stop-color="{g(v)}"/>' for o, v in shade) + '</linearGradient>')
    defs.append(f'<mask id="r" maskUnits="userSpaceOnUse" x="{f(x0)}" y="{f(y0)}" width="{f(x1-x0)}" height="{f(y1-y0)}"><g fill="url(#sh)">{"".join(shades)}</g></mask>')
    hstr = ''
    if sheen:
        defs.append('<linearGradient id="sg"><stop offset="0" stop-color="#fff" stop-opacity=".16"/><stop offset=".3" stop-color="#fff" stop-opacity="0"/><stop offset=".7" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".18"/></linearGradient>')
        hstr += f'<g fill="url(#sg)">{"".join(shades)}</g>'
    if hl:
        defs.append('<linearGradient id="hg"><stop offset=".1" stop-color="#000"/><stop offset=".45" stop-color="#fff"/><stop offset=".9" stop-color="#000"/></linearGradient>')
        defs.append(f'<mask id="hm" maskUnits="userSpaceOnUse" x="{f(x0)}" y="{f(y0)}" width="{f(x1-x0)}" height="{f(y1-y0)}"><g fill="url(#hg)">{"".join(shades)}</g></mask>')
        hstr += f'<g mask="url(#hm)"><use href="#h"{tr_in}/></g>'
    kind, amt = edge
    if kind == 'rect':
        fx = f'<linearGradient id="fx"><stop offset="0" stop-color="#000"/><stop offset="{f(amt)}" stop-color="#fff"/><stop offset="{f(1-amt)}" stop-color="#fff"/><stop offset="1" stop-color="#000"/></linearGradient>'
        fy = fx.replace('id="fx"', 'id="fy" x2="0" y2="1"')
        defs += [fx, fy,
                 f'<mask id="mx" maskUnits="userSpaceOnUse" x="0" y="0" width="{W}" height="{H}"><rect width="{W}" height="{H}" fill="url(#fx)"/></mask>',
                 f'<mask id="my" maskUnits="userSpaceOnUse" x="0" y="0" width="{W}" height="{H}"><rect width="{W}" height="{H}" fill="url(#fy)"/></mask>']
        open_, close = '<g mask="url(#my)"><g mask="url(#mx)">', '</g></g>'
    elif kind == 'ellipse':
        defs += [f'<radialGradient id="fe"><stop offset="{f(amt)}" stop-color="#fff"/><stop offset="1" stop-color="#000"/></radialGradient>',
                 f'<mask id="me" maskUnits="userSpaceOnUse" x="0" y="0" width="{W}" height="{H}"><rect width="{W}" height="{H}" fill="url(#fe)"/></mask>']
        open_, close = '<g mask="url(#me)">', '</g>'
    else:
        open_, close = '<g>', '</g>'
    tr = f' transform="rotate({f(angle)} {f(cx)} {f(cy)})"' if angle else ''
    par = ' preserveAspectRatio="xMidYMid slice"' if sheen else ''
    svg = (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {W} {H}" width="{W}" height="{H}"{par}>\n'
           f'<defs>{"".join(defs)}</defs>\n'
           f'{open_}<g{tr}><g{"" if sheen else " mask=\"url(#r)\""}>{"".join(strips)}</g>{hstr}</g>{close}\n</svg>\n')
    open(os.path.join(OUT, name + '.svg'), 'w').write(svg)
    return svg

def field(gid, W, H, color, a):
    return radial(gid, W / 2, H / 2, W * .75, H * .75, [(0, color, a), (.8, color, a * .85), (1, color, a * .6)])

# Rillernes lys: lav værdi = lysere stribe. Lys kant, mørkere krop.
RIB = [(0, .42), (.2, 1), (.62, .84), (1, .5)]
RIB_SOFT = [(0, .56), (.2, 1), (.62, .86), (1, .62)]
HL = lambda gid, cx, cy, rx, ry, a=1, rot=0: (radial(gid, cx, cy, rx, ry, [(0, '#fff', a), (.55, '#fff', a * .55), (1, '#fff', 0)], rot), gid, 'hl')

# Lilla felter (fra billede 1)
def lilla():
    W, H = 400, 260
    fluted('riller-diagonal', W, H, [
        (field('a0', W, H, LILLA, .16), 'a0'),
        (blob('a1', 200, 125, 200, 95, LILLA, .46, rot=38), 'a1'),
        HL('a2', 205, 128, 95, 32, 1, rot=38),
    ], angle=-50, rib=(9, 15), k=(.45, .75), shade=RIB, seed=3)
    fluted('riller-lodret', W, H, [
        (field('b0', W, H, LILLA, .17), 'b0'),
        (blob('b1', 200, 130, 170, 110, LILLA, .45), 'b1'),
        HL('b2', 200, 128, 110, 70, 1),
    ], rib=(7, 13), k=(.4, .75), shade=RIB, seed=4)
    fluted('riller-vandret', W, H, [
        (field('c0', W, H, LILLA, .1), 'c0'),
        (blob('c1', 200, 150, 170, 90, LILLA, .2), 'c1'),
        HL('c2', 205, 172, 105, 34, 1),
    ], angle=90, rib=(6, 12), k=(.5, .8), shade=RIB, seed=5)
    fluted('riller-to-pletter', W, H, [
        (field('d0', W, H, LILLA, .1), 'd0'),
        (blob('d1', 120, 90, 100, 90, LILLA, .55, core=.1), 'd1'),
        (blob('d2', 315, 180, 100, 90, LILLA, .55, core=.1), 'd2'),
    ], rib=(5, 10), k=(.6, .85), shift=2, shade=RIB_SOFT, seed=6)
    W, H = 1000, 440
    fluted('riller-bred', W, H, [
        (field('n0', W, H, LILLA, .1), 'n0'),
        (blob('n1', 230, 170, 250, 190, LILLA, .55, core=.1), 'n1'),
        (blob('n2', 790, 280, 250, 190, LILLA, .55, core=.1), 'n2'),
    ], rib=(7, 14), k=(.6, .85), shift=2, shade=RIB_SOFT, edge=('rect', .14), seed=16)
    S = 260
    fluted('riller-hjoerne', S, S, [
        (radial('e0', 70, 70, 300, 300, [(0, LILLA, .22), (.6, LILLA, .1), (1, LILLA, 0)]), 'e0'),
        (blob('e1', 70, 70, 125, 125, LILLA, .55, core=.08), 'e1'),
    ], rib=(6, 12), k=(.6, .85), shift=2, shade=RIB_SOFT, seed=7)
    fluted('riller-ring', S, S, [
        (field('f0', S, S, LILLA, .06), 'f0'),
        (ring('f1', 130, 130, 66, 62, LILLA, .42), 'f1'),
    ], rib=(6, 12), k=(.65, .9), shift=2, shade=RIB_SOFT, edge=('ellipse', .55), seed=8)
    fluted('riller-svag', S, S, [
        (field('g0', S, S, LILLA, .11), 'g0'),
        (blob('g1', 135, 140, 90, 90, LILLA, .08), 'g1'),
    ], rib=(7, 13), k=(.7, .9), shift=2, shade=RIB_SOFT, seed=9)
    fluted('riller-midte', S, S, [
        (field('h0', S, S, LILLA, .09), 'h0'),
        (blob('h1', 130, 140, 85, 90, LILLA, .34), 'h1'),
    ], rib=(7, 13), k=(.7, .9), shift=2, shade=RIB_SOFT, seed=10)
    fluted('riller-lys', S, S, [
        (field('i0', S, S, LILLA, .13), 'i0'),
        (blob('i1', 175, 165, 110, 110, LILLA, .34), 'i1'),
    ], rib=(5, 10), k=(.6, .9), shift=2, shade=RIB, seed=11)
    fluted('riller-moerk', S, S, [
        (field('j0', S, S, LILLA, .24), 'j0'),
        (blob('j1', 132, 138, 128, 128, VIOLET, .82, core=.42), 'j1'),
        (blob('j2', 132, 142, 105, 105, DEEP, .45, core=.25), 'j2'),
    ], rib=(6, 12), k=(.75, .92), shift=2, shade=RIB_SOFT, seed=12)

# Sort og grå (billede 4 og 5)
def neutral():
    S = 540
    fluted('riller-sort', S, S, [
        (blob('k1', 320, 255, 175, 120, ONYX, 1, rot=-50, core=.25), 'k1'),
        (blob('k2', 300, 270, 250, 210, ONYX, .55, rot=-40, core=.1), 'k2'),
        (blob('k3', 180, 330, 150, 120, ONYX, .18), 'k3'),
    ], rib=(7, 13), k=(.55, .85), shift=4, shade=[(0, .45), (.2, 1), (.6, .85), (1, .5)], edge=('none', 0), seed=13)
    fluted('riller-graa', S, S, [
        (blob('l1', 270, 285, 245, 92, ONYX, .74, core=.18), 'l1'),
    ], rib=(26, 28), k=(.8, .84), shift=0, shade=[(0, .78), (.05, 1), (.9, .9), (1, .76)], edge=('none', 0), seed=14)

lilla()
neutral()

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

# Produktpanelet: samme farver som før, nu bag rillet glas. Fylder hele fladen.
def panel():
    W, H = 1200, 700
    base = ('<linearGradient id="m0" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="%d" y2="%d">'
            '<stop offset="0" stop-color="#1E1C24"/><stop offset=".55" stop-color="%s"/><stop offset="1" stop-color="#1E1C24"/></linearGradient>') % (W, H, DEEP)
    fluted('panel', W, H, [
        (base, 'm0'),
        (blob('m1', 0, H, W * .45, H * .55, ORCHID, .8), 'm1'),
        (blob('m2', W, 0, W * .42, H * .5, VIOLET, .95), 'm2'),
        (blob('m3', W * .95, H * .95, W * .33, H * .42, '#F472B6', .55), 'm3'),
    ], rib=(18, 30), k=(.6, .85), shift=6, edge=('none', 0), sheen=True, seed=15)

panel()
