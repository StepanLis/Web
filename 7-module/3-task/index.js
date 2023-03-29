import createElement from "../../assets/lib/create-element";

export default class StepSlider {
  elem = null;
  #steps = 0;
  #value = 0;
  constructor({ steps, value = 0 }) {
    this.#steps = steps;
    this.#value = value;
    this.#render();
    
  }

  #render = () =>{
    this.elem = createElement(`
    <div class="slider">
      <div class="slider__thumb" style="left: 50%;">
        <span class="slider__value">${this.#value}</span>
      </div>

      <div class="slider__progress" style="width: 50%;"></div>

      <div class="slider__steps">

      </div>
    </div>
    `)
    
    for (let i = 0; i < this.#steps; i++){
      let spanElem = createElement(`<span></span>`);
      this.elem.querySelector('.slider__steps').append(spanElem);
      if (i === this.#value){
        this.elem.querySelector('.slider__steps').querySelector("span").classList.add("slider__step-active");
      }  
    }
    

  }
}
