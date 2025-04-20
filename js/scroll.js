const dots = document.querySelectorAll('.dot');

dots.forEach(dot => {
   dot.addEventListener('click', function() {
     const targetId = this.getAttribute('data-target');
     const targetSection = document.querySelector(targetId);

     targetSection.scrollIntoView({
       behavior: 'smooth'
     });
   });
 });
