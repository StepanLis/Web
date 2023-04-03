import createElement from "../../assets/lib/create-element.js";

export default class StepSlider {
  elem = null;
  #steps = 0;
  #value = 0;
  #thumb = null;
  constructor({ steps, value = 0 }) {
    this.#steps = steps;
    this.#value = value;

    this.#render();

    this.#thumb = this.elem.querySelector(".slider__thumb");
    this.#thumb.ondragstart = () => false;

    this.#thumb.addEventListener('pointerdown', this.#pointermove)
    this.elem.addEventListener('click', this.#clickSlider);

  }

  #pointermove = (event) =>{
    this.elem.classList.add("slider_dragging");
    let left = event.clientX - this.elem.getBoundingClientRect().left;
    let leftRelative = left / this.elem.offsetWidth;

    if (leftRelative < 0) {
      leftRelative = 0;
    }

    if (leftRelative > 1) {
      leftRelative = 1;
    }

    let leftPercents = leftRelative * 100;
    let thumb = this.elem.querySelector('.slider__thumb');
    let progress = this.elem.querySelector('.slider__progress');

    thumb.style.left = `${leftPercents}%`;
    progress.style.width = `${leftPercents}%`;
    let segments = this.#steps - 1;
    let approximateValue = leftRelative * segments;
    let value = Math.round(approximateValue);

    

    this.elem.dispatchEvent(
      new CustomEvent('slider-change', { 
      detail: value, 
      bubbles: true 
    })
    );
    // alert(value);
  }

  #render = () =>{
    this.elem = createElement(`
    <div class="slider">
      <div class="slider__thumb" style="left: 0%;">
        <span class="slider__value">${this.#value}</span>
      </div>

      <div class="slider__progress" style="width: 0%;"></div>

      <div class="slider__steps">

      </div>
    </div>
    `)
    
    for (let i = 0; i < this.#steps; i++){
      let spanElem = createElement(`<span></span>`);
      if (i === this.#value){
        spanElem.classList.add("slider__step-active");
      }
      this.elem.querySelector('.slider__steps').append(spanElem);
    }
  }

  #clickSlider = (event) =>{
    let spanArr = this.elem.querySelector('.slider__steps').querySelectorAll('span');
    let left = event.clientX - this.elem.getBoundingClientRect().left;
    let leftRelative = left / this.elem.offsetWidth;
    let segments = this.#steps - 1;
    let approximateValue = leftRelative * segments;
    let value = Math.round(approximateValue);
    let valuePercents = value / segments * 100;
    
    this.elem.querySelector('.slider__value').innerHTML = value;

    this.elem.querySelector(".slider__step-active").classList.remove("slider__step-active")
    spanArr[value].classList.add("slider__step-active");

    let thumb = this.elem.querySelector('.slider__thumb');
    let progress = this.elem.querySelector('.slider__progress');

    thumb.style.left = `${valuePercents}%`;
    progress.style.width = `${valuePercents}%`;

    this.elem.dispatchEvent(
      new CustomEvent('slider-change', { 
      detail: value, 
      bubbles: true 
    })
    );
  }
}
