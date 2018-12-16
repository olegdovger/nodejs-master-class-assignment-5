# nodejs-master-class-assignment-5

This projects demonstrates how to write tests in NodeJS **with any dependency**.

There are 3 testing functions - `test`, `skip`, `only`

Just change `test` to `skip` or `only` inside of `test/index.test.js` file and run `node test/index.test.js`


For example

```javascript
test("Check 'sum'", function (done) {
    assert.strictEqual(sum(2, 3), 5);

    done();
});
skip("Check 'sum' 2", function (done) {
    assert.strictEqual(sum(2, 3), 5);

    done();
});
only("Check 'sum' 3", function (done) {
    assert.strictEqual(sum(2, 3), 5);

    done();
});
```

Function `only` will ignore all tests except of "Check 'sum' 3"