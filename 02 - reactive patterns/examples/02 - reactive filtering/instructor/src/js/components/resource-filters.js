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
    // Bind method to instance -> see again: https://dev.to/aman_singh/why-do-we-need-to-bind-methods-inside-our-class-component-s-constructor-45bn
    // Next time, we'll just use arrow functions ;)
    this._handleSubmit = this._handleSubmit.bind(this);
    this._handleCategoryClick = this._handleCategoryClick.bind(this);
  }

  connectedCallback() {
    // I'm going to want All items selected by default.
    // If I want UI input to trigger events firing from this UI component,
    // I'll need event listeners for those inputs.
    this.render();
  }

  disconnectedCallback() {
    // If I'm setting up event listeners when the component loads/attaches into the DOM (^ connectedCallback),
    // I should clean up those event listeners if/when the component ever unloads (disconnectedCallback)
  }

  // Handle:

  // place/bind functions below as necessary (e.g. in constructor, connectedCallback, disconnectedCallback, etc.)

  _handleCategoryClick(event) {
    // - clicking categories (in this example, will trigger changes live, without clicking Filter)
    //      - change click state of category button
    //      - create & fire an event for category click
  }

  _handleSubmit(event) {
    event.preventDefault(); // If I'm handling form submission with JS, I already know I need to prevent default form submission behaviour
    
    // - submitting the filters to trigger an event and send a message
    //      - build an object to hold the filter state
    //      - create & fire a custom event that fires with that information
  }

  render() {
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }
}

customElements.define('resource-filters', ResourceFilters);