/* 25 Horses */
var root;
var els;
var nextStep;

function hello() {
  root.innerHTML = '<h1>Hello, World!</h1>';
}

function layout() {
  titleEl = document.createElement('h1');

  stepBtn = document.createElement('button');
  stepBtnWrapper = document.createElement('div');
  stepBtnWrapper.className = 'button-wrapper';
  stepBtnWrapper.appendChild(stepBtn);

  initialWrapper = document.createElement('div');
  initialWrapper.classList.add('initial-wrapper');

  initialEl = document.createElement('div');
  initialEl.classList.add('initial');
  initialWrapper.appendChild(initialEl);

  problemWrapper = document.createElement('div');
  problemWrapper.classList.add('problem-wrapper');

  problemEl = document.createElement('div');
  problemEl.classList.add('problem');
  problemWrapper.appendChild(problemEl);

  root.appendChild(titleEl);
  root.appendChild(stepBtnWrapper);
  root.appendChild(initialWrapper);
  root.appendChild(problemWrapper);

  els = {
    title: titleEl,
    initial: initialEl,
    problem: problemEl,
    stepBtn: stepBtn
  };
}

function initHorses(items = 25) {
  var horses = [];
  for (let i = 0; i < items; i++) {
    horses.push(24-i);
  }
  return horses;
}


function initialContent() {
  els.title.innerHTML = '25 Horses Problem';
  els.stepBtn.innerHTML = 'Next Step';

  var horses = initHorses();

  els.horseEls = [];
  for (let i = 0, items = horses.length; i < items; i++) {
    let horseEl = document.createElement('div');
    let horseNo = horses[i] + 1;
    horseEl.classList.add('horse');
    horseEl.classList.add('horsebg');
    horseEl.id = 'horse_' + horseNo;
    horseEl.dataset.entry = horseNo;
    horseEl.innerHTML = horseNo;
    els.initial.appendChild(horseEl);
    els.horseEls.push(horseEl);
  }

  els.stepBtn.addEventListener('click', e => {
    console.log('clicked button');
    nextStep && nextStep();
  });
}

function arrangeInSquare() {
  var rows = [[]];
  els.horseEls.forEach((el, ndx) => {
    if (ndx && ndx % 5 === 0) {
      els.problem.appendChild(document.createElement('br'));
      rows.push([]);
    }
    els.problem.appendChild(el);
    let row = Math.floor(ndx / 5);
    rows[row].push(el.dataset.entry);
  });
}

function groupHorses() {
  var groupCount = 5;
  var perGroup = 5;
  els.groups = [];
  for (let i = 0; i < groupCount; i++) {
    let groupEl = document.createElement('div');
    groupEl.className = 'group';
    els.initial.appendChild(groupEl);
    els.groups.push(groupEl);
  }

  els.groups.forEach((el, ndx) => {
    let bgClass = ndx % 2 ? 'horsebg-alt' : 'horsebg';
      
    for (let i = 0; i < perGroup; i++) {
      let horseEl = els.initial.querySelector('.horse');
      horseEl.classList.remove('horsebg');
      horseEl.classList.add(bgClass);
      el.appendChild(horseEl);
    }
  });
  
}

nextStep = groupHorses;

function sortRows() {
  
}

function run() {
  layout();
  horseEls = initialContent();
}


window.addEventListener('load', () => {
  root = document.getElementById('root');
  run();
});
