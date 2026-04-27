"""Vinte Games — Flask backend for leaderboards."""

import os
import sqlite3
from datetime import datetime, timedelta

from flask import Flask, jsonify, request, send_from_directory

app = Flask(__name__, static_folder="static")

DB_PATH = os.path.join(os.path.dirname(__file__), "scores.db")


def get_db():
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    conn.execute(
        """CREATE TABLE IF NOT EXISTS scores (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            game TEXT NOT NULL DEFAULT 'apples',
            name TEXT NOT NULL,
            score INTEGER NOT NULL,
            character TEXT,
            fruit TEXT,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )"""
    )
    # Add game column if missing (existing DBs)
    try:
        conn.execute("SELECT game FROM scores LIMIT 1")
    except sqlite3.OperationalError:
        conn.execute("ALTER TABLE scores ADD COLUMN game TEXT NOT NULL DEFAULT 'apples'")
        conn.commit()
    return conn


# --- Pages ---

@app.route("/")
def home():
    return send_from_directory(".", "home.html")


@app.route("/apples/")
def apples():
    return send_from_directory(".", "index.html")


@app.route("/calendar/")
def calendar():
    return send_from_directory(".", "calendar.html")


@app.route("/clock/")
def clock():
    return send_from_directory(".", "clock.html")


@app.route("/bricks/")
def bricks():
    return send_from_directory(".", "bricks.html")


# --- Scores API (game-aware) ---

@app.route("/api/scores/<game>", methods=["POST"])
@app.route("/<game>/api/scores", methods=["POST"])
def submit_score(game):
    data = request.json
    name = data.get("name", "").strip()[:20]
    score = data.get("score", 0)
    character = data.get("character", "")
    extra = data.get("extra", "")
    if not name or not isinstance(score, int):
        return jsonify({"error": "Invalid data"}), 400
    db = get_db()
    db.execute(
        "INSERT INTO scores (game, name, score, character, fruit) VALUES (?, ?, ?, ?, ?)",
        (game, name, score, character, extra),
    )
    db.commit()
    db.close()
    return jsonify({"ok": True})


@app.route("/api/scores/<game>")
@app.route("/<game>/api/scores")
def get_scores(game):
    db = get_db()
    total = db.execute(
        "SELECT name, score, character, created_at FROM scores WHERE game = ? ORDER BY score DESC LIMIT 15",
        (game,),
    ).fetchall()
    now = datetime.utcnow()
    monday = now - timedelta(days=now.weekday())
    week_start = monday.replace(hour=0, minute=0, second=0, microsecond=0).strftime("%Y-%m-%d %H:%M:%S")
    weekly = db.execute(
        "SELECT name, score, character, created_at FROM scores WHERE game = ? AND created_at >= ? ORDER BY score DESC LIMIT 15",
        (game, week_start),
    ).fetchall()
    db.close()
    return jsonify(
        {
            "total": [dict(r) for r in total],
            "weekly": [dict(r) for r in weekly],
        }
    )


# --- Static files for sub-paths ---

@app.route("/apples/static/<path:filename>")
@app.route("/bricks/static/<path:filename>")
def game_static(filename):
    return send_from_directory("static", filename)


if __name__ == "__main__":
    app.run(debug=True, port=8085)
