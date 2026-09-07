"""Render Italian artwork from the privately supplied vector proof.

Requires pypdf and Pillow. Pass the private source PDF and a Poppler pdftoppm
executable. The outlined English reception heading is retained until the
original Geographica Script font or an outlined Italian heading is available. Only the
cropped, metadata-free lossless WebPs belong in the public directory.
"""
import argparse
import subprocess
from pathlib import Path

from PIL import Image
from pypdf import PdfReader, PdfWriter
from pypdf.generic import ContentStream, DecodedStreamObject, NameObject, RectangleObject

parser = argparse.ArgumentParser(description=__doc__)
parser.add_argument('--source', type=Path, required=True)
parser.add_argument('--renderer', required=True)
args = parser.parse_args()
reader = PdfReader(args.source)
out = Path('public/petri-turicensis-vi-mmxxvii-it/assets')
out.mkdir(parents=True, exist_ok=True)
tmp = Path('tmp/pdfs/italian')
tmp.mkdir(parents=True, exist_ok=True)


def remove_text(page, font_name):
    stream = ContentStream(page.get_contents(), reader)
    operations, block = [], None
    for operands, operator in stream.operations:
        if operator == b'BT':
            block = []
        if block is not None:
            block.append((operands, operator))
            if operator == b'ET':
                if any(op == b'Tf' and str(values[0]) == font_name for values, op in block):
                    # Graphics colour set inside BT also colours the following foliage.
                    operations.extend((values, op) for values, op in block if op not in (b'Tj', b'TJ', b"'", b'"'))
                else:
                    operations.extend(block)
                block = None
        else:
            operations.append((operands, operator))
    stream.operations = operations
    page[NameObject('/Contents')] = stream


def lettering(page, font_name, lines, centre, size, colour):
    font = page['/Resources']['/Font'][font_name].get_object()
    codes = {}
    code = 0
    for item in font['/Encoding']['/Differences']:
        if isinstance(item, int):
            code = item
        else:
            glyph = str(item)[1:]
            character = {'space': ' ', 'period': '.', 'comma': ',', 'quotesingle': "'",
                         'Udieresis': 'Ü', 'one': '1', 'two': '2', 'zero': '0'}.get(glyph, glyph)
            codes[character] = code
            code += 1
    tracking = size * 0.065
    def advance(character):
        return float(font['/Widths'][codes[character] - int(font['/FirstChar'])]) * size / 1000 + tracking
    commands = ['q', colour + ' rg']
    for text, baseline in lines:
        normalised = text.replace('Ì', 'I').replace('’', "'")
        width = sum(advance(c) for c in normalised) - tracking
        start = centre - width / 2
        encoded = bytes(codes[c] for c in normalised).hex()
        commands.append(f'BT {font_name} {size} Tf {tracking} Tc 0 Tw 1 0 0 1 {start} {baseline} Tm <{encoded}> Tj ET')
        # The source subset has I but no Igrave. Add its grave accent as a vector
        # mark at the petite-cap height, leaving every original glyph intact.
        for index, character in enumerate(text):
            if character == 'Ì':
                x = start + sum(advance(c) for c in normalised[:index])
                y = baseline
                commands.append(f'{x+size*.08} {y+size*.63} m {x+size*.12} {y+size*.64} l '
                                f'{x+size*.25} {y+size*.50} l {x+size*.22} {y+size*.49} l h f')
    commands.append('Q')
    stream = DecodedStreamObject()
    stream.set_data(page.get_contents().get_data() + ('\n' + '\n'.join(commands)).encode('ascii'))
    page[NameObject('/Contents')] = stream


def export(page, crop, stem, sizes):
    page.cropbox = RectangleObject(crop)
    writer = PdfWriter()
    writer.add_page(page)
    pdf = tmp / f'{stem}.pdf'
    with pdf.open('wb') as target:
        writer.write(target)
    for width, height in sizes:
        prefix = tmp / f'{stem}-{width}'
        subprocess.run([args.renderer, '-cropbox', '-singlefile', '-scale-to-x', str(width),
                        '-scale-to-y', str(height), '-png', str(pdf), str(prefix)], check=True)
        image = Image.open(prefix.with_suffix('.png')).convert('RGB')
        assert image.size == (width, height)
        clean = Image.new('RGB', image.size)
        clean.paste(image)
        clean.save(out / f'{stem}-{width}.webp', lossless=True, method=6)


invitation = reader.pages[3]
remove_text(invitation, '/T1_1')
lettering(invitation, '/T1_1', [
    ('IL DOTT. PEDRO DAGO', 574.55),
    ('E LA SIGNORA ANGELA DAGO', 558.53),
    ('HANNO L’ONORE DI INVITARVI', 542.50),
    ('AL MATRIMONIO DELLA LORO FIGLIA', 526.48),
    ('CON', 464.65),
    ('FIGLIO DEL SIGNOR RENZO CARTA', 408.585),
    ('E DELLA SIGNORA ANNE CARTA', 392.561),
    ('VENERDÌ UNDICI GIUGNO', 354.288),
    ('DUEMILAVENTISETTE', 338.263),
    ('ALLE ORE QUATTORDICI', 322.239),
    ('KIRCHE ST. PETER', 283.075),
    ('ZURIGO, SVIZZERA', 267.050),
], 307, 11.5699, '0.522 0.529 0.447')
export(invitation, [130.782, 151.086, 483.218, 695.761], 'invitation', [(1320, 2040), (2640, 4080)])

reception = reader.pages[4]
remove_text(reception, '/T1_2')
reception['/Resources']['/Font'][NameObject('/ItCaps')] = invitation['/Resources']['/Font'].raw_get('/T1_1')
lettering(reception, '/ItCaps', [
    ('HOTEL SONNE', 536.213),
    ('KÜSNACHT, SVIZZERA', 505.966),
], 306.5, 11.76, '1 1 1')
lettering(reception, '/T1_2', [('SEESTRASSE 120', 521.089)], 306.5, 11.76, '1 1 1')
export(reception, [155.3, 427.66, 457.7, 639.34], 'reception', [(2640, 1848)])
print('Rendered lossless artwork. Reception heading remains English pending the original script font.')
