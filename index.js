// get city name from command line

const args = process.argv.slice(2);

// Support formats: `node index.js London`, `node index.js "New York"`,
// or `node index.js --city "New York"` / `node index.js --city=New York`
let city = null;
for (let i = 0; i < args.length; i++) {
  const a = args[i];
  if (a.startsWith('--city=')) {
    city = a.split('=').slice(1).join('=');
    break;
  }
  if (a === '--city' && args[i + 1]) {
    city = args[i + 1];
    break;
  }
}

// If no --city flag provided, treat all args as the city name
if (!city && args.length > 0) {
  city = args.join(' ');
}

if (!city) {
  console.error('Usage: node index.js <city name>  OR  node index.js --city "City Name"');
  process.exit(1);
}

// Print city and export for other modules (e.g. weather.js)
console.log(city);

const { getCurrentWeather } = require('./weather');

(async () => {
  try {
    const w = await getCurrentWeather(city);
    console.log(`\nCurrent weather for ${w.location}:`);
    console.log(`Temperature: ${w.temperature_c}°C`);
    console.log(`Conditions: ${w.description}`);
    console.log(`Wind: ${w.wind_kmh} km/h`);
  } catch (err) {
    console.error('Error fetching weather:', err.message || err);
    process.exit(1);
  }
})();

module.exports = city;
