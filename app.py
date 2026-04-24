"""Vinte Games — Flask backend for leaderboard."""

import json
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
            name TEXT NOT NULL,
            score INTEGER NOT NULL,
            character TEXT,
            fruit TEXT,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )"""
    )
    return conn


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


@app.route("/api/scores", methods=["POST"])
@app.route("/apples/api/scores", methods=["POST"])
def submit_score():
    data = request.json
    name = data.get("name", "").strip()[:20]
    score = data.get("score", 0)
    character = data.get("character", "")
    fruit = data.get("fruit", "")
    if not name or not isinstance(score, int):
        return jsonify({"error": "Invalid data"}), 400
    db = get_db()
    db.execute(
        "INSERT INTO scores (name, score, character, fruit) VALUES (?, ?, ?, ?)",
        (name, score, character, fruit),
    )
    db.commit()
    db.close()
    return jsonify({"ok": True})


@app.route("/api/scores")
@app.route("/apples/api/scores")
def get_scores():
    db = get_db()
    # All time top 15
    total = db.execute(
        "SELECT name, score, character, created_at FROM scores ORDER BY score DESC LIMIT 15"
    ).fetchall()
    # Weekly top 15 (week starts Monday 00:00 UTC)
    now = datetime.utcnow()
    monday = now - timedelta(days=now.weekday())
    week_start = monday.replace(hour=0, minute=0, second=0, microsecond=0).isoformat()
    weekly = db.execute(
        "SELECT name, score, character, created_at FROM scores WHERE created_at >= ? ORDER BY score DESC LIMIT 15",
        (week_start,),
    ).fetchall()
    db.close()
    return jsonify(
        {
            "total": [dict(r) for r in total],
            "weekly": [dict(r) for r in weekly],
        }
    )


@app.route("/apples/static/<path:filename>")
def apples_static(filename):
    return send_from_directory("static", filename)


if __name__ == "__main__":
    app.run(debug=True, port=8085)
