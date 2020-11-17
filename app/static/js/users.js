const usersModule = (() => {
    const BASE_URL = "http://localhost:3000/api/v1/users";

    const headers = new Headers();
    headers.set("Content-type", "application/json");
    // const handleError = async(res) => {
    //     const resJson = await res.json();

    //     switch (res.status) {
    //         case 200:
    //             alert(resJson.message);
    //             window.location.href = "/";
    //             break;
    //         case 201:
    //             alert(resJson.message);
    //             window.location.href = "/";
    //             break;
    //         case 400:
    //             alert(resJson.error);
    //             break;
    //         case 404:
    //             alert(resJson.error);
    //             break;
    //         case 500:
    //             alert(resJson.error);
    //             break;
    //         default:
    //             alert("予期せぬエラー");
    //     }
    // }

    // id:user-listのテーブルにusers[start]からusers[end]までのデータをセット
    const setDatas = (start, end) => {
        // 現在の要素の削除
        const node = document.getElementById("users-list");
        for (let i=node.childNodes.length-1; i>=0; i--) {
            node.removeChild(node.childNodes[i]);
        }
        // 次のページのデータを表示
        for (let i=start; i<end; i++) {
            const user = users[i];
            const body = `
                        <tr>
                            <td>
                                <div class="namediv">
                                    <img src="${user.icon || "assets/usericon.png"}" class="usericon" />
                                    <p class="username">${user.name}</p>
                                </div>
                            </td>
                            <td>${user.gender}</td>
                            <td>${user.date_of_birth.slice(0, 10)}</td>
                            <td>${user.blood_type}</td>
                            <td>${user.jobs}</td>
                            <td>${user.email}</td>
                            <td>${user.phone_number}</td>
                            <td><a href="edit.html?uid=${user.id}">編集</a></td>
                        </tr>
            `;
            node.insertAdjacentHTML("beforeend", body);
        }
    }

    let users;
    return {
        fetchUsers: async() => {
            const res = await fetch(`${BASE_URL}`);
            users = await res.json();
            setDatas(0, 20);
            // メニューバー情報の更新
            document.getElementById("data-length").textContent = users.length;
            document.getElementById("show-start").textContent = 1;
            document.getElementById("show-end").textContent = 20;
            document.getElementById("current-page").textContent = 1;
            let pageLen = Math.ceil(users.length / 20);
            document.getElementById("page-length").textContent = pageLen;
        },
        nextPage: () => {
            const start = Number(document.getElementById("show-end").textContent);
            const showLen = Number(document.getElementById("show-length").value);
            const end = start + showLen;
            const currentPage = Number(document.getElementById("current-page").textContent);
            
            if (end > users.length) {
                alert("最後のページです。");
                return
            }
            setDatas(start, end);
            // メニューバー情報の更新
            document.getElementById("show-start").textContent = start + 1;
            document.getElementById("show-end").textContent = end;
            document.getElementById("current-page").textContent = currentPage + 1;
        },
        prevPage: () => {
            const end = Number(document.getElementById("show-start").textContent) - 1;
            const showLen = Number(document.getElementById("show-length").value);
            const start = end - showLen;
            const currentPage = Number(document.getElementById("current-page").textContent);
            console.log(start, end , showLen, currentPage);
            if (start < 0) {
                alert("最初のページです。");
                return
            }
            setDatas(start, end);
            // メニューバー情報の更新
            document.getElementById("show-start").textContent = start + 1;
            document.getElementById("show-end").textContent = end;
            document.getElementById("current-page").textContent = currentPage - 1;
        },
        changeShowLength: () => {
            const start = 0;
            const showLen = Number(document.getElementById("show-length").value);
            const end = start + showLen;
            setDatas(start, end);
            // メニューバー情報の更新
            document.getElementById("show-start").textContent = start + 1;
            document.getElementById("show-end").textContent = end;
            document.getElementById("current-page").textContent = 1;
        }
    }
})();