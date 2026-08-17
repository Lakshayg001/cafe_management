const { initializeApp, cert } = require('firebase-admin/app');
const { getAuth } = require('firebase-admin/auth');

let serviceAccount;
try {
  serviceAccount = require('./serviceAccountKey.json');
} catch (error) {
  console.error("❌ Error: Missing serviceAccountKey.json!");
  process.exit(1);
}

initializeApp({
  credential: cert(serviceAccount)
});

const args = process.argv.slice(2);
const email = args[0];

if (!email) {
  console.error("❌ Error: Please provide the email address of the admin.");
  console.log("Usage: node setAdminClaim.js <email>");
  process.exit(1);
}

async function setAdmin() {
  try {
    console.log(`Looking up user by email: ${email}...`);
    const userRecord = await getAuth().getUserByEmail(email);
    
    console.log(`Found user: ${userRecord.uid}. Setting admin claim...`);
    await getAuth().setCustomUserClaims(userRecord.uid, { role: 'admin' });
    
    console.log(`✅ Success! The user ${email} is now an admin.`);
    console.log("They can now log into the Velvet Brew Admin Panel.");
    process.exit(0);
  } catch (error) {
    console.error("❌ Error setting custom claim:", error.message);
    process.exit(1);
  }
}

setAdmin();
