# publicaddr

[![npm version](https://badge.fury.io/js/publicaddr.svg)](https://badge.fury.io/js/publicaddr)

Allow multiple Node.js processes to listen on same port, with `SO_REUSEPORT`.

(With this library, `SO_REUSEPORT` will be `setsockopt`-ed on all TCP sockets, before `bind` call).

## Supported OS

Only Linux is supported by far.

Prebuilt binaries for `linux-x64-glibc` `linux-amd64-musl` `linux-arm64` `linux-armv7` are shipped in the npm package.

If your platform is not listed above, `SO_REUSEPORT` will not be set.

I have no plan to support other OSes. PRs welcome.

For BSD / MacOS a similar trick should be doable, like what they did in [wolfcw/libfaketime](https://github.com/wolfcw/libfaketime).

## Installation

```
npm install --save publicaddr
# OR
yarn add publicaddr
```

## Usage

Prepend `publicaddr` wrapper to your `node` binary (or other interpreter like `ts-node`). Example:

```js
  // package.json
  "scripts": {
    "start": "publicaddr node demo-server.js"
  },
```

## Refs

- [What does SO_REUSEPORT do](https://stackoverflow.com/a/14388707)
- [How to Expose Multiple Containers On the Same Port](https://iximiuz.com/en/posts/multiple-containers-same-port-reverse-proxy/)

## Demo

### Simple usage

Clone [this repo](https://github.com/jokester/publicaddr) and run multiple instances like:

```shell
git clone https://github.com/jokester/publicaddr

cd publicaddr/demo

npm install

npm start &
npm start &
npm start &
npm start &

wrk -t6 -c2000 -d10s http://127.0.0.1:3000 # or other HTTP benchmark tool

kill %1 %2 %3 %4
```

### Inside containers

Clone [this repo](https://github.com/jokester/publicaddr) and run `docker-compose up` in `demo/`

## License

BSD

<!--
### upstream issue

- https://github.com/danfuzz/lactoserv/issues/146

### without nodejs

- https://github.com/wolfcw/libfaketime
- https://man7.org/linux/man-pages/man3/dlsym.3.html
- https://lwn.net/Articles/542629/
- https://qiita.com/naohikowatanabe/items/d559858734d8a02f0d8a

### with nodejs

- https://github.com/nodejs/nan
-->
