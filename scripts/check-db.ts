import { PrismaClient } from "@prisma/client";

async function main() {
  const p = new PrismaClient();
  try {
    console.log("Media:", await p.media.count());
    console.log("Pages:", await p.page.count());
    console.log("Settings:", await p.siteSettings.count());
    console.log("Users:", await p.user.count());
    console.log("Offers:", await p.offer.count());
    console.log("Redirects:", await p.redirect.count());
  } finally {
    await p.$disconnect();
  }
}

main();
