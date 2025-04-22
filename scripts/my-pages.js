
    const customerNameElement = document.getElementById('customer-name');
    const customerEmailElement = document.getElementById('customer-email');
    const customerPhoneElement = document.getElementById('customer-phone');
    const customerAddressElement = document.getElementById('customer-address');
    const logoutBtn = document.getElementById('logoutBtn');
    const editBtn = document.getElementById('editBtn');
    const editProfileModal = document.getElementById('editProfileModal');
    const closeModalBtn = document.getElementById('closeModalBtn');
    const saveProfileBtn = document.getElementById('saveProfileBtn');
    const editName = document.getElementById('editName');
    const editEmail = document.getElementById('editEmail');
    const editPhone = document.getElementById('editPhone');
    const editAddress = document.getElementById('editAddress');
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
      
      window.addEventListener('click', (event) => {
        if (event.target === orderHistoryModal) {
          orderHistoryModal.style.display = 'none'; 
        }
      });

    const fetchOrderHistory = async () => {
        const token = localStorage.getItem('token');
      
        if (!token) {
          alert('Du är inte inloggad!');
          window.location.href = 'index.html';
        }
      
        try {
          const response = await axios.get('https://din-backend-url.com/api/orders', {
            headers: { Authorization: `Bearer ${token}` } 
          });
      
          if (response.status === 200) {
            const orders = response.data.orders || [];
            displayOrders(orders); 
            console.error('Något gick fel vid hämtning av orderhistorik.');
            alert('Kunde inte hämta orderhistorik.');
          }
        } catch (error) {
          console.error('Fel vid hämtning av orderhistorik:', error);
          alert('Något gick fel, försök igen senare.');
        }
      };

      const displayOrders = (orders) => {
        const ordersHistoryElement = document.getElementById('orders-history'); 
      
        if (orders.length > 0) {
          
          orders.forEach(order => {
            const orderDiv = document.createElement('div');
            orderDiv.classList.add('order');
            orderDiv.innerHTML = `
              <p><strong>Order ID:</strong> ${order.id}</p>
              <p><strong>Beställningsdatum:</strong> ${new Date(order.date).toLocaleDateString()}</p>
              <p><strong>Totalt pris:</strong> ${order.totalPrice} SEK</p>
            `;
            ordersHistoryElement.appendChild(orderDiv); 
          });
        } else {
         
          ordersHistoryElement.innerHTML = "<p>Inga tidigare beställningar.</p>";
        }
      };
      
      

editBtn.addEventListener('click', () => {
    editProfileModal.style.display = 'block'; 
  });
  
  closeModalBtn.addEventListener('click', () => {
    editProfileModal.style.display = 'none'; 
  });
  
  window.addEventListener('click', (event) => {
    if (event.target === editModal) {
      editProfileModal.style.display = 'none'; 
    }
  });


const token = localStorage.getItem('token');

const fetchCustomerData = async () => {
  if (!token) {
    alert('Du är inte inloggad!');
    window.location.href = 'index.html';
  }


  try {
    const response = await axios.get('https://be-webshop-2025-fe-two.vercel.app/api/users', {
      headers: { Authorization: `Bearer ${token}` },
    });


    const user = response.data.user || {};
    const orders = response.data.orders || [];


    if (customerNameElement) customerNameElement.textContent = user.name;
    if (customerEmailElement) customerEmailElement.textContent = user.email;
    if (customerPhoneElement) customerPhoneElement.textContent = user.phone;
    if (customerAddressElement) customerAddressElement.textContent = user.address;


    if (orders.length > 0) {
      orders.forEach(order => {
        const orderDiv = document.createElement('div');
        orderDiv.classList.add('order');
        orderDiv.innerHTML = `
          <p><strong>Order ID:</strong> ${order.id}</p>
          <p><strong>Beställningsdatum:</strong> ${new Date(order.date).toLocaleDateString()}</p>
          <p><strong>Totalt pris:</strong> ${order.totalPrice} SEK</p>
        `;
        ordersHistoryElement.appendChild(orderDiv);
      });
    } else {
      "<p>Inga tidigare beställningar.</p>";
    }
  } catch (error) {
    console.error('Error fetching user data:', error);
    alert('Något gick fel, försök igen senare.');
  }
};


editBtn.addEventListener('click', () => {
   
    editName.value = customerNameElement.textContent || "Namn";
    editEmail.value = customerEmailElement.textContent || "Email";
    editPhone.value = customerPhoneElement.textContent || "Telefon";
    editAddress.value = customerAddressElement.textContent || "Adress";
 
   
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
      address: editAddress.value,
    };
 
    try {
      const response = await axios.put('https://be-webshop-2025-fe-two.vercel.app/api/users/update', updatedProfile, {
        headers: { Authorization: `Bearer ${token}` },
      });
 
      if (response.status === 200) {
        alert('Profilen har uppdaterats!');
       
       
        customerNameElement.textContent = updatedProfile.name;
        customerEmailElement.textContent = updatedProfile.email;
        customerPhoneElement.textContent = updatedProfile.phone;
        customerAddressElement.textContent = updatedProfile.address;
 
       
        editProfileModal.style.display = "none";
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
 
  document.addEventListener('DOMContentLoaded', fetchCustomerData, fetchOrderHistory)