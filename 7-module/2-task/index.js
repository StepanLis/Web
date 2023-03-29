import createElement from '../../assets/lib/create-element.js';

export default class Modal {
  elem = null;
  constructor() {
    this.#render();
    this.elem.addEventListener('click', this.#closeButton);
  }

  #render = () =>{
    this.elem = createElement(`
      <div class="modal">
        <div class="modal__overlay"></div>
        <div class="modal__inner">
          <div class="modal__header">
            <button type="button" class="modal__close">
              <img src="/assets/images/icons/cross-icon.svg" alt="close-icon" />
            </button>
            <h3 class="modal__title"></h3>
          </div>
          <div class="modal__body"></div>
        </div>
      </div>
    `)
  }

  open = () => {
    document.body.append(this.elem);
    document.body.classList.add('is-modal-open');
    document.addEventListener('keydown', this.#closeEsc);
  }

  setTitle = (text) =>{
    this.elem.querySelector('.modal__title').textContent = text;
  }

  setBody = (newElem) =>{
    // 
    this.elem.querySelector(".modal__body").innerHTML = "";
    this.elem.querySelector('.modal__body').append(newElem);
  }

  close = () => {
    document.body.classList.remove('is-modal-open');
    // if (document.querySelector('.modal')){
      this.elem.remove();
      document.removeEventListener('keydown', this.#closeEsc);
    // }
  }

  #closeButton = (event) =>{   
    if (event.target.closest('.modal__close')){
      this.close();
    }
  }

  #closeEsc = (event) =>{
    if (event.code === "Escape")
      this.close();
  }
}
