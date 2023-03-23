import createElement from '../../assets/lib/create-element.js';

export default class RibbonMenu {
  elem = null;
  #categories = [];
  #arrowRight = null;
  #arrowLeft = null;
  #ribbonInner = null;
  #scrollRight = 0;
  #ribon = null;
  constructor(categories) {
    this.#categories = categories;
    this.#render();
    this.#arrowLeft = this.elem.querySelector('.ribbon__arrow_left');
    this.#arrowRight = this.elem.querySelector('.ribbon__arrow_right');
    this.#ribbonInner = this.elem.querySelector('.ribbon__inner');
    this.#ribon = this.elem.closest('.ribbon');

    this.elem.querySelector('.ribbon__item').classList.add('ribbon__item_active');

    this.#ribbonInner.addEventListener('scroll', this.#visibleArrow);
    this.#ribon.addEventListener('click', this.#onClick);
  }

  #render(){
    this.elem = createElement(`
      <div class="ribbon">
        <!--Кнопка прокрутки влево-->
        <button class="ribbon__arrow ribbon__arrow_left">
          <img src="/assets/images/icons/angle-icon.svg" alt="icon">
        </button>

        <!--Ссылки на категории-->
        <nav class="ribbon__inner">
          ${this.#categories.map(item => `
          <a href="#" class="ribbon__item" data-id="${item.id}">${item.name}</a>
          `).join('')}
          
        </nav>

        <!--Кнопка прокрутки вправо-->
        <button class="ribbon__arrow ribbon__arrow_right ribbon__arrow_visible">
          <img src="/assets/images/icons/angle-icon.svg" alt="icon">
        </button>
      </div>
    `)
  }


  #onClick = (event) =>{
    if(event.target.classList.contains('ribbon__arrow_left')){
      this.#ribbonInner.scrollBy(-350, 0);
    }else if (event.target.classList.contains('ribbon__arrow_right')){
      this.#ribbonInner.scrollBy(350, 0);
    }else if(event.target.closest('.ribbon__item')){
      event.preventDefault();
      this.elem.querySelector('.ribbon__item_active').classList.remove('ribbon__item_active');
      event.target.classList.add('ribbon__item_active');
      
      this.elem.dispatchEvent(
        new CustomEvent('ribbon-select', {
          detail: event.target.closest('.ribbon__item').dataset.id, 
          bubbles: true
        })
      );
    }
  }

  #visibleArrow = () => {
    this.#scrollRight = this.#ribbonInner.scrollWidth - this.#ribbonInner.scrollLeft - this.#ribbonInner.clientWidth;
    if (this.#scrollRight < 1){
      this.#arrowRight.classList.remove('ribbon__arrow_visible');
    }else{
      this.#arrowRight.classList.add('ribbon__arrow_visible');
    }
    if (this.#ribbonInner.scrollLeft < 1){
      this.#arrowLeft.classList.remove('ribbon__arrow_visible');
    }else{
      this.#arrowLeft.classList.add('ribbon__arrow_visible');
    }
  }

}
