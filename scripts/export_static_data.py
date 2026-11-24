#!/usr/bin/env python3
import json
import shutil
from pathlib import Path

def main():
    repo_dir = Path(__file__).resolve().parent.parent
    data_dir = repo_dir / "dataset" / "data"
    media_dir = data_dir / "media"
    universes_dir = data_dir / "universes"
    sagas_dir = data_dir / "sagas"
    ratings_path = data_dir / "ratings.json"
    posters_dir = data_dir / "posters"

    out_base = repo_dir / "apps" / "web" / "public"
    out_api = out_base / "api" / "v1"
    out_api_media = out_api / "media"
    out_api_posters = out_api / "posters"
    out_posters = out_base / "posters"

    out_api_media.mkdir(parents=True, exist_ok=True)
    out_api_posters.mkdir(parents=True, exist_ok=True)
    out_posters.mkdir(parents=True, exist_ok=True)

    def normalize_poster_path(poster: str) -> str:
        if not poster:
            return ""
        if poster.startswith(("http://", "https://", "/api/v1/posters/")):
            return poster
        if poster.startswith("/posters/"):
            return poster.replace("/posters/", "/api/v1/posters/", 1)
        if poster.startswith("posters/"):
            return f"/api/v1/{poster}"
        return poster

    # 1. Load Ratings
    ratings_data = {}
    if ratings_path.exists():
        try:
            with open(ratings_path, "r", encoding="utf-8-sig") as f:
                ratings_data = json.load(f)
        except Exception as e:
            print(f"Warning: could not load ratings: {e}")

    # 2. Load Universes
    universes = []
    for fpath in sorted(universes_dir.glob("*.json")):
        with open(fpath, "r", encoding="utf-8-sig") as f:
            universes.append(json.load(f))

    # 3. Load Sagas
    sagas = []
    for fpath in sorted(sagas_dir.glob("*.json")):
        with open(fpath, "r", encoding="utf-8-sig") as f:
            data = json.load(f)
            if "poster" in data and isinstance(data["poster"], str):
                data["poster"] = normalize_poster_path(data["poster"])
            sagas.append(data)

    # 4. Load Media
    media_entries = []
    for fpath in sorted(media_dir.glob("*.json")):
        with open(fpath, "r", encoding="utf-8-sig") as f:
            doc = json.load(f)
            doc_id = doc.get("id")
            if "poster" in doc and isinstance(doc["poster"], str):
                doc["poster"] = normalize_poster_path(doc["poster"])
            if doc_id and doc_id in ratings_data:
                doc["reception"] = ratings_data[doc_id]
            media_entries.append(doc)

    # Sort media by release_date
    media_entries.sort(key=lambda x: x.get("release_date", ""))

    # 5. Build Graph
    nodes = [
        {
            "id": entry["id"],
            "title": entry["title"],
            "release_date": entry["release_date"],
            "saga": entry.get("saga"),
            "universe": entry["universe"],
            "mediatype": entry["mediatype"],
            "poster": entry["poster"],
        }
        for entry in media_entries
    ]

    latest_media_by_saga = {}
    for entry in media_entries:
        saga = entry.get("saga")
        if saga:
            curr = latest_media_by_saga.get(saga)
            if not curr or (entry.get("release_date", ""), entry["id"]) > (curr.get("release_date", ""), curr["id"]):
                latest_media_by_saga[saga] = entry

    latest_media_id_by_saga = {s: e["id"] for s, e in latest_media_by_saga.items()}

    def edge_targets(source_id: str, links: list) -> list:
        targets = []
        for link in links:
            if link.get("media_id"):
                targets.append(link["media_id"])
            elif link.get("saga_id"):
                tid = latest_media_id_by_saga.get(link["saga_id"])
                if tid and tid != source_id:
                    targets.append(tid)
        return list(dict.fromkeys(targets))

    edges = []
    for entry in media_entries:
        conn = entry.get("connections", {})
        for tid in edge_targets(entry["id"], conn.get("required", [])):
            edges.append({"source": entry["id"], "target": tid, "type": "required"})
        for tid in edge_targets(entry["id"], conn.get("optional", [])):
            edges.append({"source": entry["id"], "target": tid, "type": "optional"})
        for tid in edge_targets(entry["id"], conn.get("references", [])):
            edges.append({"source": entry["id"], "target": tid, "type": "references"})

    graph = {"nodes": nodes, "edges": edges}

    # 6. Write JSON files
    def write_json(path: Path, data):
        path.parent.mkdir(parents=True, exist_ok=True)
        with open(path, "w", encoding="utf-8") as f:
            json.dump(data, f, indent=2, ensure_ascii=False)

    write_json(out_api / "media.json", media_entries)
    write_json(out_api / "universes.json", universes)
    write_json(out_api / "sagas.json", sagas)
    write_json(out_api / "graph.json", graph)

    # Also write index.json inside directories in case routes request /api/v1/media/
    write_json(out_api / "media" / "index.json", media_entries)
    write_json(out_api / "universes" / "index.json", universes)
    write_json(out_api / "sagas" / "index.json", sagas)
    write_json(out_api / "graph" / "index.json", graph)

    for entry in media_entries:
        write_json(out_api_media / f"{entry['id']}.json", entry)

    # 7. Copy posters to out_api_posters and out_posters
    if posters_dir.exists():
        poster_count = 0
        for poster_file in posters_dir.glob("*"):
            if poster_file.is_file():
                shutil.copy2(poster_file, out_api_posters / poster_file.name)
                shutil.copy2(poster_file, out_posters / poster_file.name)
                poster_count += 1
        print(f"Copied {poster_count} posters to public static directories.")

    print(f"Exported static data: {len(media_entries)} media entries, {len(universes)} universes, {len(sagas)} sagas, {len(edges)} graph edges.")

if __name__ == "__main__":
    main()
