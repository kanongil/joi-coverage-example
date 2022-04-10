'use strict';

const Joi = require('joi');

exports.schema = Joi.number().min(1).max(10);
