const fs = require('fs');
const path = require('path');
const baseDir = path.join(__dirname, 'public/ready-projects');
const dirs = fs.readdirSync(baseDir);

dirs.forEach(dir => {
  const fullPath = path.join(baseDir, dir);
  if (fs.statSync(fullPath).isDirectory()) {
    // Exclude English folders
    if (dir !== 'yemensmile' && dir !== 'yemen-lens') {
      // "عدسة اليمن" is 10 characters long, "ابتسامتك" is 8 characters long.
      if (dir.length === 10) {
        try {
          fs.cpSync(fullPath, path.join(baseDir, 'yemen-lens'), { recursive: true });
          console.log('Copied folder with length 10 to yemen-lens');
        } catch(e) {
          console.error(e);
        }
      }
    }
  }
});
