const customerNameElement = document.getElementById('customer-name');
const customerEmailElement = document.getElementById('customer-email');
const customerPhoneElement = document.getElementById('customer-phone');
const logoutBtn = document.getElementById('logoutBtn');
const editBtn = document.getElementById('editBtn');
const editProfileModal = document.getElementById('editProfileModal');
const closeModalBtn = document.getElementById('closeModalBtn');
const saveProfileBtn = document.getElementById('saveProfileBtn');
const editName = document.getElementById('editName');
const editEmail = document.getElementById('editEmail');
const editPhone = document.getElementById('editPhone');
const orderHistoryBtn = document.getElementById('orderHistoryBtn');
const orderHistoryModal = document.getElementById('orderHistoryModal');
const closeOrderHistoryModal = document.getElementById('closeOrderHistoryModal');
const orderHistoryList = document.getElementById('orderHistoryList');

orderHistoryBtn.addEventListener('click', () => {
    orderHistoryModal.style.display = 'block';
    fetchOrderHistory();
});

closeOrderHistoryModal.addEventListener('click', () => {
    orderHistoryModal.style.display = 'none';
});

const fetchOrderHistory = async () => {
    const token = localStorage.getItem('token');
    console.log('Token:', token);

    if (!token) {
        alert('Du är inte inloggad!');
        window.location.href = 'index.html';
    }

    try {
        const response = await axios.get('https://be-webshop-2025-fe-two.vercel.app/api/orders/myOrders', {
            headers: { Authorization: `Bearer ${token}` }
        });

        console.log('API-svar:', response.data); 

        if (response.status === 200) {
            const orders = response.data.orders || [];
            displayOrders(orders);  
        }
    } catch (error) {
        console.error('Error fetching orderhistory:', error);
        alert('Något gick fel, försök igen senare.');
    }
};

const displayOrders = (orders) => {
    const orderHistoryList = document.getElementById('orderHistoryList');
    orderHistoryList.innerHTML = '';  

    if (orders.length > 0) {
        orders.forEach(order => {
            const orderDiv = document.createElement('div');
            orderDiv.classList.add('order');

            const orderId = document.createElement('p');
            orderId.textContent = `Order ID: ${order._id || 'Ej tillgängligt'}`; 
            orderDiv.appendChild(orderId);

            const orderDate = document.createElement('p');
            orderDate.textContent = `Beställningsdatum: ${new Date(order.createdAt).toLocaleDateString() || 'Ej tillgängligt'}`;
            orderDiv.appendChild(orderDate);

            const orderPrice = document.createElement('p');
            orderPrice.textContent = `Totalt pris: ${order.total || 'Ej tillgängligt'} SEK`;
            orderDiv.appendChild(orderPrice);

            const productsList = document.createElement('div');
            order.products.forEach(product => {
                const productDiv = document.createElement('div');
                
                const productName = document.createElement('p');
                productName.textContent = `Produktnamn: ${product.name || 'Ej tillgängligt'}`;
                productDiv.appendChild(productName);
                
                const productPrice = document.createElement('p');
                productPrice.textContent = `Pris: ${product.price || 'Ej tillgängligt'} SEK`;
                productDiv.appendChild(productPrice);
                
                const productQuantity = document.createElement('p');
                productQuantity.textContent = `Antal: ${product.quantity || 'Ej tillgängligt'}`;
                productDiv.appendChild(productQuantity);

                productsList.appendChild(productDiv);
            });

            orderDiv.appendChild(productsList);

            orderHistoryList.appendChild(orderDiv);
        });
    } else {
        const noOrdersMessage = document.createElement('p');
        noOrdersMessage.textContent = "Inga tidigare beställningar.";
        orderHistoryList.appendChild(noOrdersMessage);
    }
};
const fetchCustomerData = async () => {
    const token = localStorage.getItem('token');

    if (!token) {
        alert('Du är inte inloggad!');
        window.location.href = 'index.html';
    }

    try {
        const response = await axios.get('https://be-webshop-2025-fe-two.vercel.app/api/users', {
            headers: { Authorization: `Bearer ${token}` },
        });

        const user = response.data.user || {};

        if (customerNameElement) 
            customerNameElement.textContent = user.name || "Namn saknas";
        if (customerEmailElement) 
            customerEmailElement.textContent = user.email || "Email saknas";
        if (customerPhoneElement) 
            customerPhoneElement.textContent = user.phone || "Telefon saknas";

    } catch (error) {
        console.error('Error fetching user data:', error);
        alert('Något gick fel, försök igen senare.');
    }
};

editBtn.addEventListener('click', () => {
    
    editName.value = customerNameElement.textContent.trim() || "";
    editEmail.value = customerEmailElement.textContent.trim() || "";
    editPhone.value = customerPhoneElement.textContent.trim() || "";

    editName.placeholder = editName.value === "" ? "Namn..." : "";
    editEmail.placeholder = editEmail.value === "" ? "Email..." : "";
    editPhone.placeholder = editPhone.value === "" ? "Telefon..." : "";

    editProfileModal.style.display = "block";
});
closeModalBtn.addEventListener('click', () => {
    editProfileModal.style.display = "none";
});

saveProfileBtn.addEventListener('click', async () => {
    const updatedProfile = {
        name: editName.value,
        email: editEmail.value,
        phone: editPhone.value,
    };

    const token = localStorage.getItem('token');

    try {
        const response = await axios.put('https://be-webshop-2025-fe-two.vercel.app/api/users/update', updatedProfile, {
            headers: { Authorization: `Bearer ${token}` },
        });

        if (response.status === 200) {
            alert('Profilen har uppdaterats!');

            customerNameElement.textContent = updatedProfile.name;
            customerEmailElement.textContent = updatedProfile.email;
            customerPhoneElement.textContent = updatedProfile.phone;

            editProfileModal.style.display = "none";
            
            localStorage.setItem('userName', updatedProfile.name);
            localStorage.setItem('userEmail', updatedProfile.email);
            localStorage.setItem('userPhone', updatedProfile.phone);

            console.log('User info saved to localStorage: ', updatedProfile);
        }
    } catch (error) {
        console.error('Error updating profile:', error);
        alert('Något gick fel, försök igen senare.');
    }
});


logoutBtn.addEventListener('click', () => {
    localStorage.removeItem('token');
    window.location.href = 'index.html';
});

document.addEventListener('DOMContentLoaded', () => {
    fetchCustomerData();
    fetchOrderHistory();
});
