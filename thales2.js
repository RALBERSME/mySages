const bar1 = document.querySelector(".bar1");
const bar2 = document.querySelector(".bar2");
setTimeout(() => {
  bar1.classList.add("hide");
  bar2.classList.remove("hide");
}, 7800);
