/**
 * @author WMXPY
 * @namespace Gesture
 * @description Util
 * @override Unit
 */

import { expect } from "chai";
import * as Chance from "chance";
import { GestureBuffer } from "../../../src/gesture/buffer";
import { Line } from "../../../src/gesture/declare";
import { createSimple } from "../../../src/gesture/util";

describe('Given {GestureBuffer} class', (): void => {

    const chance: Chance.Chance = new Chance('gesture-buffer');

    it('should be able to create buffer', (): void => {

        const buffer: GestureBuffer = GestureBuffer.create();

        expect(buffer).to.be.instanceOf(GestureBuffer);
    });

    it('should be able to append lines', (): void => {

        const buffer: GestureBuffer = GestureBuffer.create();
        const simple: Line = createSimple(chance.string(), 0);

        buffer.appendBody(simple);

        expect(buffer).to.has.lengthOf(1);
    });

    it('should be able to append complex lines', (): void => {

        const buffer: GestureBuffer = GestureBuffer.create();
        const simple: Line = createSimple(chance.string(), 0);

        buffer.appendBody(simple, simple)
            .appendHead(simple, simple)
            .appendTail(simple, simple);

        expect(buffer).to.has.lengthOf(6);
    });

    it('should be able to combine lines', (): void => {

        const buffer: GestureBuffer = GestureBuffer.create();
        const value: string = chance.string();
        const simple: Line = createSimple(value, 0);

        buffer.appendBody(simple)
            .appendHead(simple)
            .appendTail(simple);

        expect(buffer.combine()).to.be.equal(`${value}\n${value}\n${value}`);
    });

    it('should be able to override indent and count', (): void => {

        const buffer: GestureBuffer = GestureBuffer.create();
        const value: string = chance.string();
        const simple: Line = createSimple(value, 1);

        buffer.appendBody(simple)
            .appendHead(simple)
            .appendTail(simple);

        const indent: string = chance.string();
        const result: string = buffer.combine(indent, 1);
        expect(result).to.be.equal(`${indent}${value}\n${indent}${value}\n${indent}${value}`);
    });
});
