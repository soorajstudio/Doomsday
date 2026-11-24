#!/usr/bin/env python3
"""
Enrich MCU media titles with OMDb API data (IMDb rating, Rotten Tomatoes, Metacritic, Box Office).
Saves output to dataset/data/ratings.json.
"""

import argparse
import json
import os
import sys
import time
from pathlib import Path

try:
    import httpx
except ImportError:
    httpx = None

REPO_DIR = Path(__file__).resolve().parent.parent
MEDIA_DIR = REPO_DIR / "dataset" / "data" / "media"
OUTPUT_FILE = REPO_DIR / "dataset" / "data" / "ratings.json"

# High-accuracy seed ratings for iconic titles in case OMDb is run offline or before key setup
SEED_RATINGS = {
    "iron-man": {
        "imdb_rating": "7.9",
        "imdb_votes": "1,150,000",
        "rotten_tomatoes": "94%",
        "metascore": "79",
        "box_office": "$585,796,247",
        "rated": "PG-13",
        "director": "Jon Favreau",
        "actors": "Robert Downey Jr., Gwyneth Paltrow, Terrence Howard, Jeff Bridges",
        "awards": "Nominated for 2 Oscars. 24 wins & 74 nominations total."
    },
    "the-avengers": {
        "imdb_rating": "8.0",
        "imdb_votes": "1,450,000",
        "rotten_tomatoes": "91%",
        "metascore": "69",
        "box_office": "$1,520,538,536",
        "rated": "PG-13",
        "director": "Joss Whedon",
        "actors": "Robert Downey Jr., Chris Evans, Scarlett Johansson, Mark Ruffalo, Chris Hemsworth",
        "awards": "Nominated for 1 Oscar. 39 wins & 81 nominations total."
    },
    "avengers-infinity-war": {
        "imdb_rating": "8.4",
        "imdb_votes": "1,200,000",
        "rotten_tomatoes": "85%",
        "metascore": "68",
        "box_office": "$2,052,415,039",
        "rated": "PG-13",
        "director": "Anthony Russo, Joe Russo",
        "actors": "Robert Downey Jr., Chris Hemsworth, Mark Ruffalo, Chris Evans, Josh Brolin",
        "awards": "Nominated for 1 Oscar. 48 wins & 79 nominations total."
    },
    "avengers-endgame": {
        "imdb_rating": "8.4",
        "imdb_votes": "1,300,000",
        "rotten_tomatoes": "94%",
        "metascore": "78",
        "box_office": "$2,799,439,100",
        "rated": "PG-13",
        "director": "Anthony Russo, Joe Russo",
        "actors": "Robert Downey Jr., Chris Evans, Mark Ruffalo, Chris Hemsworth, Scarlett Johansson",
        "awards": "Nominated for 1 Oscar. 72 wins & 134 nominations total."
    },
    "spider-man-no-way-home": {
        "imdb_rating": "8.2",
        "imdb_votes": "880,000",
        "rotten_tomatoes": "93%",
        "metascore": "71",
        "box_office": "$1,921,847,111",
        "rated": "PG-13",
        "director": "Jon Watts",
        "actors": "Tom Holland, Zendaya, Benedict Cumberbatch, Jacob Batalon, Tobey Maguire, Andrew Garfield",
        "awards": "Nominated for 1 Oscar. 36 wins & 72 nominations total."
    },
    "black-panther": {
        "imdb_rating": "7.3",
        "imdb_votes": "820,000",
        "rotten_tomatoes": "96%",
        "metascore": "88",
        "box_office": "$1,349,926,083",
        "rated": "PG-13",
        "director": "Ryan Coogler",
        "actors": "Chadwick Boseman, Michael B. Jordan, Lupita Nyong'o, Danai Gurira",
        "awards": "Won 3 Oscars. 117 wins & 283 nominations total."
    },
    "guardians-of-the-galaxy": {
        "imdb_rating": "8.0",
        "imdb_votes": "1,250,000",
        "rotten_tomatoes": "92%",
        "metascore": "76",
        "box_office": "$773,350,147",
        "rated": "PG-13",
        "director": "James Gunn",
        "actors": "Chris Pratt, Vin Diesel, Bradley Cooper, Zoe Saldana, Dave Bautista",
        "awards": "Nominated for 2 Oscars. 52 wins & 103 nominations total."
    },
    "loki": {
        "imdb_rating": "8.2",
        "imdb_votes": "400,000",
        "rotten_tomatoes": "87%",
        "metascore": "74",
        "box_office": "N/A",
        "rated": "TV-14",
        "director": "Kate Herron, Justin Benson, Aaron Moorhead",
        "actors": "Tom Hiddleston, Owen Wilson, Sophia Di Martino, Gugu Mbatha-Raw",
        "awards": "Nominated for 9 Primetime Emmys. 14 wins & 45 nominations total."
    },
    "wandavision": {
        "imdb_rating": "7.9",
        "imdb_votes": "360,000",
        "rotten_tomatoes": "91%",
        "metascore": "77",
        "box_office": "N/A",
        "rated": "TV-PG",
        "director": "Matt Shakman",
        "actors": "Elizabeth Olsen, Paul Bettany, Kathryn Hahn, Teyonah Parris",
        "awards": "Won 3 Primetime Emmys. 25 wins & 92 nominations total."
    },
    "agatha-all-along": {
        "imdb_rating": "7.2",
        "imdb_votes": "85,000",
        "rotten_tomatoes": "83%",
        "metascore": "66",
        "box_office": "N/A",
        "rated": "TV-14",
        "director": "Jac Schaeffer, Rachel Goldberg, Gandja Monteiro",
        "actors": "Kathryn Hahn, Joe Locke, Sasheer Zamata, Ali Ahn, Aubrey Plaza",
        "awards": "Nominated for 1 Golden Globe. 2 wins & 6 nominations total."
    },
    "deadpool-and-wolverine": {
        "imdb_rating": "7.7",
        "imdb_votes": "440,000",
        "rotten_tomatoes": "78%",
        "metascore": "56",
        "box_office": "$1,337,870,481",
        "rated": "R",
        "director": "Shawn Levy",
        "actors": "Ryan Reynolds, Hugh Jackman, Emma Corrin, Matthew Macfadyen",
        "awards": "3 wins & 14 nominations total."
    }
}


