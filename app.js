const menu = document.querySelector('#mobile-menu')
const menuLinks = document.querySelector('.navbar__menu')

menu.addEventListener('click', function () {
    menu.classList.toggle('is-active');
    menuLinks.classList.toggle('active');
});

const scrollBtn = document.querySelector("#scroll-services");

if (scrollBtn) {
  scrollBtn.addEventListener("click", () => {
    document.querySelector("#services")?.scrollIntoView({ behavior: "smooth" });
  });
}
