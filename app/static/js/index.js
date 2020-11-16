const indexModule = (() => {
    const path = window.location.pathname;

    switch (path) {
        case "/":
            return usersModule.fetchUsers(1);
        default:
            break;
    }
})();