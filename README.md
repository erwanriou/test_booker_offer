# Booker Offer Repository

## Table of Contents

- [Installation](#installation)
- [Scripts](#scripts)

## Installation

Before run the script initiate of this repository, please make sure to have nodejs, docker, kubernetes and skaffold installed in your computer.

## Scripts

First time you launch the repository, you want to create all needed variables. Run the command below:

```sh
npm run initiate

```

## TDD

in order to build the rest API endpoints or event with a TDD approach, we implement some more powerfull debugging tools such as node util. See exemple below:

```js
console.log(util.inspect(body, { showHidden: false, depth: null }))
```
