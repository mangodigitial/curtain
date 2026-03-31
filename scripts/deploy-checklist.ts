#!/usr/bin/env tsx
/**
 * Deployment Checklist Validator
 *
 * Run: npx tsx scripts/deploy-checklist.ts
 *
 * Checks that all required environment variables and
 * infrastructure are configured before deployment.
 */

const REQUIRED_VARS = [
  { name: "DATABASE_URL", description: "Neon Postgres connection string" },
  { name: "JWT_SECRET", description: "Random 64+ character string for JWT signing" },
  { name: "NEXT_PUBLIC_SITE_URL", description: "Public URL of the site" },
];

const OPTIONAL_VARS = [
  { name: "BLOB_READ_WRITE_TOKEN", description: "Vercel Blob storage token (needed for image uploads)" },
  { name: "RESEND_API_KEY", description: "Resend API key for email notifications" },
  { name: "NEXT_PUBLIC_GA4_ID", description: "Google Analytics 4 Measurement ID" },
];

function check(label: string, pass: boolean, detail?: string): boolean {
  const icon = pass ? "✓" : "✗";
  const color = pass ? "\x1b[32m" : "\x1b[31m";
  console.log(`  ${color}${icon}\x1b[0m ${label}${detail ? ` — ${detail}` : ""}`);
  return pass;
}

async function main() {
  console.log("\n\x1b[1m🏨 Hotel CMS — Deployment Checklist\x1b[0m\n");
  let allPassed = true;

  // Required env vars
  console.log("\x1b[1mRequired Environment Variables:\x1b[0m");
  for (const v of REQUIRED_VARS) {
    const value = process.env[v.name];
    const pass = !!value && value.length > 5 && !value.includes("...");
    if (!check(v.name, pass, pass ? "Set" : `Missing — ${v.description}`)) {
      allPassed = false;
    }
  }

  // Optional env vars
  console.log("\n\x1b[1mOptional Environment Variables:\x1b[0m");
  for (const v of OPTIONAL_VARS) {
    const value = process.env[v.name];
    const pass = !!value && value.length > 3;
    check(v.name, pass, pass ? "Set" : `Not set — ${v.description}`);
  }

  // Database connectivity
  console.log("\n\x1b[1mDatabase:\x1b[0m");
  try {
    const { PrismaClient } = await import("@prisma/client");
    const prisma = new PrismaClient();
    await prisma.$connect();
    const settingsCount = await prisma.siteSettings.count();
    const pageCount = await prisma.page.count();
    const userCount = await prisma.user.count();
    await prisma.$disconnect();

    check("Database connection", true, "Connected");
    check("Site settings seeded", settingsCount > 0, settingsCount > 0 ? `${settingsCount} row(s)` : "Run npm run db:seed");
    check("Pages seeded", pageCount > 0, pageCount > 0 ? `${pageCount} page(s)` : "Run npm run db:seed");
    if (!check("Admin user exists", userCount > 0, userCount > 0 ? `${userCount} user(s)` : "Run npm run db:seed")) {
      allPassed = false;
    }
  } catch (e) {
    check("Database connection", false, "Cannot connect — check DATABASE_URL");
    allPassed = false;
  }

  // JWT secret strength
  console.log("\n\x1b[1mSecurity:\x1b[0m");
  const jwt = process.env.JWT_SECRET || "";
  check("JWT_SECRET length", jwt.length >= 32, `${jwt.length} chars (recommend 64+)`);
  check("JWT_SECRET not default", !jwt.includes("fallback") && !jwt.includes("changeme"), jwt.includes("fallback") || jwt.includes("changeme") ? "Change from default!" : "OK");

  // Summary
  console.log("\n" + "─".repeat(50));
  if (allPassed) {
    console.log("\x1b[32m\x1b[1m✓ All critical checks passed. Ready to deploy.\x1b[0m\n");
  } else {
    console.log("\x1b[31m\x1b[1m✗ Some checks failed. Fix the issues above before deploying.\x1b[0m\n");
  }

  console.log("Deployment steps:");
  console.log("  1. Push to GitHub");
  console.log("  2. Import project in Vercel");
  console.log("  3. Add all env vars in Vercel dashboard");
  console.log("  4. Deploy (Vercel auto-builds)");
  console.log("  5. Connect custom domain in Vercel");
  console.log("  6. Update NEXT_PUBLIC_SITE_URL to production domain");
  console.log("  7. Set up Resend domain verification");
  console.log("  8. Change admin password from 'changeme'");
  console.log("  9. Run Lighthouse audit — target 90+ performance");
  console.log("");
}

main().catch(console.error);
