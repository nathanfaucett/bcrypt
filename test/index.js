var tape = require("tape"),
    bcrypt = require("..");


var ROUNDS = 4,
    SALT = bcrypt.genSaltSync(ROUNDS),
    HASH = bcrypt.hashSync("password", SALT);


tape("bcrypt.genSaltSync(rounds, seedLength)", function(assert) {
    var salt = bcrypt.genSaltSync(ROUNDS);
    assert.equal(salt.charAt(0), '$');
    assert.equal(salt.length, 29);
    assert.end();
});
tape("bcrypt.genSalt(rounds, seedLength, callback)", function(assert) {
    bcrypt.genSalt(ROUNDS, function onGenSalt(error, salt) {
        if (error) {
            assert.end(error);
        } else {
            assert.equal(salt.charAt(0), '$');
            assert.equal(salt.length, 29);
            assert.end();
        }
    });
});

tape("bcrypt.hashSync(s, salt)", function(assert) {
    var hash = bcrypt.hashSync("password", SALT);
    assert.equal(hash.length, 60);
    assert.equal(hash.charAt(0), '$');
    assert.end();
});
tape("bcrypt.hash(s, salt, callback)", function(assert) {
    bcrypt.hash("password", SALT, function onHash(error, hash) {
        if (error) {
            assert.end(error);
        } else {
            assert.equal(hash.length, 60);
            assert.equal(hash.charAt(0), '$');
            assert.end();
        }
    });
});

tape("bcrypt.compareSync(s, hash)", function(assert) {
    assert.equal(bcrypt.compareSync("password", HASH), true);
    assert.equal(bcrypt.compareSync("pass", HASH), false);
    assert.end();
});
tape("bcrypt.compare(s, hash, callback, progressCallback)", function(assert) {
    bcrypt.compare("password", HASH, function onCompare(error, compare) {
        if (error) {
            assert.end(error);
        } else {
            assert.equal(compare, true);
            bcrypt.compare("pass", HASH, function onCompare(error, compare) {
                if (error) {
                    assert.end(error);
                } else {
                    assert.equal(compare, false);
                    assert.end();
                }
            });
        }
    });
});

tape("bcrypt.getRounds(hash)", function(assert) {
    var rounds = bcrypt.getRounds(HASH);
    assert.equal(rounds, ROUNDS);
    assert.end();
});
tape("bcrypt.getSalt(hash)", function(assert) {
    var salt = bcrypt.getSalt(HASH);
    assert.equal(salt, SALT);
    assert.end();
});
