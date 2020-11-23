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
            var reg = /^[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/;
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
            var reg = /^[A-Za-z0-9]{1}[A-Za-z0-9_.-]*@{1}[A-Za-z0-9_.-]{1,}\.[A-Za-z0-9]{1,}$/;
            if (!reg.test(mail)) {
                return false;
            }
            return true;
        },
        phoneNumber: (pn) => {
            if (!pn || pn === "") {
                return false;
            }
            var reg = /^\d*$/;
            if (!reg.test(pn)) {
                return false;
            }
            return true;
        },
        password: (pw) => {
            if (!pw || pw === "") {
                return false;
            }
            if (pw.length < 4) {
                return false;
            }
            return true;
        }
    }
})();