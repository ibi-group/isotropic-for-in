import _chai from 'isotropic-dev-dependencies/lib/chai.js';
import _forIn from '../js/for-in.js';
import _mocha from 'isotropic-dev-dependencies/lib/mocha.js';

_mocha.describe('for-in', () => {
    _mocha.it('should iterate the enumerable properties of an object', () => {
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

    _mocha.it('should iterate the enumerable properties of an object prototype', () => {
        let functionExecuted = 0;

        const functionArguments = [],
            testObject0 = {
                abc: 'xyz',
                def: 'uvw'
            },
            testObject1 = {
                ghi: 'rst',
                jkl: 'opq'
            },
            testObject2 = {
                mno: 'lmn',
                pqr: 'ijk'
            };

        Reflect.setPrototypeOf(testObject0, testObject1);
        Reflect.setPrototypeOf(testObject1, testObject2);

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
});
