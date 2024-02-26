
// элементы в DOM можно получить при помощи функции querySelector
const fruitsList = document.querySelector('.fruits__list'); // список карточек
const shuffleButton = document.querySelector('.shuffle__btn'); // кнопка перемешивания
const maxweightInp = document.querySelector('.maxweight__input'); // Ввод максимального веса
const minweightInp = document.querySelector('.minweight__input'); // Ввод минимального веса
const filterButton = document.querySelector('.filter__btn'); // кнопка фильтрации
const sortKindLabel = document.querySelector('.sort__kind'); // поле с названием сортировки
const sortTimeLabel = document.querySelector('.sort__time'); // поле с временем сортировки
const sortChangeButton = document.querySelector('.sort__change__btn'); // кнопка смены сортировки
const sortActionButton = document.querySelector('.sort__action__btn'); // кнопка сортировки
const kindInput = document.querySelector('.kind__input'); // поле с названием вида
const colorInput = document.querySelector('.color__input'); // поле с названием цвета
const weightInput = document.querySelector('.weight__input'); // поле с весом
const addActionButton = document.querySelector('.add__action__btn'); // кнопка добавления

// список фруктов в JSON формате
let fruitsJSON = `[
  {"kind": "Мангустин", "color": "фиолетовый", "weight": 13, "frame": "fruit__item fruit_violet"},
  {"kind": "Дуриан", "color": "зеленый", "weight": 35, "frame": "fruit__item fruit_green"},
  {"kind": "Личи", "color": "розово-красный", "weight": 17, "frame": "fruit__item fruit_carmazin"},
  {"kind": "Карамбола", "color": "желтый", "weight": 28, "frame": "fruit__item fruit_yellow"},
  {"kind": "Тамаринд", "color": "светло-коричневый", "weight": 22, "frame": "fruit__item fruit_lightbrown"}
]`;

// преобразование JSON в объект JavaScript
let fruits = JSON.parse(fruitsJSON);

const frame = ["fruit__item fruit_violet", "fruit__item fruit_green", "fruit__item fruit_carmazin", "fruit__item fruit_yellow", " fruit__item fruit_lightbrown"];
/*** ОТОБРАЖЕНИЕ ***/

// отрисовка карточек
const display = () => {
      fruitsList.innerHTML = '';
  for (let i = 0; i < fruits.length; i++) {
      const li = document.createElement("li");
      const divInf = document.createElement("div");
      const divInd = document.createElement("div");
      const divKind = document.createElement("div");
      const divColr = document.createElement("div");
      const divWeight = document.createElement("div");
      const Line = fruits[i];
    
      li.className = fruits[i].frame;
      divInf.className = 'fruit__info';
      divInd.textContent = "index: "+ i;
      divKind.textContent = "kind: "+ Line.kind;
      divColr.textContent = "color: "+ Line.color;
      divWeight.textContent = "weight (кг): "+ Line.weight;

      fruitsList.appendChild(li);
      li.appendChild(divInf);
      divInf.appendChild(divInd);
      divInf.appendChild(divKind);
      divInf.appendChild(divColr);
      divInf.appendChild(divWeight);
  }
};

// первая отрисовка карточек
display();

/*** ПЕРЕМЕШИВАНИЕ ***/

// генерация случайного числа в заданном диапазоне
const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};
let result = [];
// перемешивание массива
const shuffleFruits = () => {
  let Clonefruit = fruits.slice();
  while (fruits.length > 0) {
    let fruitNum = getRandomInt(0, (fruits.length -1));
    let fruit = fruits[fruitNum];
    fruits.splice(fruitNum, 1);
    result.push(fruit)
  };
  if(Clonefruit == result){
    alert("Произошла ошибка перемешивания, попробуйте снова!")
  }
  fruits = result;
  result = [];
};

shuffleButton.addEventListener('click', () => {
  shuffleFruits();
  display();
});

/*** ФИЛЬТРАЦИЯ ***/

