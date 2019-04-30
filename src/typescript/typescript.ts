/**
 * @author WMXPY
 * @namespace Kunn
 * @description TypeScript
 */

import { GestureBuffer, KunnBodyRequest, KunnData, KunnRoute, Line, PROTOCOL, TYPE } from "@kunn/core";
import { _Map } from "@sudoo/bark/map";

const createSimple = (text: string, nest: number): Line => ({
    text,
    nest,
});

const parseProtocolToString = (protocol: PROTOCOL) => {

    return `${protocol[0].toUpperCase()}${protocol.toLowerCase().substring(1)}`;
};

const generateNamespace = (route: KunnRoute) => {

    const parsedPath: string[] = route.path
        .split('/')
        .filter(Boolean)
        .map((value: string) => value.replace(/ /g, ''));

    return `${parseProtocolToString(route.protocol)}_${parsedPath.join('_')}`;
};

export const generateTypeScriptTypeKeyedDefinition = (name: string, data: KunnData, nest: number): Line[] => {

    const lines: Line[] = generateTypeScriptTypeDefinition(data, nest);
    const properName: string = data.optional ? name + '?' : name;

    if (lines[0]) {
        lines[0] = {
            text: `readonly ${properName}: ${lines[0].text}`,
            nest: lines[0].nest,
        };
    }

    if (lines[lines.length - 1]) {
        lines[lines.length - 1] = {
            text: `${lines[lines.length - 1].text};`,
            nest: lines[0].nest,
        };
    }
    return lines;
};

export const generateTypeScriptTypeDefinition = (data: KunnData, nest: number): Line[] => {

    switch (data.type) {

        case TYPE.FLOAT:
        case TYPE.INTEGER: return [createSimple('number', nest)];
        case TYPE.STRING: return [createSimple('string', nest)];

        case TYPE.ARRAY: return [
            {
                text: 'Array<',
                nest,
            },
            ...generateTypeScriptTypeDefinition(data.element, nest + 1),
            {
                text: '>',
                nest,
            },
        ];

        case TYPE.OBJECT: {

            const objectResult = _Map.keys(data.map).reduce((previous: Line[], key: string) => {
                const typeValue: Line[] = generateTypeScriptTypeKeyedDefinition(key, data.map[key], nest + 1);
                return [...previous, ...typeValue];
            }, [] as Line[]);

            return [{
                text: `{`,
                nest,
            },
            ...objectResult,
            {
                text: `}`,
                nest,
            }];
        }
    }

    return [];
};

export const generateTypeScriptSubData = (name: string, record: Record<string, KunnData>): Line[] => {

    return [{
        text: `export type ${name} = {`,
        nest: 1,
    },
    ..._Map.keys(record).reduce((previous: Line[], key: string) => {
        return [
            ...previous,
            ...generateTypeScriptTypeKeyedDefinition(key, record[key], 2),
        ];
    }, [] as Line[]),
    {
        text: '};',
        nest: 1,
    }];
};

export const generateTypeScriptGesture = <P extends PROTOCOL = any>(route: KunnRoute<P>): string => {

    const gesture: GestureBuffer = GestureBuffer.create();

    gesture.appendHead({
        text: `export declare namespace ${generateNamespace(route)} {`,
        nest: 0,
    }).appendTail({
        text: `}`,
        nest: 0,
    });

    gesture.appendBody(...generateTypeScriptSubData('Query', route.request.query));

    if (route.protocol === PROTOCOL.DELETE
        || route.protocol === PROTOCOL.POST
        || route.protocol === PROTOCOL.PUT) {

        const request: KunnBodyRequest = route.request as KunnBodyRequest;
        gesture.appendBody(...generateTypeScriptSubData('Body', request.body));
    }

    gesture.appendBody(...generateTypeScriptSubData('Response', route.request.response));

    return gesture.combine();
};
