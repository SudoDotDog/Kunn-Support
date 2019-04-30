/**
 * @author WMXPY
 * @namespace Script
 * @description License
 */

import * as Fs from 'fs';
import * as Path from 'path';

const name: string = process.argv[2];

const appPath: string = Path.join(__dirname, '..', 'app', name);

const exist: boolean = Fs.existsSync(appPath);
if (!exist) {
    Fs.mkdirSync(appPath);
}

const licensePath: string = Path.join(__dirname, '..', 'LICENSE');
const packagePath: string = Path.join(__dirname, '..', 'package', `${name}.json`);

const license: string = Fs.readFileSync(licensePath, 'utf8');
Fs.writeFileSync(Path.join(appPath, 'LICENSE'), license, 'utf8');

const parent: any = JSON.parse(Fs.readFileSync(packagePath, 'utf8'));
const appPackage: any = {
    name: parent.name,
    main: "index.js",
    version: parent.version,
    description: parent.description,
    repository: parent.repository,
    keywords: parent.keywords,
    author: parent.author,
    license: parent.license,
    bugs: parent.bugs,
    homepage: parent.homepage,
    dependencies: parent.dependencies,
    peerDependencies: parent.peerDependencies,
};
Fs.writeFileSync(Path.join(appPath, 'package.json'), JSON.stringify(appPackage, null, 2), 'utf8');
