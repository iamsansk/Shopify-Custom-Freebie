// Create new js Asset file and name it as freebie-atc.js
class atcButton extends HTMLElement {
  constructor() {
    super();
    this.submitForm = this.querySelector('form[action="/cart/add"]');
    this.freebieProduct = this.closest('.freebie_product');
  }
  connectedCallback(event) {
    this.submitForm.addEventListener("submit", this.handleSubmit.bind(this));
  }
  handleSubmit(event) {
    event.preventDefault();
    let formData = {
     'items': [{
      'id': this.submitForm.querySelector("select[name='id'], input[name='id']").value,
      'quantity': this.submitForm.querySelector("input[name='quantity']").value
      }]
    };
    this.freebieProduct?.classList.add('loading');
    fetch(window.Shopify.routes.root + 'cart/add.js', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })
    .then(response => {
      return response.json();
    })
    .then(()=>{
      return fetch('/?sections=cart-drawer,cart-icon-bubble');
    })
    .then(response=>{
      return response.json();
    })
    .then(parsedState => {
      const cartDrawer = document.querySelector('cart-drawer');
      if (cartDrawer) {
        cartDrawer.renderContents({
          sections: parsedState
        });
      }
    })
    .catch((error) => {
      console.error('Error:', error);
    })
    .finally(() => {
      this.freebieProduct?.classList.remove('loading');
    });
  }
}
customElements.define("atc-button", atcButton);
