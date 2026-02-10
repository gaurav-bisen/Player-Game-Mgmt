import ajvInstance from './ajv.instance.js'

const gameSchema = {
    type: 'object',

    properties: {
        id: { 
            type: "integer" 
        },
        name: {
            type: "string",
            minLength: 1
        },
        categoryId: {
            type: "integer"
        },
        status: {
            type: "boolean",
            default: true
        },
        createdBy: {
            type: "integer"
        },
        orderIndex: {
            type: "integer",
            default: 0
        },
    },

    required: ["name", "categoryId"],

    additionalProperties: false,
};

export default ajvInstance.compile(gameSchema);