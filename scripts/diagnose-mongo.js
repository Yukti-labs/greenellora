const fs = require("fs");
const path = require("path");
const mongoose = require("mongoose");

const envPath = path.join(__dirname, "..", ".env");
const env = fs.readFileSync(envPath, "utf8");
const line = env.split(/\r?\n/).find((l) => l.startsWith("MONGODB_URI="));

if (!line) {
  console.log("status=MISSING");
  process.exit(1);
}

const uri = line.slice("MONGODB_URI=".length).replace(/^["']|["']$/g, "").trim();
const host = uri
  .replace(/^mongodb(\+srv)?:\/\//, "")
  .replace(/^[^@]+@/, "")
  .split("/")[0]
  .split("?")[0];

console.log("status=SET");
console.log("scheme=" + (uri.startsWith("mongodb+srv") ? "srv" : uri.startsWith("mongodb:") ? "mongodb" : "other"));
console.log("has_user=" + uri.includes("@"));
console.log("localhost_blocked=" + /localhost|127\.0\.0\.1/i.test(uri));
console.log("host=" + host);
console.log("uri_length=" + uri.length);

if (!uri) {
  process.exit(1);
}

if (/localhost|127\.0\.0\.1/i.test(uri)) {
  console.log("connect=skipped_local");
  process.exit(2);
}

mongoose
  .connect(uri, { bufferCommands: false, serverSelectionTimeoutMS: 8000 })
  .then(async () => {
    console.log("connect=ok");
    console.log("readyState=" + mongoose.connection.readyState);
    await mongoose.disconnect();
    process.exit(0);
  })
  .catch((err) => {
    console.log("connect=fail");
    console.log("error_name=" + err.name);
    console.log("error_code=" + (err.code || ""));
    console.log("error_message=" + String(err.message || err).replace(uri, "[redacted]"));
    process.exit(3);
  });
