// I don't need to do anything to the template, because it's just an as-is input interface.
const template = document.createElement('template');
template.innerHTML = `
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css">
  <aside class="h-100">
    <div class="card h-100">
      <div class="card-header">
        <strong>Filters</strong>
      </div>

      <div class="card-body">
        <form id="frm-filter">
          <label for="q" class="form-label">Search</label>
          <input id="q" class="form-control" type="text" placeholder="Try: tutoring, mental health, bursary" />

          <hr class="my-3" />

          <div class="mb-2"><strong>Category</strong></div>
          <div class="d-flex flex-wrap gap-2" aria-label="Category filters">
            <button class="btn btn-sm btn-outline-primary" type="button">All</button>
            <button class="btn btn-sm btn-outline-primary" type="button">Academic</button>
            <button class="btn btn-sm btn-outline-primary" type="button">Wellness</button>
            <button class="btn btn-sm btn-outline-primary" type="button">Financial</button>
            <button class="btn btn-sm btn-outline-primary" type="button">Tech</button>
          </div>

          <hr class="my-3" />

          <div class="form-check">
            <input class="form-check-input" type="checkbox" value="" id="openNow" />
            <label class="form-check-label" for="openNow">Open now</label>
          </div>

          <div class="form-check">
            <input class="form-check-input" type="checkbox" value="" id="virtual" />
            <label class="form-check-label" for="virtual">Virtual options</label>
          </div>

          <hr class="my-3" />

          <div class="d-flex gap-2">
            <button class="btn btn-outline-secondary" type="button">Reset</button>
            <button class="btn btn-primary" type="submit">Filter</button>
          </div>
        </form>
      </div>
    </div>
  </aside>`;


// Step 2: work on ResourceFilters component
class ResourceFilters extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });

    this._handleSubmit = this._handleSubmit.bind(this);
    this._handleCategoryClick = this._handleCategoryClick.bind(this);
  }

  connectedCallback() {
    // life cycle: We can't listen for events until the component loads into the DOM, so they go in here!
    this._form = this.shadowRoot.querySelector('#frm-filter');
    this._form.addEventListener('submit', this._handleSubmit);

    this._categoryGroup = this.shadowRoot.querySelector('aria-label="Category filters"') // aria-label is its uniquely identifying attribute
    this._categoryGroup.addEventListener('click', this._handleCategoryClick);

    this.render();
  }

  disconnectedCallback() {
    // life cycle: If you set up event listeners on load or (not in this example) on attribute change, clean 'em up!
    if (this._form) {
      this._form.removeEventListener('submit', this._handleSubmit);
    }
    if (this._categoryGroup) {
      this._categoryGroup.removeEventListener('click', this._handleCategoryClick);
    }
  }


  _handleCategoryClick(event) {
    // I messed up earlier: we'll just use this to change visual state of clicked category button
  }

  _handleSubmit(event) {
    event.preventDefault();
    // I'll need to collect data to pack into the filters object; let's get the skeleton out of the way first
    const filters = {
      // data elements go here, once I've extracted input values from the DOM
    };

    const filtersEvent = new CustomEvent(
      'resource-filters-changed',
      {
        details: filters,
        bubbles: true,
        composed: true,
      }
    );

    this.dispatchEvent(filtersEvent);
  }

  render() {
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }
}

customElements.define('resource-filters', ResourceFilters);