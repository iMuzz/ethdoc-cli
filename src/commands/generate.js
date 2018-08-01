const {Command, flags} = require('@oclif/command');
const {Compiler} = require('@0xproject/sol-compiler')

class GenerateCommand extends Command {
  async run() {
    const {flags} = this.parse(GenerateCommand);
    const {args} = this.parse(GenerateCommand);

    const currPath = `${process.cwd()}/`;

    // TODO: Dynamically fetch contract names.
    const contractNames = ['TokenRegistry', 'Ownable_v1'];

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

    const compiler = new Compiler(compilerOptions)

    console.log('\ncompiling contracts...\n');
    await compiler.compileAsync();
    console.log('\Sucessfully compiled contracts...\n');

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
