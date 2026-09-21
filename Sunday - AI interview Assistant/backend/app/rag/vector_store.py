import json
import logging
from pathlib import Path

import numpy as np

logger = logging.getLogger(__name__)


class VectorStore:
    def __init__(self):
        self.index = None
        self.metadata: list[dict] = []
        self.dimension: int = 384
        self.store_path = Path("data/vector_store")

    async def initialize(self, dimension: int = 384):
        self.dimension = dimension
        self.store_path.mkdir(parents=True, exist_ok=True)

    async def add(self, vectors: np.ndarray, metadata_list: list[dict]):
        import faiss
        if self.index is None:
            self.index = faiss.IndexFlatL2(self.dimension)
        self.index.add(vectors.astype(np.float32))
        self.metadata.extend(metadata_list)

    async def search(self, query_vector: np.ndarray, top_k: int = 5) -> list[dict]:
        if self.index is None or self.index.ntotal == 0:
            return []
        distances, indices = self.index.search(query_vector.astype(np.float32), min(top_k, self.index.ntotal))
        results = []
        for dist, idx in zip(distances[0], indices[0]):
            if idx < len(self.metadata):
                results.append({
                    **self.metadata[idx],
                    "score": float(1 / (1 + dist)),
                })
        return results

    async def delete_by_document(self, document_id: str):
        if not self.metadata:
            return
        keep_mask = [m.get("document_id") != document_id for m in self.metadata]
        if not any(keep_mask):
            self.index = None
            self.metadata = []
            return
        import faiss
        kept_vectors = []
        kept_metadata = []
        if self.index is not None:
            all_vectors = faiss.rev_swig_ptr(self.index.get_xb(), self.index.ntotal * self.dimension)
            all_vectors = all_vectors.reshape(self.index.ntotal, self.dimension)
            for i, keep in enumerate(keep_mask):
                if keep:
                    kept_vectors.append(all_vectors[i])
                    kept_metadata.append(self.metadata[i])
        if kept_vectors:
            self.index = faiss.IndexFlatL2(self.dimension)
            self.index.add(np.array(kept_vectors).astype(np.float32))
            self.metadata = kept_metadata
        else:
            self.index = None
            self.metadata = []

    async def save(self, name: str = "default"):
        if self.index is None:
            return
        import faiss
        dir_path = self.store_path / name
        dir_path.mkdir(parents=True, exist_ok=True)
        faiss.write_index(self.index, str(dir_path / "index.faiss"))
        (dir_path / "metadata.json").write_text(json.dumps(self.metadata, indent=2))

    async def load(self, name: str = "default"):
        import faiss
        dir_path = self.store_path / name
        index_path = dir_path / "index.faiss"
        meta_path = dir_path / "metadata.json"
        if index_path.exists():
            self.index = faiss.read_index(str(index_path))
            self.dimension = self.index.d
            if meta_path.exists():
                self.metadata = json.loads(meta_path.read_text())
            logger.info(f"Loaded vector store: {name} ({self.index.ntotal} vectors)")

    @property
    def count(self) -> int:
        return self.index.ntotal if self.index else 0


_vector_store: VectorStore | None = None


async def get_vector_store() -> VectorStore:
    global _vector_store
    if _vector_store is None:
        _vector_store = VectorStore()
        await _vector_store.initialize()
        await _vector_store.load()
    return _vector_store
