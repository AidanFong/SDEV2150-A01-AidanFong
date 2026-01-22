const template = document.createElement("template");
template.innerHTML = `
    <header class="mb-4">
        <div class="d-flex flex-wrap justify-content-between align-items-end gap-2">
        <div>
            <h1 class="h3 mb-1">NAIT Resource Directory</h1>
            <p class="text-body-secondary mb-0">
            Find student support services, labs, and campus resources.
            </p>
        </div>
        </div>
    </header>
`

class ResourceHeader extends HTMLElement {
    connectedCallback() {  // i.e. "at the end of *loading this into* the DOM, 
        this.attachShadow({mode: 'open'})  // create a shadow root; make it accessible outside this component
        this.shadowRoot.appendChild(template.content.cloneNode(true))
        // cloning a node just creates a copy; the idea is that we want to keep our template intact.
        // this is especially important for components with *open* shadow roots, i.e. mutable by outside logic/JS
    }
}

customElements.define('resource-header', ResourceHeader);