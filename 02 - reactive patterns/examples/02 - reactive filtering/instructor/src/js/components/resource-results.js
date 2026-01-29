const template = document.createElement('template');
template.innerHTML = `
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/css/bootstrap.min.css">
  <section class="h-100">
    <div class="card h-100">
      <div class="card-header d-flex justify-content-between align-items-center">
        <strong>Results</strong>
        <span class="badge text-bg-secondary">4</span>
      </div>

      <div class="list-group list-group-flush">

        <!-- results will be injected here, by selecting for .list-group and embedding inner HTML -->

      </div>
    </div>
  </section>`;

// Step 3: ResourceResults should react to received filter state
class ResourceResults extends HTMLElement {

  // If I'm filtering, I need 
  // - one place to load/store the *full* dataset of results, (already exists: #results)
  #results = [];
  // - and another place to store the *filtered* dataset
  #filteredResults = [];
  #filters = {};


  constructor() {
    super();
    this._handleResultClick = this._handleResultClick.bind(this); 
    this.attachShadow({ mode: 'open' });
  }

  set results(data) {
    this.#results = data;
    this.render();
  }

  set filters(incomingFilters) {
    // If I have a private array, I need a setter for it
    this.#filters = {
      // Writing the values might be more complicated than I ancitipate,
      // so I'll leave that for now.
    }
    
    // After I set/store the incoming filter inputs, I know I need to apply them.
    this.#applyFilters()
  }

  #applyFilters() {
    // This will be its own method, because I can anticipate the logic being extensive. 

    // I *definitely* don't want this method to be accessible externally, so it's #private too
    // -> I only need to apply filters as a result of the setter receiving new data
    
    this.render(); // I already know I'll need to re-render, because I'm changing the data displayed by the UI
  }

  _handleResultClick(event) {
    const button = event.target.closest('button[data-id]');
    if (button) {
      this.shadowRoot.querySelector('button.active')?.classList.remove('active');
      button.classList.add('active');

      const resultID = button.getAttribute('data-id');
      const result = this.#results.find(r => r.id === resultID);  // note that we're finding the data object from the array, not the UI row!

      const resultSelectedEvent = new CustomEvent(
        'resource-selected',
        {
          detail: { result },
          bubbles: true,
          composed: true,
        }
      );

      this.dispatchEvent(resultSelectedEvent);
    }
  }

  connectedCallback() {
    this.shadowRoot.addEventListener('click', this._handleResultClick);
    this.render();
  }

  disconnectedCallback () {
    this.shadowRoot.removeEventListener('click', this._handleResultClick);
  }
  
  render() {
  // - I have to render from the *filtered* dataset, not #results
    const content = template.content.cloneNode(true)
    const listGroup = content.querySelector('.list-group');


    if (this.#results.length) {
      const resultsHTML = this.#results.map(
        result => `
        <button type="button" class="list-group-item list-group-item-action" data-id="${result.id}">
          <div class="d-flex w-100 justify-content-between">
            <h2 class="h6 mb-1">${result.title}</h2>
            <small>${result.category}</small>
          </div>
          <p class="mb-1 small text-body-secondary">${result.summary}</p>
          <small class="text-body-secondary">${result.location}</small>
        </button>`
      ); 

      listGroup.innerHTML = resultsHTML.join('');

    } else {
      listGroup.innerHTML = `
        <div class="list-group-item">
          <p class="mb-0">No results found.</p>
        </div>`;
    }

    this.shadowRoot.innerHTML = '';
    this.shadowRoot.appendChild(content);
  }
}

customElements.define('resource-results', ResourceResults);