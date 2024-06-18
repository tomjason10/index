// Initially hide all tab content
document.querySelectorAll('.tabcontent').forEach(tab => {
    tab.style.display = 'none';
});

function openTab(evt, tabName) {
    var i, tabcontent, tablinks;

    // Hide all tab content
    tabcontent = document.querySelectorAll('.tabcontent');
    tabcontent.forEach(tab => {
        tab.style.display = 'none';
    });

    // Deactivate all tab links
    tablinks = document.querySelectorAll('.tablinks');
    tablinks.forEach(tablink => {
        tablink.classList.remove('active');
    });

    // Show the selected tab content
    document.getElementById(tabName).style.display = 'block';

    // Activate the clicked tab link
    evt.currentTarget.classList.add('active');

    // Load menu content for the selected category (if not already loaded)
    loadMenuContent(tabName);
}

function loadMenuContent(tabName) {
    var tabContent = document.getElementById(tabName);

    // If the tab content is already loaded, do nothing
    if (tabContent.innerHTML.trim() !== '') {
        return;
    }

    // Load menu content based on tabName (you can fetch data from a server here)
    switch (tabName) {
        case 'appetizers':
            tabContent.innerHTML = `
                <ul>
                    <li>
                    <input type="checkbox" class="item-checkbox" value="15" onclick="updateOrderSummary()">
                    <img src="appetizer-avocadoseafood.jpeg" height="150px" width="150px" alt="Appetizer 1" class="item-image">
                    <div class="item-details">
                        <h3>Avocado Seafood $15.00</h3>
                        <p>Description: slice avocado topped with crabmeat sprinkled with cilantro and red chili peppers.</p>
                        <input type="hidden" class="item-price" value="5"> <!-- Hidden input for item price -->
                    </div>
                    <input type="number" class="quantity" value="1">
                    </li>
                    <!-- Add more appetizers -->
                </ul>`;
            break;
        case 'maincourses':
            tabContent.innerHTML = `
                <ul>
                    <li>
                        <!-- Main Course 1 content -->
                    </li>
                    <!-- Add more main courses -->
                </ul>`;
            break;
        case 'desserts':
            tabContent.innerHTML = `
                <ul>
                    <li>
                        <!-- Dessert 1 content -->
                    </li>
                    <!-- Add more desserts -->
                </ul>`;
            break;
    }
}

function updateOrderSummary() {
    var orderList = document.getElementById('order-list');
    var total = 0;

    // Clear previous order list
    orderList.innerHTML = '';

    // Iterate over checked items
    var checkboxes = document.querySelectorAll('.item-checkbox:checked');
    checkboxes.forEach(function(checkbox) {
        var listItem = checkbox.parentElement;
        var itemName = listItem.querySelector('.item-details h3').textContent;
        var itemPrice = parseFloat(checkbox.value);
        var quantity = parseInt(listItem.querySelector('.quantity').value);
        var subtotal = itemPrice * quantity;
        total += subtotal;

        // Create list item for order summary
        var li = document.createElement('li');
        li.textContent = itemName + ' x ' + quantity + ' - $' + subtotal.toFixed(2);
        orderList.appendChild(li);
    });

    // Update total
    document.getElementById('total').innerText = 'Total: $' + total.toFixed(2);
}

// Update order summary whenever quantity changes
document.querySelectorAll('.quantity').forEach(function(input) {
    input.addEventListener('change', updateOrderSummary);
});
// Function to place the order
function placeOrder() {
    var orderList = document.getElementById('order-list');

    // Get the list of items from the order summary
    var items = [];
    orderList.querySelectorAll('li').forEach(function(li) {
        items.push(li.textContent.trim());
    });

    alert("Your order has been placed:\n" + items.join("\n"));
}
