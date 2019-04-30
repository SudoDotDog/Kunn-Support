/**
 * @author WMXPY
 * @namespace Routes
 * @description Agent
 * @override Unit
 */

import { expect } from "chai";
import * as Chance from "chance";
import { PROTOCOL } from "../../../src/declare/declare";
import { Agent } from "../../../src/routes/agent";

describe('Given {Agent} class', (): void => {

    const chance: Chance.Chance = new Chance('routes-agent');

    it('should be able to create agent', (): void => {

        const agent: Agent<PROTOCOL.GET> = Agent.create({
            path: chance.string(),
            protocol: PROTOCOL.GET,
            request: {
                query: {},
                response: {},
            },
        });

        expect(agent).to.be.instanceOf(Agent);
    });

    it('should be able to validate request', (): void => {

        const agent: Agent<PROTOCOL.GET> = Agent.create({
            path: chance.string(),
            protocol: PROTOCOL.GET,
            request: {
                query: {},
                response: {},
            },
        });

        const result: boolean = agent.request({
            query: {
                [chance.string()]: chance.string(),
            },
        });

        // tslint:disable-next-line
        expect(result).to.be.true;
    });
});
