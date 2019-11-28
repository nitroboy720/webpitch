//Script for burger button fonctionality
document.addEventListener('DOMContentLoaded', () => {
    const navbarBurger = document.querySelector('.navbar-burger');
    const menu = document.getElementById(navbarBurger.dataset.target);
    navbarBurger.addEventListener('click', () => {
        navbarBurger.classList.toggle('is-active');
        menu.classList.toggle('is-active');
    });
    menu.addEventListener("click", ()=>{
        navbarBurger.classList.toggle('is-active');
        menu.classList.toggle('is-active');
    });

    (document.querySelectorAll('.notification .delete') || []).forEach(($delete) => {
        $notification = $delete.parentNode;
        $delete.addEventListener('click', () => {
          $notification.parentNode.removeChild($notification);
        });
      });
});