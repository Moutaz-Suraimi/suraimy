import fs from 'fs';
const API_KEY = "AIzaSyAimQGEa94kiUExFFFIA0oU0o8aEjny98o";
const url = `https://generativelanguage.googleapis.com/v1beta/models?key=${API_KEY}`;

async function test() {
  const response = await fetch(url);
  const data = await response.json();
  fs.writeFileSync('models.json', JSON.stringify(data, null, 2));
}

test();
