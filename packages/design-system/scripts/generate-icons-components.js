const fs = require('fs');
const rimraf = require('rimraf');
const path = require('path');
const glob = require('glob');
const camelCase = require('lodash/camelCase');
const upperFirst = require('lodash/upperFirst');
const stripIndents = require('common-tags/lib/stripIndents');
const prettier = require('prettier');
const rcfile = require('rcfile');
const argv = require('minimist')(process.argv.slice(2));

const destinationPath = path.join(__dirname, '..', argv.componentDestination);

const getComponentName = fileName =>
  upperFirst(camelCase(path.basename(fileName, '.svg')));

const getComponentPath = fileName =>
  path.join(destinationPath, `${getComponentName(fileName)}Icon.ts`);

const prettierConfig = rcfile('prettier');

rimraf(path.join(destinationPath, '*Icon.ts'), async rimrafErr => {
  if (rimrafErr) {
    throw rimrafErr;
  }

  glob(path.join(__dirname, '..', argv.svgSource, '*.svg'), (err, files) => {
    const comment = stripIndents`
      /* tslint:disable:ordered-imports */
      // This file is auto-generated using the 'generate-icon-exports.js' script
      // so any changes made to this file manually will be lost the next time the
      // script is executed
    `;
    let standardImports = "import { withIconSize } from './withIconSize';\n";

    const indexFile = files.reduce((indexFileContent, fileName) => {
      const baseName = path.basename(fileName);
      const componentName = getComponentName(fileName);
      const componentPath = getComponentPath(fileName);
      const importStatement = `import Orig${componentName}Icon from './svg/${baseName}';`;
      let iconComponentDeclaration = `withIconSize(Orig${componentName}Icon)`;

      const declarationStatement = `export const ${componentName}Icon = ${iconComponentDeclaration}`;

      const iconFile = `${comment}\n
        ${standardImports}\n
        ${importStatement}\n
        ${declarationStatement}`;

      fs.writeFileSync(
        componentPath,
        prettier.format(iconFile, { ...prettierConfig, parser: 'typescript' }),
      );

      return stripIndents`
        ${indexFileContent}
        export * from "./${componentName}Icon";
      `;
    }, '');

    fs.writeFileSync(
      path.join(destinationPath, 'index.ts'),
      prettier.format(`${comment}\n\n${indexFile}`, {
        ...prettierConfig,
        parser: 'typescript',
      }),
    );
  });
});
