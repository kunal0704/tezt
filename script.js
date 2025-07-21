async function detectSystemInfo() {
  const os = getOS();
  const browser = getBrowser();
  const ipInfo = await getIPInfo();
  const gpsLocation = await getGPSLocation();

  const greeting = getGreeting();
  const location = gpsLocation?.city || ipInfo?.city || "your location";
  const country = gpsLocation?.country || ipInfo?.country || "your country";
  const ip = ipInfo?.ip || "Unknown IP";

  const message = `${greeting}, visitor from ${location}, ${country}!\n> IP trace: ${ip} using ${browser} on ${os}`;

  document.getElementById("greeting").innerText = message;
}

// Improved OS detection
function getOS() {
  const ua = navigator.userAgent;
  if (/Android/i.test(ua)) return "Android";
  if (/iPhone|iPad|iPod/i.test(ua)) return "iOS";
  if (/Windows NT/i.test(ua)) return "Windows";
  if (/Macintosh/i.test(ua)) return "macOS";
  if (/Linux/i.test(ua)) return "Linux";
  return "Unknown OS";
}

// Browser detection
function getBrowser() {
  const ua = navigator.userAgent;
  if (ua.indexOf("Chrome") > -1) return "Chrome";
  if (ua.indexOf("Firefox") > -1) return "Firefox";
  if (ua.indexOf("Safari") > -1 && ua.indexOf("Chrome") === -1) return "Safari";
  if (ua.indexOf("Edge") > -1) return "Edge";
  return "Unknown Browser";
}

// Get greeting based on time
function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return "Good Morning";
  if (hour < 18) return "Good Afternoon";
  return "Good Evening";
}

// Get IP-based location
async function getIPInfo() {
  try {
    const response = await fetch("https://ipinfo.io/json?token=demo"); // Replace 'demo' with your free token from ipinfo.io
    return await response.json();
  } catch (e) {
    return null;
  }
}

// Get GPS-based location
async function getGPSLocation() {
  if (!navigator.geolocation) return null;

  return new Promise((resolve) => {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        try {
          // Reverse geocoding using OpenStreetMap Nominatim
          const url = `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`;
          const response = await fetch(url);
          const data = await response.json();
          resolve({
            city: data.address.city || data.address.town || data.address.village,
            country: data.address.country
          });
        } catch {
          resolve(null);
        }
      },
      () => resolve(null), // If permission denied
      { timeout: 5000 }
    );
  });
}

// Call on load
window.onload = detectSystemInfo;
