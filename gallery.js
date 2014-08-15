(function (_this, Polyfills, Map, Toolbelt) {
  
  var dimensions = {
    'small': { row: 1, col: 1 },
    'standing': { row: 2, col: 1 },
    'laying': { row: 1, col: 2 },
    'large': { row: 2, col: 2 }  
  };
  
  _this.initialize = function (data) {
    Polyfills.initialize();
    Map.initialize();
    createElements(data);
  };
  
  function createElements(data) {
    Map.generateElements(data.length).forEach(Toolbelt.curry(createImageElement, data));
  }
  
  function createImageElement(elements, elementDimensions, i) {
    var colspan = dimensions[elementDimensions.type].col;
    var rowspan = dimensions[elementDimensions.type].row;
    var containingDiv = document.createElement('div');


    containingDiv.style.top = elementDimensions.y + 'px';
    containingDiv.style.left = elementDimensions.x + 'px';
    containingDiv.style.width = (Map.getColumnWidth() * colspan) + 'px';
    containingDiv.style.height = (Map.getRowHeight() * rowspan) + 'px';
    containingDiv.className = 'image-element';
    containingDiv.style.backgroundImage = 'url(' + elements[i].src + ')';
    
    document.body.appendChild(containingDiv);
  }
  
})(window.Gallery = window.Gallery || {}, Patchwork.Polyfills, Patchwork.Map, Patchwork.Toolbelt);

Gallery.initialize(
  [
    { src: 'http://placekitten.com/' + Math.floor(Math.random() * 1000 + 300) + '/'+ Math.floor(Math.random() * 1000 + 300) },
    { src: 'http://placekitten.com/' + Math.floor(Math.random() * 1000 + 300) + '/'+ Math.floor(Math.random() * 1000 + 300) },
    { src: 'http://placekitten.com/' + Math.floor(Math.random() * 1000 + 300) + '/'+ Math.floor(Math.random() * 1000 + 300) },
    { src: 'http://placekitten.com/' + Math.floor(Math.random() * 1000 + 300) + '/'+ Math.floor(Math.random() * 1000 + 300) },
    { src: 'http://placekitten.com/' + Math.floor(Math.random() * 1000 + 300) + '/'+ Math.floor(Math.random() * 1000 + 300) },
    { src: 'http://placekitten.com/' + Math.floor(Math.random() * 1000 + 300) + '/'+ Math.floor(Math.random() * 1000 + 300) },
    { src: 'http://placekitten.com/' + Math.floor(Math.random() * 1000 + 300) + '/'+ Math.floor(Math.random() * 1000 + 300) },
    { src: 'http://placekitten.com/' + Math.floor(Math.random() * 1000 + 300) + '/'+ Math.floor(Math.random() * 1000 + 300) },
    { src: 'http://placekitten.com/' + Math.floor(Math.random() * 1000 + 300) + '/'+ Math.floor(Math.random() * 1000 + 300) },
    { src: 'http://placekitten.com/' + Math.floor(Math.random() * 1000 + 300) + '/'+ Math.floor(Math.random() * 1000 + 300) },
    { src: 'http://placekitten.com/' + Math.floor(Math.random() * 1000 + 300) + '/'+ Math.floor(Math.random() * 1000 + 300) },
    { src: 'http://placekitten.com/' + Math.floor(Math.random() * 1000 + 300) + '/'+ Math.floor(Math.random() * 1000 + 300) },
    { src: 'http://placekitten.com/' + Math.floor(Math.random() * 1000 + 300) + '/'+ Math.floor(Math.random() * 1000 + 300) },
    { src: 'http://placekitten.com/' + Math.floor(Math.random() * 1000 + 300) + '/'+ Math.floor(Math.random() * 1000 + 300) },
    { src: 'http://placekitten.com/' + Math.floor(Math.random() * 1000 + 300) + '/'+ Math.floor(Math.random() * 1000 + 300) },
    { src: 'http://placekitten.com/' + Math.floor(Math.random() * 1000 + 300) + '/'+ Math.floor(Math.random() * 1000 + 300) },
    { src: 'http://placekitten.com/' + Math.floor(Math.random() * 1000 + 300) + '/'+ Math.floor(Math.random() * 1000 + 300) },
    { src: 'http://placekitten.com/' + Math.floor(Math.random() * 1000 + 300) + '/'+ Math.floor(Math.random() * 1000 + 300) },
    { src: 'http://placekitten.com/' + Math.floor(Math.random() * 1000 + 300) + '/'+ Math.floor(Math.random() * 1000 + 300) },
    { src: 'http://placekitten.com/' + Math.floor(Math.random() * 1000 + 300) + '/'+ Math.floor(Math.random() * 1000 + 300) },
    { src: 'http://placekitten.com/' + Math.floor(Math.random() * 1000 + 300) + '/'+ Math.floor(Math.random() * 1000 + 300) },
    { src: 'http://placekitten.com/' + Math.floor(Math.random() * 1000 + 300) + '/'+ Math.floor(Math.random() * 1000 + 300) },
    { src: 'http://placekitten.com/' + Math.floor(Math.random() * 1000 + 300) + '/'+ Math.floor(Math.random() * 1000 + 300) },
    { src: 'http://placekitten.com/' + Math.floor(Math.random() * 1000 + 300) + '/'+ Math.floor(Math.random() * 1000 + 300) },
    { src: 'http://placekitten.com/' + Math.floor(Math.random() * 1000 + 300) + '/'+ Math.floor(Math.random() * 1000 + 300) },
    { src: 'http://placekitten.com/' + Math.floor(Math.random() * 1000 + 300) + '/'+ Math.floor(Math.random() * 1000 + 300) },
    { src: 'http://placekitten.com/' + Math.floor(Math.random() * 1000 + 300) + '/'+ Math.floor(Math.random() * 1000 + 300) },
    { src: 'http://placekitten.com/' + Math.floor(Math.random() * 1000 + 300) + '/'+ Math.floor(Math.random() * 1000 + 300) },
    { src: 'http://placekitten.com/' + Math.floor(Math.random() * 1000 + 300) + '/'+ Math.floor(Math.random() * 1000 + 300) }
  ]
);