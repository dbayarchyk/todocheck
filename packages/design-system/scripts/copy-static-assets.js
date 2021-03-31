const shell = require('shelljs');

shell.mkdir('dist/components/Icons/svg');
shell.cp('-R', 'src/components/Icons/svg/*.svg', 'dist/components/Icons/svg');
