export default class Cart {
  cartItems = []; // [product: {...}, count: N]

  constructor(cartIcon) {
    this.cartIcon = cartIcon;
  }

  addProduct(product) {
    if (product){
      if (this.cartItems.includes(product)){
        this.cartItems.find(item => item.id === product.id).count++
      }else{
        product.count = 1;
        this.cartItems.push(product);
      }
      console.log(this.cartItems);
      this.onProductUpdate(this.cartItems.find(item => item.id ===product.id));
    }else{
      console.log("ПУсто!")
    }
  }

  updateProductCount(productId, amount) {
    let cartItem = this.cartItems.find(item => item.id === productId);
    if (cartItem){
      if (cartItem.count){
        cartItem.count += amount;
        this.onProductUpdate(this.cartItems.find(item => item.id === productId));
        if (!cartItem.count){
          this.cartItems.splice([(this.cartItems.indexOf(cartItem))], 1);
          if (this.isEmpty()){
            // document.querySelector(".cart-icon__inner").remove();
            document.querySelector(".cart-icon").classList.remove("cart-icon_visible");
          }
        }
      }else{
        console.log("Закончилось");
      }
      
      
      console.log(this.cartItems);
    }else{
      console.log("Нету");
    }
    
    
  }

  isEmpty() {
    return this.cartItems.length === 0;
  }

  getTotalCount() {
    let totalCount = 0;
    this.cartItems.forEach(item => totalCount += item.count);
    return(totalCount);

  }

  getTotalPrice() {
    let totalPrice = 0;
    this.cartItems.forEach(item => totalPrice += item.price * item.count);
    return (totalPrice);
  }

  onProductUpdate(cartItem) {
    // реализуем в следующей задаче

    this.cartIcon.update(this);
  }
}
