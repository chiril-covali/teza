import os
from typing import Any, Dict, List, Optional, Tuple

import httpx


class GithubModelsClient:
    def __init__(self) -> None:
        self.token = os.getenv("GITHUB_TOKEN")
        self.model = os.getenv("GITHUB_MODELS_MODEL")
        self.endpoint = os.getenv(
            "GITHUB_MODELS_ENDPOINT",
            "https://models.github.ai/inference/chat/completions",
        )

    def is_configured(self) -> bool:
        return bool(self.token and self.model)

    def chat(self, messages: List[Dict[str, Any]]) -> Tuple[Optional[str], Optional[str]]:
        if not self.is_configured():
            return None, "GitHub Models credentials are not set. Provide GITHUB_TOKEN and GITHUB_MODELS_MODEL to enable chat."

        headers = {
            "Authorization": f"Bearer {self.token}",
            "Content-Type": "application/json",
            "Accept": "application/vnd.github+json",
            "X-GitHub-Api-Version": "2022-11-28",
        }
        payload = {
            "model": self.model,
            "messages": messages,
            "temperature": 0.2,
        }
        try:
            response = httpx.post(self.endpoint, headers=headers, json=payload, timeout=30)
            response.raise_for_status()
            data = response.json()
            choice = data.get("choices", [{}])[0]
            message = choice.get("message", {})
            return message.get("content", ""), None
        except Exception as exc:  # noqa: BLE001
            return None, f"GitHub Models request failed: {exc}"
