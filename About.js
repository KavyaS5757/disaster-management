// Toggle FAQ answers when clicked
const faqItems = document.querySelectorAll('.faq-section .faq');

faqItems.forEach(item => {
    item.addEventListener('click', () => {
        item.classList.toggle('active');
    });
});
