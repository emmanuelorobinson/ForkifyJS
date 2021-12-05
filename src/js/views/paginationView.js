import View  from './view.js';
import icons from 'url:../../img/icons.svg';

class PaginationView extends View {
    _parentElement = document.querySelector('.pagination');

    addHandlerClick(handler) {
        this._parentElement.addEventListener('click', function(event) {
            const btn = event.target.closest('.btn--inline');

            if (!btn) return;
            
            const goto = parseInt(btn.dataset.goto);
            
            handler(goto);
        });
    };

    _generateMarkup() {
        const currentPage = this._data.page;
        const numberOfPages =  Math.ceil(this._data.results.length / this._data.resultsPerPage);

        //page 1 and there are other pages
        if (currentPage === 1 && numberOfPages > 1) {
            return `
            <button data-goto="${currentPage + 1}" class="btn--inline pagination__btn--next">
            <span>Page ${currentPage + 1}</span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
            </svg>
          </button>`;
        }
        //last page
        if (currentPage === numberOfPages && numberOfPages > 1) {
            return `
            <button data-goto="${currentPage - 1}" class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>Page ${currentPage - 1}</span>
          </button>`;
        }
        //other page
        if (currentPage > 1 && currentPage < numberOfPages) {
            return `
            <button data-goto="${currentPage - 1}" class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>Page ${currentPage - 1}</span>
          </button>
          <button data-goto="${currentPage + 1}" class="btn--inline pagination__btn--next">
            <span>Page ${currentPage + 1}</span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
            </svg>
          </button>
          `;
        }

        return ``;
    }
}


export default new PaginationView();