// фильтрация массива
const filterFruits = () => {
  let maxW = Number(maxweightInp.value);
  let minW = Number(minweightInp.value);
  const result = fruits.filter((fruits) => maxW >= fruits.weight && fruits.weight >= minW);
  fruits = result;
};

filterButton.addEventListener('click', () => {
  filterFruits();
  display();
});

/*** СОРТИРОВКА ***/

let sortKind = 'bubbleSort'; // инициализация состояния вида сортировки
let sortTime = '-'; // инициализация состояния времени сортировки

const comparationColor = (color1, color2) => {
    const priority = ["розово-красный", "оранжевый", "светло-коричневый", "желтый", "зеленый", "голубой", "синий", "фиолетовый"]
    const priority1 = priority.indexOf(color1.color);
    const priority2 = priority.indexOf(color2.color);
    return priority1 > priority2;
  };

function swap(fruits, firstIndex, secondIndex){
    const temp = fruits[firstIndex];
    fruits[firstIndex] = fruits[secondIndex];
    fruits[secondIndex] = temp;
 };

 function partition(fruits, left, right) {
  var pivot = Number(fruits[Math.floor((right + left) / 2)].weight) ,
      i = left,
      j = right;
  while (i <= j) {
      while (Number(fruits[i].weight) < pivot) {
          i++;
      }
      while (Number(fruits[j].weight) > pivot) {
          j--;
      }
      if (i <= j) {
          swap(fruits, i, j);
          i++;
          j--;
      }
  }
  return i;
};
function quickSortWeight (fruits, left, right)  {
  var index;
  if (fruits.length > 1) {
      left = typeof left != "number" ? 0 : left;
      right = typeof right != "number" ? fruits.length - 1 : right;
      index = partition(fruits, left, right);
      if (left < index - 1) {
          quickSortWeight(fruits, left, index - 1);
      }
      if (index < right) {
          quickSortWeight(fruits, index, right);
      }
  }

  return fruits;
};

 const sortAPI = {
 bubbleSort(fruits, comparationColor) {
  for (let i = 0, l = fruits.length, k = l - 1; i < k; i++) {
    let indexMin = i;
    for (let j = i + 1; j < l; j++) {
        if (comparationColor(fruits[indexMin], fruits[j])) {
            indexMin = j;
        }
    }
    if (indexMin !== i) {
        [fruits[i], fruits[indexMin]] = [fruits[indexMin], fruits[i]];
    }
}
return fruits;
},
quickSort(){
  quickSortWeight(fruits)
},

  // выполняет сортировку и производит замер времени
  startSort(sort, fruits, comparation) {
    const start = new Date().getTime();
    sort(fruits, comparation);
    const end = new Date().getTime();
    sortTime = `${end - start} ms`;
  },

};

// инициализация полей
sortKindLabel.textContent = sortKind;
sortTimeLabel.textContent = sortTime;

sortChangeButton.addEventListener('click', () => {
 if(sortKind === "bubbleSort"){
    sortKindLabel.textContent = "quickSort"
    sortKind = "quickSort";
  }
  else{sortKindLabel.textContent = "bubbleSort"
  sortKind = "bubbleSort"
  }
});

sortActionButton.addEventListener('click', () => {
  sortTimeLabel.textContent = 'sorting...'
  const sort = sortAPI[sortKind];
  sortAPI.startSort(sort, fruits, comparationColor);
  sortTimeLabel.textContent = sortTime
  display();
});

/*** ДОБАВИТЬ ФРУКТ ***/

addActionButton.addEventListener('click', () => {
  if(kindInput.value != "", colorInput.value != "", weightInput.value != "" ){
  let newKind = {kind: kindInput.value, color: colorInput.value, weight: weightInput.value, frame : frame[getRandomInt(0, 4)]}
  fruits.push( newKind )
  console.log(fruits)
  display();
  }else{
    alert("Одно из полей пустое! Введите все значения.")
  }
});
