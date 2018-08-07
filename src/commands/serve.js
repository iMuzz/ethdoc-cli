const {Command, flags} = require('@oclif/command');
const execa = require('execa');


class ServeCommand extends Command {
  async run() {
    const {flags} = this.parse(ServeCommand);

    execa.shell('cd ethdoc/out && ../node_modules/serve/bin/serve.js');

    // this.initialize();
  }
}

ServeCommand.description = `Initializes the current directory as an EthDoc directory.
...
Extra documentation goes here
`

ServeCommand.flags = {
  name: flags.string({char: 'n', description: 'name to print'}),
}

module.exports = ServeCommand
