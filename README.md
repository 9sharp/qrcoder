qrcoder
=======

[![Build Status](https://travis-ci.org/9sharp/qrcoder.svg?branch=master)](https://travis-ci.org/9sharp/qrcoder)

Encode/Decode image with QR code.

## Development

### Install Dependency

Install the dependencies.

```bash
$ npm install
```

> In case you failed installing cairo, please read the follow links for help
>
> - Ubuntu: http://askubuntu.com/questions/108662/how-to-install-cairo-1-8-10
> - Mac OSX: https://github.com/Automattic/node-canvas/wiki/Installation---OSX

### Test your code

Run jshint and functional test tasks

```bash
$ grunt test
```

### Run local server

Test qrcoder on you browser

```bash
$ grunt server
```

It will automatically open your browser on localhost to see how qrcoder work.

### Release Distribution

```bash
$ grunt dist
```

It will update the dist folder and docs folder.
