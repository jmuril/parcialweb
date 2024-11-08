document.addEventListener('DOMContentLoaded', function() {

    // ========== Manejo de la Página del Menú (menu.html) ==========

    const menuForm = document.getElementById('menu-form');
    if (menuForm) {
        // Recuperar el contador del carrito del localStorage si ya se seleccionaron productos
        let cartCount = JSON.parse(localStorage.getItem('cartCount')) || 0;
        document.getElementById('cart-count').innerText = cartCount;

        // Agregar evento para cada botón "Agregar al carrito"
        document.querySelectorAll('.add-to-cart').forEach(button => {
            button.addEventListener('click', function() {
                // Capturar información del producto
                const nombreProducto = this.dataset.product;
                const precioProducto = this.dataset.price;
                const cantidadInput = this.closest('.product-card').querySelector('input[type="number"]').value;

                const producto = {
                    nombre: nombreProducto,
                    precio: parseInt(precioProducto),
                    cantidad: parseInt(cantidadInput)
                };

                // Almacenar en el localStorage
                let productosSeleccionados = JSON.parse(localStorage.getItem('productosSeleccionados')) || [];
                productosSeleccionados.push(producto);
                localStorage.setItem('productosSeleccionados', JSON.stringify(productosSeleccionados));

                // Actualizar contador del carrito
                cartCount += 1;
                document.getElementById('cart-count').innerText = cartCount;
                localStorage.setItem('cartCount', JSON.stringify(cartCount)); // Guardar el contador en el localStorage
            });
        });

        // Redirigir al hacer clic en el ícono del carrito
        const cartIcon = document.getElementById('shopping-cart-icon');
        if (cartIcon) {
            cartIcon.addEventListener('click', function() {
                window.location.href = '/compra/compras.html';  // Redirigir a compras.html
            });
        }

        // Vaciar el carrito al hacer clic en el ícono de la casita, pero solo si se confirma
        const homeIcon = document.querySelector('.icon-home');
        if (homeIcon) {
            homeIcon.addEventListener('click', function(e) {
                e.preventDefault();  // Prevenir la redirección

                const confirmacion = confirm('¿Estás seguro de que quieres vaciar el carrito de compras?');
                if (confirmacion) {
                    // Vaciar el carrito
                    localStorage.removeItem('productosSeleccionados');
                    localStorage.setItem('cartCount', '0'); // Restablecer el contador en localStorage
                    alert('El carrito ha sido vaciado.');
                    document.getElementById('cart-count').innerText = '0';  // Restablecer el contador del carrito en la interfaz
                }
            });
        }
    }

    // ========== Manejo de la Página de Compras (compras.html) ==========

    const resumenItems = document.getElementById('resumen-items');
    const totalPriceElement = document.getElementById('total-price');

    if (resumenItems && totalPriceElement) {
        // Recuperar los productos seleccionados desde el localStorage
        const productosSeleccionados = JSON.parse(localStorage.getItem('productosSeleccionados')) || [];

        let total = 0;

        if (productosSeleccionados.length > 0) {
            productosSeleccionados.forEach(producto => {
                const itemDiv = document.createElement('div');
                itemDiv.classList.add('resumen-item');
                itemDiv.innerHTML = `
                    <span>${producto.nombre} x${producto.cantidad}</span>
                    <span>${producto.precio.toLocaleString('es-CO')} COL</span>
                `;
                resumenItems.appendChild(itemDiv);

                // Calcular el total
                total += producto.precio * producto.cantidad;
            });

            // Mostrar el total
            totalPriceElement.innerText = total.toLocaleString('es-CO') + ' COL';
        } else {
            resumenItems.innerHTML = '<p>No se seleccionaron productos.</p>';
        }

        // Confirmar compra y limpiar el carrito
        const confirmarCompraBtn = document.getElementById('confirmar-compra');
        confirmarCompraBtn.addEventListener('click', function() {
            alert('¡Compra confirmada!');
            localStorage.removeItem('productosSeleccionados'); // Limpiar el carrito después de la compra
            localStorage.setItem('cartCount', '0'); // Reiniciar el contador de productos
        });
    }
});
