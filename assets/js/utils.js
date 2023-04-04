window.addEventListener("scroll", () => {
  const btnScroll = document.getElementById("scroll-top");
  if (document.documentElement.scrollTop <= 150) {
    btnScroll.style.display = "none";
  } else {
    btnScroll.style.display = "block";
    btnScroll.style.display = "flex";
  }
});

const btnScrollTop = document.getElementById("scroll-top");
if (btnScrollTop) {
  btnScrollTop.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
}

const btnGoBack = document.getElementById("btn-goBack");
if (btnGoBack) {
  btnGoBack.addEventListener("click", () => {
    window.history.back();
  });
}
