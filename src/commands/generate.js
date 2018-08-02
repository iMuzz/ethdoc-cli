const git = require('simple-git')();
const {Command, flags} = require('@oclif/command');
const {Compiler} = require('@0xproject/sol-compiler')
const execa = require('execa');
const Listr = require('listr');
const Observable = require('rxjs').Observable;

const findAllFilesWithExtension = require('../recursiveSearch');

var parseFileName = function (str) {
  return str.split('\\').pop().split('/').pop().replace('.sol', '');
}

class GenerateCommand extends Command {
  async run() {
    const {flags} = this.parse(GenerateCommand);
    const {args} = this.parse(GenerateCommand);


    await this.compileFiles();
    this.generate();
  }

  async compileFiles() {
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
  }

  generate() {
    const tasks = new Listr([
       {
        title: 'Compile contracts',
        task: () => ''
      },
      {
        title: 'Building Docs',
        task: async () => {
          return execa.shell('cd ethdoc/ && npm run build && npm run export');
        }
      },
    ]);

    tasks.run();
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
