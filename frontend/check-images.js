import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const assetsDir = path.join(__dirname, 'src', 'assets');

function getFileSizeInKB(filePath) {
  const stats = fs.statSync(filePath);
  return (stats.size / 1024).toFixed(2);
}

function checkImages(dir) {
  const files = fs.readdirSync(dir);
  const imageExtensions = ['.jpg', '.jpeg', '.png', '.webp', '.gif', '.svg'];
  
  console.log('\n📊 Analyse des images:\n');
  console.log('Fichier'.padEnd(50) + 'Taille'.padEnd(15) + 'Status');
  console.log('─'.repeat(80));
  
  let totalSize = 0;
  let largeImages = [];
  
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      checkImages(filePath);
    } else {
      const ext = path.extname(file).toLowerCase();
      if (imageExtensions.includes(ext)) {
        const sizeKB = parseFloat(getFileSizeInKB(filePath));
        totalSize += sizeKB;
        
        const relativePath = path.relative(assetsDir, filePath);
        let status = '✅ OK';
        
        if (sizeKB > 300) {
          status = '🔴 TROP LOURD';
          largeImages.push({ path: relativePath, size: sizeKB });
        } else if (sizeKB > 150) {
          status = '🟡 À OPTIMISER';
        }
        
        console.log(
          relativePath.padEnd(50) + 
          `${sizeKB} KB`.padEnd(15) + 
          status
        );
      }
    }
  });
  
  console.log('─'.repeat(80));
  console.log(`\nTaille totale: ${totalSize.toFixed(2)} KB (${(totalSize / 1024).toFixed(2)} MB)`);
  
  if (largeImages.length > 0) {
    console.log('\n⚠️  Images à optimiser en priorité:');
    largeImages.forEach(img => {
      console.log(`   - ${img.path} (${img.size} KB)`);
    });
    console.log('\n💡 Utilisez https://squoosh.app/ pour compresser ces images');
  } else {
    console.log('\n✅ Toutes les images sont optimisées!');
  }
}

try {
  checkImages(assetsDir);
} catch (error) {
  console.error('Erreur:', error.message);
}
