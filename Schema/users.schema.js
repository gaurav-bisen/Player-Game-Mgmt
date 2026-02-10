import ajvInstance from './ajv.instance.js'

const userSchema = {
    type: 'object',

    properties: {
        id: { 
            type: "integer" 
        },
        name: {
            type: "string",
            minLength: 1
        },
        email: {
            type: "string",
            format: "email",
            minLength: 1
        },
        password: {
            type: "string",
            minLength: 1
        },
        roleId: {
            type: "integer"
        },
        permissions: {
            type: ["object", "null"]  // JSONB can be null
        },
        createdBy: {
            type: "integer"
        }
    },

    required: ["name", "email", "password", "roleId"],

    additionalProperties: false,
};

export default ajvInstance.compile(userSchema);