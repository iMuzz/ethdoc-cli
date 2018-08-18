<h3 align="center">
  ⚠️ EthDoc is still a work in progress and has not yet had a V1 release ⚠️ 
</h3>

<br />

<h2 align="center">
  <img src="https://file-qdxymcjlzd.now.sh/" alt="">
</h2>

<p align="center">
  <i>Create beautiful automatically generated documentation for Ethereum smart contracts.</i>
  <br/>
  <br/>
  <img src="https://user-images.githubusercontent.com/7297269/44291274-32d9d000-a232-11e8-93a8-9180ee85399e.png" alt="ETHDoc" width="800" />
</p>

[![Version](https://img.shields.io/npm/v/ethdoc.svg)](https://npmjs.org/package/ethdoc)
[![Downloads/week](https://img.shields.io/npm/dw/ethdoc.svg)](https://npmjs.org/package/ethdoc)
[![License](https://img.shields.io/npm/l/ethdoc.svg)](https://github.com/iMuzz/ethdoc/blob/master/package.json)

This repository contains the source code for the CLI portion of [**EthDoc**](https://ethdoc.io). An Open Source developer tool that generates documentation for Smart Contracts using [Ethereum Natural Specification Format](https://github.com/ethereum/wiki/wiki/Ethereum-Natural-Specification-Format).

<br />

## Getting Started
The easiest way to get started with EthDoc is through the [CLI](https://github.com/iMuzz/ethdoc-cli). Follow the instructions below to get started!

##### 1. Install NPM Package
```
$ npm install ethdoc --save
```

##### 2. Initialize Ethdoc within your Ethereum project

```
$ ethdoc init
```
This may take a few minutes. You only have to run this command the first time you integrate EthDoc into an Ethereum Project.

##### 3. Generate documentation

```
$ ethdoc generate contracts/ -s
```

Pass the name of the folder where your contracts are. In the example above, we chose `contracts/`. But if your contracts reside in some `otherDirectory/` you can just pass it in as an argument. Here's an example below: 
```
$ ethdoc generate otherDirectory/ -s
```

##### 4. Check out your documentation 

🎉 Navigate to http://localhost:3000 to check out your docs 🎉

<br />

## Development

The EthDoc CLI was built using [Oclif](https://github.com/oclif/oclif) which is a framework for building CLIs in Node made by the awesome people over at [Heroku](https://heroku.com/)!

##### 1. Install Dependencies
```
$ npm install
```

##### 2. Link Package
```
$ npm link
```

This command makes it so that the `ethdoc` command runs the program located in current directory vs. your globally installed version.
If you're done developing and would like to use the globally installed version, just run `npm unlink`.

