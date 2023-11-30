const light = document.querySelector('.light');
const swtch = document.querySelector('.switch');
const audioEasyFast = document.querySelector('.play-friend_fast');
const audioEasySlowly = document.querySelector('.play-friend_slowly');

// const easy = {
//   listenFast: './audio/sanki_fast.mp3',
//   listenSlowly: './audio/sanki_slow.mp3',
//   image: [
//     './image/easy/1.jpg',
//     './image/easy/2.jpg',
//     './image/easy/3.jpg',
//     './image/easy/4.jpg',
//     './image/easy/5.jpg',
//     './image/easy/6.jpg',
//     './image/easy/7.jpg',
//     './image/easy/8.jpg',
//   ],
// };

// const hard = {
//   listenFast: './audio/friend_fast.mp3',
//   listenSlowly: './audio/friend_slowly.mp3',
//   image: [
//     './image/hard/1.jpg',
//     './image/hard/2.jpg',
//     './image/hard/3.jpg',
//     './image/hard/4.jpg',
//     './image/hard/5.jpg',
//     './image/hard/6.jpg',
//     './image/hard/7.jpg',
//     './image/hard/8.jpg',
//   ],
// };

// const level = ['easy', 'hard'];

//фонарик

let on = true;
swtch.addEventListener('click', function (e) {
  on = !on;
  if (on) {
    let x = (e.pageX / window.innerWidth) * 100;
    let y = (e.pageY / window.innerHeight) * 100;
    light.style.background = `radial-gradient(circle at ${x}% ${y}%, transparent 160px, rgba(0, 0, 0, 0.99) 200px)`;
  } else {
    light.style.background = 'none';
  }
  light.style.display = 'none';
  document.body.innerHTML = `
  <div class="menu">
  <div class="level">
      <button class="level_button level_button__green">Зайти в дом</button>
  </div>
</div>
  `;

  //вход easy

  document
    .querySelector('.level_button')
    .addEventListener('click', function (event) {
      document.body.style.backgroundImage = "url('./image/web.jpg')";
      document.querySelector('.menu').style.display = 'none';

      document.body.innerHTML = `
      <div class="nav">
            <h1 class="nav__title">Собрав фрагменты мелодии в правильном порядке, ты найдешь следующую подсказку</h1>
            <div class="nav__btns">
                <button class="nav__btn nav__btn_start" type="button">Начать сначала</button>
                <button class="nav__btn nav__btn_check disabled" type="button" disabled="true">Проверить</button>
            </div>
        </div>

        <div class="answer">
            <div class="answer__letter">Л</div>

            <img class="answer___butterfly" src="./image/butterfly.png" alt="бабочка">
            <img class="answer___spider" src="./image/spider.png" alt="паук">
        </div>


        <div class="wrap-dwarf">
            <div class="dwarf-container">
                <img class="dwarf-container__img" src="./image/dwarf.png" alt="гном">
                <div class="dwarf-container__answer">
                    <p class="dwarf-container__message">Гой еси, добрый молодец! Рад, что ты ко мне заглянул. Жми на кнопки справа и слушай мелодию. Кнопка 🐢 поможет тебе расслышать мелодию детально. Если справишься - освободишь бабочку и получишь ключ</p>
                </div>
            </div>

            <div class="listen">
                <p class="listen_title">Слушать</p>
                <button class="listen_button-norm" type="button"></button>
                <button class="listen_button-slowly" type="button"></button>
            </div>
        </div>

        <div class="items">
        

        </div>
        <div class="placeholders">
        <div class="placeholder" data-placeholder="1"></div>
        <div class="placeholder" data-placeholder="2"></div>
        <div class="placeholder" data-placeholder="3"></div>
        <div class="placeholder" data-placeholder="4"></div>
        <div class="placeholder" data-placeholder="5"></div>
        <div class="placeholder" data-placeholder="6"></div>
        <div class="placeholder" data-placeholder="7"></div>
        <div class="placeholder" data-placeholder="8"></div>
        </div>
      `;

      //перезагрузка страницы
      document
        .querySelector('.nav__btn_start')
        .addEventListener('click', function () {
          window.location.reload();
        });

      const images = ['1', '2', '3', '4', '5', '6', '7', '8'];

      const randomNotes = images
        .sort(() => Math.random() - 0.5)
        .map(
          (image) =>
            `<div class="item" data-image="${image}" draggable = "true"></div>`
        )
        .join('\n');
      document
        .querySelector('.items')
        .insertAdjacentHTML('afterbegin', randomNotes);

      //слушаем быстрое исполнение
      document
        .querySelector('.listen_button-norm')
        .addEventListener('click', function (event) {
          audioEasyFast.play();
        });

      //слушаем медленное исполнение
      document
        .querySelector('.listen_button-slowly')
        .addEventListener('click', function (event) {
          audioEasySlowly.play();
        });

      //получаем все фрагменты с нотами
      const items = document.querySelectorAll('.item');

      items.forEach((item) => {
        item.addEventListener('dragstart', dragstart);
        item.addEventListener('dragend', dragend);
      });

      function dragstart(evt) {
        console.log('dragstart');
        evt.target.classList.add('dragging');
        setTimeout(() => evt.target.classList.add('hidden'));
      }

      function dragend(evt) {
        console.log('dragend');
        evt.target.classList.remove('dragging', 'hidden');
      }

      //получаем плейсхолдеры
      const placeholders = document.querySelectorAll('.placeholder');
      placeholders.forEach((item) => {
        // console.log('item', item);
        item.addEventListener('dragover', dragover);
        item.addEventListener('dragenter', dragenter);
        item.addEventListener('dragleave', dragleave);
        item.addEventListener('drop', (evt) => {
          console.log('dragdrop');
          // document.querySelector('.item').style.border = 'solid 0px';
          if (item.children.length === 0) {
            item.append(document.querySelector('.dragging'));
          }
          evt.target.classList.remove('hovered');
          const { finish, right } = checkGame();
          if (finish) {
            document
              .querySelector('.nav__btn_check')
              .classList.remove('disabled');
            document.querySelector('.nav__btn_check').disabled = false;
            document
              .querySelector('.nav__btn_check')
              .addEventListener('click', function () {
                if (right) {
                  document.querySelector(
                    '.dwarf-container__message'
                  ).textContent =
                    'Молодец! Твой ключ - буква Л. Прибереги его.';
                  document
                    .querySelector('.answer___butterfly')
                    .classList.add('transform-butterfly');

                  document
                    .querySelector('.answer___spider')
                    .classList.add('transform-spider');
                } else {
                  console.log('Плохо');
                  document.querySelector(
                    '.dwarf-container__message'
                  ).textContent =
                    'Где-то закралась ошибочка... попробуй еще разок';
                }
              });
          }
        });
      });

      function dragover(evt) {
        console.log('dragover');
        evt.preventDefault();
      }

      function dragenter(evt) {
        console.log('dragenter');
        evt.target.classList.add('hovered');
      }

      function dragleave(evt) {
        console.log('dragleave');
        evt.target.classList.remove('hovered');
      }
    });
});

