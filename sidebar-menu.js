const nav_item = document.querySelector("li.nav-item");
const prv = document.querySelector("#prv");
const inc = document.querySelector("#inc");
const mor = document.querySelector("#mor");

const prv_box = document.querySelector("#prevalence-box");
const inc_box = document.querySelector("#incidence-box");
const mor_box = document.querySelector("#mortality-box");

const prv_title = document.querySelector("#prevalence");
const inc_title = document.querySelector("#incidence");
const mor_title = document.querySelector("#mortality");

inc_title.style.display="none"
mor_title.style.display="none"
inc_box.style.display="none"
mor_box.style.display="none"

prv.addEventListener("click", (e) => {
  prv_title.style.display = "block";
  inc_title.style.display = "none";
  mor_title.style.display = "none";

  prv_box.style.display = "flex";
  inc_box.style.display = "none";
  mor_box.style.display = "none";
});

inc.addEventListener("click", (e) => {
  prv_title.style.display = "none";
  inc_title.style.display = "block";
  mor_title.style.display = "none";

  prv_box.style.display = "none";
  inc_box.style.display = "flex";
  mor_box.style.display = "none";
  console.log("Some info");
});

mor.addEventListener("click", (e) => {
  prv_title.style.display = "none";
  inc_title.style.display = "none";
  mor_title.style.display = "block";

  prv_box.style.display = "none";
  inc_box.style.display = "none";
  mor_box.style.display = "flex";
  console.log("Some info");
});
