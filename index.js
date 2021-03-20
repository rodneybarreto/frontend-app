function newProduct(product) {
  const div = document.createElement('div');
  div.className = 'column is-4';
  div.innerHTML = `
    <div class="card is-shady">
      <div class="card-image">
        <figure class="image is-4by3">
          <img
            src="${product.photo}"
            alt="${product.name}"
            class="modal-button"
          />
        </figure>
      </div>
      <div class="card-content">
        <div class="content product" data-id="${product.id}">
          <div class="product-meta">
            <p class="is-size-4">R$${product.price}</p>
            <p class="is-size-6">Disponível em estoque: 5</p>
            <h4 class="is-size-3 title">${product.name}</h4>
            <p class="subtitle">${product.description}</p>
          </div>
          <div class="field has-addons">
            <div class="control">
              <input class="input" type="text" placeholder="Digite o CEP" />
            </div>
            <div class="control">
              <a class="button button-shipping is-danger" data-id="${product.id}"> Calcular Frete </a>
            </div>
          </div>
          <button class="button button-buy is-info is-fullwidth">Comprar</button>
        </div>
      </div>
    </div>`;
  return div;
}

function calculateShipping(id, zipcode) {
  fetch('http://localhost:3001/shipping/'+ zipcode)
    .then((data) => {
      if (data.ok) {
        return data.json();
      }
      throw data.statusText;
    })
    .then((data) => {
      swal('Frete', `O frete é: R$ ${data.shippingRate}`, 'success');
    })
    .catch((err) => {
      swal('Erro', 'Erro ao consultar frete', 'error');
      console.error(err);
    });
}

document.addEventListener('DOMContentLoaded', function () {
  const products = document.querySelector('.pets');

  fetch('http://localhost:8081/products')
    .then((data) => {
      if (data.ok) {
        return data.json();
      }
      throw data.statusText;
    })
    .then((data) => {
      if (data) {
        data.forEach((product) => {
          products.appendChild(newProduct(product));
        });

        document.querySelectorAll('.button-shipping').forEach((btn) => {
          btn.addEventListener('click', (e) => {
            const id = e.target.getAttribute('data-id');
            const zipcode = document.querySelector(
              `.product[data-id="${id}"] input`
            ).value;
            calculateShipping(id, zipcode);
          });
        });

        document.querySelectorAll('.button-buy').forEach((btn) => {
            btn.addEventListener('click', (e) => {
                swal('Compra de Produto', 'Sua compra foi realizada com sucesso', 'success');
            });
        });
      }
    })
    .catch((err) => {
      swal('Erro', 'Erro ao listar os produtos', 'error');
      console.error(err);
    });
});
