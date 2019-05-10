export default (object, iterationFunction) => {
    for (const propertyName in object) { // eslint-disable-line guard-for-in
        iterationFunction(object[propertyName], propertyName, object);
    }
};
