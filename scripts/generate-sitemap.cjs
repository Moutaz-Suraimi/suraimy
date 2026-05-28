const fs = require("fs");
const path = require("path");

const siteUrl = "https://suriix.com";
const currentDate = new Date().toISOString().split("T")[0];

// Main static pages configuration
const staticPages = [
  { path: "/", changefreq: "daily", priority: "1.0" },
  { path: "/about", changefreq: "weekly", priority: "0.8" },
  { path: "/solutions", changefreq: "weekly", priority: "0.9" },
  { path: "/packages", changefreq: "weekly", priority: "0.8" },
  { path: "/portfolio", changefreq: "weekly", priority: "0.9" },
  { path: "/ready-websites", changefreq: "weekly", priority: "0.8" },
  { path: "/testimonials", changefreq: "weekly", priority: "0.8" },
  { path: "/faq", changefreq: "monthly", priority: "0.7" },
  { path: "/blog", changefreq: "weekly", priority: "0.8" },
  { path: "/contact", changefreq: "monthly", priority: "0.7" },
  { path: "/privacy", changefreq: "yearly", priority: "0.3" },
  { path: "/terms", changefreq: "yearly", priority: "0.3" },
];

function generateSitemap() {
  console.log("Generating sitemap.xml...");

  // 1. Read and extract dynamic website IDs from readyWebsites.ts
  const readyWebsitesPath = path.join(__dirname, "../src/data/readyWebsites.ts");
  const dynamicPages = [];

  try {
    if (fs.existsSync(readyWebsitesPath)) {
      const content = fs.readFileSync(readyWebsitesPath, "utf8");
      const idRegex = /id:\s*["']([^"']+)["']/g;
      let match;
      while ((match = idRegex.exec(content)) !== null) {
        const id = match[1];
        dynamicPages.push({
          path: `/ready-website/${id}`,
          changefreq: "weekly",
          priority: "0.8",
        });
      }
      console.log(`Extracted dynamic website IDs: ${dynamicPages.map(p => p.path).join(", ")}`);
    } else {
      console.warn("readyWebsites.ts data file not found, skipping dynamic page indexing.");
    }
  } catch (error) {
    console.error("Error reading readyWebsites.ts:", error);
  }

  // Combine static and dynamic pages
  const allPages = [...staticPages, ...dynamicPages];

  // 2. Generate XML content
  let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
`;

  allPages.forEach((page) => {
    const loc = `${siteUrl}${page.path === "/" ? "" : page.path}`;
    
    xml += `  <url>\n`;
    xml += `    <loc>${loc}</loc>\n`;
    
    // Alternating language links for Google Multilingual Indexing
    xml += `    <xhtml:link rel="alternate" hreflang="ar" href="${loc}" />\n`;
    xml += `    <xhtml:link rel="alternate" hreflang="en" href="${loc}?lang=en" />\n`;
    xml += `    <xhtml:link rel="alternate" hreflang="zh" href="${loc}?lang=zh" />\n`;
    xml += `    <xhtml:link rel="alternate" hreflang="x-default" href="${loc}" />\n`;
    
    xml += `    <lastmod>${currentDate}</lastmod>\n`;
    xml += `    <changefreq>${page.changefreq}</changefreq>\n`;
    xml += `    <priority>${page.priority}</priority>\n`;
    xml += `  </url>\n`;
  });

  xml += `</urlset>\n`;

  // 3. Write to public/ and dist/ folders if they exist
  const publicDir = path.join(__dirname, "../public");
  const distDir = path.join(__dirname, "../dist");

  if (fs.existsSync(publicDir)) {
    fs.writeFileSync(path.join(publicDir, "sitemap.xml"), xml);
    console.log("Written sitemap.xml to public/sitemap.xml");
  }

  if (fs.existsSync(distDir)) {
    fs.writeFileSync(path.join(distDir, "sitemap.xml"), xml);
    console.log("Written sitemap.xml to dist/sitemap.xml");
  }

  console.log("Sitemap generation completed successfully.");
}

generateSitemap();
