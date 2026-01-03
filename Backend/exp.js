// hashPassword.js
const bcrypt = require('bcrypt');

(async () => {
  const password = "SuperSecurePassword123"; 
  const hash = await bcrypt.hash(password, 10);
  console.log("Hashed password:", hash);
})();
