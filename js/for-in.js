/* eslint-disable guard-for-in */
export default (object, iterationFunction) => {
    for (const propertyName in object) {
        iterationFunction(object[propertyName], propertyName, object);
    }
};
