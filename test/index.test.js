const assert = require('assert');
const lib = require('../app/lib');

const logType = {
    'log': '\x1b[01;32m%s\x1b[0m',
    'error': '\x1b[1;31m%s\x1b[0m',
    'warn': '\x1b[33m%s\x1b[0m'
};

const test = function (name, fn) {
    if (!testsStore.data.has(name)) {
        try {
            testsStore.data.set(name, {name, fn});
        } catch (e) {
            //
        }
    } else {
        console.log(logType.error, `Test "${name}" should have an unique name`);
    }
};

const skip = function (name, fn) {
    try {
        testsStore.data.set(name, {name, fn, skip: true});
    } catch (e) {
        //
    }
};

const only = function (name, fn) {

    const _set = function (key) {
        //
    };

    const _delete = function (key) {
        //
    };

    const _clear = function () {
        //
    };

    const freezeMap = function (map) {
        map.set = _set;
        map.delete = _delete;
        map.clear = _clear;

        Object.freeze(map);
    };

    testsStore.data.clear();

    console.log(logType.warn, `\nTest "${name}".\nDo not forget to change "only" to "test/skip"\n`);

    test(name, fn);

    freezeMap(testsStore.data);
};


const testsStore = {
    test: test,
    skip: skip,
    only: only,
    data: new Map()
};

const countTests = function () {
    return testsStore.data.size;
};

const reportTest = function ({limit = 0, skipped = 0, errors = []}) {
    const hasError = errors.length > 0;
    const hasSkipped = skipped > 0;

    const failed = errors.length;

    console.log(logType.log, '\n-------  BEGIN TEST REPORT  --------');
    console.log(logType.log, `Total Tests: ${limit}`);
    console.log(logType.log, `Passed:      ${limit - skipped - failed} (passed = all - skipped - failed)`);

    if (hasError) {
        console.log(logType.error, `Fail:        ${errors.length}`);
    }
    if (hasSkipped) {
        console.log(logType.warn, `Skipped:     ${skipped}`);
    }
};

const runTests = function () {
    const errors = [];
    let passed = 0;
    let skipped = 0;
    const limit = countTests();

    testsStore.data.forEach(opts => {
        const {name, fn, skip = false, only = false} = opts;

        if (skip) {
            console.log(logType.warn, `${name} (skipped)`);

            skipped += 1;
        } else if (!skip) {
            try {
                fn(() => {
                    console.log(logType.log, `${name} (passed)`);
                    passed += 1;
                });
            } catch (e) {
                errors.push({
                    name: name,
                    error: e
                });
                console.log(logType.error, `${name} (failed)`);
                console.log(e);
            }
        }
    });

    reportTest({limit, passed, skipped, errors});
};

test("Check 'sum' - ok", function (done) {
    const rslt = lib.sum(2, 3);

    assert.strictEqual(rslt, 5);

    done();
});

test("Check 'sum' - not ok", function (done) {
    const rslt = lib.sum(2, 3);

    assert.strictEqual(rslt, 5);

    done();
});

test("Check 'domainName'", function (done) {
    assert.strictEqual(lib.domainName('google.com'), 'google');
    assert.strictEqual(lib.domainName('https://google.com'), 'google');
    assert.strictEqual(lib.domainName('https://some-test-domain-name.com'), 'some-test-domain-name');

    done();
});

runTests();
