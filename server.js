const app = require('./app');

const PORT = process.env.PORT || 5000;

if (!process.env.PORT) {
  console.warn("Warning: PORT is not defined in environment variables. Using default port 5000.");
}

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
}).on('error', (err) => {
  console.error(`❌ Server failed to start: ${err.message}`);
  process.exit(1); 
});
