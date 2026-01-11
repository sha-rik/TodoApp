const BASE_URL = "https://todo-backend-s4xa.onrender.com/api/v1/node_js_project_routes";


// ---------------- SIGNUP ----------------
const signupForm = document.getElementById("signupForm");

if (signupForm) {
    signupForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        const firstName = document.getElementById("firstName").value;
        const lastName = document.getElementById("lastName").value;
        const email = document.getElementById("signupEmail").value;
        const password = document.getElementById("signupPassword").value;

        try {
            const res = await fetch(`${BASE_URL}/signup`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    firstName,
                    lastName,
                    email,
                    password,
                }),
            });

            const data = await res.json();
            document.getElementById("signupMsg").innerText =
                data.message || "Signup successful";

        } catch (err) {
            document.getElementById("signupMsg").innerText =
                "Signup failed";
        }
    });
}

// redirect to login
const goToLogin = document.getElementById("goToLogin");
if (goToLogin) {
    goToLogin.addEventListener("click", () => {
        window.location.href = "login.html";
    });
}

// ---------------- LOGIN ----------------
const loginForm = document.getElementById("loginForm");
let fun = function (role) {
    if (role === "Admin") {
        window.location.href = "admin.html";
    }
    else {
        window.location.href = "todo.html";
    }
}

if (loginForm) {
    loginForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        const email = document.getElementById("loginEmail").value;
        const password = document.getElementById("loginPassword").value;

        try {
            const res = await fetch(`${BASE_URL}/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await res.json();

            if (data.success) {
                localStorage.setItem("token", data.token);
                localStorage.setItem("role", data.user.role);
                document.getElementById("loginMsg").innerText = `Login Successful! Welcome ${data.user.role}`;

                setTimeout(() => fun(data.user.role), 2500);

            } else {
                document.getElementById("loginMsg").innerText =
                    data.message || "Login failed";
            }

        } catch (err) {
            console.log("Login error", err);
            document.getElementById("loginMsg").innerText = "Login error";
        }
    });
}

// redirect to signup
const goToSignup = document.getElementById("goToSignup");
if (goToSignup) {
    goToSignup.addEventListener("click", () => {
        window.location.href = "signUp.html";
    });
}
