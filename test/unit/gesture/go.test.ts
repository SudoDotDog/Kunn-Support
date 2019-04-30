/**
 * @author WMXPY
 * @namespace Gesture
 * @description Golang
 * @override Unit
 */

import { expect } from "chai";
import * as Chance from "chance";
import { KunnData, KunnRoute, PROTOCOL, TYPE } from "../../../src";
import { Line } from "../../../src/gesture/declare";
import { generateGoLangGesture, generateGoLangTypeDefinition } from "../../../src/gesture/go";

describe('Given [GoLangTypeDefinition] generator method', (): void => {

    const chance: Chance.Chance = new Chance('gesture-golang-type');

    it('should be able to generate array type definition', (): void => {

        const data: KunnData = {
            type: TYPE.ARRAY,
            element: {
                type: TYPE.STRING,
            },
        };

        const result: Line[] = generateGoLangTypeDefinition(data, 0);

        expect(result).to.be.deep.equal([{
            text: '[]string',
            nest: 0,
        }]);
    });

    it('should be able to generate object type definition', (): void => {

        const key1: string = chance.string();
        const key2: string = chance.string();

        const data: KunnData = {
            type: TYPE.OBJECT,
            map: {
                [key1]: {
                    type: TYPE.STRING,
                },
                [key2]: {
                    type: TYPE.INTEGER,
                },
            },
        };

        const result: Line[] = generateGoLangTypeDefinition(data, 0);

        expect(result).to.be.deep.equal([{
            text: 'struct {',
            nest: 0,
        }, {
            text: `${key1} string`,
            nest: 1,
        }, {
            text: `${key2} int32`,
            nest: 1,
        }, {
            text: '}',
            nest: 0,
        }]);
    });
});

describe('Given [GoLangGesture] generator method', (): void => {

    const chance: Chance.Chance = new Chance('gesture-golang-generate');

    it('should be able to handle array definition', (): void => {

        const key1: string = chance.word();
        const key2: string = chance.word();
        const key3: string = chance.word();

        const data: KunnRoute<PROTOCOL.GET> = {
            path: '/test',
            protocol: PROTOCOL.GET,
            request: {
                query: {
                    [key1]: {
                        type: TYPE.ARRAY,
                        element: {
                            type: TYPE.OBJECT,
                            map: {
                                [key2]: {
                                    type: TYPE.OBJECT,
                                    map: {
                                        [key3]: {
                                            type: TYPE.ARRAY,
                                            element: {
                                                type: TYPE.FLOAT,
                                            },
                                        },
                                    },
                                },
                            },
                        },
                    },
                },
                response: {},
            },
        };

        const result: string = generateGoLangGesture(data);

        expect(result).to.be.equal(`type Get_test struct {\n    Query struct {\n        ${key1} []struct {\n            ${key2} struct {\n                ${key3} []float32\n            }\n        }\n    }\n    Response struct {\n    }\n}`);
    });

    it('should be able to handle complex definition', (): void => {

        const key1: string = chance.word();
        const key2: string = chance.word();
        const key3: string = chance.word();

        const data: KunnRoute<PROTOCOL.POST> = {
            path: '/test',
            protocol: PROTOCOL.POST,
            request: {
                query: {
                    [key1]: {
                        type: TYPE.STRING,
                    },
                },
                body: {
                    [key2]: {
                        type: TYPE.ARRAY,
                        element: {
                            type: TYPE.INTEGER,
                        },
                    },
                },
                response: {
                    [key3]: {
                        type: TYPE.OBJECT,
                        map: {
                            [key1]: {
                                type: TYPE.ARRAY,
                                element: {
                                    type: TYPE.FLOAT,
                                },
                            },
                        },
                    },
                },
            },
        };

        const result: string = generateGoLangGesture(data);

        expect(result).to.be.equal(`type Post_test struct {\n    Query struct {\n        ${key1} string\n    }\n    Body struct {\n        ${key2} []int32\n    }\n    Response struct {\n        ${key3} struct {\n            ${key1} []float32\n        }\n    }\n}`);
    });
});
