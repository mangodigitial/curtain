import { PrismaClient, Prisma, PageStatus, OfferStatus, UserRole } from "@prisma/client";
import { hashSync } from "bcryptjs";
import sharp from "sharp";
import { put } from "@vercel/blob";
import { encode } from "blurhash";
import fs from "fs";
import path from "path";

const prisma = new PrismaClient();

const UPLOADS_BASE = path.resolve(
  __dirname,
  "../curtain-bluff-download/curtainbluff/curtainbluff.com/wp-content/uploads"
);

// ─── Types ──────────────────────────────────────────────

interface MediaRecord {
  id: string;
  url: string;
  alt: string;
  blurhash: string | null;
  width: number;
  height: number;
}

/** Cast a value to Prisma-compatible JSON */
function json(value: unknown): Prisma.InputJsonValue {
  return value as Prisma.InputJsonValue;
}

// ─── Media mapping (populated in Step 1) ────────────────

const mediaMap = new Map<string, MediaRecord>();

// ─── Helpers ────────────────────────────────────────────

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function findMedia(keyword: string): any {
  const lowerKeyword = keyword.toLowerCase();
  for (const [filename, record] of mediaMap.entries()) {
    if (filename.toLowerCase().includes(lowerKeyword)) {
      return {
        id: record.id,
        url: record.url,
        alt: record.alt,
        ...(record.blurhash ? { blurhash: record.blurhash } : {}),
        width: record.width,
        height: record.height,
      };
    }
  }
  // Fallback: return first available image or placeholder
  const first = mediaMap.values().next().value;
  if (first) {
    return {
      id: first.id,
      url: first.url,
      alt: first.alt,
      ...(first.blurhash ? { blurhash: first.blurhash } : {}),
      width: first.width,
      height: first.height,
    };
  }
  return {
    id: "00000000-0000-0000-0000-000000000000",
    url: "/placeholder.jpg",
    alt: "Curtain Bluff",
    width: 1920,
    height: 1080,
  };
}

function classifyFolder(filename: string): string {
  const lower = filename.toLowerCase();
  if (/spa|massage|treatment|wellness/.test(lower)) return "wellness";
  if (/room|suite|deluxe|junior|bluff|morris|cliff|beachfront|beach-front/.test(lower)) return "rooms";
  if (/restaurant|seagrape|tamarind|food|wine|dining|cuisine|sea-grape/.test(lower)) return "dining";
  if (/beach|pool|aerial|resort|slider/.test(lower)) return "resort";
  if (/kids|tennis|diving|paddle|kayak|gym|scuba|sport|water|padi|croquet|ground|shuffle|pickle/.test(lower)) return "activities";
  if (/wedding|honeymoon|event|portrait|cocktail|dancing/.test(lower)) return "events";
  return "general";
}

function cleanFilename(filepath: string): string {
  const ext = path.extname(filepath);
  const base = path.basename(filepath, ext);
  return base
    .replace(/[^a-zA-Z0-9_-]/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
    .toLowerCase();
}

function scanImages(dir: string): string[] {
  const results: string[] = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      const dirLower = entry.name.toLowerCase();
      if (dirLower === "elementor" || dirLower === "revslider" || dirLower === "plugins") continue;
      results.push(...scanImages(fullPath));
    } else if (entry.isFile()) {
      const ext = path.extname(entry.name).toLowerCase();
      if (![".jpg", ".jpeg", ".png"].includes(ext)) continue;
      // Exclude WordPress resized thumbnails: *-NNNxNNN.*
      if (/-\d+x\d+\./.test(entry.name)) continue;
      results.push(fullPath);
    }
  }
  return results;
}

async function processAndUploadImage(
  filepath: string,
  index: number,
  total: number
): Promise<void> {
  const originalFilename = path.basename(filepath);
  console.log(`Uploading image ${index + 1}/${total}: ${originalFilename}`);

  try {
    const fileBuffer = fs.readFileSync(filepath);

    // Check file size — skip small icons/logos < 20KB
    if (fileBuffer.length < 20 * 1024) {
      console.log(`  Skipping (too small: ${fileBuffer.length} bytes)`);
      return;
    }

    // Resize, convert to WebP, strip EXIF
    const webpBuffer = await sharp(fileBuffer)
      .rotate() // strips EXIF orientation
      .resize({ width: 1920, withoutEnlargement: true })
      .webp({ quality: 82 })
      .toBuffer();

    const metadata = await sharp(webpBuffer).metadata();
    const width = metadata.width ?? 0;
    const height = metadata.height ?? 0;
    const sizeBytes = webpBuffer.length;

    // Generate blurhash from 32x32 thumbnail
    const { data, info } = await sharp(fileBuffer)
      .rotate()
      .resize(32, 32, { fit: "cover" })
      .ensureAlpha()
      .raw()
      .toBuffer({ resolveWithObject: true });

    const blurhash = encode(
      new Uint8ClampedArray(data),
      info.width,
      info.height,
      4,
      3
    );

    // Upload to Vercel Blob
    const cleanName = cleanFilename(filepath);
    const blobResult = await put(
      `images/${cleanName}.webp`,
      webpBuffer,
      { access: "public", contentType: "image/webp" }
    );

    // Determine folder
    const folder = classifyFolder(originalFilename);

    // Generate alt text from filename
    const altText = path
      .basename(originalFilename, path.extname(originalFilename))
      .replace(/[-_]+/g, " ")
      .replace(/\b\w/g, (c) => c.toUpperCase());

    // Create media record in DB
    const media = await prisma.media.create({
      data: {
        url: blobResult.url,
        filename: `${cleanName}.webp`,
        altText,
        width,
        height,
        sizeBytes,
        mimeType: "image/webp",
        folder,
        blurhash,
      },
    });

    mediaMap.set(originalFilename, {
      id: media.id,
      url: media.url,
      alt: media.altText,
      blurhash: media.blurhash,
      width: media.width,
      height: media.height,
    });
  } catch (err) {
    console.error(`  Error processing ${originalFilename}:`, err);
  }
}

function chunk<T>(arr: T[], size: number): T[][] {
  const chunks: T[][] = [];
  for (let i = 0; i < arr.length; i += size) {
    chunks.push(arr.slice(i, i + size));
  }
  return chunks;
}

// ─── Main ───────────────────────────────────────────────

