'use strict';

import { horsesSetup } from './horses-setup.js';

/* 25 Horses */
var app = (() => {
  let root,
      els,
      rowCoords = [],
      btnActions,
      finalGrouping,
      nextStep;

  function layout() {
    let titleEl = document.createElement('h1');

    let stepBtn = document.createElement('button');
    let stepBtnWrapper = document.createElement('div');
    stepBtnWrapper.className = 'button-wrapper';
    stepBtnWrapper.appendChild(stepBtn);

    let initialWrapper = document.createElement('div');
    initialWrapper.classList.add('initial-wrapper');

    let initialEl = document.createElement('div');
    initialEl.classList.add('initial');
    initialWrapper.appendChild(initialEl);


    root.appendChild(titleEl);
    root.appendChild(stepBtnWrapper);
    root.appendChild(initialWrapper);

    els = {
      title: titleEl,
      initial: initialEl,
      stepBtn: stepBtn
    };
  }


  function initialContent() {
    els.title.innerHTML = '25 Horses Problem';
    els.stepBtn.innerHTML = 'Next Step';

    let horses = horsesSetup();

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

    let stepNdx = 0;
    els.stepBtn.addEventListener('click', e => {
      console.log('clicked button; process step', stepNdx);
      btnActions[stepNdx] && btnActions[stepNdx++]();
    });
  }


  function groupHorses() {
    let groupCount = 5;
    let perGroup = 5;
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

    prepareToMoveToGrid();
  }
  
  function prepareToMoveToGrid() {
    let coords = [];
    els.groups.forEach((el, ndx) => {
      let groupEl = el;
      let elWidth = groupEl.offsetWdith;
      let xCoord = groupEl.offsetLeft;
      let yCoord = groupEl.offsetTop;
      coords.push({ xCoord, yCoord });
      rowCoords.push( groupEl.offsetTop + 20 + (ndx+1) * groupEl.offsetHeight );
    });
    els.groups.forEach((el, ndx) => {
      let groupEl = el;
      let xCoord = coords[ndx].xCoord;
      let yCoord = coords[ndx].yCoord;
      groupEl.style.position = 'absolute';
      groupEl.style.display = 'block';
      groupEl.style.top = yCoord + 'px';
      groupEl.style.left = xCoord + 'px';
    });
  }


  function moveRowToGrid(ndx) {
    return () => {
      raceRow(ndx)();
      let groupEl = els.groups[ndx];
      let xCoord = (window.innerWidth - groupEl.offsetWidth) / 2;
      let yCoord = groupEl.offsetTop + 20 + (ndx+1) * groupEl.offsetHeight;
      groupEl.style.top = yCoord + 'px';
      groupEl.style.left = xCoord + 'px';
    };
  }


  function rankHorses(row, raced) {
    let horseEls = Array.from(els.groups[row].childNodes);
    raced.forEach(entry => {
      let el = horseEls.filter(el => 1*el.dataset.entry === entry)[0];
      el.classList.remove('horsebg');
      el.classList.remove('horsebg-alt');
      el.classList.add('racedbg');
      els.groups[row].appendChild(el);    
    });
  }

  function raceRow(row) {
    return () => {
      let horseEls = Array.from(els.groups[row].childNodes);
      let entries = horseEls.map(el => 1*el.dataset.entry);
      race(entries);
      rankHorses(row, entries);
      
    };
  }


  function race(entries) {
    entries.sort((a, b) => a-b);
  }


  function rankRows(raced) {
    finalGrouping = [];
    raced.forEach((entry, ndx) => {
      let group = els.groups.filter(g => { return 1*g.childNodes[4].dataset.entry === entry; })[0];
      group.style.top = rowCoords[ndx] + 'px';
      if (ndx === 2) {
        finalGrouping.push(group.childNodes[4]);
      } else if (ndx === 3) {
        finalGrouping.push(group.childNodes[3]);
        finalGrouping.push(group.childNodes[4]);
      } else if (ndx === 4) {
        finalGrouping.push(group.childNodes[2]);
        finalGrouping.push(group.childNodes[3]);
        finalGrouping.push(group.childNodes[4]);
      }
    });
  }


  function final() {
   els.horseEls.forEach(h => { h.classList.remove('racedbg'); h.classList.add('horsebg'); });
   finalGrouping.forEach(g => {
     g.classList.add('final');
   });
   finalGrouping[5].classList.add('first-place');
  }


  function penultimate() {
    var contenders = els.groups.map(g => g.childNodes[4]);
    let horseEls = Array.from(contenders);
    let entries = horseEls.map(el => 1*el.dataset.entry);
    race(entries);
    rankRows(entries);
  }

  function run(rootEl) {
    root = rootEl;
    layout();
    initialContent();
  }

  btnActions = [
    groupHorses,
    moveRowToGrid(0),
    moveRowToGrid(1),
    moveRowToGrid(2),
    moveRowToGrid(3),
    moveRowToGrid(4),
/*
    raceRow(0),
    raceRow(1),
    raceRow(2),
    raceRow(3),
    raceRow(4),
*/
    penultimate,
    final
  ];



  return {
    run: run
  }

})();

window.addEventListener('load', () => {
  let root = document.getElementById('root');
  app.run(root);
});
