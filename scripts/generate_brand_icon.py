"""
Generate the Matrix Helper brand icon.

One-off script that renders the same MDI "matrix" glyph used as the
entity's default icon (see MatrixHelperEntity._attr_icon), at the sizes
home-assistant/brands requires for local integration icons: 256x256 and
512x512, square, transparent background, PNG. Keeping the brand icon and
the entity's default icon visually identical matches the convention used
by Home Assistant's other built-in helpers (input_number, counter, etc.).

Run once via `python scripts/generate_brand_icon.py`; not part of any
build step. See custom_components/matrix_helper/brand/.

The path data below is the MDI "matrix" icon (24x24 viewBox), copied from
https://github.com/Templarian/MaterialDesign-SVG/blob/master/svg/matrix.svg
(Apache-2.0 licensed).
"""

from __future__ import annotations

from pathlib import Path

import cairosvg

BRAND_DIR = (
    Path(__file__).resolve().parent.parent
    / "custom_components"
    / "matrix_helper"
    / "brand"
)

ICON_COLOR = "#03A9F4"  # Home Assistant-ish blue

MDI_MATRIX_PATH = (
    "M2,2H6V4H4V20H6V22H2V2M20,4H18V2H22V22H18V20H20V4M9,5H10V10H11V11H8V10H9"
    "V6L8,6.5V5.5L9,5M15,13H16V18H17V19H14V18H15V14L14,14.5V13.5L15,13M9,13"
    "C10.1,13 11,14.34 11,16C11,17.66 10.1,19 9,19C7.9,19 7,17.66 7,16C7,14.34"
    " 7.9,13 9,13M9,14C8.45,14 8,14.9 8,16C8,17.1 8.45,18 9,18C9.55,18 10,17.1"
    " 10,16C10,14.9 9.55,14 9,14M15,5C16.1,5 17,6.34 17,8C17,9.66 16.1,11 15,11"
    "C13.9,11 13,9.66 13,8C13,6.34 13.9,5 15,5M15,6C14.45,6 14,6.9 14,8C14,9.1"
    " 14.45,10 15,10C15.55,10 16,9.1 16,8C16,6.9 15.55,6 15,6Z"
)


def draw_icon(size: int) -> bytes:
    """Render the MDI matrix glyph as PNG bytes at the given square size."""
    svg = f"""
    <svg xmlns="http://www.w3.org/2000/svg" width="{size}" height="{size}"
         viewBox="0 0 24 24">
      <path d="{MDI_MATRIX_PATH}" fill="{ICON_COLOR}" />
    </svg>
    """
    return cairosvg.svg2png(
        bytestring=svg.encode("utf-8"), output_width=size, output_height=size
    )


def main() -> None:
    """Write icon.png (256x256) and icon@2x.png (512x512) to BRAND_DIR."""
    BRAND_DIR.mkdir(parents=True, exist_ok=True)
    (BRAND_DIR / "icon.png").write_bytes(draw_icon(256))
    (BRAND_DIR / "icon@2x.png").write_bytes(draw_icon(512))


if __name__ == "__main__":
    main()
