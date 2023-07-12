const checkoutForm = document.getElementById('checkout-form');

checkoutForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const address = document.getElementById('address').value;

    const order = {
        name,
        email,
        address
    };

    fetch('/checkout', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(order)
    })
        .then((response) => response.json())
        .then((data) => {
            console.log('Order placed:', data.message);
            alert('Order placed successfully!');
        })
        .catch((error) => {
            console.error('Failed to place order:', error);
            alert('Failed to place order. Please try again later.');
        });
});
