# publicaddr

Allow node.js process to listen on TCP with `SO_REUSEPORT`.

(`SO_REUSEPORT` will be set on all TCP sockets before actual `bind` call).

// Only Linux is supported

## Installation

```
npm install --save publicaddr
# OR
yarn add publicaddr
```

## Usage

Prepend `publicaddr` binary to your `node` binary. (or other interpreter like `ts-node`)

```js
  // example use in a package.json script
  "scripts": {
    "start": "publicaddr node demo-server.js"
  },
```

## refs

- [What does SO_REUSEPORT do](https://stackoverflow.com/a/14388707)
- [How to Expose Multiple Containers On the Same Port](https://iximiuz.com/en/posts/multiple-containers-same-port-reverse-proxy/)

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
