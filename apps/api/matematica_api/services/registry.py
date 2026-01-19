import json
from pathlib import Path
from typing import Dict, List, Optional

from ..models.algorithm import AlgorithmMeta


class AlgorithmRegistry:
    def __init__(self, algorithms_dir: Optional[Path] = None) -> None:
        self.algorithms_dir = algorithms_dir or Path(__file__).resolve().parent.parent / "algorithms"
        self._meta_by_slug: Dict[str, AlgorithmMeta] = {}
        self._docs_by_slug: Dict[str, str] = {}
        self.reload()

    def reload(self) -> None:
        self._meta_by_slug.clear()
        self._docs_by_slug.clear()
        if not self.algorithms_dir.exists():
            return

        for folder in self.algorithms_dir.iterdir():
            if not folder.is_dir():
                continue
            meta_path = folder / "meta.json"
            docs_path = folder / "docs.md"
            if not meta_path.exists():
                continue
            try:
                meta_data = json.loads(meta_path.read_text())
                meta = AlgorithmMeta.model_validate(meta_data)
            except Exception:
                continue
            self._meta_by_slug[meta.slug] = meta
            if docs_path.exists():
                self._docs_by_slug[meta.slug] = docs_path.read_text()

    def list_algorithms(self) -> List[AlgorithmMeta]:
        return list(self._meta_by_slug.values())

    def get_meta(self, slug: str) -> Optional[AlgorithmMeta]:
        return self._meta_by_slug.get(slug)

    def get_docs(self, slug: str) -> str:
        return self._docs_by_slug.get(slug, "")

    def algorithm_module_path(self, slug: str) -> Optional[str]:
        if slug not in self._meta_by_slug:
            return None
        return f"matematica_api.algorithms.{slug}.algo"
