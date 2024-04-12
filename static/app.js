async function editMemo(event) {
  const id = event.target.dataset.id;
  const editInput = prompt("please enter the content to be modified");
  const response = await fetch(`/memos/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id,
      content: editInput,
    }),
  });
  readMemo();
}

async function deleteMemo(event) {
  const id = event.target.dataset.id;
  const response = await fetch(`/memos/${id}`, {
    method: "DELETE",
  });
  readMemo();
}

function displayMemo(memo) {
  const ul = document.querySelector("#memo-ul");

  const li = document.createElement("li");
  li.innerText = `${memo.content}`;

  const editButton = document.createElement("button");
  editButton.innerText = "edit";
  editButton.addEventListener("click", editMemo);
  editButton.dataset.id = memo.id;

  const deleteButton = document.createElement("button");
  deleteButton.innerText = "delete";
  deleteButton.addEventListener("click", deleteMemo);
  deleteButton.dataset.id = memo.id;

  ul.appendChild(li);
  ul.appendChild(editButton);
  ul.appendChild(deleteButton);
}

async function readMemo() {
  const response = await fetch("/memos");
  const jsonResponse = await response.json();
  const ul = document.querySelector("#memo-ul");
  ul.innerHTML = "";
  jsonResponse.forEach(displayMemo);
}

async function createMemo(value) {
  const response = await fetch("/memos", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id: new Date().getTime(),
      content: value,
    }),
  });
  readMemo();
}

function handleSubmit(event) {
  event.preventDefault();
  const input = document.querySelector("#memo-input");
  if (input.value === "") {
    return;
  } else {
    createMemo(input.value);
  }
  input.value = "";
}

const form = document.querySelector("#memo-form");
form.addEventListener("submit", handleSubmit);

readMemo();
