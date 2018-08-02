const exec = require('child_process').exec;
const git = require('simple-git')();
const {Command, flags} = require('@oclif/command');
const {Compiler} = require('@0xproject/sol-compiler')

const findAllFilesWithExtension = require('../recursiveSearch');

var parseFileName = function (str) {
  return str.split('\\').pop().split('/').pop().replace('.sol', '');
}

class GenerateCommand extends Command {
  async run() {
    const {flags} = this.parse(GenerateCommand);
    const {args} = this.parse(GenerateCommand);

    const currPath = `${process.cwd()}/`;

    const files = findAllFilesWithExtension(`./contracts`, 'sol'); // recursively search all files with extension .sol
    const contractNames = files.map(parseFileName); // get their contract names 'TokenRegistry.sol' > 'TokenRegistry'

    const compilerOptions = {
      contracts: contractNames,
      artifactsDir: `./ethdoc-artifacts`,
      contractsDir: `${currPath}contracts`,
      compilerSettings: {
        outputSelection: {
          ['*']: {
            ['*']: ['abi', 'devdoc'],
          },
        },
      },
      solcVersion: '0.4.19',
    }

    // Compiling user contracts
    const compiler = new Compiler(compilerOptions)
    await compiler.compileAsync();

    console.log('Buidl frontend')
    // this.cloneFrontend();
  }

  cloneFrontend() {
    const dir = exec(`npm run build && npm run export`, function(err, stdout, stderr) {
      if (err) {
        console.log(err);
      }
    });

    dir.on('exit', function (code) {
      console.log('Created directory!');
    });
  }
}

GenerateCommand.args = [
  {
    name: 'contractsDir',
    default: 'contracts/',
  },
]

GenerateCommand.description = `Generates documentation for contracts located in the ./contracts directory`

GenerateCommand.flags = {
  file: flags.string({
    char: 'f',                    // shorter flag version
    description: 'name of solidity file to compile/generate documentation for', // help description for flag
    required: false,              // make flag required (this is not common and you should probably use an argument instead)
  })
}

module.exports = GenerateCommand;
