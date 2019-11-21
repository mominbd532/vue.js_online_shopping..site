new Vue({
    el: '#app',
    data: {
        isShowingCart: true,
        cart: {
          items: []
        },
        products: [
            {
                id: 1,
                name: 'MacBook Pro (15 inch)',
                description: 'This laptop has a super crisp Retina display. Yes, we know that it\'s overpriced...',
                price: 2999,
                inStock: 50
            },
            {
                id: 2,
                name: 'Samsung Galaxy Note 7',
                description: 'Unlike the overpriced MacBook Pro, we\'re selling this one a bit cheap, as we heard it might explode...',
                price: 299,
                inStock: 755
            },
            {
                id: 3,
                name: 'HP Officejet 5740 e-All-in-One-printer',
                description: 'This one might not last for so long, but hey, printers never work anyways, right?',
                price: 149,
                inStock: 5
            },
            {
                id: 4,
                name: 'iPhone 7 cover',
                description: 'Having problems keeping a hold of that phone, huh? Ever considered not dropping it in the first place?',
                price: 49,
                inStock: 42
            },
            {
                id: 5,
                name: 'iPad Pro (9.7 inch)',
                description: 'We heard it\'s supposed to be pretty good. At least that\'s what people say.',
                price: 599,
                inStock: 0
            },
            {
                id: 6,
                name: 'OnePlus 3 cover',
                description: 'Does your phone spend most of its time on the ground? This cheap piece of plastic is the solution!',
                price: 19,
                inStock: 81
            }
        ]
    },

    methods:{
        addProductToCart: function (product) {

            var exists = this.cart.items.some(function (cartItem) {
                return product.id == cartItem.product.id
            });
            if(!exists){
                this.cart.items.push({
                    product: product,
                    quantity:1,
                    product_id: product.id,
                });
            }
            else {
                var cartDara = this.cart.items;
                var newArr = this.cart.items.map(function (val, index) {
                    if (product.id == val.product.id) {
                        cartDara[index].quantity += 1;

                    }
                })
            }


            product.inStock--;
        },
        inCreaseProductQuantity: function (cartItem) {
            cartItem.quantity++;
            cartItem.product.inStock--;
        },
        deCreaseProductQuantity: function (cartItem) {
            cartItem.quantity--;
            cartItem.product.inStock++;
            if(cartItem.quantity==0){
                this.removeCartItem(cartItem);
            }
        },
        removeCartItem:function (cartItem) {
            var index= this.cart.items.indexOf(cartItem);
            if(index !== -1){
                this.cart.items.splice(index,1);
            }
        }
    },
    computed: {
        cartTotal: function () {
            var total= 0;
            this.cart.items.forEach(function (item) {
                total += item.quantity * item.product.price
            });
            return total;
        },
        taxAmount: function () {
            return (this.cartTotal * 10)/100;
        }
    }
});