(async function () {

    try {

        const response = await axios.get(
            "https://mod-auth.api.st3.dolphinlabs.ie/me",
            {
                withCredentials: true
            }
        );

        if (!response.data.user) {
            window.location.href = "/login.html";
            return;
        }

        const user = response.data.user;

        window.currentUser = user;

        const display =
            document.getElementById("userDisplay");

        if (display) {
            display.textContent = user.email;
        }

    } catch (err) {

        console.error(
            "Authentication failed:",
            err
        );

        window.location.href =
            "/login.html";
    }

})();

document.addEventListener("DOMContentLoaded", function () {

    const logoutLinks =
        Array.from(document.querySelectorAll("a"))
            .filter(link =>
                link.textContent
                    .trim()
                    .toLowerCase() === "logout"
            );

    logoutLinks.forEach(link => {

        link.addEventListener(
            "click",
            async function (e) {

                e.preventDefault();

                try {

                    await axios.post(
                        "https://mod-auth.api.st3.dolphinlabs.ie/logout",
                        {},
                        {
                            withCredentials: true
                        }
                    );

                } catch (err) {

                    console.error(
                        "Logout failed:",
                        err
                    );

                } finally {
                    document.cookie =
                        "username=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";

                    document.cookie =
                        "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";

                    window.location.href =
                        "/login.html";

                }

            }
        );

    });

});