document.addEventListener('DOMContentLoaded', function () {
    const orderForm = document.getElementById('order-form');
    const thankYouMessage = document.getElementById('thank-you-message');
    const thankYouContent = thankYouMessage?.querySelector('.thank-you-content');
    let tokenNumber = 1;

    // Category icon change
    const categorySelect = document.getElementById('item-category');
    const categoryIcon = document.getElementById('categoryIcon');
    const icons = {
        coffee: '☕',
        breakfast: '🍳',
        lunch: '🍛',
        dessert: '🍨'
    };
    categorySelect.addEventListener('change', function() {
        categoryIcon.textContent = icons[this.value] || '☕';
    });

// Image preview
    const imageInput = document.getElementById('item-image');
    const imagePreview = document.getElementById('imagePreview');
    imageInput.addEventListener('change', function() {
        const file = this.files[0];
        if (file && file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onload = function(e) {
                imagePreview.src = e.target.result;
                imagePreview.style.display = 'block';
            };
            reader.readAsDataURL(file);
        } else {
            imagePreview.src = '';
            imagePreview.style.display = 'none';
        }
    });


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

// Success modal logic
    const addItemForm = document.getElementById('addItemForm');
    const successModal = document.getElementById('successModal');
    const closeSuccessModal = document.getElementById('closeSuccessModal');
    addItemForm.addEventListener('submit', function(e) {
        e.preventDefault();
        // Here you would normally send data to backend
        successModal.classList.add('active');
        addItemForm.reset();
        imagePreview.src = '';
        imagePreview.style.display = 'none';
        categoryIcon.textContent = '☕';
    });
    closeSuccessModal.addEventListener('click', function() {
        successModal.classList.remove('active');
    });
    // Optional: close modal on outside click
    successModal.addEventListener('click', function(e) {
        if (e.target === successModal) {
            successModal.classList.remove('active');
        }
    });
});

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
