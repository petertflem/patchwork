(function (_this, Polyfills, Map, Toolbelt) {
  
  var patchworkEntries;
  
  // Default options
  var options = {
    map: {
      desiredColumnWidth: 100,
      desiredRowHeight: 100,
      rows: 10
    },
    dimensions: [
      { width: 1, height: 1 },
      { width: 2, height: 2 },
      { width: 2, height: 1 },
      { width: 1, height: 2 }
    ],
    element: document.body
  };
  
  _this.initialize = function (data, newOptions) {
    if (!data)
      return;
    
    patchworkEntries = data;
    
    setOptions(newOptions);
    bindDOMElements();
    
    Polyfills.initialize();
    Map.initialize(options.map, options.dimensions);
    
    createElements();
  };
  
  function createElements() {
    var result = Map.generateElements(patchworkEntries.length);
    var elements = result.queue;
    
    if (!result.hasMore)
      document.getElementById('patchwork-load-more').style.visibility = 'hidden';
    
    elements.forEach(Toolbelt.curry(createImageElement, patchworkEntries));
    patchworkEntries.splice(0, elements.length);
  }
  
  function createImageElement(elements, elementDimensions, i) {
    var colspan = elementDimensions.dimension.width;
    var rowspan = elementDimensions.dimension.height;
    var containingDiv = document.createElement('div');

    containingDiv.style.top = elementDimensions.y + 'px';
    containingDiv.style.left = elementDimensions.x + 'px';
    containingDiv.style.width = (Map.getColumnWidth() * colspan) + 'px';
    containingDiv.style.height = (Map.getRowHeight() * rowspan) + 'px';
    containingDiv.className = 'image-element';
    containingDiv.style.backgroundImage = 'url(' + elements[i].src + ')';
    
    options.element.appendChild(containingDiv);
  }
  
  function setOptions(newOptions) {
    newOptions = newOptions || {};
    
    options.map = Toolbelt.extend(options.map, newOptions.map);
    options.dimensions = newOptions.dimensions || options.dimensions;
    options.element = newOptions.element || options.element;
  }
  
  function bindDOMElements() {
    var loadMoreButton = document.getElementById('patchwork-load-more');
    loadMoreButton.addEventListener('click', function () {
      createElements();
    });
  }
  
})(window.Patchwork = window.Patchwork || {}, Patchwork.Polyfills, Patchwork.Map, Patchwork.Toolbelt);

