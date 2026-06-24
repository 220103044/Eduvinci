from fastapi import FastAPI, APIRouter, HTTPException, Query
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
import re
import uuid
from pathlib import Path
from pydantic import BaseModel, Field, EmailStr, ConfigDict
from typing import List, Optional
from datetime import datetime, timezone


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

app = FastAPI(title="EDUVINCI API")
api_router = APIRouter(prefix="/api")

logger = logging.getLogger(__name__)


# ---------- Helpers ----------
def now_iso() -> str:
    return datetime.now(timezone.utc).isoformat()


def slugify(text: str) -> str:
    text = text.lower().strip()
    text = re.sub(r"[^\w\s-]", "", text, flags=re.UNICODE)
    text = re.sub(r"[-\s]+", "-", text)
    return text


# ---------- Models ----------
class ConsultationCreate(BaseModel):
    name: str = Field(min_length=2, max_length=120)
    email: EmailStr
    phone: str = Field(min_length=5, max_length=40)
    target_program: Optional[str] = Field(default=None, max_length=160)
    message: Optional[str] = Field(default=None, max_length=2000)
    source: Optional[str] = Field(default="website")


class Consultation(ConsultationCreate):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    created_at: str = Field(default_factory=now_iso)


class WebinarRegistrationCreate(BaseModel):
    name: str = Field(min_length=2, max_length=120)
    email: EmailStr
    phone: str = Field(min_length=5, max_length=40)
    target_program: Optional[str] = Field(default=None, max_length=160)
    event_slug: Optional[str] = Field(default="imat-2026")


class WebinarRegistration(WebinarRegistrationCreate):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    created_at: str = Field(default_factory=now_iso)


class ContactCreate(BaseModel):
    name: str = Field(min_length=2, max_length=120)
    email: EmailStr
    phone: Optional[str] = Field(default=None, max_length=40)
    target_program: Optional[str] = Field(default=None, max_length=160)
    message: str = Field(min_length=5, max_length=4000)


class Contact(ContactCreate):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    created_at: str = Field(default_factory=now_iso)


