bcrypt
=======

bcrypt for the browser and node.js

```javascript
var bcrypt = require("@nathanfaucett/bcrypt");


var salt = bcrypt.genSaltSync(4);

bcrypt.genSalt(4, function onGenSalt(error, salt) {
    if (error) {
        // handle error
    } else {
        // do something with salt
    }
});

var hash = bcrypt.hashSync("password", salt);

bcrypt.hash("password", salt, function onHash(error, hash) {
    if (error) {
        // handle error
    } else {
        // do something with hash
    }
});

bcrypt.compareSync("password", hash) === true;

bcrypt.compare("password", hash, function onCompare(error, compare) {
    if (error) {
        // handle error
    } else {
        // compare === true
    }
});

var rounds = bcrypt.getRounds(hash);
var salt = bcrypt.getSalt(hash);
```
