import logging
import numpy as np

logger = logging.getLogger(__name__)

_model = None
_model_name = "all-MiniLM-L6-v2"


def get_embedding_model():
    global _model
    if _model is None:
        try:
            from sentence_transformers import SentenceTransformer
            _model = SentenceTransformer(_model_name)
            logger.info(f"Loaded embedding model: {_model_name}")
        except Exception as e:
            logger.error(f"Failed to load embedding model: {e}")
            raise
    return _model


def generate_embeddings(texts: list[str]) -> np.ndarray:
    model = get_embedding_model()
    embeddings = model.encode(texts, show_progress_bar=False)
    return np.array(embeddings)


def generate_query_embedding(query: str) -> np.ndarray:
    model = get_embedding_model()
    embedding = model.encode([query], show_progress_bar=False)
    return np.array(embedding)
