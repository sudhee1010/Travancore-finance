/**
 * Local dev utility: generates a bcrypt hash for a chosen admin
 * password so it can be pasted into ADMIN_PASSWORD_HASH in .env.
 *
 * Usage:
 *   npm run generate:hash -- "YourStrongPassword123!"
 *
 * The plaintext password is never written to disk or logged anywhere
 * except this one-time terminal output during setup.
 */
const bcrypt = require("bcryptjs");

async function main() {
  const password = process.argv[2];

  if (!password) {
    console.error('Usage: npm run generate:hash -- "YourStrongPassword"');
    process.exit(1);
  }

  const saltRounds = 12;
  const hash = await bcrypt.hash(password, saltRounds);

  console.log("\nAdd this line to your backend/.env file:\n");
  console.log(`ADMIN_PASSWORD_HASH=${hash}\n`);
}

main();
