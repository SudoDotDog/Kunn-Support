/**
 * @author WMXPY
 * @namespace Gesture
 * @description TypeScript
 * @override Unit
 */

import { KunnData, KunnRoute, Line, PROTOCOL, TYPE } from "@kunn/core";
import { expect } from "chai";
import * as Chance from "chance";
import { generateTypeScriptGesture, generateTypeScriptTypeDefinition } from "../../../src/typescript/typescript";

describe('Given [TypescriptTypeDefinition] generator method', (): void => {

    const chance: Chance.Chance = new Chance('gesture-typescript-type');

    it('should be able to generate basic type definition', (): void => {

        const data: KunnData = {
            type: TYPE.FLOAT,
        };

        const result: Line[] = generateTypeScriptTypeDefinition(data, 0);

        expect(result).to.be.deep.equal([{
            text: 'number',
            nest: 0,
        }]);
    });

    it('should be able to generate array type definition', (): void => {

        const data: KunnData = {
            type: TYPE.ARRAY,
            element: {
                type: TYPE.STRING,
            },
        };

        const result: Line[] = generateTypeScriptTypeDefinition(data, 0);

        expect(result).to.be.deep.equal([{
            text: 'string[]',
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

        const result: Line[] = generateTypeScriptTypeDefinition(data, 0);

        expect(result).to.be.deep.equal([{
            text: '{',
            nest: 0,
        }, {
            text: `readonly ${key1}: string;`,
            nest: 1,
        }, {
            text: `readonly ${key2}: number;`,
            nest: 1,
        }, {
            text: '}',
            nest: 0,
        }]);
    });

    it('should be able to generate optional type definition', (): void => {

        const key1: string = chance.string();

        const data: KunnData = {
            type: TYPE.OBJECT,
            map: {
                [key1]: {
                    type: TYPE.STRING,
                    optional: true,
                },
            },
        };

        const result: Line[] = generateTypeScriptTypeDefinition(data, 0);

        expect(result).to.be.deep.equal([{
            text: '{',
            nest: 0,
        }, {
            text: `readonly ${key1}?: string;`,
            nest: 1,
        }, {
            text: '}',
            nest: 0,
        }]);
    });

    it('should be able to handle simple array', (): void => {

        const data: KunnData = {
            type: TYPE.ARRAY,
            element: {
                type: TYPE.STRING,
            },
        };

        const result: Line[] = generateTypeScriptTypeDefinition(data, 0);

        expect(result).to.be.deep.equal([{
            text: 'string[]',
            nest: 0,
        }]);
    });

    it('should be able to handle deep simple array', (): void => {

        const data: KunnData = {
            type: TYPE.ARRAY,
            element: {
                type: TYPE.ARRAY,
                element: {
                    type: TYPE.FLOAT,
                },
            },
        };

        const result: Line[] = generateTypeScriptTypeDefinition(data, 0);

        expect(result).to.be.deep.equal([{
            text: 'number[][]',
            nest: 0,
        }]);
    });

    it('should be able to handle complex array', (): void => {

        const data: KunnData = {
            type: TYPE.ARRAY,
            element: {
                type: TYPE.OBJECT,
                map: {},
            },
        };

        const result: Line[] = generateTypeScriptTypeDefinition(data, 0);

        expect(result).to.be.deep.equal([{
            text: 'Array<',
            nest: 0,
        }, {
            text: '{',
            nest: 1,
        }, {
            text: '}',
            nest: 1,
        }, {
            text: '>',
            nest: 0,
        }]);
    });

    it('should be able to generate optional nested type definition', (): void => {

        const key1: string = chance.string();

        const data: KunnData = {
            type: TYPE.OBJECT,
            map: {
                [key1]: {
                    type: TYPE.OBJECT,
                    optional: true,
                    map: {
                        [key1]: {
                            type: TYPE.STRING,
                            optional: true,
                        },
                    },
                },
            },
        };

        const result: Line[] = generateTypeScriptTypeDefinition(data, 0);

        expect(result).to.be.deep.equal([{
            text: '{',
            nest: 0,
        }, {
            text: `readonly ${key1}?: {`,
            nest: 1,
        }, {
            text: `readonly ${key1}?: string;`,
            nest: 2,
        }, {
            text: `};`,
            nest: 1,
        }, {
            text: '}',
            nest: 0,
        }]);
    });

    it('should be able to generate nested type definition', (): void => {

        const key1: string = chance.string();
        const key2: string = chance.string();

        const data: KunnData = {
            type: TYPE.OBJECT,
            map: {
                [key1]: {
                    type: TYPE.ARRAY,
                    element: {
                        type: TYPE.OBJECT,
                        map: {
                            [key1]: {
                                type: TYPE.ARRAY,
                                element: {
                                    type: TYPE.STRING,
                                },
                            },
                        },
                    },
                },
                [key2]: {
                    type: TYPE.OBJECT,
                    map: {
                        [key1]: {
                            type: TYPE.INTEGER,
                        },
                    },
                },
            },
        };

        const result: Line[] = generateTypeScriptTypeDefinition(data, 0);

        expect(result).to.be.deep.equal([{
            text: '{',
            nest: 0,
        }, {
            text: `readonly ${key1}: Array<`,
            nest: 1,
        }, {
            text: '{',
            nest: 2,
        }, {
            text: `readonly ${key1}: string[];`,
            nest: 3,
        }, {
            text: '}',
            nest: 2,
        }, {
            text: '>;',
            nest: 1,
        }, {
            text: `readonly ${key2}: {`,
            nest: 1,
        }, {
            text: `readonly ${key1}: number;`,
            nest: 2,
        }, {
            text: '};',
            nest: 1,
        }, {
            text: '}',
            nest: 0,
        }]);
    });
});

describe('Given [TypescriptGesture] generator method', (): void => {

    const chance: Chance.Chance = new Chance('gesture-typescript-generate');

    it('should be able to handle complex definition', (): void => {

        const key1: string = chance.word();
        const key2: string = chance.word();
        const key3: string = chance.word();

        const data: KunnRoute = {
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

        const result: string = generateTypeScriptGesture(data);

        expect(result).to.be.equal(`export declare namespace Post_test {\n    export type Query = {\n        readonly ${key1}: string;\n    };\n    export type Body = {\n        readonly ${key2}: number[];\n    };\n    export type Response = {\n        readonly ${key3}: {\n            readonly ${key1}: number[];\n        };\n    };\n}`);
    });
});
