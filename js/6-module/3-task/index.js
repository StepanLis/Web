import createElement from '../../assets/lib/create-element.js';

export default class Carousel {
  #slides = [];
  #elem = null;
  constructor(slides) {
    this.#slides = slides;
    this.#render();
    this.#initCarousel();
    this.#elem.addEventListener('click', this.#onCardClick);
  }

  #render(){
    this.#elem = createElement(`
    <div class="carousel">
      <div class="carousel__arrow carousel__arrow_right">
        <img src="/assets/images/icons/angle-icon.svg" alt="icon">
      </div>
      <div class="carousel__arrow carousel__arrow_left">
        <img src="/assets/images/icons/angle-left-icon.svg" alt="icon">
      </div>
      <div class="carousel__inner">
        ${this.#slides.map(row =>`
          <div class="carousel__slide" data-id="${row.id}">
            <img src="/assets/images/carousel/${row.image}" class="carousel__img" alt="slide">
            <div class="carousel__caption">
              <span class="carousel__price">€${row.price.toFixed(2)}</span>
              <div class="carousel__title">${row.name}</div>
              <button type="button" class="carousel__button">
                <img src="/assets/images/icons/plus-icon.svg" alt="icon">
              </button>
            </div>
          </div>
          `).join('')}
        </div>
      </div>
    `);
  }

  get elem(){
    return this.#elem;
  }

  #initCarousel(){
    const carouselArrow_right = this.#elem.querySelector(".carousel__arrow_right");
    const carouselArrow_left = this.#elem.querySelector(".carousel__arrow_left");
    
    const carousel_inner = this.#elem.querySelector(".carousel__inner");
    carouselArrow_left.style.display = 'none';

    let currentSlide = 0;
    const maxSlide = carousel_inner.children.length - 1;

    carouselArrow_right.addEventListener("click", () =>{
      if(currentSlide === 0){
        carouselArrow_left.style.display = '';
      }
      currentSlide++;
      if (currentSlide === maxSlide){
        carouselArrow_right.style.display = 'none';
      }
      carousel_inner.style.transform = `translateX(-${carousel_inner.offsetWidth * currentSlide}px`;
    });

    carouselArrow_left.addEventListener("click", () =>{
      if(currentSlide === maxSlide){
        carouselArrow_right.style.display = '';
      }
      currentSlide--;
      if (currentSlide === 0){
        carouselArrow_left.style.display = 'none';
      }
      carousel_inner.style.transform = `translateX(-${carousel_inner.offsetWidth * currentSlide}px`;
    });
  }

  #onCardClick = (event) =>{

    if (event.target.closest('.carousel__button')){
      // alert(event.target.closest('.carousel__slide').dataset.id);
      this.#elem.dispatchEvent(
        new CustomEvent("product-add", {
        detail: event.target.closest('.carousel__slide').dataset.id,
        bubbles: true,
      })
      );
      
    }
  }

}
