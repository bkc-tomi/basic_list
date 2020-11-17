const indexModule = (() => {
    const path = window.location.pathname;

    switch (path) {
        case "/":
            document.getElementById("next-btn")
            .addEventListener("click", () => {
                return usersModule.nextPage();
            });
            document.getElementById("prev-btn")
            .addEventListener("click", () => {
                return usersModule.prevPage();
            });
            return usersModule.fetchUsers();
        default:
            break;
    }
})();