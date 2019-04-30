/**
 * @author WMXPY
 * @namespace Request
 * @description Validate
 * @override Unit
 */

import * as Chance from "chance";
import { TYPE } from "../../../src/declare/declare";
import { KunnData } from "../../../src/declare/exchange";
import { testPatternPaths } from "../../helper/path";

describe('Given [Validate] helper method', (): void => {

    const chance: Chance.Chance = new Chance('request-validate');

    it('should be able to validate string value', (): void => {

        const pattern: KunnData = {
            type: TYPE.STRING,
        };
        const valid: any = chance.string();
        const invalid: any = chance.natural();

        testPatternPaths(pattern, valid, invalid);
    });

    it('should be able to validate integer value', (): void => {

        const pattern: KunnData = {
            type: TYPE.INTEGER,
        };
        const valid: any = chance.natural();
        const invalid: any = chance.string();

        testPatternPaths(pattern, valid, invalid);
    });

    it('should be able to validate float value', (): void => {

        const pattern: KunnData = {
            type: TYPE.FLOAT,
        };
        const valid: any = chance.floating();
        const invalid: any = chance.string();

        testPatternPaths(pattern, valid, invalid);
    });

    it('should be able to validate array value', (): void => {

        const pattern: KunnData = {
            type: TYPE.ARRAY,
            element: {
                type: TYPE.STRING,
            },
        };
        const valid: any = [chance.string()];
        const invalid1: any = chance.string();
        const invalid2: any = [chance.integer()];

        testPatternPaths(pattern, valid, invalid1, invalid2);
    });

    it('should be able to validate object value', (): void => {

        const pattern: KunnData = {
            type: TYPE.OBJECT,
            map: {
                key: {
                    type: TYPE.STRING,
                },
                optional: {
                    type: TYPE.STRING,
                    optional: true,
                },
            },
        };
        const valid: any = {
            key: chance.string(),
        };
        const invalid1: any = chance.string();
        const invalid2: any = {
            optional: chance.string(),
        };
        const invalid3: any = {
            key: chance.integer(),
            optional: chance.string(),
        };

        testPatternPaths(pattern, valid, invalid1, invalid2, invalid3);
    });
});
