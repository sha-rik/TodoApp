const BASE_URL = "http://127.0.0.1:6060/api/v1/node_js_project_routes";

const token = localStorage.getItem("token");

let heading = document.getElementById("heading");
// 🔒 Guard: no token, no entry
if (!token) {
    window.location.href = "login.html";
}
let firstName = localStorage.getItem("firstName");
heading.innerText = `Welcome to My Todos`;

// ---------------- FETCH TODOS ----------------
async function fetchTodos() {
    try {
        const res = await fetch(`${BASE_URL}/student/getTodoById`, {
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
      <button onclick="deleteTodo('${todo._id}')">Delete</button>
      <hr />
    `;

        todoList.appendChild(div);
    });
}

// ---------------- ADD TODO ----------------
const todoForm = document.getElementById("todoForm");

todoForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const title = document.getElementById("title").value;
    const description = document.getElementById("description").value;

    try {
        await fetch(`${BASE_URL}/student/createTodo`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ title, description }),
        });

        todoForm.reset();
        fetchTodos();

    } catch (err) {
        console.log("Create todo error", err);
    }
});

// ---------------- DELETE TODO ----------------
async function deleteTodo(id) {
    try {
        await fetch(`${BASE_URL}/student/deleteTodo/${id}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        fetchTodos();

    } catch (err) {
        console.log("Delete todo error", err);
    }
}

// initial load
fetchTodos();
