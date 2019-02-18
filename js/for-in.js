export default (object, iterationFunction) => {
    /* eslint-disable guard-for-in */
    for (const propertyName in object) {
    /* eslint-enable guard-for-in */
        iterationFunction(object[propertyName], propertyName, object);
    }
};
