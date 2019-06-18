export class Validate{
    validate(scenario, schema) {

        let schemaKeyes = Object.keys(schema).filter((item) => {
            return typeof schema[item] === 'object';
        });
        let scenarioKeyes = Object.keys(scenario);
        for (const key of schemaKeyes) {
            if (schema[key].isRequired) {
                if (scenarioKeyes.indexOf(key) == -1) {
                    throw new Error(`{${key}} is not found`);
                }
            }
        }
        for (const key of scenarioKeyes) {
            if (schemaKeyes.indexOf(key) == -1) {
                throw new Error(`{${key}} is not recognized`);
            }
        }
        scenarioKeyes.forEach((item) => {
            let params = { ...schema[item] }
            if (typeof scenario[item] === schema[item].type && typeof scenario[item] === 'object') {
                this.validate(scenario[item], schema[item])
            } else {
                if (params.isPositive) {
                    if (scenario[item] < 0) {
                        throw new Error(`{${item}} is negative`);
                    }
                }
                if (!params.isRequired) {
                    if (scenario[item] !== undefined && typeof scenario[item] !== schema[item].type) {
                        throw new Error(`{${item}} is not required but type must be {${schema[item].type}}`);
                    }
                } else {
                    if (typeof scenario[item] !== schema[item].type) {
                        throw new Error(`{${item}} is required and type must be {${schema[item].type}}`);
                    }
                }
            }
        });
    }
    validateScenarios(scenarios, schema) {
        scenarios.forEach(scenario => {
            this.validate(scenario, schema);
        });
        scenarios.sort((curr, next) => {
            return curr.index > next.index;
        });
        if (scenarios.length >= 2) {
            if (scenarios[scenarios.length - 1].hasOwnProperty('restore')) {
                throw new Error(`lenght of scenarios is ${scenarios.length} and last element must not have {restore}`);
            }
        } else {
            if (scenarios[0].hasOwnProperty('restore')) {
                throw new Error(`lenght of scenarios is ${scenarios.length} and it must not have {restore}`);

            }
        }
    }
}