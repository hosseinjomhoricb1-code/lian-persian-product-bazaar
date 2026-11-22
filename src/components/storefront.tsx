import { useEffect, useRef, useState } from "react";
import {
  ArrowLeft,
  Check,
  ChevronDown,
  ChevronLeft,
  Flame,
  Gift,
  Grid2X2,
  Headphones,
  Heart,
  Home,
  Instagram,
  Mail,
  Menu,
  PawPrint,
  Search,
  Send,
  ShoppingBag,
  ShoppingCart,
  Star,
  Trash2,
  Truck,
  User,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  cartTotal,
  categories,
  filterProducts,
  persianNumber,
  priceLabel,
  products,
  type Product,
} from "@/lib/catalog";
const logo = { url: "/images/lian-logo.png" };
const hero = { url: "/images/lian-hero.png" };
const dog = { url: "/images/lian-dog-banner.webp" };
const cat = { url: "/images/lian-cat-banner.webp" };
const smallDog = { url: "/images/husky-special.png" };
const footerCat = { url: "/images/footer-cat.png" };
const footerDog = { url: "/images/footer-dog.png" };

function AnnouncementBar() {
  return (
    <div className="announcement">
      <span>
        <Heart /> دوست شما، اولویت ماست
      </span>
      <span>
        <Gift /> پیشنهادهای ویژه برای دوستان کوچک شما
      </span>
      <span>
        <Truck /> همراه شما برای خریدی لذت‌بخش
      </span>
    </div>
  );
}
function Navigation({ open }: { open: boolean }) {
  return (
    <nav className={`navigation ${open ? "open" : ""}`} aria-label="فهرست اصلی">
      <a href="#" className="active">
        <Home />
        خانه
      </a>
      <a href="#popular">
        <ShoppingBag />
        فروشگاه
      </a>
      <a href="#categories">
        <Grid2X2 />
        دسته‌بندی محصولات
        <ChevronDown />
      </a>
      <a href="#about">
        <User />
        درباره ما
      </a>
      <a href="#contact">
        <Headphones />
        تماس با ما
      </a>
    </nav>
  );
}
function Header({
  count,
  favoriteCount,
  query,
  setQuery,
  openPanel,
  showFavorites,
}: {
  count: number;
  favoriteCount: number;
  query: string;
  setQuery: (s: string) => void;
  openPanel: (s: string) => void;
  showFavorites: () => void;
}) {
  const [menu, setMenu] = useState(false);
  return (
    <>
      <AnnouncementBar />
      <div className="header-band">
        <header className="header">
          <a className="brand" href="#" aria-label="صفحه اصلی لیان">
            <img src={logo.url} alt="لیان، پت‌شاپ" />
          </a>
          <Navigation open={menu} />
          <form
            className="search"
            role="search"
            onSubmit={(e) => {
              e.preventDefault();
              document.getElementById("popular")?.scrollIntoView();
            }}
          >
            <Search />
            <input
              aria-label="جستجو در محصولات"
              placeholder="جستجو در محصولات..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </form>
          <div className="header-tools">
            <Button
              variant="tool"
              className="header-tool"
              title="سبد خرید"
              aria-label="سبد خرید"
              onClick={() => openPanel("cart")}
            >
              <ShoppingCart />
              <span className="count" aria-label="تعداد سبد خرید">
                {persianNumber(count)}
              </span>
              <span className="tool-label">سبد خرید</span>
            </Button>
            <Button
              variant="tool"
              className="header-tool"
              title="علاقه‌مندی‌ها"
              aria-label="علاقه‌مندی‌ها"
              onClick={showFavorites}
            >
              <Heart />
              <span className="count">{persianNumber(favoriteCount)}</span>
              <span className="tool-label">علاقه‌مندی‌ها</span>
            </Button>
            <Button
              variant="tool"
              className="header-tool"
              title="حساب کاربری"
              aria-label="حساب کاربری"
              onClick={() => openPanel("account")}
            >
              <User />
              <span className="tool-label">حساب کاربری</span>
            </Button>
            <Button
              variant="tool"
              size="icon"
              className="mobile-menu"
              aria-label="فهرست"
              aria-expanded={menu}
              onClick={() => setMenu(!menu)}
            >
              <Menu />
            </Button>
          </div>
        </header>
      </div>
    </>
  );
}
function HeroSection() {
  return (
    <section className="hero">
      <img
        className="hero-art"
        src={hero.url}
        alt="سگ طلایی، گربه و خرگوش با لوازم رنگارنگ حیوانات خانگی"
        fetchPriority="high"
      />
      <div className="hero-copy">
        <h1>
          <span>زندگی شادتر با</span>محصولات لیان
        </h1>
        <p>تجربه خریدی مطمئن و لذت‌بخش برای حیوانات خانگی شما</p>
        <Button variant="shop" className="hero-cta" asChild>
          <a href="#popular">
            <ShoppingCart />
            خرید الآن
            <ChevronLeft />
          </a>
        </Button>
      </div>
      <div className="hero-dots" aria-hidden="true">
        <i />
        <i />
        <i />
        <i />
      </div>
    </section>
  );
}
function CategoryCard({
  category,
  selected,
  onSelect,
}: {
  category: (typeof categories)[number];
  selected: boolean;
  onSelect: () => void;
}) {
  return (
    <Button
      variant="category"
      className={selected ? "selected" : ""}
      onClick={onSelect}
      aria-pressed={selected}
    >
      <img src={category.image} alt="" />
      <span>{category.name}</span>
    </Button>
  );
}
function ProductCard({
  product,
  favorite,
  add,
  toggle,
}: {
  product: Product;
  favorite: boolean;
  add: () => void;
  toggle: () => void;
}) {
  return (
    <article className="product-card">
      <img className="product-picture" src={product.image} alt={product.name} loading="lazy" />
      <h3>{product.name}</h3>
      <div
        className="rating"
        title="امتیاز نمونه"
        aria-label={`امتیاز نمونه ${persianNumber(product.rating)}`}
      >
        <Star />
        <span>{persianNumber(product.rating)}</span>
      </div>
      <p className="price">{priceLabel(product.price)}</p>
      <div className="product-actions">
        <Button variant="shop" className="add-button" onClick={add}>
          افزودن به سبد
        </Button>
        <Button
          variant="tool"
          className={`favorite-button ${favorite ? "is-favorite" : ""}`}
          onClick={toggle}
          aria-label={`علاقه‌مندی ${product.name}`}
          aria-pressed={favorite}
          title="علاقه‌مندی"
        >
          <Heart />
        </Button>
      </div>
    </article>
  );
}
function ProductSection({
  title,
  fresh,
  items,
  favorites,
  add,
  toggle,
  reset,
}: {
  title: string;
  fresh?: boolean;
  items: Product[];
  favorites: string[];
  add: (p: Product) => void;
  toggle: (p: Product) => void;
  reset: () => void;
}) {
  return (
    <section id={fresh ? "new" : "popular"} className={`product-section ${fresh ? "compact" : ""}`}>
      <div className="section-heading">
        <h2>
          {fresh ? <Star /> : <Flame />}
          {title}
        </h2>
        <Button variant="ghost" className="view-all" onClick={reset}>
          مشاهده همه
          <ChevronLeft />
        </Button>
      </div>
      {items.length ? (
        <div className="product-grid">
          {items.map((p) => (
            <ProductCard
              key={p.id}
              product={p}
              favorite={favorites.includes(p.id)}
              add={() => add(p)}
              toggle={() => toggle(p)}
            />
          ))}
        </div>
      ) : (
        <p className="empty-result">محصولی یافت نشد.</p>
      )}
    </section>
  );
}
function PromotionalBanner({
  kind,
  select,
}: {
  kind: "dog" | "cat" | "small";
  select: (pet: string) => void;
}) {
  const isCat = kind === "cat";
  const imageRef = useRef<HTMLImageElement>(null);
  useEffect(() => {
    if (!isCat) return;
    const reference = document.querySelector<HTMLImageElement>(".promo.dog img");
    const image = imageRef.current;
    if (!reference || !image) return;
    const matchSize = () => {
      image.style.setProperty(
        "--reference-image-width",
        `${reference.getBoundingClientRect().width}px`,
      );
    };
    const observer = new ResizeObserver(matchSize);
    observer.observe(reference);
    matchSize();
    return () => observer.disconnect();
  }, [isCat]);
  const art = isCat
    ? { src: cat.url, w: 900, h: 507 }
    : kind === "small"
      ? { src: smallDog.url, w: 945, h: 990 }
      : { src: dog.url, w: 900, h: 507 };
  return (
    <section className={`promo ${kind}`}>
      <img
        ref={imageRef}
        src={art.src}
        alt={isCat ? "گربه بازیگوش لیان" : "سگ طلایی شاد لیان"}
        width={art.w}
        height={art.h}
        loading="lazy"
        decoding="async"
      />
      <div className="promo-copy">
        <h2>{kind === "dog" ? "تخفیف ویژه" : "پیشنهادهای ویژه"}</h2>
        <p>{isCat ? "برای گربه‌ها" : "برای سگ‌های دوست‌داشتنی"}</p>
        <Button variant="navy" onClick={() => select(isCat ? "cat" : "dog")}>
          {kind === "dog" ? "مشاهده پیشنهادها" : "مشاهده محصولات"}
          <ChevronLeft />
        </Button>
      </div>
      {kind === "dog" && (
        <div className="discount">
          <span>پیشنهاد</span>
          <strong>ویژه</strong>
        </div>
      )}
    </section>
  );
}
function Footer({
  notify,
  openPanel,
}: {
  notify: (s: string) => void;
  openPanel: (s: string) => void;
}) {
  const [email, setEmail] = useState("");
  const serviceLinks = [
    "راهنمای خرید",
    "روش‌های ارسال",
    "شرایط بازگشت کالا",
    "پیگیری سفارش",
    "پشتیبانی",
  ];
  return (
    <footer className="footer">
      <div className="footer-columns">
        <section className="footer-brand" id="about">
          <img src={logo.url} alt="لیان پت‌شاپ" />
          <p>
            فروشگاه اینترنتی لیان، همراه همیشگی شما
            <br />
            برای داشتن حیوان خانگی سالم و شاد.
          </p>
          <div className="socials">
            <Button
              variant="tool"
              size="icon"
              aria-label="اینستاگرام"
              title="اینستاگرام"
              onClick={() => notify("نشانی شبکه اجتماعی هنوز اضافه نشده است.")}
            >
              <Instagram />
            </Button>
            <Button
              variant="tool"
              size="icon"
              aria-label="تلگرام"
              title="تلگرام"
              onClick={() => notify("نشانی شبکه اجتماعی هنوز اضافه نشده است.")}
            >
              <Send />
            </Button>
            <Button
              variant="tool"
              size="icon"
              aria-label="ارتباط با لیان"
              title="ارتباط با لیان"
              onClick={() => openPanel("contact")}
            >
              <PawPrint />
            </Button>
          </div>
        </section>
        <section>
          <h3>
            <Headphones />
            خدمات مشتریان
          </h3>
          <div className="footer-links">
            {serviceLinks.map((s) => (
              <Button
                variant="ghost"
                className="justify-start p-0 h-auto"
                key={s}
                onClick={() => openPanel(s)}
              >
                <ChevronLeft />
                {s}
              </Button>
            ))}
          </div>
        </section>
        <section>
          <h3>
            <Grid2X2 />
            دسترسی سریع
          </h3>
          <div className="footer-links">
            <a href="#">
              <ChevronLeft />
              صفحه اصلی
            </a>
            <a href="#popular">
              <ChevronLeft />
              محصولات
            </a>
            <a href="#about">
              <ChevronLeft />
              درباره ما
            </a>
            <a href="#contact">
              <ChevronLeft />
              تماس با ما
            </a>
            <Button
              variant="ghost"
              className="justify-start p-0 h-auto"
              onClick={() => openPanel("سؤالات متداول")}
            >
              <ChevronLeft />
              سؤالات متداول
            </Button>
          </div>
        </section>
        <section className="footer-contact" id="contact">
          <h3>
            <Mail />
            اطلاعات تماس
          </h3>
          <p>
            <Headphones />
            ارتباط با فروشگاه لیان
          </p>
          <p>
            <Mail />
            اطلاعات تماس به‌زودی
          </p>
          <Button variant="navy" onClick={() => openPanel("contact")}>
            تماس با ما
            <ArrowLeft />
          </Button>
        </section>
        <section className="newsletter">
          <h3>
            <Send />
            عضویت در خبرنامه
          </h3>
          <p>برای دریافت جدیدترین تخفیف‌ها و مطالب مفید، ایمیل خود را وارد کنید.</p>
          <form
            className="newsletter-form"
            onSubmit={(e) => {
              e.preventDefault();
              notify("ایمیل شما در این پیش‌نمایش ارسال نمی‌شود.");
              setEmail("");
            }}
          >
            <input
              type="email"
              required
              aria-label="ایمیل شما"
              placeholder="ایمیل شما..."
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Button variant="shop" type="submit">
              عضویت
            </Button>
          </form>
        </section>
      </div>
      <img className="footer-pet cat" src={footerCat.url} alt="" loading="lazy" />
      <img className="footer-pet dog" src={footerDog.url} alt="" loading="lazy" />
      <div className="footer-bottom">
        <span>© فروشگاه اینترنتی لیان | تمامی حقوق محفوظ است.</span>
        <Button variant="ghost" onClick={() => openPanel("حریم خصوصی")}>
          حریم خصوصی
        </Button>
        <Button variant="ghost" onClick={() => openPanel("قوانین و مقررات")}>
          قوانین و مقررات
        </Button>
        <span>
          <PawPrint className="inline-block size-4 ml-2" />
          با عشق برای دوستان کوچک شما
        </span>
      </div>
    </footer>
  );
}
export function Storefront() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("");
  const [favorites, setFavorites] = useState<string[]>([]);
  const [cart, setCart] = useState<Record<string, number>>({});
  const [panel, setPanel] = useState("");
  const [toast, setToast] = useState("");
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(
    () => () => {
      if (timer.current) clearTimeout(timer.current);
    },
    [],
  );
  useEffect(() => {
    if (!panel) return;
    const close = (e: KeyboardEvent) => {
      if (e.key === "Escape") setPanel("");
    };
    document.addEventListener("keydown", close);
    return () => document.removeEventListener("keydown", close);
  }, [panel]);
  const notify = (message: string) => {
    setToast(message);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setToast(""), 3500);
  };
  const add = (p: Product) => {
    setCart((c) => ({ ...c, [p.id]: (c[p.id] || 0) + 1 }));
    notify(`${p.name} به سبد اضافه شد.`);
  };
  const toggle = (p: Product) =>
    setFavorites((f) => (f.includes(p.id) ? f.filter((id) => id !== p.id) : [...f, p.id]));
  const select = (id: string) => {
    setCategory(id);
    document.getElementById("popular")?.scrollIntoView();
  };
  const reset = () => {
    setQuery("");
    setCategory("");
  };
  const filtered = filterProducts(products, query, category, favorites);
  const isFiltered = Boolean(query || category);
  const title =
    category === "favorites"
      ? "محصولات مورد علاقه"
      : category === "cat"
        ? "محصولات گربه‌ها"
        : category === "dog"
          ? "محصولات سگ‌ها"
          : categories.find((c) => c.id === category)?.name ||
            (query ? "نتایج جستجو" : "محصولات پرفروش");
  return (
    <div className="storefront">
      <Header
        count={Object.values(cart).reduce((a, b) => a + b, 0)}
        favoriteCount={favorites.length}
        query={query}
        setQuery={setQuery}
        openPanel={setPanel}
        showFavorites={() => select("favorites")}
      />
      <main>
        <HeroSection />
        <div className="content">
          <section className="categories" id="categories" aria-label="دسته‌بندی محصولات">
            {categories.map((c) => (
              <CategoryCard
                key={c.id}
                category={c}
                selected={category === c.id}
                onSelect={() => select(category === c.id ? "" : c.id)}
              />
            ))}
          </section>
          <div className="shop-grid">
            <PromotionalBanner kind="dog" select={select} />
            <ProductSection
              title={title}
              items={isFiltered ? filtered : products.filter((p) => !p.fresh)}
              favorites={favorites}
              add={add}
              toggle={toggle}
              reset={reset}
            />
            <PromotionalBanner kind="cat" select={select} />
          </div>
          <div className="bottom-grid">
            <ProductSection
              title="محصولات جدید"
              fresh
              items={products.filter((p) => p.fresh)}
              favorites={favorites}
              add={add}
              toggle={toggle}
              reset={reset}
            />
            <PromotionalBanner kind="small" select={select} />
          </div>
        </div>
      </main>
      <Footer notify={notify} openPanel={setPanel} />
      {toast && (
        <div role="status" className="toast">
          <Check />
          {toast}
        </div>
      )}
      {panel && (
        <div className="dialog-backdrop" onClick={() => setPanel("")}>
          <section
            className="shop-dialog"
            role="dialog"
            aria-modal="true"
            aria-label={
              panel === "cart"
                ? "سبد خرید"
                : panel === "account"
                  ? "حساب کاربری"
                  : "اطلاعات فروشگاه"
            }
            onClick={(e) => e.stopPropagation()}
          >
            <div className="dialog-heading">
              <h2>
                {panel === "cart"
                  ? "سبد خرید شما"
                  : panel === "account"
                    ? "حساب کاربری"
                    : panel === "contact"
                      ? "تماس با لیان"
                      : panel}
              </h2>
              <Button
                variant="tool"
                size="icon"
                autoFocus
                aria-label="بستن"
                onClick={() => setPanel("")}
              >
                <X />
              </Button>
            </div>
            {panel === "cart" ? (
              <>
                {products
                  .filter((p) => cart[p.id])
                  .map((p) => (
                    <div className="dialog-item" key={p.id}>
                      <img src={p.image} alt={p.name} />
                      <div>
                        <h3>{p.name}</h3>
                        <p>
                          {persianNumber(cart[p.id] || 0)} عدد ·{" "}
                          {priceLabel(p.price * (cart[p.id] || 0))}
                        </p>
                      </div>
                      <Button
                        variant="tool"
                        size="icon"
                        aria-label={`حذف ${p.name}`}
                        onClick={() =>
                          setCart((c) => {
                            const next = { ...c };
                            delete next[p.id];
                            return next;
                          })
                        }
                      >
                        <Trash2 />
                      </Button>
                    </div>
                  ))}
                {Object.values(cart).some(Boolean) ? (
                  <p className="dialog-total">جمع سبد: {priceLabel(cartTotal(cart))}</p>
                ) : (
                  <p className="dialog-note">سبد خرید شما هنوز خالی است.</p>
                )}
                <p className="dialog-note">این سبد نمونه است و امکان ثبت سفارش یا پرداخت ندارد.</p>
              </>
            ) : (
              <p className="dialog-note">
                {panel === "account"
                  ? "ورود و ثبت‌نام در این پیش‌نمایش فعال نیست."
                  : panel === "contact"
                    ? "اطلاعات تماس فروشگاه هنوز ارائه نشده است."
                    : "اطلاعات این بخش پس از تکمیل محتوای فروشگاه اضافه می‌شود."}
              </p>
            )}
          </section>
        </div>
      )}
    </div>
  );
}
