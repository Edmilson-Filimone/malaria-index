//nav-bar "button"
//const nav_item = document.querySelector("li.nav-item");
const prv = document.querySelector("#prv");
const inc = document.querySelector("#inc");
const mor = document.querySelector("#mor");
const avg = document.querySelector("#avg");


//containers
const prv_box = document.querySelector("#prevalence-box");
const inc_box = document.querySelector("#incidence-box");
const mor_box = document.querySelector("#mortality-box");
const avg_box = document.querySelector("#average_box")

//titles
const prv_title = document.querySelector("#prevalence");
const inc_title = document.querySelector("#incidence");
const mor_title = document.querySelector("#mortality");

//setting the display none
inc_title.style.display="none"
mor_title.style.display="none"
inc_box.style.display="none"
mor_box.style.display="none"
avg_box.style.display="none"

//the magic - click event to show and hide
prv.addEventListener("click", (e) => {
  prv_title.style.display = "block";
  inc_title.style.display = "none";
  mor_title.style.display = "none";

  prv_box.style.display = "flex";
  inc_box.style.display = "none";
  mor_box.style.display = "none";
  avg_box.style.display = "none"
});

inc.addEventListener("click", (e) => {
  prv_title.style.display = "none";
  inc_title.style.display = "block";
  mor_title.style.display = "none";

  prv_box.style.display = "none";
  inc_box.style.display = "flex";
  mor_box.style.display = "none";
  avg_box.style.display = "none"
  console.log("Some info");
});

mor.addEventListener("click", (e) => {
  prv_title.style.display = "none";
  inc_title.style.display = "none";
  mor_title.style.display = "block";

  prv_box.style.display = "none";
  inc_box.style.display = "none";
  mor_box.style.display = "flex";
  avg_box.style.display = "none"
});

avg.addEventListener("click", (e) => {
  prv_title.style.display = "none";
  inc_title.style.display = "none";
  mor_title.style.display = "none";

  prv_box.style.display = "none";
  inc_box.style.display = "none";
  mor_box.style.display = "none";
  avg_box.style.display = "flex"
  console.log("Some info");
});

