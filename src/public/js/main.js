const socket = io();

console.log('mensaje del lado del cliente');

const form = document.querySelector("form");

form.addEventListener("submit", (e) => {
    e.preventDefault();
    const formData = new FormData(form);

    const productList = {
        title: formData.get("title"),
        description: formData.get("description"),
        code: formData.get("code"),
        price: formData.get(Number("price")),
        stock: formData.get(Number("stock")),
        category: formData.get("category"),
        body: formData.get("body")
        };

    socket.emit("form_send", productList);
    form.reset();
});

const forms = document.querySelector('#forms'); // ????

socket.on("forms", (data) => {
    console.log(data);
    
    data.forEach((product) => {
        const li = document.createElement('li');
        li.innerHTML = `
        <p> 
        Title: ${product.title} -
        Body: ${product.body} -
        <button id= "button-${form.id}> Eliminar </button>
        </p>
        `;
        forms.appendChild(li);
    })
    
});

//chat
function enviarMensaje() {
    const mensaje = document.getElementById('mensaje').value;
    const user = 'correoDelUsuario'; //falta implementar

    socket.emit('chat message', { user, message: mensaje });
    return false;
}

socket.on('chat message', (data) => {
    const listaMensajes = document.getElementById('messages');
    const nuevoElemento = document.createElement('li');
    nuevoElemento.textContent = `${data.user}: ${data.message}`;
    listaMensajes.appendChild(nuevoElemento);
});