function addColumn(elems) {
    for (let elem of elems) {
        if (elem.classList.contains('selected')) {
            return;
        }
        elem.classList.add('selected');
    }
}

function clearSelected(elems) {
    for (let elem of elems) {
        elem.classList.remove('selected');
    }
}

function addSelected(target) {
    target.classList.toggle("selected");
}

function removeSelected (target) {
    target.classList.remove("selected")
}

let form = document.querySelector('.form');

form.addEventListener('submit', (e) => {
    e.preventDefault();
})

let ul = document.querySelector('#ul');

ul.addEventListener('mousedown', function (e) {
    e.preventDefault();
})

ul.addEventListener('click', function (e) {

    if (e.target == this) {
        return false;
    }
    
     if (!e.altKey) {
         if (!e.target.classList.contains('selected')) {
            clearSelected(this.children);
         }
         addSelected(e.target);
    } else {
        addSelected(e.target);
    }

    if (e.ctrlKey) {
        removeSelected(e.target)
    }

    if (e.shiftKey) {
        addColumn(this.children);
    }

})

const btnStart = document.querySelector('#btnStart');
const btnEnd = document.querySelector('#btnEnd');
const btnRemove = document.querySelector('#btnRemove');
const btnSort = document.querySelector('#btnSort');
const input = document.querySelector('#input');

class Button {
    constructor (elem) {
        this.elem = elem;
    }

    handleEvent(event) {
        const createLi = document.createElement('li');
        const findLi = document.getElementsByClassName('selected');
        createLi.innerHTML = input.value;
        switch (event.target) {
            case btnStart :
                if (!input.value) {
                    throw "Error: Input field must not be empty";
                } else {
                    ul.prepend(createLi);
                    input.value = null;
                }
                break;
            case btnEnd : 
                if (!input.value) {
                    throw "Error: Input field must not be empty";
                } else {
                    ul.append(createLi);
                    input.value = null;
                }
                break;
            case btnRemove : 
                for (let i = (findLi.length-1); i >= 0; i--) {
                     ul.removeChild(findLi[i]);
                }
                break;
            case btnSort : 
                for (let i = 0; i < findLi.length; i++) {
                        ul.prepend(findLi[i]);
                }
        }
    }
}

let container = document.querySelector("#container")


let btn = new Button(container);
container.addEventListener('click', btn);

let menu = document.querySelector('#menu');

class Menu {
    constructor(elem) {
      this._elem = elem;
      this.lsit = [];
      elem.onclick = this.onClick.bind(this); // (*)
    }

    save() {
        this.list = ul.innerHTML;
        ul.innerHTML = null;
        alert('Сохраняю список');
        
    }

    load() {
        if (this.list) {
            ul.innerHTML = this.list;
            alert('Загружаю список');
        } else {
            alert("Нет сохраненных списков")
        }

    }

    search() {
        alert('ищу');
    }

    onClick(event) {
      let action = event.target.dataset.action;
      if (action) {
        this[action]();
      }
    };
  }

  let menuBtn = new Menu(menu);
  menu.addEventListener('click', menuBtn);