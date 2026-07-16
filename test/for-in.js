import _chai from 'isotropic-dev-dependencies/lib/chai.js';
import _forIn from '../lib/for-in.js';
import _test from 'node:test';

_test.describe('for-in', () => {
    _test.it('should iterate the enumerable properties of an object', () => {
        let functionExecuted;

        const testObject = {
            abc: 'xyz'
        };

        _forIn(testObject, (value, key, object) => {
            _chai.expect(key).to.equal('abc');
            _chai.expect(object).to.equal(testObject);
            _chai.expect(value).to.equal('xyz');
            functionExecuted = true;
        });

        _chai.expect(functionExecuted).to.be.true;
    });

    _test.it('should iterate the enumerable properties of an object prototype', () => {
        let functionExecuted = 0;

        const functionArguments = [],
            testObject0 = {
                abc: 'xyz',
                def: 'uvw'
            },
            testObject1 = {
                ghi: 'rst',
                jkl: 'opq'
            };

        Reflect.setPrototypeOf(testObject0, testObject1);
        Reflect.setPrototypeOf(testObject1, {
            mno: 'lmn',
            pqr: 'ijk'
        });

        _forIn(testObject0, (value, key, object) => {
            functionArguments.push({
                key,
                object,
                value
            });
            functionExecuted += 1;
        });

        _chai.expect(functionArguments).to.deep.equal([{
            key: 'abc',
            object: testObject0,
            value: 'xyz'
        }, {
            key: 'def',
            object: testObject0,
            value: 'uvw'
        }, {
            key: 'ghi',
            object: testObject0,
            value: 'rst'
        }, {
            key: 'jkl',
            object: testObject0,
            value: 'opq'
        }, {
            key: 'mno',
            object: testObject0,
            value: 'lmn'
        }, {
            key: 'pqr',
            object: testObject0,
            value: 'ijk'
        }]);

        _chai.expect(functionExecuted).to.equal(6);
    });

    _test.it('should skip non-enumerable properties', () => {
        const keys = [],
            testObject = {
                visible: 'yes'
            };

        Reflect.defineProperty(testObject, 'hidden', {
            enumerable: false,
            value: 'no'
        });

        _forIn(testObject, (value, key) => {
            keys.push(key);
        });

        _chai.expect(keys).to.deep.equal([
            'visible'
        ]);
    });

    _test.it('should not iterate symbol-keyed properties', () => {
        const keys = [],
            testObject = {
                stringKey: 'yes'
            };

        testObject[Symbol('symbolKey')] = 'no';

        _forIn(testObject, (value, key) => {
            keys.push(key);
        });

        _chai.expect(keys).to.deep.equal([
            'stringKey'
        ]);
    });

    _test.it('should not call the iteration function for an object with no enumerable properties', () => {
        let callCount = 0;

        _forIn(Object.create(null), () => {
            callCount += 1;
        });

        _chai.expect(callCount).to.equal(0);
    });
});
