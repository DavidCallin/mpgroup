const fs = require('fs');
const path = require('path');

// Configuration du site
const SITE_URL = 'https://mpgroup.africa';
const CURRENT_DATE = new Date().toISOString().split('T')[0];

// Routes du site
const routes = [
  { path: '/', priority: '1.0', changefreq: 'weekly' },
  { path: '/group', priority: '0.9', changefreq: 'monthly' },
  { path: '/expertises', priority: '0.9', changefreq: 'monthly' },
  { path: '/services', priority: '0.8', changefreq: 'monthly' },
  { path: '/portfolio', priority: '0.8', changefreq: 'monthly' },
  { path: '/founder', priority: '0.7', changefreq: 'monthly' },
  { path: '/news', priority: '0.8', changefreq: 'weekly' },
  { path: '/contact', priority: '0.9', changefreq: 'monthly' },
  { path: '/privacy-policy', priority: '0.3', changefreq: 'yearly' },
  { path: '/terms-of-service', priority: '0.3', changefreq: 'yearly' }
];

// Génération du XML du sitemap
function generateSitemap() {
  let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;

  routes.forEach(route => {
    sitemap += `
  <url>
    <loc>${SITE_URL}${route.path}</loc>
    <lastmod>${CURRENT_DATE}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
  </url>`;
  });

  sitemap += `
</urlset>`;

  return sitemap;
}

// Écriture du fichier sitemap
function writeSitemap() {
  const sitemapContent = generateSitemap();
  const publicDir = path.join(__dirname, '..', 'public');
  
  // Créer le dossier public s'il n'existe pas
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }
  
  const sitemapPath = path.join(publicDir, 'sitemap.xml');
  
  fs.writeFileSync(sitemapPath, sitemapContent, 'utf8');
  console.log('✅ Sitemap généré avec succès:', sitemapPath);
  console.log(`📄 ${routes.length} pages ajoutées au sitemap`);
}

// Génération du robots.txt
function generateRobotsTxt() {
  const robotsContent = `User-agent: *
Allow: /

# Sitemap
Sitemap: ${SITE_URL}/sitemap.xml

# Disallow admin pages (if any in the future)
Disallow: /admin/
`;

  const publicDir = path.join(__dirname, '..', 'public');
  const robotsPath = path.join(publicDir, 'robots.txt');
  
  fs.writeFileSync(robotsPath, robotsContent, 'utf8');
  console.log('✅ Robots.txt généré avec succès:', robotsPath);
}

// Exécution
try {
  writeSitemap();
  generateRobotsTxt();
  console.log('🚀 SEO files generated successfully!');
} catch (error) {
  console.error('❌ Erreur lors de la génération:', error);
  process.exit(1);
}