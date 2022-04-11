'use strict';

const Path = require('path');

const Joi = require('joi');

module.exports = class JoiTracer {

    constructor(options) {}

    start() {

        this.tracer = Joi.trace();
    }

    test() {}

    end(notebook) {

        const { coverage } = notebook;
        Joi.untrace();

        const gray = (t) => t;
        const red = (t) => t;
        const yellow = (t) => t;
        const green = (t) => t;

        let output = 'Joi coverage:';

        let hasErrors = false;
        for (const file of coverage.files) {
            const trace = this.tracer.report(Path.resolve(file.filename))
            if (!trace) {
                continue;
            }

            hasErrors = true;
            output += gray('\n' + file.filename + ':');
            let source;
            for (const report of trace) {
                output += (report.severity !== 'warning' ? red : yellow)('\n\tLine ' + report.line + ': ' + report.message);
            }
        }

        if (!hasErrors) {
            output += green(' No issues');
        }
        else {
            // Hack to make lab fail

            ++notebook.failures;
        }

        output += '\n';

        this.report(output);
    }
}