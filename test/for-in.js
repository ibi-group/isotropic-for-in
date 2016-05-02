import {
    describe,
    it
} from 'mocha';

import {
    expect
} from 'chai';

import forIn from '../js/for-in.js';

describe('for-in', () => {
    it('should iterate the enumerable properties of an object', () => {
        let functionExecuted;

        const testObject = {
            abc: 'xyz'
        };

        forIn(testObject, (value, key, object) => {
            expect(key).to.equal('abc');
            expect(object).to.equal(testObject);
            expect(value).to.equal('xyz');
            functionExecuted = true;
        });

        expect(functionExecuted).to.be.true;
    });

    it('should iterate the enumerable properties of an object prototype', () => {
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

        expect(functionArguments).to.deep.equal([{
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

        expect(functionExecuted).to.equal(6);
    });
});
