const bcrypt = require("bcryptjs");

bcrypt.hash("V.kiran16", 10).then(hash => {
    console.log(hash);
});