export default class Cart {
  cartItems = []; // [product: {...}, count: N]

  constructor(cartIcon) {
    this.cartIcon = cartIcon;
  }

  addProduct(product) {
    if (product){
      let cartItem = this.cartItems.find(item => item.product === product);
      if (cartItem){
        cartItem.count++
      }else{
        cartItem = {};
        cartItem.product = product;
        cartItem.count = 1;
        this.cartItems.push(cartItem);
      }
      console.log(this.cartItems);
      this.onProductUpdate(this.cartItems);
    }else{
      console.log("Передан пустой объект!")
    }
  }

  updateProductCount(productId, amount) {
    let cartItem = this.cartItems.find(item => item.product.id === productId);
    if (cartItem){
      // if (cartItem.count){
      cartItem.count += amount;
      if (!cartItem.count){
        this.cartItems.splice([(this.cartItems.indexOf(cartItem))], 1);
        this.isEmpty();
      }
      this.onProductUpdate(cartItem);
      // }else{
        // console.log("Закончилось");
      // }
      console.log(this.cartItems);
    }else{
      console.log("Нет объекта");
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
    this.cartItems.forEach(item => totalPrice += item.product.price * item.count);
    return (totalPrice);
  }

  onProductUpdate(cartItem) {
    // реализуем в следующей задаче

    this.cartIcon.update(this);
  }
}
