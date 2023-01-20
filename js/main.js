
class ItcCustomSelect {
    static EL = 'itc-select';
    static EL_SHOW = 'itc-select_show';
    static EL_OPTION = 'itc-select__option';
    static EL_OPTION_SELECTED = 'itc-select__option_selected';
    static DATA = '[data-select]';
    static DATA_TOGGLE = '[data-select="toggle"]';

    static template(params) {
        const { name, options, targetValue } = params;
        const items = [];
        let selectedIndex = -1;
        let selectedValue = '';
        let selectedContent = 'По адресу';
        options.forEach((option, index) => {
            let selectedClass = '';
            if (option[0] === targetValue) {
                selectedClass = ` ${this.EL_OPTION_SELECTED}`;
                selectedIndex = index;
                selectedValue = option[0];
                selectedContent = option[1];
            }
            items.push(`<li class="itc-select__option${selectedClass}" data-select="option"
          data-value="${option[0]}" data-index="${index}">${option[1]}</li>`);
        });
        return `<button type="button" class="itc-select__toggle" name="${name}"
        value="${selectedValue}" data-select="toggle" data-index="${selectedIndex}">
        ${selectedContent}</button><div class="itc-select__dropdown">
        <ul class="itc-select__options">${items.join('')}</ul></div>`;
    }

    static hideOpenSelect() {
        document.addEventListener('click', (e) => {
            if (!e.target.closest(`.${this.EL}`)) {
                const elsActive = document.querySelectorAll(`.${this.EL_SHOW}`);
                elsActive.forEach((el) => {
                    el.classList.remove(this.EL_SHOW);
                });
            }
        });
    }
    static create(target, params) {
        this._el = typeof target === 'string' ? document.querySelector(target) : target;
        if (this._el) {
            return new this(target, params);
        }
        return null;
    }
    constructor(target, params) {
        this._el = typeof target === 'string' ? document.querySelector(target) : target;
        this._params = params || {};
        this._onClickFn = this._onClick.bind(this);
        if (this._params.options) {
            this._el.innerHTML = this.constructor.template(this._params);
            this._el.classList.add(this.constructor.EL);
        }
        this._elToggle = this._el.querySelector(this.constructor.DATA_TOGGLE);
        this._el.addEventListener('click', this._onClickFn);
    }

    _onClick(e) {
        const { target } = e;
        const type = target.closest(this.constructor.DATA).dataset.select;
        if (type === 'toggle') {
            this.toggle();
        } else if (type === 'option') {
            this._changeValue(target);
        }
    }

    _updateOption(el) {
        const elOption = el.closest(`.${this.constructor.EL_OPTION}`);
        const elOptionSel = this._el.querySelector(`.${this.constructor.EL_OPTION_SELECTED}`);
        if (elOptionSel) {
            elOptionSel.classList.remove(this.constructor.EL_OPTION_SELECTED);
        }
        elOption.classList.add(this.constructor.EL_OPTION_SELECTED);
        this._elToggle.textContent = elOption.textContent;
        this._elToggle.value = elOption.dataset.value;
        this._elToggle.dataset.index = elOption.dataset.index;
        this._el.dispatchEvent(new CustomEvent('itc.select.change'));
        this._params.onSelected ? this._params.onSelected(this, elOption) : null;
        return elOption.dataset.value;
    }

    _reset() {
        const selected = this._el.querySelector(`.${this.constructor.EL_OPTION_SELECTED}`);
        if (selected) {
            selected.classList.remove(this.constructor.EL_OPTION_SELECTED);
        }
        this._elToggle.textContent = 'Выберите из списка';
        this._elToggle.value = '';
        this._elToggle.dataset.index = '-1';
        this._el.dispatchEvent(new CustomEvent('itc.select.change'));
        this._params.onSelected ? this._params.onSelected(this, null) : null;
        return '';
    }

    _changeValue(el) {
        if (el.classList.contains(this.constructor.EL_OPTION_SELECTED)) {
            return;
        }
        this._updateOption(el);
        this.hide();
    }

    show() {
        document.querySelectorAll(this.constructor.EL_SHOW)
            .forEach((el) => {
                el.classList.remove(this.constructor.EL_SHOW);
            });
        this._el.classList.add(`${this.constructor.EL_SHOW}`);
    }

    hide() {
        this._el.classList.remove(this.constructor.EL_SHOW);
    }

    toggle() {
        this._el.classList.contains(this.constructor.EL_SHOW) ? this.hide() : this.show();
    }

    dispose() {
        this._el.removeEventListener('click', this._onClickFn);
    }

    get value() {
        return this._elToggle.value;
    }

    set value(value) {
        let isExists = false;
        this._el.querySelectorAll('.select__option')
            .forEach((option) => {
                if (option.dataset.value === value) {
                    isExists = true;
                    this._updateOption(option);
                }
            });
        if (!isExists) {
            this._reset();
        }
    }

    get selectedIndex() {
        return this._elToggle.dataset.index;
    }

    set selectedIndex(index) {
        const option = this._el.querySelector(`.select__option[data-index="${index}"]`);
        if (option) {
            this._updateOption(option);
        }
        this._reset();
    }
}

ItcCustomSelect.hideOpenSelect();

const openBtn = document.querySelector('#mb-1');
const closeBtn = document.querySelector('#mb-2');
const mobMenu = document.querySelector('#call-request-dialog');
const mobMenuOverlay = document.querySelector('#call-request-overlay');
const header = document.querySelector('.header')
const mobMenuBtn = document.querySelector('.mob-menu__btn');
const closeBtn1 = document.querySelector('#mb-1');
const closeBtn2 = document.querySelector('#mb-2');


function openMobMenu() {
    mobMenu.classList.add('dialog_active');
    header.classList.add('fixer')
    closeBtn1.classList.add('active')
    closeBtn2.classList.remove('active')

}
function closeMobMenu() {
    mobMenu.classList.remove('dialog_active');
    header.classList.remove('fixer')
    closeBtn2.classList.add('active')
    closeBtn1.classList.remove('active')
}

openBtn.addEventListener('click', openMobMenu);
closeBtn.addEventListener('click', closeMobMenu);
mobMenuOverlay.addEventListener('click', closeMobMenu);


const openBtn2 = document.querySelector('#mb-3');
const closeBtn3 = document.querySelector('#mb-4');
const mobMenu2 = document.querySelector('#call-request-dialog2');
const mobMenuOverlay2 = document.querySelector('#call-request-overlay2');
const header2 = document.querySelector('.header')
const header__navigation = document.querySelector('.header__navigation')
const mobMenuBtn2 = document.querySelector('.mob-menu__btn2');
const closeBtn4 = document.querySelector('#mb-3');
const closeBtn5 = document.querySelector('#mb-4');


function openMobMenu2() {
    mobMenu2.classList.add('dialog_active-2');
    header.classList.add('fixer')
    closeBtn4.classList.add('active-2')
    closeBtn5.classList.remove('active-2')
    header__navigation.classList.remove('header__navigation')
    header__navigation.classList.add('header__navigation-active')

}
function closeMobMenu2() {
    mobMenu2.classList.remove('dialog_active-2');
    header.classList.remove('fixer')
    closeBtn5.classList.add('active-2')
    closeBtn4.classList.remove('active-2')
    header__navigation.classList.remove('header__navigation-active')
    header__navigation.classList.add('header__navigation')
}

openBtn2.addEventListener('click', openMobMenu2);
closeBtn3.addEventListener('click', closeMobMenu2);
mobMenuOverlay2.addEventListener('click', closeMobMenu2);
