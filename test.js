'use strict';

// Load modules

const Lab = require('@hapi/lab');
const Code = require('@hapi/code');
const Hapi = require('@hapi/hapi');
const Cov = require('.');

// Test shortcuts

const { describe, it } = exports.lab = Lab.script();
const { expect } = Code;

describe('Joi coverage', () => {

    it('covers usage of schemas', () => {
        // Should fail coverage "Schema missing tests for min (always pass)"
        expect(Cov.schema.validate(5)).to.not.contain('error');
        expect(Cov.schema.validate(11)).to.contain('error');
    });
});
