const btn = document.querySelector("#btn");
let year = document.querySelector("#Year");

btn.addEventListener("click", (e) => {
  let ano = 2009;
  const interval = setInterval(() => {
    year.value = ano += 1;
    year.dispatchEvent(new Event("input")); //programatocally trigger a event
    btn.setAttribute("disabled", true);
    if (year.value == 2020) {
      clearInterval(interval);
      btn.disabled = false;
    }
  }, 1000);
});
