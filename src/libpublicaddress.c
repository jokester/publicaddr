#define _GNU_SOURCE

#include <sys/socket.h>
#include <dlfcn.h>
#include <stdio.h>
#include <stdbool.h>

static int (*real_bind)(int socket, const struct sockaddr *address,
        socklen_t address_len);

static void init() {
    static bool initialized = false;
    if (!initialized) {
        real_bind = dlsym(RTLD_NEXT, "bind");
        initialized = true;
    }
}

static inline bool is_tcp_socket(int fd) {
    int type;
    unsigned int opt_length = sizeof(int);
    if (getsockopt(fd, SOL_SOCKET, SO_TYPE, (void*)&type, &opt_length) == 0) {
        return type == SOCK_STREAM;
    }
    return false;
}

int bind(int socket, const struct sockaddr *address,
        socklen_t address_len) {

    if (is_tcp_socket(socket)) {
        init();
        static const int optval = 1;
        setsockopt(socket, SOL_SOCKET, SO_REUSEPORT, &optval, sizeof(optval));
        printf("[libpublicaddress] setting SO_REUSEPORT for fd(%d)\n", socket);

        setsockopt(socket, SOL_SOCKET, SO_REUSEADDR, &optval, sizeof(optval));
        printf("[libpublicaddress] setting SO_REUSEADDR for fd(%d)\n", socket);
    }


    return real_bind(socket, address, address_len);
}
