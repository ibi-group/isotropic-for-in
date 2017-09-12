import chai from 'chai';
import forIn from '../js/for-in.js';
import mocha from 'mocha';

mocha.describe('for-in', () => {
    mocha.it('should iterate the enumerable properties of an object', () => {
        let functionExecuted;

        const testObject = {
            abc: 'xyz'
        };

        forIn(testObject, (value, key, object) => {
            chai.expect(key).to.equal('abc');
            chai.expect(object).to.equal(testObject);
            chai.expect(value).to.equal('xyz');
            functionExecuted = true;
        });

        chai.expect(functionExecuted).to.be.true;
    });

    mocha.it('should iterate the enumerable properties of an object prototype', () => {
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

        forIn(testObject0, (value, key, object) => {
            functionArguments.push({
                key,
                object,
                value
            });
            functionExecuted += 1;
        });

        chai.expect(functionArguments).to.deep.equal([{
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

        chai.expect(functionExecuted).to.equal(6);
    });
});
