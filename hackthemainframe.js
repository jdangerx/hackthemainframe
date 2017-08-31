function birth() {
  return {
    alive: true,
    name: "Josephine Josephs",
    age: 1,
    hunger: 0,
    energy: 10
  };
}

function renderHacker(mainframe, hacker) {
  window.m = mainframe;
  mainframe.innerHTML = `${hacker.name}, age ${hacker.age}, hunger: ${hacker.hunger}, energy: ${hacker.energy}`;
  if (!hacker.alive) {
    mainframe.innerHTML = `<del>${mainframe.innerHTML}</del>`;
  }
}

function loop(mainframe, hacker, initTime) {
  let now = Date.now() - initTime;
  // hacker.age = now / 10000;
  renderHacker(mainframe, hacker);
  let animFrame = window.requestAnimationFrame(() => loop(mainframe, hacker, initTime));
  if (hackerHasDied(hacker)) {
    hacker.alive = false;
    renderHacker(mainframe, hacker);
    window.clearTimeout(hacker.hungerLoop);
    window.clearTimeout(hacker.energyLoop);
    window.cancelAnimationFrame(animFrame);
  }
}

function hungerLoop(hacker) {
  let timeout = 100;
  hacker.hunger = hacker.hunger + 1;
  return window.setTimeout(() => hungerLoop(hacker), timeout);
}

function energyLoop(hacker) {
  let timeout = 2000;
  hacker.energy = hacker.energy - 1;
  return window.setTimeout(() => energyLoop(hacker), timeout);
}

function hackerHasDied(hacker) {
  return hacker.age > 99 || hacker.hunger > 9 || hacker.energy < 1;
}

function init() {
  let mainframe = document.getElementById("mainframe");
  let hacker = birth();
  let initTime = Date.now();
  loop(mainframe, hacker);
  hacker.hungerLoop = hungerLoop(hacker);
  hacker.energyLoop = energyLoop(hacker);
}
