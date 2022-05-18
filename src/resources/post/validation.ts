import Joi from 'joi';

const create = Joi.object({
  title: Joi.string().required().min(3).messages({
    'string.base': `"title" should be a type of 'text'`,
    'string.empty': `"title" cannot be an empty field`,
    'string.min': `"title" should have a minimum length of {#limit}`,
    'any.required': `"title" is a required field`,
  }),
  body: Joi.string().required(),
});

export default { create };
