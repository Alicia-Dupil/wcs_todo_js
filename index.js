//Correction : https://github.com/GorskiAnthony/wcs_todo_js/tree/correction_live

// Je get in input
// classlist
// form

/*
je récupère toutes les infos depuis mon HTML
*/
const FORM = document.querySelector("form");
const INPUT = document.querySelector(".insertToDo");
const LISTS = document.querySelector(".lists");

let todoList = {
    // todo1: {
    //     to_do: "Faire a manger"
    // },
    // todo2: {
    //     to_do: "Faire la vaisselle"
    // },
};

// Je vais persister mes todo

function saveToDo() {
    localStorage.setItem("todo", todoList);
}

// Je fais une fonction pour delete un element et idem pour checker un element de la todo

function trash() {
    // console.log("trash");
    // console.log(this);

    this.parentNode.parentNode.remove();
}
function checked() {
    // console.log("checked");
    // console.log(this);

    this.innerHTML = this.innerHTML === "✅" ? "❌" : "✅";
}

//je récupère data-id
const todoToDelete = this.parentNode.parentNode.getAttribute("data-id");

// La fonction loadData permet d'aller chercher des infos pendant le chargement

const loadData = () => {
    Object.keys(todoList).map((key) => templateHTML(todoList[key]));
}

window.addEventListener("load", loadData);

/*
La fonction templateHTML permet de créer un li avec les informations passer en paramètre.
*/


function templateHTML(todo) {
    //si pas de todo, tu return
    if (!todo) return;

    //template HTML pour chaque todo
    const html = `<span class="done">Faire le ménage</span>
    <span>
      <button name="trash" class="trash"><i class="fas fa-trash-alt"></i></button>
      <button name="check" class="check">❌</button>
    </span>`;


    const li = document.createElement("li");
    li.innerHTML = html;

    LISTS.insertBefore(li, LISTS.firstChild);
    li.children[1].children.trash.onclick = trash;
    li.children[1].children.checked.onclick = checked;
};


/*
La fonction allTodo permet d'afficher toutes les todos
*/


function allTodo(event) {
    console.log(todoList);

    //j'arrete le compartement par défaut du form
    event.preventDefault();

    // Je récupère mon timestamp = ma valeur unique de mo li
    const timestamp = Date.now();
    // je push cette info dans ma todolist
    todoList[timestamp] = {
        to_do: INPUT.value,
        isChecked: false,
    };

    // j'affiche la todo
    templateHTML(todoList[timestamp]);

    INPUT.value = "";


};

/*
Soumission d'une todo
*/
FORM.addEventListener("submit", allTodo);