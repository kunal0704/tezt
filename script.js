// Get IP and location from ipapi
fetch('https://ipapi.co/json/')
  .then(res => res.json())
  .then(data => {
    const ip = data.ip;
    const city = data.city;
    const country = data.country_name;
    const greeting = `🛰️ Good ${getTimeOfDay()}, visitor from ${city}!`;
    const ipDetails = `> IP trace: ${ip} located in ${city}, ${country}`;

    document.getElementById('greeting').textContent = greeting;
    document.getElementById('ip-details').textContent = ipDetails;
  })
  .catch(() => {
    document.getElementById('greeting').textContent = "Couldn't trace location 🌐";
  });

// Time-based greeting
function getTimeOfDay() {
  const hour = new Date().getHours();
  if (hour < 12) return 'Morning';
  else if (hour < 17) return 'Afternoon';
  else return 'Evening';
}

// Get browser and OS from userAgent
function getDeviceInfo() {
  const ua = navigator.userAgent;
  let browser = "Unknown Browser";
  let os = "Unknown OS";

  if (ua.includes("Firefox")) browser = "Mozilla Firefox";
  else if (ua.includes("Chrome")) browser = "Google Chrome";
  else if (ua.includes("Safari") && !ua.includes("Chrome")) browser = "Safari";
  else if (ua.includes("Edge")) browser = "Microsoft Edge";

  if (ua.includes("Windows")) os = "Windows";
  else if (ua.includes("Mac OS")) os = "macOS";
  else if (ua.includes("Linux")) os = "Linux";
  else if (/Android/.test(ua)) os = "Android";
  else if (/iPhone|iPad/.test(ua)) os = "iOS";

  return `🧠 You’re browsing on ${browser} using ${os}`;
}

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("device-info").textContent = getDeviceInfo();
});
