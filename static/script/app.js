/* Variables Price */
const imageProduct = document.getElementById('image-product')
const radios = document.getElementsByName('coupons')
const noneCoupons = document.getElementById('none-coupons')
const withCoupons = document.getElementById('with-coupons')
const valueCoupon = document.getElementById('value-coupon')
const discount = document.getElementById('discount')
const price = document.getElementById('price')
const shippingPrice = document.getElementById('shipping-price')
const totalPrice = document.getElementById('total-price')

/* Function Checkout */
const getCheckout = () => {
  const request = fetch('/api/checkouts/6544', {
    method: 'get'
  })
  request.then(response => {
    response.json()
    .then(data => {
      const product = data.product
      const checkout = data.checkout
      imageProduct.setAttribute('src', product.image)
      imageProduct.setAttribute('alt', product.title)

      price.innerText = `R$ ${product.price}`

      shippingPrice.innerText = `R$ ${checkout.shippingPrice}`
      totalPrice.innerText = `R$ ${checkout.totalPrice}` 
      
      checkout.availableCoupons.map(availableCoupon => {
        withCoupons.labels[0].innerText = availableCoupon.title
        valueCoupon.innerText = `- R$ ${availableCoupon.discount}`
        discount.innerText = `- R$ ${availableCoupon.discount}`
        
        withCoupons.addEventListener('change', () => {
          if ( withCoupons.checked === true ) {
            totalPrice.innerText = `R$ ${checkout.totalPrice - availableCoupon.discount}`
            valueCoupon.removeAttribute('hidden')
            discount.removeAttribute('hidden')
          }
          if (noneCoupons.checked === true) {
            valueCoupon.getAttribute('hidden')
            discount.getAttribute('hidden')
          }
        })
      })
    })
  })
}
getCheckout()


/* Modal */
function initModalCanceled() {
  const btnOpen = document.querySelector('#button-cancel-offer');
  const btnClose = document.querySelector('.modal-canceled .close');
  const containerModal = document.querySelector('[data-modal="modal-canceled"]');

  if(btnOpen && btnClose && containerModal) {
    function openModal(event) {
      event.preventDefault();
      containerModal.classList.add('ativo');
    }

    function closeModal(event) {
      event.preventDefault();
      containerModal.classList.remove('ativo');
    }

    function clickClose(event) {
      if(event.target === this) {
        closeModal(event);
      }
    }

    btnOpen.addEventListener('click', openModal);
    btnClose.addEventListener('click', closeModal);
    containerModal.addEventListener('click', clickClose);
  }
}

function initModalConfirmed() {
  const btnOpen = document.querySelector('#button-confirm-offer');
  const btnClose = document.querySelector('.modal-confirmed .close');
  const containerModal = document.querySelector('[data-modal="modal-confirmed"]');

  if(btnOpen && btnClose && containerModal) {
    function openModal(event) {
      event.preventDefault();
      containerModal.classList.add('ativo');
    }

    function closeModal(event) {
      event.preventDefault();
      containerModal.classList.remove('ativo');
    }

    function clickClose(event) {
      if(event.target === this) {
        closeModal(event);
      }
    }

    btnOpen.addEventListener('click', openModal);
    btnClose.addEventListener('click', closeModal);
    containerModal.addEventListener('click', clickClose);
  }
}
initModalCanceled();
initModalConfirmed();
