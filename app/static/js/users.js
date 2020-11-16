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

    return {
        fetchUsers: async(num) => {
            const res = await fetch(`${BASE_URL}/thousand/${num}`);
            const users = await res.json();
            for (let i=0; i < users.length; i++) {
                const user = users[i];
                const body = `
                            <tr>
                                <td>${user.name}</td>
                                <td>${user.gender}</td>
                                <td>${user.date_of_birth}</td>
                                <td>${user.blood_type}</td>
                                <td>${user.jobs}</td>
                                <td>${user.email}</td>
                                <td>${user.phone_number}</td>
                                <td><a href="edit.html?uid=${user.id}">編集</a></td>
                            </tr>
                `;
                document.getElementById("users-list").insertAdjacentHTML("beforeend", body);
            }
        }
    }
})();