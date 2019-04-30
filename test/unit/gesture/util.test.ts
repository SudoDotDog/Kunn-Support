/**
 * @author WMXPY
 * @namespace Gesture
 * @description Util
 * @override Unit
 */

import { expect } from "chai";
import * as Chance from "chance";
import { PROTOCOL } from "../../../src";
import { generateNamespace, parseProtocolToString } from "../../../src/gesture/util";

describe('Given [Util] helper method', (): void => {

    const chance: Chance.Chance = new Chance('gesture-util');

    it('should be able to parse protocol', (): void => {

        const protocol: PROTOCOL = PROTOCOL.OPTION;

        const parsed: string = parseProtocolToString(protocol);

        expect(parsed).to.be.equal('Option');
    });

    it('should be able to generate namespace', (): void => {

        const path: string = chance.name();
        const protocol: PROTOCOL = PROTOCOL.POST;

        const parsed: string = generateNamespace({
            path: `/${path}/${path}`,
            protocol,
            request: null as any,
        });

        expect(parsed).to.be.equal(`Post_${path.replace(/ /g, '')}_${path.replace(/ /g, '')}`);
    });
});
