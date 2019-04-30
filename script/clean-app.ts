/**
 * @author WMXPY
 * @namespace Script
 * @description Clean App
 */

import { RMRFFolder } from "@sudoo/io";
import * as Fs from 'fs';
import * as Path from 'path';

const name: string = process.argv[2];

const rootPath: string = Path.join(__dirname, '..', 'app');

if (!Fs.existsSync(rootPath)) {
    Fs.mkdirSync(rootPath);
}

const appPath: string = Path.join(__dirname, '..', 'app', name);

if (!Fs.existsSync(appPath)) {
    Fs.mkdirSync(appPath);
}

const files: string[] = Fs.readdirSync(appPath);
for (const file of files) {

    RMRFFolder(Path.join(appPath, file));
}
