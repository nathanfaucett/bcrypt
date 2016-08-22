var bcrypt = exports;


bcrypt.genSaltSync = require("./genSaltSync");
bcrypt.genSalt = require("./genSalt");

bcrypt.hashSync = require("./hashSync");
bcrypt.hash = require("./hash");

bcrypt.compareSync = require("./compareSync");
bcrypt.compare = require("./compare");

bcrypt.getRounds = require("./getRounds");
bcrypt.getSalt = require("./getSalt");
