import Ajv from 'ajv';
import addFormats from 'ajv-formats';
const ajvInstance = new Ajv({ allErrors: true}); //not stop at one point , validate everything
addFormats(ajvInstance);

export default ajvInstance;

