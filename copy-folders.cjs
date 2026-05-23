const fs = require('fs');
const path = require('path');

const baseDir = path.join(__dirname, 'public/ready-projects');
const source1 = path.join(baseDir, 'ابتسامتك');
const dest1 = path.join(baseDir, 'yemensmile');
const source2 = path.join(baseDir, 'عدسة اليمن');
const dest2 = path.join(baseDir, 'yemen-lens');

try {
  fs.cpSync(source1, dest1, { recursive: true });
  console.log('Copied yemensmile');
} catch(e) {
  console.error('Error yemensmile:', e);
}

try {
  fs.cpSync(source2, dest2, { recursive: true });
  console.log('Copied yemen-lens');
} catch(e) {
  console.error('Error yemen-lens:', e);
}
