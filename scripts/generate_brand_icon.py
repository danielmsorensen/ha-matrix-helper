"""
Generate the Matrix Helper brand icon.

One-off script that draws a simple grid motif at the sizes
home-assistant/brands requires for local integration icons: 256x256 and
512x512, square, transparent background, PNG.

Run once via `python scripts/generate_brand_icon.py`; not part of any
build step. See custom_components/matrix_helper/brand/.
"""

from __future__ import annotations

from pathlib import Path

from PIL import Image, ImageDraw

BRAND_DIR = (
    Path(__file__).resolve().parent.parent
    / "custom_components"
    / "matrix_helper"
    / "brand"
)

CELL_COLOR = (3, 169, 244, 255)  # Home Assistant-ish blue
ROWS = 2
COLUMNS = 3


def draw_icon(size: int) -> Image.Image:
    """Draw the grid-motif icon at the given square size."""
    image = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    draw = ImageDraw.Draw(image)

    margin = round(size * 0.16)
    gap = round(size * 0.07)
    grid_width = size - 2 * margin
    grid_height = size - 2 * margin
    cell_width = (grid_width - gap * (COLUMNS - 1)) / COLUMNS
    cell_height = (grid_height - gap * (ROWS - 1)) / ROWS
    radius = round(min(cell_width, cell_height) * 0.22)

    for row in range(ROWS):
        for column in range(COLUMNS):
            x0 = margin + column * (cell_width + gap)
            y0 = margin + row * (cell_height + gap)
            x1 = x0 + cell_width
            y1 = y0 + cell_height
            draw.rounded_rectangle([x0, y0, x1, y1], radius=radius, fill=CELL_COLOR)

    return image


def main() -> None:
    """Write icon.png (256x256) and icon@2x.png (512x512) to BRAND_DIR."""
    BRAND_DIR.mkdir(parents=True, exist_ok=True)
    draw_icon(256).save(BRAND_DIR / "icon.png")
    draw_icon(512).save(BRAND_DIR / "icon@2x.png")


if __name__ == "__main__":
    main()
