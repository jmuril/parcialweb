document.addEventListener('DOMContentLoaded', function() {
    // Redirigir al hacer clic en el ícono del carrito (en menu.html)
    const cartIcon = document.getElementById('shopping-cart-icon');
    if (cartIcon) {
        cartIcon.addEventListener('click', function() {
            window.location.href = '/compra/resumen.html';
        });
    }

    // Manejar el formulario de productos en menu.html
    const menuForm = document.getElementById('menu-form');
    if (menuForm) {
        menuForm.addEventListener('submit', function(event) {
            event.preventDefault();

            const productosSeleccionados = [];
            const checkboxes = document.querySelectorAll('input[name="productos"]:checked');

            checkboxes.forEach(checkbox => {
                const item = checkbox.closest('.product-card');
                const nombre = item.querySelector('h3').innerText.trim();
                const precio = item.querySelector('.price').innerText.trim();
                const cantidadInput = item.querySelector('input[type="number"]');
                const cantidad = parseInt(cantidadInput.value, 10) || 1;

                productosSeleccionados.push({ nombre, precio, cantidad });
            });

            // Almacenar productos en el almacenamiento local (localStorage)
            localStorage.setItem('productosSeleccionados', JSON.stringify(productosSeleccionados));

            // Redirigir a la página de resumen del pedido
            window.location.href = '/compra/resumen.html';
        });
    }

    // Cargar los productos seleccionados en resumen.html
    const resumenItems = document.getElementById('resumen-items');
    const totalPriceElement = document.getElementById('total-price');
    if (resumenItems && totalPriceElement) {
        const productosSeleccionados = JSON.parse(localStorage.getItem('productosSeleccionados')) || [];

        let total = 0;

        if (productosSeleccionados.length > 0) {
            productosSeleccionados.forEach(producto => {
                const itemDiv = document.createElement('div');
                itemDiv.classList.add('resumen-item');
                itemDiv.innerHTML = `
                    <span>${producto.nombre} x${producto.cantidad}</span>
                    <span>${producto.precio}</span>
                `;
                resumenItems.appendChild(itemDiv);

                const precioNum = parseInt(producto.precio.replace('.', '').replace(' COL', ''));
                total += precioNum * producto.cantidad;
            });

            // Mostrar el total calculado
            totalPriceElement.innerText = total.toLocaleString('es-CO') + ' COL';
        } else {
            console.log("No se seleccionaron productos.");
        }

        // Confirmar la compra en resumen.html
        const confirmarCompraBtn = document.getElementById('confirmar-compra');
        if (confirmarCompraBtn) {
            confirmarCompraBtn.addEventListener('click', () => {
                alert('¡Compra confirmada!');
                localStorage.removeItem('productosSeleccionados'); // Limpiar el carrito después de la compra
            });
        } else {
            console.error("No se encontró el botón con el ID 'confirmar-compra'");
        }
    }
});