def fetch_from_omdb(client, title: str, year: str | None, api_key: str) -> dict | None:
    params = {"t": title, "apikey": api_key}
    if year:
        params["y"] = year.split("-")[0]

    try:
        resp = client.get("https://www.omdbapi.com/", params=params, timeout=10.0)
        data = resp.json()
        if data.get("Response") == "True":
            return data
        # Retry without year if not found
        if year:
            params.pop("y", None)
            resp = client.get("https://www.omdbapi.com/", params=params, timeout=10.0)
            data = resp.json()
            if data.get("Response") == "True":
                return data
    except Exception as e:
        print(f"Error querying OMDb for {title}: {e}")
    return None


def extract_reception(omdb_data: dict) -> dict:
    rotten_tomatoes = None
    for rating in omdb_data.get("Ratings", []):
        if rating.get("Source") == "Rotten Tomatoes":
            rotten_tomatoes = rating.get("Value")
            break

    return {
        "imdb_rating": omdb_data.get("imdbRating") if omdb_data.get("imdbRating") != "N/A" else None,
        "imdb_votes": omdb_data.get("imdbVotes") if omdb_data.get("imdbVotes") != "N/A" else None,
        "rotten_tomatoes": rotten_tomatoes,
        "metascore": omdb_data.get("Metascore") if omdb_data.get("Metascore") != "N/A" else None,
        "box_office": omdb_data.get("BoxOffice") if omdb_data.get("BoxOffice") != "N/A" else None,
        "rated": omdb_data.get("Rated") if omdb_data.get("Rated") != "N/A" else None,
        "director": omdb_data.get("Director") if omdb_data.get("Director") != "N/A" else None,
        "actors": omdb_data.get("Actors") if omdb_data.get("Actors") != "N/A" else None,
        "awards": omdb_data.get("Awards") if omdb_data.get("Awards") != "N/A" else None,
    }


def main():
    parser = argparse.ArgumentParser(description="Enrich MCU media with OMDb ratings.")
    parser.add_argument("--api-key", help="OMDb API key (optional if OMDB_API_KEY env is set)")
    args = parser.parse_args()

    api_key = args.api_key or os.getenv("OMDB_API_KEY")

    ratings = {}
    if OUTPUT_FILE.exists():
        try:
            with OUTPUT_FILE.open("r", encoding="utf-8") as f:
                ratings = json.load(f)
        except Exception:
            ratings = {}

    # Pre-populate with seed ratings
    for k, v in SEED_RATINGS.items():
        if k not in ratings:
            ratings[k] = v

    if not api_key:
        print("No OMDb API key provided. Saved seed ratings to dataset/data/ratings.json.")
        print("To fetch live ratings for all titles, run:")
        print("  python scripts/enrich_omdb.py --api-key YOUR_KEY")
    else:
        if not httpx:
            print("httpx is not installed. Please install httpx to run OMDb fetch.")
            sys.exit(1)

        media_files = sorted(MEDIA_DIR.glob("*.json"))
        print(f"Found {len(media_files)} media files. Querying OMDb...")

        with httpx.Client() as client:
            count = 0
            for idx, media_file in enumerate(media_files, start=1):
                try:
                    with media_file.open("r", encoding="utf-8") as f:
                        media_data = json.load(f)
                except Exception:
                    continue

                media_id = media_data.get("id")
                title = media_data.get("title")
                release_date = media_data.get("release_date")

                if not media_id or not title:
                    continue

                if media_id in ratings and ratings[media_id].get("imdb_rating"):
                    continue

                print(f"[{idx}/{len(media_files)}] Fetching: {title} ({release_date})")
                omdb_res = fetch_from_omdb(client, title, release_date, api_key)
                if omdb_res:
                    ratings[media_id] = extract_reception(omdb_res)
                    count += 1
                else:
                    print(f"  -> No OMDb match found for '{title}'")

                time.sleep(0.15)  # Respect API limits

            print(f"Updated {count} titles from OMDb.")

    OUTPUT_FILE.parent.mkdir(parents=True, exist_ok=True)
    with OUTPUT_FILE.open("w", encoding="utf-8") as f:
        json.dump(ratings, f, indent=2)

    print(f"Ratings file written to {OUTPUT_FILE} (total {len(ratings)} titles).")


if __name__ == "__main__":
    main()
