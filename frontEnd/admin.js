const BASE_URL = "https://todo-backend-s4xa.onrender.com/api/v1/node_js_project_routes";

const token = localStorage.getItem("token");

let heading = document.getElementById("heading");
// 🔒 Guard: no token, no entry
if (!token) {
    window.location.href = "login.html";
}
heading.innerText = `This is Admin Dashboard`;

// ---------------- FETCH TODOS ----------------
async function fetchTodos() {
    try {
        const res = await fetch(`${BASE_URL}/admin/getTodo`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        if (!res.ok) {
            throw new Error("Unauthorized or failed request");
        }

        const data = await res.json();
        renderTodos(data.data || []);
    } catch (err) {
        console.log("Fetch todos error", err);
    }
}

// ---------------- RENDER TODOS ----------------
function renderTodos(todos) {
    const todoList = document.getElementById("todoList");
    todoList.innerHTML = "";

    todos.forEach((todo) => {
        const div = document.createElement("div");

        div.innerHTML = `
      <p><b>${todo.title}</b></p>
      <p>${todo.description}</p>
      <p><i>Created by User ID: ${todo.userId}</i></p>
      <hr />
    `;

        todoList.appendChild(div);
    });
}


// initial load
fetchTodos();
