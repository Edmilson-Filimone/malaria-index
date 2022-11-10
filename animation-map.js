function animateMap(buttonId, inputRangeID){
const btn = document.querySelector(`${buttonId}`);
let year = document.querySelector(`${inputRangeID}`);

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
}

animateMap("#btn_a", "#Year_a")
animateMap("#btn_c", "#Year_c")
animateMap("#btn_e", "#Year_e")