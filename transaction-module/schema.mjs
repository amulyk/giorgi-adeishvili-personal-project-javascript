export let schema = {
    index: {
        type: 'number',
        isPositive: true,
        isRequired: true
    },
    silent: {
        type: 'boolean',
        isRequired: false
    },
    meta: {
        type: 'object',
        isRequired: true,
        title: {
            type: 'string',
            isRequired: true
        },
        description: {
            type: 'string',
            isRequired: true
        }
    },
    call: {
        type: 'function',
        isRequired: true
    },
    restore: {
        type: 'function',
        isRequired: false
    }
}