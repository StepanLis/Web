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


    for (let card of this.products){
      let productCard = new ProductCard(card);
      productsGridInner.append(productCard.elem);
    }
  }

  updateFilter(filters){
    
    this.products = this.allProducts;
    
    if (filters.noNuts){
      this.filters.noNuts = filters.noNuts;
    }else if (filters.noNuts === false){
      this.filters.noNuts = false;
    } 
    
    if (filters.vegeterianOnly){
      this.filters.vegeterianOnly = filters.vegeterianOnly;
    }else if (filters.vegeterianOnly === false){
      this.filters.vegeterianOnly = false;
    } 
    
    if (filters.maxSpiciness){
      this.filters.maxSpiciness = filters.maxSpiciness;
    } else if (filters.maxSpiciness === 4){
      this.filters.maxSpiciness = 4;
    }

    if (filters.category){
      this.filters.category = filters.category;
    }else if (filters.category === ""){
      this.filters.category = "";
    }


    this.#renderWithFilter();
    
    // alert(filters)
    console.log(this.filters);
  }
}