Patchwork.initialize(
  [
    { src: 'http://placekitten.com/' + Math.floor(Math.random() * 1000 + 300) + '/' + Math.floor(Math.random() * 1000 + 300) },
    { src: 'http://placekitten.com/' + Math.floor(Math.random() * 1000 + 300) + '/' + Math.floor(Math.random() * 1000 + 300) },
    { src: 'http://placekitten.com/' + Math.floor(Math.random() * 1000 + 300) + '/' + Math.floor(Math.random() * 1000 + 300) },
    { src: 'http://placekitten.com/' + Math.floor(Math.random() * 1000 + 300) + '/' + Math.floor(Math.random() * 1000 + 300) },
    { src: 'http://placekitten.com/' + Math.floor(Math.random() * 1000 + 300) + '/' + Math.floor(Math.random() * 1000 + 300) },
    { src: 'http://placekitten.com/' + Math.floor(Math.random() * 1000 + 300) + '/' + Math.floor(Math.random() * 1000 + 300) },
    { src: 'http://placekitten.com/' + Math.floor(Math.random() * 1000 + 300) + '/' + Math.floor(Math.random() * 1000 + 300) },
    { src: 'http://placekitten.com/' + Math.floor(Math.random() * 1000 + 300) + '/' + Math.floor(Math.random() * 1000 + 300) },
    { src: 'http://placekitten.com/' + Math.floor(Math.random() * 1000 + 300) + '/' + Math.floor(Math.random() * 1000 + 300) },
    { src: 'http://placekitten.com/' + Math.floor(Math.random() * 1000 + 300) + '/' + Math.floor(Math.random() * 1000 + 300) },
    { src: 'http://placekitten.com/' + Math.floor(Math.random() * 1000 + 300) + '/' + Math.floor(Math.random() * 1000 + 300) },
    { src: 'http://placekitten.com/' + Math.floor(Math.random() * 1000 + 300) + '/' + Math.floor(Math.random() * 1000 + 300) },
    { src: 'http://placekitten.com/' + Math.floor(Math.random() * 1000 + 300) + '/' + Math.floor(Math.random() * 1000 + 300) },
    { src: 'http://placekitten.com/' + Math.floor(Math.random() * 1000 + 300) + '/' + Math.floor(Math.random() * 1000 + 300) },
    { src: 'http://placekitten.com/' + Math.floor(Math.random() * 1000 + 300) + '/' + Math.floor(Math.random() * 1000 + 300) },
    { src: 'http://placekitten.com/' + Math.floor(Math.random() * 1000 + 300) + '/' + Math.floor(Math.random() * 1000 + 300) },
    { src: 'http://placekitten.com/' + Math.floor(Math.random() * 1000 + 300) + '/' + Math.floor(Math.random() * 1000 + 300) },
    { src: 'http://placekitten.com/' + Math.floor(Math.random() * 1000 + 300) + '/' + Math.floor(Math.random() * 1000 + 300) },
    { src: 'http://placekitten.com/' + Math.floor(Math.random() * 1000 + 300) + '/' + Math.floor(Math.random() * 1000 + 300) },
    { src: 'http://placekitten.com/' + Math.floor(Math.random() * 1000 + 300) + '/' + Math.floor(Math.random() * 1000 + 300) },
    { src: 'http://placekitten.com/' + Math.floor(Math.random() * 1000 + 300) + '/' + Math.floor(Math.random() * 1000 + 300) },
    { src: 'http://placekitten.com/' + Math.floor(Math.random() * 1000 + 300) + '/' + Math.floor(Math.random() * 1000 + 300) },
    { src: 'http://placekitten.com/' + Math.floor(Math.random() * 1000 + 300) + '/' + Math.floor(Math.random() * 1000 + 300) },
    { src: 'http://placekitten.com/' + Math.floor(Math.random() * 1000 + 300) + '/' + Math.floor(Math.random() * 1000 + 300) },
    { src: 'http://placekitten.com/' + Math.floor(Math.random() * 1000 + 300) + '/' + Math.floor(Math.random() * 1000 + 300) },
    { src: 'http://placekitten.com/' + Math.floor(Math.random() * 1000 + 300) + '/' + Math.floor(Math.random() * 1000 + 300) },
    { src: 'http://placekitten.com/' + Math.floor(Math.random() * 1000 + 300) + '/' + Math.floor(Math.random() * 1000 + 300) },
    { src: 'http://placekitten.com/' + Math.floor(Math.random() * 1000 + 300) + '/' + Math.floor(Math.random() * 1000 + 300) },
    { src: 'http://placekitten.com/' + Math.floor(Math.random() * 1000 + 300) + '/' + Math.floor(Math.random() * 1000 + 300) }
  ],
  {
    element: document.getElementById('patchwork-images'),
    map: {
      desiredColumnWidth: 200,
      desiredRowHeight: 200,
      rows: 5
    },
    dimensions: [
      /*{ width: 1, height: 1 },
      { width: 1, height: 2 },
      { width: 1, height: 3 },
      { width: 1, height: 4 },
      { width: 2, height: 1 },
      { width: 2, height: 3 },
      { width: 2, height: 2 },
      { width: 3, height: 1 },
      { width: 3, height: 2 },
      { width: 3, height: 3 },*/
      { width: 1, height: 1 },
      { width: 1, height: 2 },
      { width: 2, height: 1 },
      { width: 2, height: 2 },
    ]
  }
);