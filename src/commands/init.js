const fs = require('fs');
const path = require('path');
const git = require('simple-git')();
const exec = require('child_process').exec;
const {Command, flags} = require('@oclif/command');
const execa = require('execa');
const Listr = require('listr');
const Observable = require('rxjs').Observable;

const configTemplate = require('../configTemplate');

class InitCommand extends Command {
  async run() {
    const {flags} = this.parse(InitCommand)

    const name = flags.name || 'world'
    const currentWorkingDir = `${process.cwd()}`

    this.initialize();
  }

  createConfigFile(cb) {
    return fs.writeFile('.ethdoc.config', configTemplate, (err) => {
      if (err) {
        throw err;
      }
    });
  }

  initialize() {
    const tasks = new Listr([
      {
        title: 'Setting up EthDoc directory',
        task: async () => {
          return new Observable(observer => {

            observer.next('Creating config file');
            this.createConfigFile();

            observer.next('Cloning EthDoc Repo');
            git.clone('https://github.com/iMuzz/ethdoc.git', [], () => {
              observer.complete();
            })
          });
        }
      },
      {
        title: 'Installing npm packages for EthDoc',
        task: () => {
          return execa.shell('cd ethdoc && npm install');
        }
      }
    ]);

    tasks.run().then(() => {
      console.log(`\nEnter \`ethdoc generate contracts/\` to create your documentation\n`)
    });
  }
}

InitCommand.description = `Initializes the current directory as an EthDoc directory.
...
Extra documentation goes here
`

InitCommand.flags = {
  name: flags.string({char: 'n', description: 'name to print'}),
}

module.exports = InitCommand
