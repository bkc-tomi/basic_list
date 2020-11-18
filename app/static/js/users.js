const usersModule = (() => {
    const BASE_URL = "http://localhost:3000/api/v1/users";

    const headers = new Headers();
    headers.set("Content-type", "application/json");

    // id:user-listのテーブルにusers[start]からusers[end]までのデータをセット
    const setDatas = (start, end, datas) => {
        // 現在の要素の削除
        const node = document.getElementById("users-list");
        for (let i=node.childNodes.length-1; i>=0; i--) {
            node.removeChild(node.childNodes[i]);
        }
        // 次のページのデータを表示
        for (let i=start; i<end; i++) {
            if (!datas[i]) return;
            const user = datas[i];
            const body = `
                        <tr>
                            <td>
                                <div class="namediv">
                                    <img src="${ user.icon || "assets/usericon.png" }" class="usericon" />
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
    }
    // jobsをoptionにセット
    const setJobs = () => {
        // 子要素の削除
        const node = document.getElementById("sch-jobs");
        for (let i=node.childNodes.length-1; i>=0; i--) {
            node.removeChild(node.childNodes[i]);
        }
        // optionの追加
        const body = `<option value="-">-</option>`
        node.insertAdjacentHTML("beforeend", body);
        for (let i=0; i<jobs.length; i++) {
            const job = jobs[i];
            const body = `<option value="${job}">${job}</option>`
            node.insertAdjacentHTML("beforeend", body);
        }
    }

    const dateToNumber = (date) => {
        let str = date.replace("-", "");
        return Number(str.replace("-", ""));
    }

    let jobs = [];
    let users;
    let searchUsers = [];
    return {
        fetchUsers: async() => {
            const res = await fetch(`${BASE_URL}`);
            users = await res.json();
            searchUsers = users.slice();
            setDatas(0, 20, searchUsers);
            generateJobs();
            setJobs();
            // メニューバー情報の更新
            const pageLen = Math.ceil(searchUsers.length / 20);
            setDataToElements(searchUsers.length, 1, 20, 1, pageLen);
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
            if (end > searchUsers.length) end = searchUsers.length;
            setDatas(start, end, searchUsers);
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
            setDatas(start, end, searchUsers);
            // メニューバー情報の更新
            setDataToElements(-1, start+1, end, currentPage-1, -1);
        },
        changeShowLength: () => {
            const start = 0;
            const showLen = Number(document.getElementById("show-length").value);
            const end = start + showLen;
            setDatas(start, end, searchUsers);
            // メニューバー情報の更新
            const pageLen = Math.ceil(searchUsers.length / showLen);
            setDataToElements(-1, start+1, end, 1, pageLen);
        },
        searchUsers: () => {
            const name = document.getElementById("sch-name").value;
            const gender = document.getElementById("sch-gender").value;
            const birthStart = document.getElementById("sch-birth-start").value;
            const birthEnd = document.getElementById("sch-birth-end").value;
            const blood = document.getElementById("sch-blood").value;
            const job = document.getElementById("sch-jobs").value;

            searchUsers = users.slice();
            let tempUsers = [];
            if (name != "") {
                console.log(name);
                for (let i=0; i<searchUsers.length; i++) {
                    if (searchUsers[i].name == name) {
                        tempUsers.push(searchUsers[i]);
                    }
                }
                searchUsers = tempUsers.slice();
            }
            if (gender != "-") {
                console.log(gender);
                tempUsers = [];
                for (let i=0; i<searchUsers.length; i++) {
                    if (searchUsers[i].gender == gender) {
                        tempUsers.push(searchUsers[i]);
                    }
                }
                searchUsers = tempUsers.slice();
            }
            if (birthStart != "") {
                const start = dateToNumber(birthStart);
                tempUsers = [];
                for (let i=0; i<searchUsers.length; i++) {
                    let dt = searchUsers[i].date_of_birth.slice(0, 10);
                    dt = dateToNumber(dt);
                    if (dt >= start) {
                        tempUsers.push(searchUsers[i]);
                    }
                }
                searchUsers = tempUsers.slice();
            }
            if (birthEnd != "") {
                const end = dateToNumber(birthEnd);
                tempUsers = [];
                for (let i=0; i<searchUsers.length; i++) {
                    let dt = searchUsers[i].date_of_birth.slice(0, 10);
                    dt = dateToNumber(dt);
                    if (dt <= end) {
                        tempUsers.push(searchUsers[i]);
                    }
                }
                searchUsers = tempUsers.slice();
            }
            if (blood != "-") {
                tempUsers = [];
                for (let i=0; i<searchUsers.length; i++) {
                    if (searchUsers[i].blood_type == blood) {
                        tempUsers.push(searchUsers[i]);
                    }
                }
                searchUsers = tempUsers.slice();
            }
            if (job != "-") {
                tempUsers = [];
                for (let i=0; i<searchUsers.length; i++) {
                    if (searchUsers[i].jobs == job) {
                        tempUsers.push(searchUsers[i]);
                    }
                }
                searchUsers = tempUsers.slice();
            }
            
            const showLen = Number(document.getElementById("show-length").value);
            const pageLen = Math.ceil(searchUsers.length / showLen);
            setDatas(0, showLen, searchUsers);
            setDataToElements(searchUsers.length, 1, showLen, 1, pageLen);
        }
    }
})();