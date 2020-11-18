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
            // 登録ウィンドウの表示
            document.getElementById("user-submit").addEventListener("click", () => {
                const page = document.getElementById("submit-bg");
                page.style.display = "flex";
            });
            // 登録ウィンドウの非表示
            document.getElementById("close-submit").addEventListener("click", () => {
                const page = document.getElementById("submit-bg");
                page.style.display = "none";
            });
            // 検索
            document.getElementById("search").addEventListener("click", () => {
                return usersModule.searchUsers();
            })
            return usersModule.fetchUsers();
        default:
            break;
    }
})();