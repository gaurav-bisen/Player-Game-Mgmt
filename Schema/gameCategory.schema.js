import ajvInstance from './ajv.instance.js'

const gameCategorySchema = {
    type: 'object',

    properties: {
        id: { 
            type: "integer" 
        },
        name: {
            type: "string",
            minLength: 1
        },
        description: {
            type: ["string", "null"]
        },
        status: {
            type: "boolean",
            default: true
        },
        createdBy: {
            type: ["integer", "null"]
        },
        orderIndex: {
            type: "integer",
            default: 0
        },
    },

    required: ["name", "orderIndex"],

    additionalProperties: false,
};

export default ajvInstance.compile(gameCategorySchema);