function checkGame() {
  const items = document.querySelectorAll('.item'); //нотные фрагменты
  const placeholders = document.querySelectorAll('.placeholder');
  let finish = true;
  let right = true;

  items.forEach((item, i) => {
    //перебираем карточки
    const note = placeholders[i].querySelector('.item')?.dataset?.image; //атрибуты вставки
    console.log('placeholders', placeholders[i].dataset.placeholder);
    if (!note) {
      console.log('not');
      //если карточки не вставлены
      finish = false; //продолжаем играть
    } else if (note !== placeholders[i].dataset.placeholder) {
      // console.log('note', note);
      // console.log('placeholders', placeholders);
      // console.log('yes');
      //если не верно вставлено
      right = false;
    }
  });
  return { finish, right };
}

// фонарик
document.addEventListener('mousemove', function (e) {
  if (on) {
    let x = (e.pageX / window.innerWidth) * 100;
    let y = (e.pageY / window.innerHeight) * 100;
    light.style.background = `radial-gradient(circle at ${x}% ${y}%, transparent 160px, rgba(0, 0, 0, 0.99) 200px)`;
  } else {
    light.style.background = 'none';
  }
});

////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Анимация по Q

// document.addEventListener('keydown', function (event) {
//   if (event.code == 'KeyQ') {
//     document
//       .querySelector('.answer___butterfly')
//       .classList.add('transform-butterfly');

//     document
//       .querySelector('.answer___spider')
//       .classList.add('transform-spider');
//   }
// });

// function renderRandomNotes() {
//   const notes = ['До', 'Ре', 'Ми', 'Фа', 'Соль', 'Ля', 'Си'];
//   const randomNotes = notes
//     .map((note, i) => ({ [i + 1]: note }))
//     .sort(() => Math.random() - 0.5)
//     .map(
//       (note) =>
//         `<div
//           data-note="${Object.keys(note)}"
//           class="name"
//           draggable="true"
//         >
//           ${Object.values(note)}
//         </div>`
//     )
//     .join('\n');
//   document
//     .querySelector('.names')
//     .insertAdjacentHTML('afterbegin', randomNotes);
// }

{
  /* <div class="item" data-image="1" draggable = "true"></div>
<div class="item" data-image="2" draggable = "true"></div>
<div class="item" data-image="3" draggable = "true"></div>
<div class="item" data-image="4" draggable = "true"></div>
<div class="item" data-image="5" draggable = "true"></div>
<div class="item" data-image="6" draggable = "true"></div>
<div class="item" data-image="7" draggable = "true"></div>
<div class="item" data-image="8" draggable = "true"></div>  */
}
