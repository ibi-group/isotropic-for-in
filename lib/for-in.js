export default (object, iterationFunction) => {
    for (const propertyName in object) { // eslint-disable-line guard-for-in -- The for-in loop here is intentionally used to iterate the prototype chain, so it should not be guarded against doing so.
        iterationFunction(object[propertyName], propertyName, object);
    }
};
