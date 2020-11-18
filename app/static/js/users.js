const usersModule = (() => {
    const BASE_URL = "http://localhost:3000/api/v1/users";

    const headers = new Headers();
    headers.set("Content-type", "application/json");

    // id:user-listのテーブルにusers[start]からusers[end]までのデータをセット
    const setDatas = (start, end, datas) => {
        // 現在の要素の削除
        const node = document.getElementById("users-list");
        console.log(node);
        for (let i=node.childNodes.length-1; i>=0; i--) {
            node.removeChild(node.childNodes[i]);
        }
        // 次のページのデータを表示
        for (let i=start; i<end; i++) {
            const user = datas[i];
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
    // 格HTML要素に値をセット。セットしたくない要素には引数に-1を設定。
    const setDataToElements = (dataLength=-1, showStart=-1, showEnd=-1, currentPage=-1, pageLength=-1) => {
        if (dataLength >= 0) document.getElementById("data-length").textContent = dataLength;
        if (showStart >= 0) document.getElementById("show-start").textContent = showStart;
        if (showEnd >= 0) document.getElementById("show-end").textContent = showEnd;
        if (currentPage >= 0) document.getElementById("current-page").textContent = currentPage;
        if (pageLength >= 0) document.getElementById("page-length").textContent = pageLength;
    }
    // jobs配列に職業の種類をセットする
    const generateJobs = () => {
        jobs = [];
        for (let i=0; i<users.length; i++) {
            const user = users[i];
            if (!jobs.includes(user.jobs)) jobs.push(user.jobs);
        }
        console.log(jobs);
    }
    // jobsをoptionにセット
    const setJobs = () => {
        // 子要素の削除
        const node = document.getElementById("sch-jobs");
        console.log(node);
        for (let i=node.childNodes.length-1; i>=0; i--) {
            node.removeChild(node.childNodes[i]);
        }
        const body = `<option value="-">-</option>`
        node.insertAdjacentHTML("beforeend", body);
        // optionの追加
        for (let i=0; i<jobs.length; i++) {
            const job = jobs[i];
            const body = `<option value="${job}">${job}</option>`
            node.insertAdjacentHTML("beforeend", body);
        }
    }
    let jobs = [];
    let users;
    let searchUsers = [];
    return {
        fetchUsers: async() => {
            const res = await fetch(`${BASE_URL}`);
            users = await res.json();
            setDatas(0, 20, users);
            generateJobs();
            setJobs();
            // メニューバー情報の更新
            const pageLen = Math.ceil(users.length / 20);
            setDataToElements(users.length, 1, 20, 1, pageLen);
        },
        nextPage: () => {
            const start = Number(document.getElementById("show-end").textContent);
            const showLen = Number(document.getElementById("show-length").value);
            let end = start + showLen;
            const currentPage = Number(document.getElementById("current-page").textContent);
            const pageLength = Number(document.getElementById("page-length").textContent);
            
            if (currentPage+1 > pageLength) {
                alert("最後のページです。");
                return
            }
            if (end > users.length) end = users.length;
            setDatas(start, end, users);
            setDataToElements(-1, start+1, end, currentPage+1, -1);
        },
        prevPage: () => {
            const end = Number(document.getElementById("show-start").textContent) - 1;
            const showLen = Number(document.getElementById("show-length").value);
            const start = end - showLen;
            const currentPage = Number(document.getElementById("current-page").textContent);

            if (start < 0) {
                alert("最初のページです。");
                return
            }
            setDatas(start, end, users);
            // メニューバー情報の更新
            setDataToElements(-1, start+1, end, currentPage-1, -1);
        },
        changeShowLength: () => {
            const start = 0;
            const showLen = Number(document.getElementById("show-length").value);
            const end = start + showLen;
            setDatas(start, end, users);
            // メニューバー情報の更新
            const pageLen = Math.ceil(users.length / showLen);
            setDataToElements(-1, start+1, end, 1, pageLen);
        },
        searchUsers: () => {
            
        }
    }
})();