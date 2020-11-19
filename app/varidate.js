module.exports = (() => {
    const gender = ["男性", "女性"];
    const blood = ["A", "B", "AB", "O"];
    return {
        name: (na) => {
            if (!na || na === "") {
                return false;
            } else {
                return true;
            }
        },
        gender: (gen) => {
            if (!gen || gen === "") {
                return false;
            }
            if (!gender.includes(gen)) {
                return false;
            }
            return true;
        },
        dateOfBirth: (birth) => {
            if (!birth || birth === "") {
                return false;
            }
            return true;
        },
        blood: (type) => {
            if (!type || type === "") {
                return false;
            }
            if (!blood.includes(type)) {
                return false;
            }
            return true;
        },
        jobs: (job) => {
            if (!job || job === "") {
                return false;
            } else {
                return true;
            }
        },
        email: (mail) => {
            if (!mail || mail === "") {
                return false;
            }
            return true;
        },
        phoneNumber: (pn) => {
            if (!pn || pn === "") {
                return false;
            }
            return true;
        },
        password: (pw) => {
            if (!pw || pw === "") {
                return false;
            }
            return true;
        }
    }
})();