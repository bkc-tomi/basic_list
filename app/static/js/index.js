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
            document.getElementById("show-length")
            .addEventListener("change", () => {
                return usersModule.changeShowLength();
            })
            return usersModule.fetchUsers();
        default:
            break;
    }
})();