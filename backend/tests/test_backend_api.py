"""Backend API tests for EDUVINCI marketing site."""
import os
import uuid
import pytest
import requests
from dotenv import load_dotenv
from pathlib import Path

load_dotenv(Path(__file__).resolve().parents[1] / ".env")

BASE_URL = os.environ.get("REACT_APP_BACKEND_URL", "").rstrip("/")
if not BASE_URL:
    # fallback: read from frontend .env if env var not present
    try:
        with open("/app/frontend/.env") as f:
            for line in f:
                if line.startswith("REACT_APP_BACKEND_URL="):
                    BASE_URL = line.split("=", 1)[1].strip().rstrip("/")
                    break
    except FileNotFoundError:
        pass

API = f"{BASE_URL}/api"


@pytest.fixture(scope="module")
def session():
    s = requests.Session()
    s.headers.update({"Content-Type": "application/json"})
    return s


# ---------- Health ----------
def test_root_status(session):
    r = session.get(f"{API}/")
    assert r.status_code == 200, r.text
    data = r.json()
    assert data.get("service") == "EDUVINCI API"
    assert data.get("status") == "ok"


# ---------- Consultations ----------
def test_create_consultation_and_list(session):
    payload = {
        "name": "TEST_Consult User",
        "email": f"test_consult_{uuid.uuid4().hex[:8]}@example.com",
        "phone": "+90 555 123 4567",
        "target_program": "IMAT",
        "message": "Pytest consultation submission"
    }
    r = session.post(f"{API}/consultations", json=payload)
    assert r.status_code == 200, r.text
    body = r.json()
    assert body["id"]
    assert body["email"] == payload["email"]
    assert body["target_program"] == "IMAT"
    assert "created_at" in body

    # Verify persistence via GET
    r2 = session.get(f"{API}/consultations")
    assert r2.status_code == 200
    rows = r2.json()
    assert any(row["id"] == body["id"] for row in rows), "Created consultation missing in list"


def test_create_consultation_invalid_email(session):
    r = session.post(f"{API}/consultations", json={
        "name": "TEST_Bad Email",
        "email": "not-an-email",
        "phone": "+90 555 000 0000",
    })
    assert r.status_code == 422, r.text


# ---------- Webinar registrations ----------
def test_create_webinar_registration_and_list(session):
    payload = {
        "name": "TEST_Webinar User",
        "email": f"test_web_{uuid.uuid4().hex[:8]}@example.com",
        "phone": "+90 555 111 2222",
        "target_program": "Tıp / IMAT",
        "event_slug": "imat-2026",
    }
    r = session.post(f"{API}/webinar-registrations", json=payload)
    assert r.status_code == 200, r.text
    body = r.json()
    assert body["id"]
    assert body["email"] == payload["email"]
    assert body["event_slug"] == "imat-2026"

    r2 = session.get(f"{API}/webinar-registrations")
    assert r2.status_code == 200
    assert any(row["id"] == body["id"] for row in r2.json())


# ---------- Contacts ----------
def test_create_contact_and_list(session):
    payload = {
        "name": "TEST_Contact User",
        "email": f"test_contact_{uuid.uuid4().hex[:8]}@example.com",
        "phone": "+39 351 000 0000",
        "target_program": "Architecture",
        "message": "Pytest contact submission body"
    }
    r = session.post(f"{API}/contacts", json=payload)
    assert r.status_code == 200, r.text
    body = r.json()
    assert body["id"]
    assert body["email"] == payload["email"]
    assert body["message"] == payload["message"]

    r2 = session.get(f"{API}/contacts")
    assert r2.status_code == 200
    assert any(row["id"] == body["id"] for row in r2.json())


# ---------- Blog ----------
EXPECTED_SLUGS = {
    "italyada-tip-okumak-imat-rehberi",
    "polimi-polito-til-i-basvurusu",
    "dsu-burs-isee-italya-ogrenci",
    "torino-milano-ogrenci-konaklama",
}


def test_blog_list_has_four_seed_posts(session):
    r = session.get(f"{API}/blog")
    assert r.status_code == 200
    posts = r.json()
    slugs = {p["slug"] for p in posts}
    assert EXPECTED_SLUGS.issubset(slugs), f"Missing slugs: {EXPECTED_SLUGS - slugs}"
    # at least 4 seeded posts
    assert len(posts) >= 4


def test_blog_post_detail_returns_localized_fields(session):
    # Use one of the seeded slugs (the spec mentioned 'eduvinci-admissions' but that's not seeded;
    # use the actual seeded slug)
    slug = "italyada-tip-okumak-imat-rehberi"
    r = session.get(f"{API}/blog/{slug}")
    assert r.status_code == 200, r.text
    p = r.json()
    for k in ["title_tr", "title_en", "body_tr", "body_en", "category_tr", "category_en", "cover_image"]:
        assert p.get(k), f"Missing field {k} in blog post"


def test_blog_post_not_found(session):
    r = session.get(f"{API}/blog/this-slug-does-not-exist-xyz")
    assert r.status_code == 404
