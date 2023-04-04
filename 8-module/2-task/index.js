import createElement from '../../assets/lib/create-element.js';
import ProductCard from '../../6-module/2-task/index.js';

export default class ProductGrid {
  allProducts = [];
  products = [];
  elem = null;
  constructor(products) {
    this.allProducts = this.products = products;

    this.filters = {};

    this.#render();
  }

  #render(){
    this.elem = createElement(`
      <div class="products-grid">
      <div class="products-grid__inner">
      </div>
    </div>
    `)

    let productsGridInner = this.elem.querySelector('.products-grid__inner');

    for (let card of this.products){
      let productCard = new ProductCard(card);
      productsGridInner.append(productCard.elem);
    }
  }

  #renderWithFilter = () =>{
    let productsGridInner = this.elem.querySelector('.products-grid__inner');
    productsGridInner.innerHTML = '';

    if (this.filters.noNuts){
      this.products = this.products.filter(item => 'nuts' in item === false || item.nuts === false);
    }
    if(this.filters.vegeterianOnly){
      this.products = this.products.filter(item => 'vegeterian' in item || item.vegeterian === true);
    }
    if(this.filters.maxSpiciness < 4){
      this.products = this.products.filter(item => item.spiciness <= this.filters.maxSpiciness);
    }
    if(this.filters.category){
      this.products = this.products.filter(item =>  item.category === this.filters.category);
    }

    // console.log(this.products[0].nuts)
    // this.products = this.products.filter(item => (item.nuts !== this.filters.noNuts || 'nuts' in item === false) &&
    //                                              ('vegeterian' in item === false || (item.vegeterian === this.filters.vegeterianOnly && 'vegeterian' in item))
    //                                              );

    for (let card of this.products){
      let productCard = new ProductCard(card);
      productsGridInner.append(productCard.elem);
    }
  }

  updateFilter(filters){
    
    this.products = this.allProducts;
    
    Object.assign(this.filters, filters);

    this.#renderWithFilter();
    
    // alert(filters)
    console.log(this.filters);
  }
}