async function main() {
  console.log("=== Curtain Bluff CMS Seed Script ===\n");

  // ─── Idempotent cleanup ─────────────────────────────
  console.log("Clearing existing data...");
  await prisma.submission.deleteMany();
  await prisma.redirect.deleteMany();
  await prisma.offer.deleteMany();
  await prisma.post.deleteMany();
  await prisma.page.deleteMany();
  await prisma.media.deleteMany();
  await prisma.user.deleteMany();
  await prisma.siteSettings.deleteMany();
  console.log("All tables cleared.\n");

  // ═══════════════════════════════════════════════════════
  // STEP 1 — IMAGE UPLOAD
  // ═══════════════════════════════════════════════════════
  console.log("STEP 1: Scanning and uploading images...");
  const allImages = scanImages(UPLOADS_BASE);
  console.log(`Found ${allImages.length} images to process.\n`);

  const imageChunks = chunk(allImages, 3);
  let processedCount = 0;
  for (const batch of imageChunks) {
    await Promise.all(
      batch.map((filepath) =>
        processAndUploadImage(filepath, processedCount + batch.indexOf(filepath), allImages.length)
      )
    );
    processedCount += batch.length;
  }
  console.log(`\nUploaded ${mediaMap.size} images to Vercel Blob.\n`);

  // ═══════════════════════════════════════════════════════
  // STEP 2 — SITE SETTINGS
  // ═══════════════════════════════════════════════════════
  console.log("STEP 2: Creating site settings...");
  await prisma.siteSettings.create({
    data: {
      name: "Curtain Bluff",
      domain: "curtainbluff.com",
      branding: {
        colors: {
          primary: "#1A4B5C",
          secondary: "#E8DED1",
          accent: "#C4705A",
        },
        fonts: {
          heading: "Cormorant Garamond",
          body: "Libre Franklin",
        },
        border_radius: "0px",
      },
      seoDefaults: {
        title_suffix: " — Curtain Bluff, Antigua",
        default_description:
          "Curtain Bluff is an intimate, all-inclusive luxury resort on the southern coast of Antigua, where pristine beaches meet world-class hospitality.",
      },
      analytics: {},
      contact: {
        email: "curtainbluff@curtainbluff.com",
        phone_numbers: [
          { label: "US Toll Free", number: "888-289-9898" },
          { label: "UK Toll Free", number: "0800-051-8956" },
          { label: "Direct", number: "268-462-8400" },
        ],
        address_lines: [
          "P.O. Box 288",
          "Old Road",
          "Antigua",
          "West Indies",
        ],
        coordinates: { lat: 17.0359, lng: -61.7875 },
        social_links: [
          { platform: "instagram", url: "https://instagram.com/curtainbluff" },
          { platform: "facebook", url: "https://facebook.com/curtainbluff" },
        ],
      },
      integrations: {
        booking_engine: {
          provider: "Direct",
          url: "https://curtainbluff.com/reservations",
        },
      },
      legal: {
        cookie_consent: {
          enabled: true,
          message: "We use cookies to enhance your experience.",
        },
      },
      announcementBar: {
        enabled: false,
        message: "",
      },
    },
  });
  console.log("Site settings created.\n");

  // ═══════════════════════════════════════════════════════
  // STEP 3 — ADMIN USER
  // ═══════════════════════════════════════════════════════
  console.log("STEP 3: Creating admin user...");
  await prisma.user.create({
    data: {
      email: "admin@curtainbluff.com",
      passwordHash: hashSync("changeme", 12),
      name: "Admin",
      role: "admin" as UserRole,
    },
  });
  console.log("Admin user created.\n");

  // ═══════════════════════════════════════════════════════
  // STEP 4 — PAGES
  // ═══════════════════════════════════════════════════════
  console.log("STEP 4: Creating pages...");

  // --- Parent / container pages ---
  const roomsParent = await prisma.page.create({
    data: {
      title: "Rooms & Suites",
      slug: "rooms",
      template: "generic",
      sections: [],
      seo: {
        title: "Rooms & Suites — Curtain Bluff, Antigua",
        description:
          "Explore our collection of beachfront rooms, bluff suites, and pool suites at Curtain Bluff, Antigua.",
      },
      status: "published" as PageStatus,
      sortOrder: 1,
      showInNav: true,
      navLabel: "Rooms & Suites",
    },
  });

  const activitiesParent = await prisma.page.create({
    data: {
      title: "Activities & Adventures",
      slug: "activities",
      template: "generic",
      sections: json([
        {
          type: "hero",
          variant: "short",
          image: findMedia("water-sports"),
          title: "Activities &",
          titleItalic: "Adventures",
          subtitle:
            "Every experience is included in your stay — from water sports to tennis, scuba to kids camp",
          showBreadcrumb: true,
          breadcrumb: [{ label: "Home", url: "/" }],
        },
        {
          type: "activity_section",
          name: "Water",
          nameItalic: "Sports",
          description:
            "Our calm Caribbean waters are your playground. Kayaking, paddleboarding, sailing, waterskiing, and snorkelling — all complimentary, all day.",
          images: {
            main: findMedia("water-sports"),
            small: [findMedia("kayak"), findMedia("paddle")],
          },
          highlights: [
            "Kayaking & Paddleboarding",
            "Sailing & Hobie Cats",
            "Waterskiing & Tubing",
            "Snorkelling & Glass-bottom Boat",
          ],
          cta: { label: "Explore Water Sports", url: "/activities/water-sports" },
        },
        {
          type: "activity_section",
          name: "Ground",
          nameItalic: "Sports",
          description:
            "Championship-level facilities in an unbeatable setting. Our sports programme includes tennis, squash, croquet, and a fully equipped fitness centre.",
          images: {
            main: findMedia("tennis"),
            small: [findMedia("ground-sport"), findMedia("croquet")],
          },
          highlights: [
            "Championship Tennis Courts",
            "Squash Courts",
            "Croquet Lawn",
            "Fitness Centre",
          ],
          cta: {
            label: "Explore Ground Sports",
            url: "/activities/ground-sports",
          },
        },
        {
          type: "activity_section",
          name: "Scuba",
          nameItalic: "Diving",
          description:
            "Antigua's underwater world awaits. Our PADI-certified dive centre offers everything from introductory courses to advanced drift dives along pristine reefs.",
          images: {
            main: findMedia("diving"),
            small: [findMedia("padi"), findMedia("scuba")],
          },
          highlights: [
            "PADI-Certified Centre",
            "Reef & Wreck Dives",
            "Night Dives",
            "Introductory Courses",
          ],
          cta: { label: "Explore Scuba", url: "/activities/scuba-diving" },
        },
        {
          type: "activity_section",
          name: "Cee Bee",
          nameItalic: "Kids Camp",
          description:
            "A supervised programme for children aged 2\u201312, with beach activities, nature walks, crafts, and Caribbean storytelling. Complimentary for all guests.",
          images: {
            main: findMedia("kids-camp"),
            small: [findMedia("kids"), findMedia("camp")],
          },
          highlights: [
            "Ages 2\u201312",
            "Beach Activities",
            "Nature Walks & Crafts",
            "Evening Programme Available",
          ],
          cta: {
            label: "Explore Kids Camp",
            url: "/activities/cee-bee-kids-camp",
          },
        },
        {
          type: "included_upgrade",
          includedTitle: "All Included in",
          includedTitleItalic: "Your Stay",
          includedNote: "COMPLIMENTARY FOR ALL GUESTS",
          includedItems: [
            "Kayaking & Paddleboarding",
            "Sailing & Hobie Cats",
            "Waterskiing & Tubing",
            "Snorkelling & Equipment",
            "Tennis & Squash",
            "Fitness Centre",
            "Cee Bee Kids Camp",
            "Croquet",
            "Nature Walks",
            "Glass-bottom Boat Tours",
          ],
          upgradeTitle: "Available to",
          upgradeTitleItalic: "Upgrade",
          upgradeNote: "ADDITIONAL CHARGE",
          upgradeItems: [
            "Scuba Diving",
            "Deep Sea Fishing",
            "Private Sailing Charter",
            "Private Tennis Lessons",
            "Spa Treatments",
          ],
        },
        {
          type: "testimonial",
          quote:
            "Our children talk about Cee Bee Kids Camp all year. The staff genuinely care and the activities are creative and fun. It\u2019s why we keep coming back.",
          author: "Returning Guest",
          background: "light",
        },
      ]),
      seo: {
        title: "Activities & Adventures — Curtain Bluff, Antigua",
        description:
          "Water sports, tennis, scuba diving, and kids camp — all included in your stay at Curtain Bluff.",
      },
      status: "published" as PageStatus,
      sortOrder: 3,
      showInNav: true,
      navLabel: "Activities",
    },
  });

  const wellnessParent = await prisma.page.create({
    data: {
      title: "Wellness",
      slug: "wellness",
      template: "generic",
      sections: json([
        {
          type: "hero",
          variant: "short",
          image: findMedia("Spa-at-Curtain-Bluff"),
          title: "Wellness &",
          titleItalic: "Renewal",
          subtitle:
            "Restore body and mind in our world-class spa, fitness centre, and championship tennis courts",
          showBreadcrumb: true,
          breadcrumb: [{ label: "Home", url: "/" }],
        },
        {
          type: "editorial_split",
          layout: "image-right",
          background: "light",
          image: findMedia("Spa"),
          label: "THE SPA",
          title: "A Sanctuary",
          titleItalic: "by the Sea",
          body: "Our clifftop spa offers a full range of treatments inspired by Caribbean botanicals and ancient wellness traditions. Relax in open-air treatment rooms with panoramic ocean views.",
          cta: { label: "Explore The Spa", url: "/the-spa" },
        },
        {
          type: "editorial_split",
          layout: "image-left",
          background: "sand",
          image: findMedia("Curtain-Bluff-Gym"),
          label: "FITNESS",
          title: "Ocean-View",
          titleItalic: "Fitness Centre",
          body: "Our fully equipped fitness centre overlooks the Caribbean Sea. Start your morning with yoga on the bluff or enjoy a workout with a view unlike any other.",
        },
        {
          type: "testimonial",
          quote:
            "The spa at Curtain Bluff is the most serene place I have ever visited. The treatments are extraordinary and the setting is unforgettable.",
          author: "Guest Review",
          background: "light",
        },
      ]),
      seo: {
        title: "Wellness — Curtain Bluff, Antigua",
        description:
          "Spa treatments, fitness centre, yoga, and wellness experiences at Curtain Bluff resort.",
      },
      status: "published" as PageStatus,
      sortOrder: 4,
      showInNav: true,
      navLabel: "Wellness",
    },
  });

  // --- Homepage ---
  console.log("  Creating: Homepage");
  await prisma.page.create({
    data: {
      title: "Home",
      slug: "home",
      template: "home",
      sections: json([
        {
          type: "hero",
          variant: "full",
          image: findMedia("slider"),
          title: "Curtain",
          titleItalic: "Bluff",
          subtitle:
            "An intimate, all-inclusive luxury resort on Antigua\u2019s southern coast",
          eyebrow: "ANTIGUA, WEST INDIES",
          showScrollIndicator: true,
          overlayOpacity: 45,
        },
        {
          type: "intro",
          label: "WELCOME",
          title: "A Timeless",
          titleItalic: "Paradise",
          body: "Nestled between two pristine beaches on the southern coast of Antigua, Curtain Bluff has been the Caribbean\u2019s best-kept secret since 1962. An intimate, all-inclusive resort where world-class dining, championship tennis, and water sports are all part of the experience.",
          images: {
            main: findMedia("about"),
            float: findMedia("aerial"),
          },
          yearOverlay: "1962",
          cta: { label: "Our Story", url: "/about" },
        },
        {
          type: "room_grid",
          label: "ACCOMMODATIONS",
          title: "Rooms &",
          titleItalic: "Suites",
          rooms: [
            {
              name: "Beach Front Rooms",
              description: "Steps from the sand with stunning ocean views",
              image: findMedia("beach-front"),
              url: "/beach-front-rooms",
            },
            {
              name: "Rooms on the Bluff",
              description:
                "Elevated views from our signature hillside setting",
              image: findMedia("bluff"),
              url: "/rooms-on-the-bluff",
            },
            {
              name: "Pool Suites",
              description: "Private plunge pools with panoramic vistas",
              image: findMedia("pool-suite"),
              url: "/pool-suites",
            },
          ],
        },
        {
          type: "editorial_split",
          layout: "image-right",
          background: "light",
          image: findMedia("seagrape"),
          label: "DINING",
          title: "A Culinary",
          titleItalic: "Journey",
          body: "From the beachside Sea Grape to the elegant Tamarind, every meal is a celebration of Caribbean flavours, fresh seafood, and an award-winning wine cellar with over 15,000 bottles.",
          cta: { label: "Dining & Drinks", url: "/dining-drinks" },
        },
        {
          type: "editorial_split",
          layout: "image-left",
          background: "sand",
          image: findMedia("kids"),
          label: "FAMILY",
          title: "Creating",
          titleItalic: "Memories",
          body: "From Cee Bee Kids Camp to family snorkelling adventures, Curtain Bluff has been the Caribbean\u2019s favourite family resort for over six decades. Children are welcomed, entertained, and cherished.",
          cta: { label: "Activities", url: "/activities" },
        },
        {
          type: "wellness_scroll",
          label: "WELLNESS",
          title: "Restore &",
          titleItalic: "Renew",
          cards: [
            {
              image: findMedia("spa"),
              title: "The Spa",
              label: "Treatments",
              url: "/the-spa",
            },
            {
              image: findMedia("tennis"),
              title: "Tennis",
              label: "Championship Courts",
              url: "/tennis",
            },
            {
              image: findMedia("gym"),
              title: "Fitness",
              label: "Ocean-view Gym",
              url: "/wellness",
            },
          ],
        },
        {
          type: "gallery_mosaic",
          label: "GALLERY",
          title: "Moments at",
          titleItalic: "Curtain Bluff",
          images: [],
        },
        {
          type: "testimonial",
          quote:
            "Curtain Bluff is not just a resort \u2014 it\u2019s a feeling. The kind of place where you arrive as a guest and leave as family.",
          author: "Travel + Leisure",
          background: "light",
        },
        {
          type: "editorial_split",
          layout: "image-right",
          background: "dark",
          image: findMedia("wedding"),
          label: "CELEBRATIONS",
          title: "Weddings &",
          titleItalic: "Events",
          body: "Exchange vows on a pristine beach, celebrate under the Caribbean stars, and let our team create unforgettable moments for your most important occasions.",
          cta: { label: "Learn More", url: "/weddings-and-events" },
        },
      ]),
      seo: {
        title: "Curtain Bluff — All-Inclusive Luxury Resort in Antigua",
        description:
          "Curtain Bluff is an intimate, all-inclusive luxury resort on the southern coast of Antigua, where pristine beaches meet world-class hospitality.",
      },
      status: "published" as PageStatus,
      sortOrder: 0,
      showInNav: false,
      navLabel: "Home",
    },
  });

  // --- Dining & Drinks ---
  console.log("  Creating: Dining & Drinks");
  await prisma.page.create({
    data: {
      title: "Dining & Drinks",
      slug: "dining-drinks",
      template: "generic",
      sections: json([
        {
          type: "hero",
          variant: "short",
          image: findMedia("Restaurant-Header"),
          title: "Dining &",
          titleItalic: "Drinks",
          subtitle:
            "From beachside lunches to candlelit dinners, every meal is included in your stay",
          breadcrumb: [{ label: "Home", url: "/" }],
          showBreadcrumb: true,
        },
        {
          type: "inclusive_strip",
          items: [
            {
              icon: "\uD83C\uDF7D",
              title: "All Meals",
              subtitle: "Breakfast, lunch & dinner",
            },
            {
              icon: "\uD83C\uDF77",
              title: "Premium Wines",
              subtitle: "Award-winning cellar",
            },
            {
              icon: "\uD83C\uDF79",
              title: "All Drinks",
              subtitle: "Cocktails & spirits",
            },
            {
              icon: "\u2615",
              title: "Afternoon Tea",
              subtitle: "Daily service",
            },
          ],
        },
        {
          type: "editorial_split",
          layout: "image-left",
          background: "light",
          image: findMedia("seagrape"),
          label: "BEACHSIDE",
          title: "The Sea",
          titleItalic: "Grape",
          subtitle: "Relaxed beachside dining",
          body: "Set right on the beach with your toes in the sand, The Sea Grape serves breakfast, lunch, and dinner in a relaxed open-air setting. Fresh seafood, Caribbean flavours, and sunset views.",
          number: "01",
          meals: [
            { name: "Breakfast", time: "7:30\u201310:00" },
            { name: "Lunch", time: "12:30\u201314:00" },
            { name: "Dinner", time: "19:00\u201321:30" },
          ],
          dressCode: {
            label: "Dress Code",
            description:
              "Resort casual \u2014 collared shirts for gentlemen at dinner",
          },
        },
        {
          type: "editorial_split",
          layout: "image-right",
          background: "sand",
          image: findMedia("tamarind"),
          label: "HILLTOP",
          title: "The",
          titleItalic: "Tamarind",
          subtitle: "Elegant evening dining",
          body: "Perched on the bluff with panoramic views, The Tamarind is our signature evening restaurant. Caribbean-inspired cuisine with European technique, an extensive wine list, and an atmosphere of understated elegance.",
          number: "02",
          meals: [{ name: "Dinner", time: "19:00\u201321:30" }],
          dressCode: {
            label: "Dress Code",
            description:
              "Smart casual \u2014 long trousers and collared shirts required",
          },
        },
        {
          type: "editorial_split",
          layout: "image-left",
          background: "dark",
          image: findMedia("wine"),
          label: "THE CELLAR",
          title: "Award-Winning",
          titleItalic: "Wine Cellar",
          body: "Our wine cellar houses over 15,000 bottles from the world\u2019s finest vineyards. Curated by our sommelier, the collection spans Old World and New World wines, all included in your stay.",
          stats: [
            { value: "15,000+", label: "Bottles" },
            { value: "800+", label: "Labels" },
            { value: "20+", label: "Countries" },
          ],
        },
        {
          type: "testimonial",
          quote:
            "The dining at Curtain Bluff is exceptional \u2014 from the fresh-caught fish at Sea Grape to the elegant evenings at Tamarind. And the wine cellar is extraordinary.",
          author: "Cond\u00e9 Nast Traveller",
          background: "light",
        },
      ]),
      seo: {
        title: "Dining & Drinks — Curtain Bluff, Antigua",
        description:
          "All-inclusive dining at Curtain Bluff: The Sea Grape beachside restaurant, The Tamarind hilltop restaurant, and an award-winning wine cellar.",
      },
      status: "published" as PageStatus,
      sortOrder: 2,
      showInNav: true,
      navLabel: "Dining & Drinks",
    },
  });

  // --- About ---
  console.log("  Creating: About");
  await prisma.page.create({
    data: {
      title: "About Curtain Bluff",
      slug: "about",
      template: "generic",
      sections: json([
        {
          type: "hero",
          variant: "short",
          image: findMedia("pt-about-bg"),
          title: "Our",
          titleItalic: "Story",
          subtitle:
            "Since 1962, Curtain Bluff has been Antigua\u2019s most beloved retreat",
          showBreadcrumb: true,
          breadcrumb: [{ label: "Home", url: "/" }],
        },
        {
          type: "intro",
          label: "HERITAGE",
          title: "A Legacy of",
          titleItalic: "Hospitality",
          body: "Founded by Howard Hulford in 1962, Curtain Bluff was built on a dramatic bluff between two of Antigua\u2019s most beautiful beaches. What began as a small, personal retreat has grown into one of the Caribbean\u2019s most acclaimed luxury resorts \u2014 while never losing its intimate, family-owned character.",
          images: {
            main: findMedia("about-img1"),
            float: findMedia("Hulford"),
          },
          yearOverlay: "1962",
          cta: { label: "Explore Rooms", url: "/rooms" },
        },
        {
          type: "stats_band",
          stats: [
            { value: "1962", label: "Founded" },
            { value: "72", label: "Rooms & Suites" },
            { value: "2", label: "Pristine Beaches" },
            { value: "60+", label: "Years of Excellence" },
          ],
        },
        {
          type: "timeline",
          items: [
            {
              year: "1962",
              heading: "The",
              headingItalic: "Beginning",
              text: "Howard Hulford opens Curtain Bluff with just 20 rooms on a dramatic headland between two beaches.",
            },
            {
              year: "1970s",
              heading: "Tennis",
              headingItalic: "Tradition",
              text: "Championship tennis courts are built, beginning a sporting tradition that continues to this day.",
            },
            {
              year: "1990s",
              heading: "Wine &",
              headingItalic: "Dining",
              text: "The resort\u2019s wine cellar grows to over 15,000 bottles, earning international acclaim.",
            },
            {
              year: "2000s",
              heading: "Spa &",
              headingItalic: "Wellness",
              text: "A clifftop spa is added, offering treatments with panoramic ocean views.",
            },
            {
              year: "2020s",
              heading: "A New",
              headingItalic: "Chapter",
              text: "Thoughtful renovations and new suites ensure Curtain Bluff remains the Caribbean\u2019s premier intimate resort.",
            },
          ],
        },
        {
          type: "map_section",
          title: "Find Us in",
          titleItalic: "Antigua",
          body: "Located on the southern coast of Antigua, Curtain Bluff is a 45-minute drive from V.C. Bird International Airport. The resort sits on a dramatic bluff between two pristine beaches, overlooking the Caribbean Sea.",
          image: findMedia("map"),
        },
        {
          type: "editorial_split",
          layout: "image-right",
          background: "sand",
          image: findMedia("pt-about-antigua"),
          label: "ANTIGUA",
          title: "The Island of",
          titleItalic: "365 Beaches",
          body: "Antigua is known for its 365 beaches \u2014 one for every day of the year. Beyond the sand, you\u2019ll discover a rich history, vibrant culture, and warm Caribbean hospitality. From Nelson\u2019s Dockyard to the Friday night street party in St. John\u2019s, there\u2019s always something to explore.",
        },
      ]),
      seo: {
        title: "About Curtain Bluff — Our Story",
        description:
          "Learn about Curtain Bluff\u2019s rich heritage, from its founding in 1962 to its place as one of the Caribbean\u2019s most beloved luxury resorts.",
      },
      status: "published" as PageStatus,
      sortOrder: 5,
      showInNav: true,
      navLabel: "About",
    },
  });

  // --- Beach Front Rooms ---
  console.log("  Creating: Beach Front Rooms");
  await prisma.page.create({
    data: {
      title: "Beach Front Rooms",
      slug: "beach-front-rooms",
      parentId: roomsParent.id,
      template: "generic",
      sections: json([
        {
          type: "hero",
          variant: "short",
          image: findMedia("Beach-front-header"),
          title: "Beach Front",
          titleItalic: "Rooms",
          subtitle:
            "Wake up to the sound of waves, steps from Antigua\u2019s finest beach",
          showBreadcrumb: true,
          breadcrumb: [
            { label: "Home", url: "/" },
            { label: "Rooms & Suites", url: "/rooms" },
          ],
        },
        {
          type: "intro",
          label: "BEACHFRONT",
          title: "Where Sand",
          titleItalic: "Meets Serenity",
          body: "Our Beach Front Rooms place you right on the sand, with direct access to our pristine beach. Each room features a private terrace or balcony, elegant Caribbean decor, and all the comforts you need for an unforgettable stay.",
        },
        {
          type: "room_detail",
          id: "deluxe-beachfront-lower",
          label: "GROUND FLOOR",
          name: "Deluxe Beachfront",
          nameItalic: "Room",
          description:
            "Ground-floor rooms with direct beach access and private terraces overlooking the Caribbean Sea.",
          images: [
            findMedia("Deluxe-Beachfront-Room-Lower-Level-Inside"),
            findMedia("Deluxe-Beachfront-Room-Lower-Level-Outside"),
            findMedia("Deluxe-Beachfront-Room-Lower-Level-Bathroom"),
          ],
          stats: [
            { value: "450", label: "Sq. Ft." },
            { value: "King", label: "Bed" },
            { value: "2", label: "Guests" },
          ],
          amenities: [
            "Direct beach access",
            "Private terrace",
            "Outdoor shower",
            "Air conditioning",
            "Minibar",
            "Nespresso machine",
            "Complimentary Wi-Fi",
          ],
          ctaLabel: "Book This Room",
          ctaUrl: "https://curtainbluff.com/reservations",
        },
        {
          type: "room_detail",
          id: "deluxe-ocean-view-upper",
          label: "UPPER FLOOR",
          name: "Deluxe Ocean View",
          nameItalic: "Room",
          description:
            "Upper-floor rooms with elevated ocean views and private balconies.",
          images: [
            findMedia("Deluxe-Ocean-View-Room-Upper-Level-Inside"),
            findMedia("Deluxe-Ocean-View-Room-Upper-Level-Outside"),
            findMedia("Deluxe-Ocean-View-Room-Upper-Level-Balcony"),
          ],
          stats: [
            { value: "450", label: "Sq. Ft." },
            { value: "King", label: "Bed" },
            { value: "2", label: "Guests" },
          ],
          amenities: [
            "Elevated ocean views",
            "Private balcony",
            "Air conditioning",
            "Minibar",
            "Nespresso machine",
            "Complimentary Wi-Fi",
          ],
          ctaLabel: "Book This Room",
          ctaUrl: "https://curtainbluff.com/reservations",
        },
        {
          type: "room_detail",
          id: "junior-suite-beachfront",
          label: "JUNIOR SUITE",
          name: "Junior Suite",
          nameItalic: "Beach Front",
          description:
            "Spacious suites with separate living areas and premium beachfront positions.",
          images: [
            findMedia("ground-floor-junior-sweet-beach-front-bedroom"),
            findMedia("ground-floor-junior-sweet-beach-front-living"),
            findMedia("ground-floor-junior-sweet-bathroom"),
          ],
          stats: [
            { value: "650", label: "Sq. Ft." },
            { value: "King", label: "Bed" },
            { value: "2\u20134", label: "Guests" },
          ],
          amenities: [
            "Separate living area",
            "Direct beach access",
            "Private terrace",
            "Outdoor shower",
            "Air conditioning",
            "Minibar",
            "Nespresso machine",
            "Complimentary Wi-Fi",
          ],
          ctaLabel: "Book This Suite",
          ctaUrl: "https://curtainbluff.com/reservations",
        },
        {
          type: "cta_band",
          background: "dark",
          title: "Ready to",
          titleItalic: "Book?",
          description:
            "Contact our reservations team to find the perfect room for your stay.",
          cta: {
            label: "Make a Reservation",
            url: "https://curtainbluff.com/reservations",
          },
          contactDetails: [
            { label: "US Toll Free", value: "888-289-9898", url: "tel:8882899898" },
            { label: "Email", value: "curtainbluff@curtainbluff.com", url: "mailto:curtainbluff@curtainbluff.com" },
          ],
        },
      ]),
      seo: {
        title: "Beach Front Rooms — Curtain Bluff, Antigua",
        description:
          "Beach front rooms at Curtain Bluff, directly on the sand with stunning Caribbean views.",
      },
      status: "published" as PageStatus,
      sortOrder: 0,
      showInNav: true,
      navLabel: "Beach Front Rooms",
    },
  });

  // --- Rooms on the Bluff ---
  console.log("  Creating: Rooms on the Bluff");
  await prisma.page.create({
    data: {
      title: "Rooms on the Bluff",
      slug: "rooms-on-the-bluff",
      parentId: roomsParent.id,
      template: "generic",
      sections: json([
        {
          type: "hero",
          variant: "short",
          image: findMedia("pt-rooms-on-bluff"),
          title: "Rooms on",
          titleItalic: "the Bluff",
          subtitle:
            "Elevated luxury with sweeping views of the Caribbean Sea",
          showBreadcrumb: true,
          breadcrumb: [
            { label: "Home", url: "/" },
            { label: "Rooms & Suites", url: "/rooms" },
          ],
        },
        {
          type: "intro",
          label: "ON THE BLUFF",
          title: "Elevated",
          titleItalic: "Elegance",
          body: "Set on our signature bluff, these rooms and suites offer panoramic views of both beaches and the Caribbean Sea. Recently renovated with contemporary Caribbean style, they combine the best of our heritage with modern luxury.",
        },
        {
          type: "room_detail",
          id: "bluff-room",
          label: "BLUFF ROOM",
          name: "Room on",
          nameItalic: "the Bluff",
          description:
            "Elevated rooms with dramatic views from our signature hillside setting.",
          images: [
            findMedia("Bluff-Room-Balcony"),
            findMedia("Bluff-1"),
            findMedia("Bluff-2"),
          ],
          stats: [
            { value: "500", label: "Sq. Ft." },
            { value: "King", label: "Bed" },
            { value: "2", label: "Guests" },
          ],
          amenities: [
            "Panoramic ocean views",
            "Private balcony",
            "Air conditioning",
            "Minibar",
            "Nespresso machine",
            "Complimentary Wi-Fi",
          ],
          ctaLabel: "Book This Room",
          ctaUrl: "https://curtainbluff.com/reservations",
        },
        {
          type: "room_detail",
          id: "morris-bay-suite",
          label: "MORRIS BAY SUITE",
          name: "Morris Bay",
          nameItalic: "Suite",
          description:
            "Our most luxurious suites, with expansive living spaces and private terraces with plunge pools.",
          images: [
            findMedia("Morris-Bay-living-room"),
            findMedia("Morris-bay-bedroom"),
            findMedia("Morris-Bay-terrace"),
            findMedia("Morris-Bay-bathroom"),
          ],
          stats: [
            { value: "1,200", label: "Sq. Ft." },
            { value: "King", label: "Bed" },
            { value: "2\u20134", label: "Guests" },
          ],
          amenities: [
            "Private plunge pool",
            "Separate living room",
            "Walk-in rain shower",
            "Dual vanity bathroom",
            "Air conditioning",
            "Minibar",
            "Nespresso machine",
            "Complimentary Wi-Fi",
          ],
          ctaLabel: "Book This Suite",
          ctaUrl: "https://curtainbluff.com/reservations",
        },
        {
          type: "room_detail",
          id: "cliff-suite",
          label: "CLIFF SUITE",
          name: "Cliff",
          nameItalic: "Suite",
          description:
            "Perched on the cliff\u2019s edge, these suites offer the most dramatic views on the island.",
          images: [
            findMedia("cliff-suite-1"),
            findMedia("cliff-suite-2"),
            findMedia("cliff-suite-3"),
          ],
          stats: [
            { value: "900", label: "Sq. Ft." },
            { value: "King", label: "Bed" },
            { value: "2", label: "Guests" },
          ],
          amenities: [
            "Cliff-edge position",
            "Panoramic views",
            "Private terrace",
            "Outdoor soaking tub",
            "Air conditioning",
            "Minibar",
            "Nespresso machine",
            "Complimentary Wi-Fi",
          ],
          ctaLabel: "Book This Suite",
          ctaUrl: "https://curtainbluff.com/reservations",
        },
        {
          type: "cta_band",
          background: "dark",
          title: "Ready to",
          titleItalic: "Book?",
          description:
            "Contact our reservations team to find the perfect room for your stay.",
          cta: {
            label: "Make a Reservation",
            url: "https://curtainbluff.com/reservations",
          },
        },
      ]),
      seo: {
        title: "Rooms on the Bluff — Curtain Bluff, Antigua",
        description:
          "Elevated luxury rooms and suites at Curtain Bluff, perched on the bluff with panoramic Caribbean views.",
      },
      status: "published" as PageStatus,
      sortOrder: 1,
      showInNav: true,
      navLabel: "Rooms on the Bluff",
    },
  });

  // --- Pool Suites ---
  console.log("  Creating: Pool Suites");
  await prisma.page.create({
    data: {
      title: "Pool Suites",
      slug: "pool-suites",
      parentId: roomsParent.id,
      template: "generic",
      sections: json([
        {
          type: "hero",
          variant: "short",
          image: findMedia("terrace-pool-suite-bedroom-view"),
          title: "Pool",
          titleItalic: "Suites",
          subtitle:
            "Private plunge pools with panoramic Caribbean vistas",
          showBreadcrumb: true,
          breadcrumb: [
            { label: "Home", url: "/" },
            { label: "Rooms & Suites", url: "/rooms" },
          ],
        },
        {
          type: "intro",
          label: "POOL SUITES",
          title: "Your Private",
          titleItalic: "Paradise",
          body: "Our Pool Suites offer the ultimate in privacy and luxury, each featuring a private plunge pool overlooking the Caribbean Sea. Spacious interiors, elegant bathrooms, and expansive terraces make these the perfect choice for a truly special stay.",
        },
        {
          type: "room_detail",
          id: "terrace-pool-suite",
          label: "TERRACE POOL SUITE",
          name: "Terrace Pool",
          nameItalic: "Suite",
          description:
            "Expansive suites with private plunge pools and wraparound terraces.",
          images: [
            findMedia("terrace-pool-suite-bedroom"),
            findMedia("terrace-pool-suite-bathroom"),
            findMedia("terrace-pool-suite-shower"),
            findMedia("terrace-pool-suite-bedroom-view"),
          ],
          stats: [
            { value: "1,000", label: "Sq. Ft." },
            { value: "King", label: "Bed" },
            { value: "2", label: "Guests" },
          ],
          amenities: [
            "Private plunge pool",
            "Wraparound terrace",
            "Outdoor rain shower",
            "Dual vanity bathroom",
            "Air conditioning",
            "Minibar",
            "Nespresso machine",
            "Complimentary Wi-Fi",
          ],
          ctaLabel: "Book This Suite",
          ctaUrl: "https://curtainbluff.com/reservations",
        },
        {
          type: "cta_band",
          background: "dark",
          title: "Ready to",
          titleItalic: "Book?",
          description:
            "Contact our reservations team to find the perfect suite for your stay.",
          cta: {
            label: "Make a Reservation",
            url: "https://curtainbluff.com/reservations",
          },
        },
      ]),
      seo: {
        title: "Pool Suites — Curtain Bluff, Antigua",
        description:
          "Luxury pool suites at Curtain Bluff with private plunge pools and panoramic Caribbean views.",
      },
      status: "published" as PageStatus,
      sortOrder: 2,
      showInNav: true,
      navLabel: "Pool Suites",
    },
  });

  // --- The Spa ---
  console.log("  Creating: The Spa");
  await prisma.page.create({
    data: {
      title: "The Spa",
      slug: "the-spa",
      parentId: wellnessParent.id,
      template: "generic",
      sections: json([
        {
          type: "hero",
          variant: "short",
          image: findMedia("Spa-at-Curtain-Bluff"),
          title: "The",
          titleItalic: "Spa",
          subtitle:
            "A clifftop sanctuary where the Caribbean breeze meets world-class wellness",
          showBreadcrumb: true,
          breadcrumb: [
            { label: "Home", url: "/" },
            { label: "Wellness", url: "/wellness" },
          ],
        },
        {
          type: "intro",
          label: "WELLNESS",
          title: "Restore,",
          titleItalic: "Renew, Relax",
          body: "Perched on the bluff overlooking the Caribbean Sea, our spa offers a serene retreat for body and mind. Using locally sourced botanicals and time-honoured techniques, our therapists create bespoke experiences that leave you feeling utterly renewed.",
        },
        {
          type: "editorial_split",
          layout: "image-right",
          background: "light",
          image: findMedia("Spafront-curtain-bluff"),
          label: "THE SETTING",
          title: "Open-Air",
          titleItalic: "Treatment Rooms",
          body: "Each treatment room opens to the sea breeze and ocean views. Our six treatment rooms, couples\u2019 suite, and relaxation lounge are designed to harmonise with the natural beauty of the bluff.",
        },
        {
          type: "treatment_list",
          label: "MENU",
          title: "Signature",
          titleItalic: "Treatments",
          description:
            "Our menu features Caribbean-inspired treatments using local botanicals, sea minerals, and essential oils.",
          treatments: [
            {
              name: "Caribbean Calm Massage",
              description:
                "A full-body massage using warm coconut oil and local botanicals to ease tension and restore balance.",
            },
            {
              name: "Ocean Mineral Body Wrap",
              description:
                "A detoxifying wrap using Antiguan sea minerals and aloe vera to nourish and hydrate the skin.",
            },
            {
              name: "Tropical Radiance Facial",
              description:
                "A revitalising facial using papaya enzymes and Caribbean honey for a natural glow.",
            },
            {
              name: "Couples\u2019 Bluff Experience",
              description:
                "A shared journey of relaxation in our couples\u2019 suite, with ocean-view treatment rooms and champagne.",
            },
          ],
          ctas: [
            {
              label: "View Full Menu",
              url: "/the-spa#treatments",
            },
          ],
        },
        {
          type: "experience_steps",
          steps: [
            {
              number: "01",
              title: "Arrive & Relax",
              description:
                "Begin your spa journey in our relaxation lounge with herbal tea and ocean views.",
            },
            {
              number: "02",
              title: "Personalised Consultation",
              description:
                "Our therapist will tailor your treatment to your needs and preferences.",
            },
            {
              number: "03",
              title: "Your Treatment",
              description:
                "Experience our signature therapies in open-air treatment rooms overlooking the sea.",
            },
            {
              number: "04",
              title: "Post-Treatment Bliss",
              description:
                "Return to the relaxation lounge to savour the moment before rejoining paradise.",
            },
          ],
        },
        {
          type: "testimonial",
          quote:
            "The spa at Curtain Bluff is the most serene place I have ever experienced. Listening to the waves during a massage is pure heaven.",
          author: "Guest Review",
          background: "light",
        },
      ]),
      seo: {
        title: "The Spa — Curtain Bluff, Antigua",
        description:
          "A clifftop spa sanctuary at Curtain Bluff with Caribbean-inspired treatments and panoramic ocean views.",
      },
      status: "published" as PageStatus,
      sortOrder: 0,
      showInNav: true,
      navLabel: "The Spa",
    },
  });

  // --- Tennis ---
  console.log("  Creating: Tennis");
  await prisma.page.create({
    data: {
      title: "Tennis",
      slug: "tennis",
      parentId: wellnessParent.id,
      template: "generic",
      sections: json([
        {
          type: "hero",
          variant: "short",
          image: findMedia("pt-tennis-bg"),
          title: "Championship",
          titleItalic: "Tennis",
          subtitle:
            "Four championship courts, professional coaching, and a legendary tennis tradition",
          showBreadcrumb: true,
          breadcrumb: [
            { label: "Home", url: "/" },
            { label: "Wellness", url: "/wellness" },
          ],
        },
        {
          type: "intro",
          label: "TENNIS",
          title: "A Sporting",
          titleItalic: "Legacy",
          body: "Tennis has been at the heart of Curtain Bluff since the beginning. Our four championship courts \u2014 including a stadium court \u2014 are maintained to tournament standards and available to all guests, complimentary. Professional coaching, clinics, and round-robins are available throughout the week.",
        },
        {
          type: "editorial_split",
          layout: "image-right",
          background: "light",
          image: findMedia("25-Tennis-at-Curtain-Bluff"),
          label: "FACILITIES",
          title: "Four Championship",
          titleItalic: "Courts",
          body: "Our courts include three Har-Tru clay courts and one Deco Turf hard court, all floodlit for evening play. A stadium court hosts our annual pro-am tournament and exhibition matches.",
          stats: [
            { value: "4", label: "Courts" },
            { value: "3", label: "Clay Courts" },
            { value: "1", label: "Hard Court" },
          ],
        },
        {
          type: "editorial_split",
          layout: "image-left",
          background: "sand",
          image: findMedia("Curtain-Bluff-Tennis-Class"),
          label: "COACHING",
          title: "Professional",
          titleItalic: "Instruction",
          body: "Our resident tennis professionals offer private lessons, group clinics, and round-robin tournaments for all levels. Whether you\u2019re picking up a racquet for the first time or honing your game, our team is here to help.",
        },
        {
          type: "testimonial",
          quote:
            "The tennis programme at Curtain Bluff is exceptional. The courts are immaculate and the pros are world-class. It\u2019s a tennis player\u2019s paradise.",
          author: "Guest Review",
          background: "light",
        },
      ]),
      seo: {
        title: "Tennis — Curtain Bluff, Antigua",
        description:
          "Championship tennis at Curtain Bluff with four courts, professional coaching, and a legendary sporting tradition.",
      },
      status: "published" as PageStatus,
      sortOrder: 1,
      showInNav: true,
      navLabel: "Tennis",
    },
  });

  // --- Contact Us ---
  console.log("  Creating: Contact Us");
  await prisma.page.create({
    data: {
      title: "Contact Us",
      slug: "contact-us",
      template: "generic",
      sections: json([
        {
          type: "hero",
          variant: "short",
          image: findMedia("pt-contact-bg"),
          title: "Contact",
          titleItalic: "Us",
          subtitle: "We\u2019d love to hear from you",
          showBreadcrumb: true,
          breadcrumb: [{ label: "Home", url: "/" }],
        },
        {
          type: "contact_form",
          title: "Send Us a Message",
          subtitle:
            "Fill out the form below and our team will get back to you within 24 hours.",
          fields: [
            {
              name: "firstName",
              label: "First Name",
              type: "text" as const,
              required: true,
              halfWidth: true,
            },
            {
              name: "lastName",
              label: "Last Name",
              type: "text" as const,
              required: true,
              halfWidth: true,
            },
            {
              name: "email",
              label: "Email Address",
              type: "email" as const,
              required: true,
              halfWidth: true,
            },
            {
              name: "phone",
              label: "Phone Number",
              type: "tel" as const,
              halfWidth: true,
            },
            {
              name: "subject",
              label: "Subject",
              type: "select" as const,
              options: [
                "General Enquiry",
                "Reservations",
                "Weddings & Events",
                "Press & Media",
                "Careers",
                "Other",
              ],
              required: true,
            },
            {
              name: "message",
              label: "Message",
              type: "textarea" as const,
              required: true,
            },
          ],
          submitLabel: "Send Message",
          formType: "contact",
        },
        {
          type: "contact_info",
          sections: json([
            {
              title: "Reservations",
              items: [
                {
                  label: "US Toll Free",
                  value: "888-289-9898",
                  url: "tel:8882899898",
                },
                {
                  label: "UK Toll Free",
                  value: "0800-051-8956",
                  url: "tel:08000518956",
                },
                {
                  label: "Direct",
                  value: "268-462-8400",
                  url: "tel:2684628400",
                },
                {
                  label: "Email",
                  value: "curtainbluff@curtainbluff.com",
                  url: "mailto:curtainbluff@curtainbluff.com",
                },
              ],
            },
            {
              title: "Address",
              items: [
                { label: "Curtain Bluff", value: "P.O. Box 288" },
                { label: "", value: "Old Road, Antigua" },
                { label: "", value: "West Indies" },
              ],
            },
          ]),
          pressContacts: [
            {
              title: "Karen Wollard",
              role: "Director of Public Relations",
              email: "pr@curtainbluff.com",
            },
          ],
        },
      ]),
      seo: {
        title: "Contact Us — Curtain Bluff, Antigua",
        description:
          "Get in touch with Curtain Bluff. Contact our reservations team, request information, or send us a message.",
      },
      status: "published" as PageStatus,
      sortOrder: 8,
      showInNav: true,
      navLabel: "Contact",
    },
  });

  // --- Special Offers ---
  console.log("  Creating: Special Offers");
  await prisma.page.create({
    data: {
      title: "Special Offers",
      slug: "special-offers",
      template: "generic",
      sections: json([
        {
          type: "hero",
          variant: "short",
          image: findMedia("pt-special-offers-bg"),
          title: "Special",
          titleItalic: "Offers",
          subtitle:
            "Exclusive packages and seasonal promotions for your Caribbean escape",
          showBreadcrumb: true,
          breadcrumb: [{ label: "Home", url: "/" }],
        },
        {
          type: "offer_card",
          image: findMedia("30-off-offer"),
          discountLabel: "25%",
          tag: "LIMITED TIME",
          title: "Book 5 Nights,",
          titleItalic: "Save 25%",
          description:
            "Stay five nights or more and enjoy 25% off our published rates. Includes all meals, premium drinks, water sports, and tennis.",
          includes: [
            "All meals & premium drinks",
            "Water sports & tennis",
            "Spa credit $200",
            "Airport transfers",
          ],
          includesTitle: "Your Stay Includes",
          terms: "Subject to availability. Blackout dates may apply.",
          ctaLabel: "Book Now",
          ctaUrl: "https://curtainbluff.com/reservations",
        },
        {
          type: "offer_card",
          image: findMedia("slider"),
          discountLabel: "30%",
          tag: "BEST VALUE",
          title: "Book 10 Nights,",
          titleItalic: "Save 30%",
          description:
            "Stay ten nights or more and enjoy our best rate of the season \u2014 30% off published prices. The ultimate Caribbean escape.",
          includes: [
            "All meals & premium drinks",
            "Water sports & tennis",
            "Spa credit $400",
            "Airport transfers",
            "Complimentary room upgrade (subject to availability)",
          ],
          includesTitle: "Your Stay Includes",
          terms: "Subject to availability. Blackout dates may apply.",
          ctaLabel: "Book Now",
          ctaUrl: "https://curtainbluff.com/reservations",
        },
      ]),
      seo: {
        title: "Special Offers — Curtain Bluff, Antigua",
        description:
          "Exclusive packages and seasonal promotions at Curtain Bluff, Antigua\u2019s premier all-inclusive luxury resort.",
      },
      status: "published" as PageStatus,
      sortOrder: 6,
      showInNav: true,
      navLabel: "Offers",
    },
  });

  // --- Gallery ---
  console.log("  Creating: Gallery");
  const galleryImages = Array.from(mediaMap.values()).map((m) => ({
    id: m.id,
    url: m.url,
    alt: m.alt,
    blurhash: m.blurhash ?? undefined,
    width: m.width,
    height: m.height,
    category: classifyFolder(m.alt),
  }));

  await prisma.page.create({
    data: {
      title: "Gallery",
      slug: "gallery",
      template: "generic",
      sections: json([
        {
          type: "hero",
          variant: "short",
          image: findMedia("pt-gallery-bg"),
          title: "Photo",
          titleItalic: "Gallery",
          subtitle: "Explore Curtain Bluff through our lens",
          showBreadcrumb: true,
          breadcrumb: [{ label: "Home", url: "/" }],
        },
        {
          type: "filter_gallery",
          categories: [
            "All",
            "resort",
            "rooms",
            "dining",
            "activities",
            "wellness",
            "events",
          ],
          images: galleryImages.slice(0, 50),
        },
      ]),
      seo: {
        title: "Gallery — Curtain Bluff, Antigua",
        description:
          "Browse photos of Curtain Bluff\u2019s beaches, rooms, dining, activities, and more.",
      },
      status: "published" as PageStatus,
      sortOrder: 7,
      showInNav: true,
      navLabel: "Gallery",
    },
  });

  // --- Weddings and Events ---
  console.log("  Creating: Weddings & Events");
  await prisma.page.create({
    data: {
      title: "Weddings & Events",
      slug: "weddings-and-events",
      template: "generic",
      sections: json([
        {
          type: "hero",
          variant: "centered",
          image: findMedia("pt-wedding-event-bg"),
          title: "Weddings &",
          titleItalic: "Events",
          subtitle:
            "Celebrate life\u2019s most important moments in paradise",
        },
        {
          type: "intro",
          label: "CELEBRATIONS",
          title: "Your Dream",
          titleItalic: "Caribbean Wedding",
          body: "Whether it\u2019s an intimate elopement on the beach or a grand celebration under the stars, Curtain Bluff provides the perfect setting for your special day. Our dedicated events team handles every detail, so you can focus on making memories.",
          cta: { label: "Start Planning", url: "/contact-us" },
        },
        {
          type: "editorial_split",
          layout: "image-right",
          background: "light",
          image: findMedia("Wedding03"),
          label: "WEDDINGS",
          title: "Beach",
          titleItalic: "Ceremonies",
          body: "Exchange vows on our pristine beach with the Caribbean Sea as your backdrop. From sunset ceremonies to twilight receptions, we\u2019ll create an unforgettable experience tailored to your vision.",
        },
        {
          type: "editorial_split",
          layout: "image-left",
          background: "sand",
          image: findMedia("honeymoon"),
          label: "HONEYMOONS",
          title: "A Romantic",
          titleItalic: "Escape",
          body: "Begin your new life together in paradise. Our honeymoon packages include special room upgrades, spa treatments, romantic dinners, and thoughtful touches that make your stay truly magical.",
        },
        {
          type: "editorial_split",
          layout: "image-right",
          background: "light",
          image: findMedia("Corporateevent"),
          label: "CORPORATE",
          title: "Corporate",
          titleItalic: "Events",
          body: "Curtain Bluff offers an inspired setting for corporate retreats, team-building events, and executive meetings. Our intimate scale ensures a personalised experience with world-class facilities and service.",
        },
        {
          type: "testimonial",
          quote:
            "Our wedding at Curtain Bluff was beyond anything we could have imagined. The team took care of every detail and our guests are still talking about it years later.",
          author: "Wedding Guest",
          background: "light",
        },
        {
          type: "cta_band",
          background: "dark",
          title: "Start Planning",
          titleItalic: "Your Event",
          description:
            "Contact our events team to discuss your celebration at Curtain Bluff.",
          cta: { label: "Get in Touch", url: "/contact-us" },
        },
      ]),
      seo: {
        title: "Weddings & Events — Curtain Bluff, Antigua",
        description:
          "Plan your dream wedding, honeymoon, or corporate event at Curtain Bluff, Antigua.",
      },
      status: "published" as PageStatus,
      sortOrder: 5,
      showInNav: true,
      navLabel: "Weddings & Events",
    },
  });

  // --- Bentleys ---
  console.log("  Creating: Bentleys");
  await prisma.page.create({
    data: {
      title: "Bentleys",
      slug: "bentleys",
      template: "generic",
      sections: json([
        {
          type: "hero",
          variant: "centered",
          image: findMedia("bentleys"),
          title: "Bentleys at",
          titleItalic: "Curtain Bluff",
          subtitle:
            "A private villa experience within the Curtain Bluff estate",
        },
        {
          type: "intro",
          label: "PRIVATE VILLA",
          title: "The Ultimate",
          titleItalic: "Retreat",
          body: "Bentleys offers the privacy and exclusivity of a private villa with all the amenities and services of Curtain Bluff. Nestled within the resort estate, this stunning residence is perfect for families, celebrations, or those seeking the ultimate in Caribbean luxury.",
        },
        {
          type: "editorial_split",
          layout: "image-right",
          background: "light",
          image: findMedia("bentleys"),
          label: "THE VILLA",
          title: "Space &",
          titleItalic: "Privacy",
          body: "With multiple bedrooms, a private pool, and dedicated staff, Bentleys provides a home-away-from-home experience in one of the Caribbean\u2019s most beautiful settings. All the inclusions of the resort are at your fingertips.",
          stats: [
            { value: "4", label: "Bedrooms" },
            { value: "Private", label: "Pool" },
            { value: "Dedicated", label: "Staff" },
          ],
        },
        {
          type: "cta_band",
          background: "dark",
          title: "Enquire About",
          titleItalic: "Bentleys",
          description:
            "Contact our team to learn more about availability and rates for Bentleys.",
          cta: { label: "Contact Us", url: "/contact-us" },
        },
      ]),
      seo: {
        title: "Bentleys — Private Villa at Curtain Bluff, Antigua",
        description:
          "Bentleys is a private villa within the Curtain Bluff estate, offering the ultimate in Caribbean luxury and privacy.",
      },
      status: "published" as PageStatus,
      sortOrder: 9,
      showInNav: false,
      navLabel: "Bentleys",
    },
  });

  // --- Activity sub-pages ---
  console.log("  Creating: Activity sub-pages");

  // Water Sports
  await prisma.page.create({
    data: {
      title: "Water Sports",
      slug: "water-sports",
      parentId: activitiesParent.id,
      template: "generic",
      sections: json([
        {
          type: "hero",
          variant: "short",
          image: findMedia("pt-water-sports-bg"),
          title: "Water",
          titleItalic: "Sports",
          subtitle:
            "Kayaking, paddleboarding, sailing, waterskiing, and snorkelling \u2014 all complimentary",
          showBreadcrumb: true,
          breadcrumb: [
            { label: "Home", url: "/" },
            { label: "Activities", url: "/activities" },
          ],
        },
        {
          type: "intro",
          label: "WATER SPORTS",
          title: "Your Caribbean",
          titleItalic: "Playground",
          body: "The calm, crystal-clear waters of Morris Bay provide the ideal setting for every kind of water sport. From kayaking and paddleboarding to sailing and waterskiing, every activity is complimentary and available all day. Our experienced water sports team provides instruction for all levels.",
        },
        {
          type: "editorial_split",
          layout: "image-right",
          background: "light",
          image: findMedia("water-sports-slide"),
          label: "ON THE WATER",
          title: "Sailing &",
          titleItalic: "Watersports",
          body: "Take a Hobie Cat for a sail, glide across the bay on a paddleboard, or feel the rush of waterskiing. Our professional instructors ensure every experience is safe and memorable.",
        },
        {
          type: "editorial_split",
          layout: "image-left",
          background: "sand",
          image: findMedia("Paddle-boarding"),
          label: "BENEATH THE SURFACE",
          title: "Snorkelling &",
          titleItalic: "Discovery",
          body: "Explore the vibrant coral reefs just off our beach. Snorkelling equipment is complimentary, and our glass-bottom boat tours offer a wonderful way to see the marine life without getting wet.",
        },
        {
          type: "testimonial",
          quote:
            "The water sports at Curtain Bluff are incredible \u2014 we spent every day trying something new. The staff are so welcoming and make everything easy.",
          author: "Guest Review",
          background: "light",
        },
      ]),
      seo: {
        title: "Water Sports — Curtain Bluff, Antigua",
        description:
          "Complimentary water sports at Curtain Bluff: kayaking, paddleboarding, sailing, waterskiing, snorkelling, and more.",
      },
      status: "published" as PageStatus,
      sortOrder: 0,
      showInNav: true,
      navLabel: "Water Sports",
    },
  });

  // Ground Sports
  await prisma.page.create({
    data: {
      title: "Ground Sports",
      slug: "ground-sports",
      parentId: activitiesParent.id,
      template: "generic",
      sections: json([
        {
          type: "hero",
          variant: "short",
          image: findMedia("pt-ground-sports-bg"),
          title: "Ground",
          titleItalic: "Sports",
          subtitle:
            "Tennis, squash, croquet, and fitness in an unbeatable Caribbean setting",
          showBreadcrumb: true,
          breadcrumb: [
            { label: "Home", url: "/" },
            { label: "Activities", url: "/activities" },
          ],
        },
        {
          type: "intro",
          label: "GROUND SPORTS",
          title: "Championship",
          titleItalic: "Facilities",
          body: "From our legendary tennis courts to the croquet lawn and squash courts, Curtain Bluff offers a full range of ground sports \u2014 all complimentary for guests. Our ocean-view fitness centre rounds out the offering.",
        },
        {
          type: "editorial_split",
          layout: "image-right",
          background: "light",
          image: findMedia("ground-sports-slide"),
          label: "COURTS & LAWNS",
          title: "Play &",
          titleItalic: "Compete",
          body: "Four championship tennis courts, two squash courts, and a beautifully maintained croquet lawn. Whether you prefer a competitive match or a gentle game, our facilities cater to all levels.",
        },
        {
          type: "editorial_split",
          layout: "image-left",
          background: "sand",
          image: findMedia("Curtain-Bluff-Gym"),
          label: "FITNESS",
          title: "Ocean-View",
          titleItalic: "Gym",
          body: "Our fully equipped fitness centre overlooks the Caribbean Sea, offering cardio equipment, free weights, and daily yoga classes. Start your morning with a sunrise workout or wind down with sunset yoga.",
        },
      ]),
      seo: {
        title: "Ground Sports — Curtain Bluff, Antigua",
        description:
          "Championship tennis, squash, croquet, and fitness at Curtain Bluff resort.",
      },
      status: "published" as PageStatus,
      sortOrder: 1,
      showInNav: true,
      navLabel: "Ground Sports",
    },
  });

  // Scuba Diving
  await prisma.page.create({
    data: {
      title: "Scuba Diving",
      slug: "scuba-diving",
      parentId: activitiesParent.id,
      template: "generic",
      sections: json([
        {
          type: "hero",
          variant: "short",
          image: findMedia("pt-padi-bg"),
          title: "Scuba",
          titleItalic: "Diving",
          subtitle:
            "Explore Antigua\u2019s underwater world with our PADI-certified dive centre",
          showBreadcrumb: true,
          breadcrumb: [
            { label: "Home", url: "/" },
            { label: "Activities", url: "/activities" },
          ],
        },
        {
          type: "intro",
          label: "DIVING",
          title: "Beneath the",
          titleItalic: "Surface",
          body: "Our on-site PADI-certified dive centre offers everything from introductory courses to advanced drift dives. Explore vibrant coral reefs, dramatic wall dives, and fascinating wrecks in the warm, clear waters of Antigua\u2019s south coast.",
        },
        {
          type: "editorial_split",
          layout: "image-right",
          background: "light",
          image: findMedia("diving-picture"),
          label: "EXPLORE",
          title: "Reef &",
          titleItalic: "Wreck Dives",
          body: "Our dive sites include colourful reef systems teeming with tropical fish, dramatic wall dives, and the famous Andes wreck \u2014 all within a short boat ride from the resort.",
        },
        {
          type: "editorial_split",
          layout: "image-left",
          background: "sand",
          image: findMedia("padi"),
          label: "LEARN",
          title: "PADI",
          titleItalic: "Courses",
          body: "Never dived before? Our PADI-certified instructors offer Discover Scuba experiences for beginners, as well as Open Water and Advanced certifications for those looking to go deeper.",
        },
        {
          type: "testimonial",
          quote:
            "The dive team at Curtain Bluff is exceptional. They know every dive site intimately and made our experience unforgettable.",
          author: "Guest Review",
          background: "light",
        },
      ]),
      seo: {
        title: "Scuba Diving — Curtain Bluff, Antigua",
        description:
          "PADI-certified scuba diving at Curtain Bluff. Reef dives, wreck dives, night dives, and introductory courses.",
      },
      status: "published" as PageStatus,
      sortOrder: 2,
      showInNav: true,
      navLabel: "Scuba Diving",
    },
  });

  // Cee Bee Kids Camp
  await prisma.page.create({
    data: {
      title: "Cee Bee Kids Camp",
      slug: "cee-bee-kids-camp",
      parentId: activitiesParent.id,
      template: "generic",
      sections: json([
        {
          type: "hero",
          variant: "short",
          image: findMedia("kids-camp"),
          title: "Cee Bee",
          titleItalic: "Kids Camp",
          subtitle:
            "A supervised programme for children aged 2\u201312, complimentary for all guests",
          showBreadcrumb: true,
          breadcrumb: [
            { label: "Home", url: "/" },
            { label: "Activities", url: "/activities" },
          ],
        },
        {
          type: "intro",
          label: "KIDS CAMP",
          title: "Adventures for",
          titleItalic: "Little Ones",
          body: "Cee Bee Kids Camp is a supervised programme for children aged 2\u201312, running daily from 9am to 5pm. Beach activities, nature walks, arts and crafts, and Caribbean storytelling keep young guests entertained while parents enjoy the resort.",
        },
        {
          type: "editorial_split",
          layout: "image-right",
          background: "light",
          image: findMedia("Familypackage"),
          label: "ACTIVITIES",
          title: "Fun &",
          titleItalic: "Discovery",
          body: "From building sandcastles and snorkelling to nature walks and craft workshops, every day brings new adventures. Our experienced staff create a safe, stimulating environment where children thrive.",
        },
        {
          type: "editorial_split",
          layout: "image-left",
          background: "sand",
          image: findMedia("kids"),
          label: "EVENINGS",
          title: "Evening",
          titleItalic: "Programme",
          body: "On select evenings, an optional kids\u2019 supper and movie night programme allows parents to enjoy a romantic dinner at The Tamarind. Additional charges apply for evening care.",
        },
        {
          type: "testimonial",
          quote:
            "Our children talk about Cee Bee Kids Camp all year. The staff genuinely care and the activities are creative and fun. It\u2019s why we keep coming back.",
          author: "Returning Guest",
          background: "light",
        },
      ]),
      seo: {
        title: "Cee Bee Kids Camp — Curtain Bluff, Antigua",
        description:
          "Complimentary kids camp at Curtain Bluff for children aged 2\u201312, with beach activities, nature walks, and Caribbean storytelling.",
      },
      status: "published" as PageStatus,
      sortOrder: 3,
      showInNav: true,
      navLabel: "Cee Bee Kids Camp",
    },
  });

  console.log("All pages created.\n");

  // ═══════════════════════════════════════════════════════
  // STEP 5 — OFFERS
  // ═══════════════════════════════════════════════════════
  console.log("STEP 5: Creating offers...");

  const now = new Date();
  const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
  const ninetyDaysFromNow = new Date(now.getTime() + 90 * 24 * 60 * 60 * 1000);
  const oneEightyDaysFromNow = new Date(
    now.getTime() + 180 * 24 * 60 * 60 * 1000
  );

  await prisma.offer.create({
    data: {
      title: "25% Off — Book 5 Nights",
      slug: "25-off-book-5",
      description:
        "Stay five nights or more and enjoy 25% off our published rates. Experience the all-inclusive luxury of Curtain Bluff with all meals, premium drinks, water sports, and tennis included.",
      discountLabel: "25%",
      details: {
        minimumNights: 5,
        highlight: "Our most popular offer",
      },
      includes: [
        "All meals & premium drinks",
        "Water sports & tennis",
        "Spa credit $200",
        "Airport transfers",
      ],
      terms:
        "Subject to availability. Blackout dates may apply. Cannot be combined with other offers.",
      bookingUrl: "https://curtainbluff.com/reservations",
      validFrom: thirtyDaysAgo,
      validTo: ninetyDaysFromNow,
      isFeatured: true,
      status: "active" as OfferStatus,
    },
  });

  await prisma.offer.create({
    data: {
      title: "30% Off — Book 10 Nights",
      slug: "30-off-book-10",
      description:
        "Stay ten nights or more and enjoy our best rate of the season — 30% off published prices. The ultimate Caribbean escape at Curtain Bluff.",
      discountLabel: "30%",
      details: {
        minimumNights: 10,
        highlight: "Best value offer",
      },
      includes: [
        "All meals & premium drinks",
        "Water sports & tennis",
        "Spa credit $400",
        "Airport transfers",
        "Complimentary room upgrade (subject to availability)",
      ],
      terms:
        "Subject to availability. Blackout dates may apply. Cannot be combined with other offers.",
      bookingUrl: "https://curtainbluff.com/reservations",
      validFrom: thirtyDaysAgo,
      validTo: oneEightyDaysFromNow,
      isFeatured: true,
      status: "active" as OfferStatus,
    },
  });

  console.log("Offers created.\n");

  // ═══════════════════════════════════════════════════════
  // STEP 6 — REDIRECTS
  // ═══════════════════════════════════════════════════════
  console.log("STEP 6: Creating redirects...");

  const redirects = [
    { fromPath: "/accommodations", toPath: "/rooms" },
    { fromPath: "/accommodations/beach-front-rooms", toPath: "/beach-front-rooms" },
    { fromPath: "/accommodations/rooms-on-the-bluff", toPath: "/rooms-on-the-bluff" },
    { fromPath: "/accommodations/pool-suites", toPath: "/pool-suites" },
    { fromPath: "/dining", toPath: "/dining-drinks" },
    { fromPath: "/dining-and-drinks", toPath: "/dining-drinks" },
    { fromPath: "/spa", toPath: "/the-spa" },
    { fromPath: "/things-to-do", toPath: "/activities" },
    { fromPath: "/water-sports", toPath: "/activities/water-sports" },
    { fromPath: "/ground-sports", toPath: "/activities/ground-sports" },
    { fromPath: "/scuba-diving", toPath: "/activities/scuba-diving" },
    { fromPath: "/weddings", toPath: "/weddings-and-events" },
  ];

  for (const r of redirects) {
    await prisma.redirect.create({
      data: {
        fromPath: r.fromPath,
        toPath: r.toPath,
        type: 301,
      },
    });
  }

  console.log(`Created ${redirects.length} redirects.\n`);

  console.log("=== Seed complete! ===");
}

main()
  .catch((e) => {
    console.error("Seed failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
