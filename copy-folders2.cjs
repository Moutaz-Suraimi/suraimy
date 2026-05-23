const fs = require('fs');
const path = require('path');

const baseDir = path.join(__dirname, 'public/ready-projects');
const dirs = fs.readdirSync(baseDir);

dirs.forEach(dir => {
  const fullPath = path.join(baseDir, dir);
  if (fs.statSync(fullPath).isDirectory()) {
    if (dir.includes('اليمن')) {
      fs.cpSync(fullPath, path.join(baseDir, 'yemen-lens'), { recursive: true });
      console.log('Copied yemen-lens');
    } else if (dir.includes('ابتسامتك')) {
      fs.cpSync(fullPath, path.join(baseDir, 'yemensmile'), { recursive: true });
      console.log('Copied yemensmile');
    }
  }
});
