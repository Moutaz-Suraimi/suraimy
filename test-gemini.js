const API_KEY = "AIzaSyAimQGEa94kiUExFFFIA0oU0o8aEjny98o";
const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`;

async function test() {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      contents: [{ role: "user", parts: [{ text: "Hello" }] }],
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 1000,
      }
    }),
  });

  const data = await response.json();
  console.log("Status:", response.status);
  console.log("Data:", JSON.stringify(data, null, 2));
}

test();
