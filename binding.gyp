{
    "targets": [{
        "target_name": "publicaddr",
        "include_dirs" : [
            # "pure",
# "<!(node -e \"require('nan')\")"
        ],
        "sources": [
            "src/publicaddr.c",
        ],
        "conditions": [
            # copied from https://github.com/nodejs/node-gyp/issues/1660#issue-406830304
            ["OS in \"linux\"", {
                "libraries": [
                    # TODO: something like -ldl and stuff
                ],
                "defines": [
                ]
            }],
            ["OS in \"mac\"", {
                # FIXME
                "libraries": [
                ],
                "xcode_settings": { }
            }]
        ],
        "cflags": [
            "-fPIC", "-c", "-shared"
        ],
    }],
    'variables' : {
        'openssl_fips': '',
    }
}

