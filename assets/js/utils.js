// window.addEventListener("scroll", () => {
//   const btnScroll = document.getElementsByClassName("scroll-top");
//   if (document.documentElement.scrollTop <= 450) {
//     btnScroll.style.display = "none";
//   } else {
//     btnScroll.style.display = "block";
//     btnScroll.style.display = "flex";
//   }
// });
function handleScrollTop() {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}
function goBack() {
  window.history.back();
}
