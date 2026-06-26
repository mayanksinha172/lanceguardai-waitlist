import sqlite3
import hashlib
from datetime import datetime, timezone
from contextlib import contextmanager
from pathlib import Path

DB_PATH = Path(__file__).parent / "waitlist.db"


def _connect():
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn


@contextmanager
def get_db():
    conn = _connect()
    try:
        yield conn
        conn.commit()
    finally:
        conn.close()


def init_db():
    with get_db() as conn:
        conn.execute("""
            CREATE TABLE IF NOT EXISTS waitlist (
                id              INTEGER PRIMARY KEY AUTOINCREMENT,
                email           TEXT    UNIQUE NOT NULL,
                name            TEXT    NOT NULL,
                source          TEXT    NOT NULL DEFAULT 'hero',
                freelance_type  TEXT,
                pain_point      TEXT,
                current_tool    TEXT,
                signed_up_at    TEXT    NOT NULL,
                ip_hash         TEXT,
                user_agent      TEXT
            )
        """)


def _hash_ip(ip: str) -> str:
    return hashlib.sha256(ip.encode()).hexdigest()


def insert_signup(
    email: str,
    name: str,
    source: str,
    freelance_type: str,
    pain_point: str,
    current_tool: str,
    ip: str,
    user_agent: str,
) -> int | None:
    """Returns the new row id (signup position), or None if email already exists."""
    with get_db() as conn:
        try:
            cursor = conn.execute(
                """
                INSERT INTO waitlist
                    (email, name, source, freelance_type, pain_point, current_tool,
                     signed_up_at, ip_hash, user_agent)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
                """,
                (
                    email.lower().strip(),
                    name.strip(),
                    source,
                    freelance_type or None,
                    pain_point or None,
                    current_tool or None,
                    datetime.now(timezone.utc).isoformat(),
                    _hash_ip(ip),
                    (user_agent or "")[:500],
                ),
            )
            return cursor.lastrowid
        except sqlite3.IntegrityError:
            return None  # duplicate email


def get_count() -> int:
    with get_db() as conn:
        return conn.execute("SELECT COUNT(*) FROM waitlist").fetchone()[0]


def get_all(page: int = 1, per_page: int = 50) -> tuple[list[dict], int]:
    offset = (page - 1) * per_page
    with get_db() as conn:
        total = conn.execute("SELECT COUNT(*) FROM waitlist").fetchone()[0]
        rows = conn.execute(
            "SELECT * FROM waitlist ORDER BY id ASC LIMIT ? OFFSET ?",
            (per_page, offset),
        ).fetchall()
        return [dict(r) for r in rows], total


def get_all_for_export() -> list[dict]:
    with get_db() as conn:
        rows = conn.execute("SELECT * FROM waitlist ORDER BY id ASC").fetchall()
        return [dict(r) for r in rows]


def get_stats() -> dict:
    with get_db() as conn:
        total = conn.execute("SELECT COUNT(*) FROM waitlist").fetchone()[0]

        today = datetime.now(timezone.utc).date().isoformat()
        today_count = conn.execute(
            "SELECT COUNT(*) FROM waitlist WHERE signed_up_at LIKE ?",
            (f"{today}%",),
        ).fetchone()[0]

        week_count = conn.execute(
            "SELECT COUNT(*) FROM waitlist WHERE signed_up_at >= datetime('now', '-7 days')"
        ).fetchone()[0]

        sources = conn.execute(
            "SELECT source, COUNT(*) as cnt FROM waitlist GROUP BY source"
        ).fetchall()
        src = {r["source"]: r["cnt"] for r in sources}

        return {
            "total": total,
            "today": today_count,
            "this_week": week_count,
            "hero_count": src.get("hero", 0),
            "cta_count": src.get("cta", 0),
        }