class BlogPost(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    slug: str
    title_tr: str
    title_en: str
    excerpt_tr: str
    excerpt_en: str
    body_tr: str
    body_en: str
    category_tr: str
    category_en: str
    cover_image: str
    read_minutes: int = 6
    published_at: str = Field(default_factory=now_iso)


# ---------- Routes ----------
@api_router.get("/")
async def root():
    return {"service": "EDUVINCI API", "status": "ok"}


@api_router.post("/consultations", response_model=Consultation)
async def create_consultation(payload: ConsultationCreate):
    obj = Consultation(**payload.model_dump())
    await db.consultations.insert_one(obj.model_dump())
    logger.info("Consultation submitted: %s", obj.email)
    return obj


@api_router.get("/consultations", response_model=List[Consultation])
async def list_consultations():
    rows = await db.consultations.find({}, {"_id": 0}).sort("created_at", -1).to_list(500)
    return rows


@api_router.post("/webinar-registrations", response_model=WebinarRegistration)
async def create_webinar_registration(payload: WebinarRegistrationCreate):
    obj = WebinarRegistration(**payload.model_dump())
    await db.webinar_registrations.insert_one(obj.model_dump())
    logger.info("Webinar registration: %s", obj.email)
    return obj


@api_router.get("/webinar-registrations", response_model=List[WebinarRegistration])
async def list_webinar_registrations():
    rows = await db.webinar_registrations.find({}, {"_id": 0}).sort("created_at", -1).to_list(500)
    return rows


@api_router.post("/contacts", response_model=Contact)
async def create_contact(payload: ContactCreate):
    obj = Contact(**payload.model_dump())
    await db.contacts.insert_one(obj.model_dump())
    logger.info("Contact submitted: %s", obj.email)
    return obj


@api_router.get("/contacts", response_model=List[Contact])
async def list_contacts():
    rows = await db.contacts.find({}, {"_id": 0}).sort("created_at", -1).to_list(500)
    return rows


@api_router.get("/blog", response_model=List[BlogPost])
async def list_blog_posts(category: Optional[str] = Query(default=None)):
    query = {}
    if category:
        query = {"$or": [{"category_tr": category}, {"category_en": category}]}
    rows = await db.blog_posts.find(query, {"_id": 0}).sort("published_at", -1).to_list(200)
    return rows


@api_router.get("/blog/{slug}", response_model=BlogPost)
async def get_blog_post(slug: str):
    doc = await db.blog_posts.find_one({"slug": slug}, {"_id": 0})
    if not doc:
        raise HTTPException(status_code=404, detail="Post not found")
    return doc


# ---------- Seed blog ----------
SEED_POSTS = [
    {
        "slug": "italyada-tip-okumak-imat-rehberi",
        "title_tr": "İtalya'da Tıp Okumak: IMAT Sınavına Stratejik Hazırlık",
        "title_en": "Studying Medicine in Italy: A Strategic Guide to the IMAT",
        "excerpt_tr": "Non-EU kontenjanı, IMAT içerik dağılımı ve Türkiye'den hazırlanan adaylar için doğru çalışma yaklaşımı.",
        "excerpt_en": "Non-EU quotas, IMAT content distribution and the right preparation approach for candidates studying from Turkey.",
        "body_tr": "IMAT (International Medical Admissions Test), İtalya'nın İngilizce tıp programlarına giriş için kullanılan resmi sınavdır. Sınav; mantık, genel bilgi, biyoloji, kimya, fizik ve matematik bölümlerinden oluşur. Türkiye'deki adaylar için en kritik nokta non-EU kontenjanı içinde değerlendirilmek ve Universitaly portalı üzerinden doğru sıralamayı yapmaktır.\n\nHazırlık sürecinde içerik bilgisi kadar zaman yönetimi belirleyicidir. Soru başına ortalama 1 dakika 40 saniye düşer; bu nedenle hız ve hata yönetimi pratiği şarttır. Mantık ve genel kültür bölümleri genellikle hafife alınır; oysa toplam puana etkisi yüksektir.\n\nEDUVINCI olarak süreci profil analiziyle başlatır, hedef üniversiteye göre haftalık çalışma planı kurar ve deneme sınavlarıyla performans takibi yaparız.",
        "body_en": "IMAT is the official entrance test for English-taught medical programs in Italy. It covers logic, general knowledge, biology, chemistry, physics and mathematics. For candidates from Turkey, the critical step is being evaluated within the non-EU quota and ranking correctly via the Universitaly portal.\n\nDuring preparation, time management is as decisive as content. With ~1 minute 40 seconds per question, pacing and mistake control are essential. The logic and general-knowledge sections are often underestimated despite their meaningful weight.\n\nAt EDUVINCI we start with a profile assessment, then build a weekly plan aligned with the target university and track progress through mock exams.",
        "category_tr": "Sınav Rehberleri",
        "category_en": "Exam Guides",
        "cover_image": "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=1600&q=80",
        "read_minutes": 7,
    },
    {
        "slug": "polimi-polito-til-i-basvurusu",
        "title_tr": "PoliMi & PoliTO: TIL-I ile Mühendislik Başvurusu",
        "title_en": "PoliMi & PoliTO: Engineering Applications via TIL-I",
        "excerpt_tr": "Politecnico di Milano ve Politecnico di Torino için TIL-I sınav yapısı, başvuru takvimi ve seçim stratejisi.",
        "excerpt_en": "TIL-I exam structure, application calendar and selection strategy for Politecnico di Milano and Politecnico di Torino.",
        "body_tr": "TIL-I sınavı, PoliMi ve PoliTO başta olmak üzere birçok İtalyan mühendislik fakültesi için ortak değerlendirme aracıdır. Matematik, mantık, fen bilimleri ve İngilizce dil yeterliliği bölümlerinden oluşur. Sınav yıl içinde birden fazla dönemde yapılır; non-EU adaylar için kontenjan ve takvim ayrı yönetilir.\n\nDoğru strateji; hedef üniversitenin program bazlı geçmiş kesim puanlarını, başvuru penceresini ve Universitaly üzerindeki tercih sıralamasını birlikte planlamaktan geçer. Çoğu aday ikinci bir TIL-I oturumu seçeneğini değerlendirmediği için fırsat kaybeder.\n\nEDUVINCI süreci profil-program eşleşmesi, sınav planı ve başvuru evrak yönetimi olarak üç katmanda kurar.",
        "body_en": "TIL-I is the common assessment used by many Italian engineering faculties including PoliMi and PoliTO. It covers mathematics, logic, science and English proficiency. The exam runs in multiple sessions across the year, with separate calendars and quotas for non-EU candidates.\n\nA sound strategy aligns the program-specific cut-offs of past years, the application window and the Universitaly preference order. Many candidates miss opportunities by not planning a second TIL-I attempt.\n\nEDUVINCI structures the process in three layers: profile-to-program fit, exam planning and end-to-end document management.",
        "category_tr": "Sınav Rehberleri",
        "category_en": "Exam Guides",
        "cover_image": "https://images.unsplash.com/photo-1518709268805-4e9042af2176?auto=format&fit=crop&w=1600&q=80",
        "read_minutes": 6,
    },
    {
        "slug": "dsu-burs-isee-italya-ogrenci",
        "title_tr": "DSU & ISEE: İtalya'da Burs Mantığını Anlamak",
        "title_en": "DSU & ISEE: Understanding Scholarships in Italy",
        "excerpt_tr": "Bölgesel DSU sistemi, ISEE belgesi mantığı ve uluslararası öğrenciler için başvuru takvimi.",
        "excerpt_en": "The regional DSU system, the ISEE document logic and the application calendar for international students.",
        "body_tr": "DSU (Diritto allo Studio Universitario), İtalya'da öğrenciye verilen burs ve barınma desteğinin çerçevesidir. Her bölgenin (örn. EDISU Piemonte, ER.GO Emilia-Romagna, DiSCo Lazio) kendi başvuru sistemi vardır. Uluslararası öğrenciler genellikle ülke geliri ve mal varlığı bilgisi içeren özel bir ISEE Parificato hazırlatır.\n\nKritik noktalar; başvuru penceresinin ülkeye geldikten önce/sonra kapanma riski, gerekli belgelerin Türkiye'den apostille süreci ve gelir eşiklerinin bölgeden bölgeye değişmesidir.\n\nEDUVINCI; hedef şehir ve üniversiteye göre uygun DSU bölgesini belirler, belge kontrol listesini hazırlar ve başvuruyu takvime göre yönetir.",
        "body_en": "DSU (Diritto allo Studio Universitario) is the framework for student scholarships and housing support in Italy. Each region (e.g. EDISU Piemonte, ER.GO, DiSCo) runs its own application portal. International students typically prepare a dedicated ISEE Parificato reflecting household income and assets.\n\nKey points: the application window may close before or shortly after arrival; documents from Turkey require apostille; income thresholds vary across regions.\n\nEDUVINCI identifies the right DSU region for the target city and university, prepares the document checklist, and manages the application along the calendar.",
        "category_tr": "Burslar",
        "category_en": "Scholarships",
        "cover_image": "https://images.unsplash.com/photo-1604079628040-94301bb21b91?auto=format&fit=crop&w=1600&q=80",
        "read_minutes": 5,
    },
    {
        "slug": "torino-milano-ogrenci-konaklama",
        "title_tr": "Torino ve Milano: Öğrenci Konaklaması İçin Pratik Rehber",
        "title_en": "Turin and Milan: A Practical Guide to Student Housing",
        "excerpt_tr": "Yurt başvuruları, özel daire kiralama, codice fiscale ve ilk ay yerleşim süreci.",
        "excerpt_en": "Dorm applications, private rentals, codice fiscale and the first-month settlement process.",
        "body_tr": "Konaklama, yerleşme sürecinin en stres yaratan adımıdır. Yurt başvurularında DSU sıralaması belirleyicidir ve sınırlı kontenjanlar erken kapanır. Özel daire piyasasında Milano ve Torino farklı dinamiklere sahiptir; Milano fiyat baskısı yüksekken Torino daha esnek bir piyasa sunar.\n\nİlk ay; ikamet kaydı (residenza geçici/permanente), codice fiscale, sağlık sigortası ve banka hesabı adımlarının doğru sırada yürütülmesini gerektirir. Bu adımlardan biri eksik kalırsa kira sözleşmesi veya üniversite kaydı tıkanabilir.\n\nEDUVINCI; öğrenciyi şehir geldikten önce yönlendirir, kontrat öncesi belge kontrolü yapar ve yerleşim sürecinin ilk 30 gününü bir kontrol listesiyle yönetir.",
        "body_en": "Housing is the most stressful step of the settlement process. Dorm applications depend on DSU rankings, and limited slots fill up early. Private rentals behave differently in Milan and Turin: Milan is more price-pressured, Turin offers a more flexible market.\n\nIn the first month, residency registration, codice fiscale, health insurance and a bank account must be set up in the right order. A single missing step can block the rental contract or the university enrollment.\n\nEDUVINCI guides the student before arrival, reviews the rental contract documents and runs the first 30 days through a clear checklist.",
        "category_tr": "Şehir & Konaklama",
        "category_en": "City & Housing",
        "cover_image": "https://images.unsplash.com/photo-1525896650450-b4f5366f1bb6?auto=format&fit=crop&w=1600&q=80",
        "read_minutes": 6,
    },
]


@app.on_event("startup")
async def seed_blog_posts():
    try:
        for post in SEED_POSTS:
            existing = await db.blog_posts.find_one({"slug": post["slug"]})
            if not existing:
                doc = BlogPost(**post).model_dump()
                await db.blog_posts.insert_one(doc)
        logger.info("Blog seed verified.")
    except Exception as exc:  # pragma: no cover
        logger.exception("Seed failed: %s", exc)


app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
