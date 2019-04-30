/**
 * @author WMXPY
 * @namespace Response
 * @description Generator
 * @override Unit
 */

import { expect } from "chai";
import * as Chance from "chance";
import { TYPE } from "../../../src/declare/declare";
import { KunnData } from "../../../src/declare/exchange";
import { generateData } from "../../../src/response/generator";

describe('Given [Generator] helper method', (): void => {

    const chance: Chance.Chance = new Chance('response-generator');

    it('should be able to generate string', (): void => {

        const seed: string = chance.string();
        const currentChance = new Chance(seed);
        const generatorChance = new Chance(seed);

        const data: KunnData = {
            type: TYPE.STRING,
        };

        const response: string = generateData(data, generatorChance);
        expect(response).to.be.equal(currentChance.string());
    });

    it('should be able to generate integer', (): void => {

        const seed: string = chance.string();
        const currentChance = new Chance(seed);
        const generatorChance = new Chance(seed);

        const data: KunnData = {
            type: TYPE.INTEGER,
        };

        const response: string = generateData(data, generatorChance);
        expect(response).to.be.equal(currentChance.natural());
    });

    it('should be able to generate float', (): void => {

        const seed: string = chance.string();
        const currentChance = new Chance(seed);
        const generatorChance = new Chance(seed);

        const data: KunnData = {
            type: TYPE.FLOAT,
        };

        const response: string = generateData(data, generatorChance);
        expect(response).to.be.equal(currentChance.floating());
    });
});
