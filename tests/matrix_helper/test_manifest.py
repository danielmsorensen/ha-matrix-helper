"""Tests for the matrix_helper manifest."""

from __future__ import annotations

import json
import re
from pathlib import Path

MANIFEST_PATH = Path("custom_components/matrix_helper/manifest.json")


def test_manifest_domain_and_metadata():
    manifest = json.loads(MANIFEST_PATH.read_text())

    assert manifest["domain"] == "matrix_helper"
    assert manifest["name"] == "Matrix Helper"
    assert manifest["config_flow"] is True
    assert manifest["integration_type"] == "helper"
    assert manifest["iot_class"] == "calculated"
    assert re.fullmatch(r"\d+\.\d+\.\d+", manifest["version"])
    assert manifest["codeowners"] == ["@danielmsorensen"]
    assert manifest["documentation"].startswith("https://github.com/")
    assert manifest["issue_tracker"].startswith("https://github.com/")
