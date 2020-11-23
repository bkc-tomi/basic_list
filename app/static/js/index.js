const indexModule = (() => {
    const path = window.location.pathname;

    switch (path) {
        case "/":
            document.getElementById("next-btn").addEventListener("click", () => {
                return usersModule.nextPage();
            });
            document.getElementById("prev-btn").addEventListener("click", () => {
                return usersModule.prevPage();
            });
            document.getElementById("show-length").addEventListener("change", () => {
                return usersModule.changeShowLength();
            });
            // 検索
            document.getElementById("search").addEventListener("click", () => {
                return usersModule.searchUsers();
            })
            return usersModule.fetchUsers();
        case "/create.html":
            document.getElementById("submit-user").addEventListener("click", () => {
                return usersModule.createUser();
            })
        default:
            break;
    }
})();