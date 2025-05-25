document.addEventListener('DOMContentLoaded', function () {
    const orderForm = document.getElementById('order-form');
    const thankYouMessage = document.getElementById('thank-you-message');
    const thankYouContent = thankYouMessage?.querySelector('.thank-you-content');
    let tokenNumber = 1;

    if (orderForm) {
        orderForm.addEventListener('submit', function (e) {
            e.preventDefault();

            // Get selected menu items
            const checkedItems = Array.from(orderForm.querySelectorAll('input[type="checkbox"]:checked'))
                .map(cb => cb.value);

            // Optionally, you can show selected items in the thank you message
            if (thankYouContent) {
                thankYouContent.innerHTML = `
                    <h3>Thank you for your order,</h3>
                    <p>Your Token Number is ${tokenNumber++}. Please wait for your order.</p>
                    <p>Items: ${checkedItems.join(', ') || 'None selected'}</p>
                    <a href="#menu" class="btn" id="close-thank-you">One more plate??</a>
                `;
            }

            // Show thank you modal
            thankYouMessage.style.opacity = '1';
            thankYouMessage.style.pointerEvents = 'auto';

            // Close modal on button click
            thankYouMessage.querySelector('#close-thank-you').onclick = function () {
                thankYouMessage.style.opacity = '0';
                thankYouMessage.style.pointerEvents = 'none';
            };
        });
    }

    if (thankYouMessage) {
        const closeModalBtn = document.getElementById('close-modal-btn');
        if (closeModalBtn) {
            closeModalBtn.onclick = function () {
                thankYouMessage.style.opacity = '0';
                thankYouMessage.style.pointerEvents = 'none';
            };
        }
    }
});