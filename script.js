const light = document.querySelector('.light');
const swtch = document.querySelector('.switch');
let on = true;

// swtch.addEventListener('click', function (e) {
//   on = !on;
//   if (on) {
//     let x = (e.pageX / window.innerWidth) * 100;
//     let y = (e.pageY / window.innerHeight) * 100;
//     light.style.background = `radial-gradient(circle at ${x}% ${y}%, transparent 160px, rgba(0, 0, 0, 0.99) 200px)`;
//   } else {
//     light.style.background = 'none';
//   }
//   light.style.display = 'none';
//   document.body.innerHTML = `
//   <div class="menu">
//   <div class="level">
//       <button class="level_button level_button__green">Начинающий</button>
//       <button class="level_button level_button__yellow">Продвинутый</button>
//   </div>
// </div>
//   `;
// });

// document.addEventListener('mousemove', function (e) {
//   if (on) {
//     let x = (e.pageX / window.innerWidth) * 100;
//     let y = (e.pageY / window.innerHeight) * 100;
//     light.style.background = `radial-gradient(circle at ${x}% ${y}%, transparent 160px, rgba(0, 0, 0, 0.99) 200px)`;
//   } else {
//     light.style.background = 'none';
//   }
// });

////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Анимация по Q
document.addEventListener('keydown', function (event) {
  if (event.code == 'KeyQ') {
    document
      .querySelector('.answer___butterfly')
      .classList.add('transform-butterfly');

    document
      .querySelector('.answer___spider')
      .classList.add('transform-spider');
  }
});
