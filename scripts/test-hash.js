const bcrypt = require('bcryptjs');

async function testHash() {
    const password = 'admin123';
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    console.log('Generated hash:', hash);
    
    // Test stored hash
    const storedHash = '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy';
    const isValid = await bcrypt.compare(password, storedHash);
    console.log('Is valid with stored hash:', isValid);
    
    // Test with new hash
    const isValidNew = await bcrypt.compare(password, hash);
    console.log('Is valid with new hash:', isValidNew);
}

testHash(); 