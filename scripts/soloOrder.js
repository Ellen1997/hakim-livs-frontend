let renderOrderDetails = async () => {
  let orderDetailsContainer = document.querySelector("#order-details-container");
  const orderId = window.sessionStorage.getItem("orderId");
  if (!orderId) {
    console.error("Ingen orderId hittades i sessionStorage.");
    return;
  }

  try {
    const response = await axios.get(`https://hakim-livs-backend.vercel.app/api/orders/${orderId}`);
    const order = response.data;

    
    orderDetailsContainer.innerHTML = `
      <h2>Orderdetaljer</h2>
      <p><strong>Kundnamn:</strong> ${order.user.userId.username}</p>
      <p><strong>Email:</strong> ${order.user.email}</p>
      <p><strong>Telefonnummer:</strong> ${order.user.mobileNumber}</p>
      <p><strong>Orderstatus:</strong> ${order.status}</p>
      <p><strong>Totalsumma:</strong> ${order.total} kr</p>
      <p><strong>Skapad:</strong> ${new Date(order.createdAt).toLocaleString()}</p>

      <h3>Produkter:</h3>
      ${order.products.map(product => `
        <div>
          <p><strong>Produktnamn:</strong> ${product.name}</p>
          <p><strong>Pris:</strong> ${product.price} kr</p>
          <p><strong>Antal:</strong> ${product.quantity}</p>
          <p><strong>Produkt beskrivning: </strong> ${product.productId ? product.productId.description : 'Ingen beskrivning tillgänglig'} </p>
          <img src="${product.productId.img}" alt="${product.name}" style="width: 100px; height: auto;" />
        </div>
      `).join('')}
    `;
  } catch (error) {
    console.error("Något gick fel:", error);
  }
};
console.log(productId);

renderOrderDetails();