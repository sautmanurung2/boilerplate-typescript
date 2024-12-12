import Joi from 'joi'

const createExample = {
    body: Joi.object().keys({
        name: Joi.string().required(),
        description: Joi.string().required(),
    })
}

const 
const getExampleById = {
    params: Joi.object().keys({
        id: Joi.string().required(),
    })
}

const updateExample = {
    params: Joi.object().keys({
        id: Joi.string().required(),
    }),
    body: Joi.object().keys({
        name: Joi.string().allow(null),
        description: Joi.string().allow(null),
    })
}

const deleteExample = {
    params: Joi.object().keys({
        id: Joi.string().required(),
    })
}

export default {
    createExample,
    getExampleById,
    updateExample,
    deleteExample,
}