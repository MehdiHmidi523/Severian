document.addEventListener('DOMContentLoaded', function () {
    const sections = {
      home: () => location.reload(),
      about: () => scrollToElement('#row1'),
      services: () => scrollToElement('#row2'),
      products: () => scrollToElement('#row3'),
      careers: () => scrollToElement('#row4'),
      contact: () => scrollToElement('#contactForm')
    };
  
    function scrollToElement(elementId) {
      $('html, body').animate({
        scrollTop: $(elementId).offset().top
      }, 1200);
    }
  
    Object.keys(sections).forEach(sectionId => {
      const element = document.getElementById(sectionId);
      element.addEventListener('click', sections[sectionId]);
    });
  });
