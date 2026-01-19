import os
from datetime import datetime, timezone
from typing import Any, Dict, Optional, Tuple

import httpx

API_VERSION = "2022-11-28"


def fetch_rate_limit() -> Tuple[Optional[Dict[str, Any]], Optional[str]]:
    token = os.getenv("GITHUB_TOKEN")
    if not token:
        return None, "Missing GITHUB_TOKEN; set it in .env to fetch GitHub rate limits."

    headers = {
        "Authorization": f"Bearer {token}",
        "Accept": "application/vnd.github+json",
        "X-GitHub-Api-Version": API_VERSION,
    }

    try:
        response = httpx.get("https://api.github.com/rate_limit", headers=headers, timeout=10)
        response.raise_for_status()
        data = response.json()
        core = data.get("resources", {}).get("core", {})
        limit = core.get("limit")
        remaining = core.get("remaining")
        reset_ts = core.get("reset")
        reset_iso = None
        if isinstance(reset_ts, (int, float)):
            reset_iso = datetime.fromtimestamp(reset_ts, tz=timezone.utc).isoformat()
        return {
            "limit": limit,
            "remaining": remaining,
            "reset": reset_ts,
            "resetISO": reset_iso,
            "note": "Free-tier and authenticated REST limits vary by token; values are from /rate_limit core scope.",
        }, None
    except Exception as exc:  # noqa: BLE001
        return None, f"Failed to fetch rate limit: {exc}"
