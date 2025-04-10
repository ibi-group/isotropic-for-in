# isotropic-for-in

[![npm version](https://img.shields.io/npm/v/isotropic-for-in.svg)](https://www.npmjs.com/package/isotropic-for-in)
[![License](https://img.shields.io/npm/l/isotropic-for-in.svg)](https://github.com/ibi-group/isotropic-for-in/blob/main/LICENSE)
![](https://img.shields.io/badge/tests-passing-brightgreen.svg)
![](https://img.shields.io/badge/coverage-100%25-brightgreen.svg)

A utility function that iterates through all enumerable properties of an object, including those inherited through the prototype chain.

## Why Use This?

- **Complete Enumeration**: Iterate over both own and inherited enumerable properties
- **Familiar API**: Works like `Array.prototype.forEach` but for object properties
- **Prototype-aware**: Unlike `Object.keys().forEach()`, includes properties from the entire prototype chain
- **Callback Parameters**: Provides value, key, and object reference to the callback function
- **Zero Dependencies**: Lightweight implementation with no external requirements

## Installation

```bash
npm install isotropic-for-in
```

## Usage

```javascript
import _forIn from 'isotropic-for-in';

{
    // Basic usage
    const object = {
        a: 1,
        b: 2
    };

    _forIn(object, (value, key, object) => {
        console.log(`${key}: ${value}`);
    });
    // Output:
    // a: 1
    // b: 2
}

{
    // With prototype chain
    const parent = {
            x: 'inherited',
            y: 'also inherited'
        },

        child = Object.create(parent);

    child.z = 'own property';

    _forIn(child, (value, key) => {
        console.log(`${key}: ${value}`);
    });

    // Output:
    // z: own property
    // x: inherited
    // y: also inherited
}
```

## API

### forIn(object, iterationFunction)

Iterates over all enumerable properties of an object, including those in its prototype chain.

#### Parameters

- `object` (Object): The object to iterate over.
- `iterationFunction` (Function): The function to call for each property, which receives three arguments:
  - `value`: The property's value
  - `key`: The property's name
  - `object`: The object being iterated

#### Returns

- `undefined`: The function doesn't return a value.

## Examples

### Basic Property Iteration

```javascript
import _forIn from 'isotropic-for-in';

{
    const person = {
        age: 30,
        name: 'John',
        occupation: 'Developer'
    };

    forIn(person, (value, key) => {
        console.log(`${key}: ${value}`);
    });
    // Output:
    // age: 30
    // name: John
    // occupation: Developer
}
```

### Combining with Other Utility Functions

```javascript
import _forIn from 'isotropic-for-in';

const _getAllValues object => {
        // Collect all enumerable property values into an array
        const values = [];

        _forIn(object, value => {
            values.push(value);
        });

        return values;
    },

    _findProperty = (object, testFunction) => {
        // Find the first property that matches a condition
        let result = null;

        _forIn(object, (value, key) => {
            if (result === null && testFunction(value, key)) {
                result = {
                    key,
                    value
                };
            }
        });

        return result;
    };

{
    // Usage example
    const settings = {
        fontSize: 16
        theme: 'dark'
    };

    Object.setPrototypeOf(settings, {
        animations: true,
        language: 'en'
    });

    console.log(_getAllValues(settings)); // [16, 'dark', true, 'en']

    console.log(_findProperty(settings, value => typeof value === 'number' && value > 10)); // { key: 'fontSize', value: 16 }
}
```

### Creating a Nested Property Path String

```javascript
import _forIn from 'isotropic-for-in';

// Function to get a dot-notation string of all property paths
const _getPropertyPaths = (object, prefix = '') => {
  const paths = [];

    _forIn(object, (value, key) => {
        const currentPath = prefix ?
            `${prefix}.${key}` :
            key;

        // Add current path
        paths.push(currentPath);

        // Recurse for objects (avoid circular references)
        if (value && typeof value === 'object' && !Array.isArray(value)) {
            paths.push(..._getPropertyPaths(value, currentPath));
        }
    });

    return paths;
};

{
    // Example
    const config = {
        server: {
            host: 'localhost',
            port: 3000
        }
    };

    // Add some inherited properties
    Object.setPrototypeOf(config.server, {
        protocol: 'http',
        timeout: 5000
    });

    console.log(_getPropertyPaths(config));
    // Output:
    // ['server', 'server.host', 'server.port', 'server.protocol', 'server.timeout']
}
```

## Difference from Other Methods

### Compared to `Object.keys().forEach()`

`Object.keys()` only returns an object's own enumerable properties, ignoring the prototype chain:

```javascript
import _forIn from 'isotropic-for-in';

{
    const parent = {
            inherited: true
        },

        child = Object.create(parent);

    child.own = 'yes';

    // Using Object.keys().forEach()
    Object.keys(child).forEach(key => console.log(key));
    // Output:
    // own

    // Using isotropic-for-in
    _forIn(child, (_, key) => console.log(key));
    // Output:
    // own
    // inherited
}
```

### Compared to Native `for...in`

While `isotropic-for-in` uses a native `for...in` loop under the hood, it provides:

1. A cleaner callback-based API similar to other JavaScript iterator methods
2. Consistent parameter order (value, key, object) matching `Array.forEach`
3. A direct reference to the object being iterated

```javascript
import _forIn from 'isotropic-for-in';

// Native for...in
for (const key in object) {
  const value = object[key];
  // Do something with key and value
}

// isotropic-for-in
_forIn(object, (value, key, object) => {
  // Do something with value, key, and the original object
});
```

## Contributing

Please refer to [CONTRIBUTING.md](https://github.com/ibi-group/isotropic-for-in/blob/main/CONTRIBUTING.md) for contribution guidelines.

## Issues

If you encounter any issues, please file them at https://github.com/ibi-group/isotropic-for-in/issues
