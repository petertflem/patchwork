(function (_this, Toolbelt) {
  var map = [];
  var singleColumnWidth = 0;
  var maxNumberOfColumns = 0;
  
  var dimensions;
  var options;
  var sortedDimensions;
  
  _this.initialize = function(newOptions, availableDimensions) {
    options = newOptions;
    dimensions = availableDimensions;
    
    calculateColumnWidth();
    
    addRowsToMap(options.rows);
    
    processDimensions();
  };
  
  _this.getColumnWidth = function() {
    return singleColumnWidth;
  }
  
  _this.getRowHeight = function () {
    return options.desiredRowHeight;
  }
  
  _this.generateElements = function(numberOfElements) {
    var elementsAdded = 0;
    var queue = [];
    var row = 0;
    var col = 0;
    
    if (!map[0][0]) {
      row = map.length;
      addRowsToMap(options.rows);
    }
    
    for (; row < map.length; row++) {
      for (; col < map[row].length; col++) {
        if (elementsAdded === numberOfElements)
          return { queue: queue, hasMore: false };
      
        // If this one is taken
        if (map[row][col] !== 1)
          continue;
        
        elementsAdded++;
        
        var dimension = dimensions[Toolbelt.getRandomNumber(0, dimensions.length)];
        var report = checkIfElementFits(col, row, dimension.width, dimension.height);
        
        if (report.fits) {
          addElementToMap(col, row, dimension.width, dimension.height);
          queue.push({ 
            x: singleColumnWidth * col,
            y: options.desiredRowHeight * row,
            dimension: dimension
          });
          printMap();
        } else {
          //console.log(report.maxWidth);
          //printMap();
          
          var el = selectNewElement(report.maxWidth, row);
          
          addElementToMap(col, row, el.width, el.height);
            queue.push({ 
            x: singleColumnWidth * col,
            y: options.desiredRowHeight * row,
            dimension: { width: el.width, height: el.height }
          });
          printMap();
        }
        
        console.log('#######################');
      }
      
      col = 0;
    }
    
    return { queue: queue, hasMore: true };
  };
  
  function selectNewElement(width, currRow) {
    var elements = sortedDimensions.width[width];
    
    var remainingHeight = map.length - currRow;
    
    var el = { width: 1, height: 1 };
    for (var a = 0; a < elements.length; a++) {
      if (elements[a].height <= remainingHeight)
        el = elements[a];
    }
    
    console.log('el; ');
    console.log(el);
    
    if (el.height + currRow > map.length) {
      console.log('returned: { width: 1, height: 1 }');
      return { width: 1, height: 1 };
    }
    else {
      console.log('returned: ' + el.width + ' ' + el.height);
      return el;
    }
  }
  
  function addRowsToMap(numberOfRows) {
    var i = map.length;
    var previousLength = map.length;
    
    for (; i < (numberOfRows + previousLength); i++) {
      map[i] = Array.apply(null, new Array(maxNumberOfColumns)).map(Number.prototype.valueOf, 1);
    }
  }
  
  function printMap() {
    var row = 0;
    var col = 0;

    var string = '';

    for (; row < map.length; row++) {
        for (; col < map[row].length; col++) {
            string += map[row][col] + ' ';
        }

        string += '\n';
        col = 0;
    }

    console.log(string);
  };
  
  function calculateColumnWidth () {
    var viewportWidth = document.documentElement.clientWidth - 20; // -20 because of the scroll bar that pops in late...
    maxNumberOfColumns = Math.floor(viewportWidth / options.desiredColumnWidth);
    var widthUsed = maxNumberOfColumns * options.desiredColumnWidth;
    var widthLeftovers = viewportWidth - widthUsed;
    var additionalWidthPerColumn = widthLeftovers / maxNumberOfColumns;
    var adjustedColumnWidth = options.desiredColumnWidth + additionalWidthPerColumn;
    
    singleColumnWidth = Math.floor(adjustedColumnWidth);
  }
  
  function checkIfElementFits(col, row, width, height) {
    //console.log('w: ' + width + ' h: ' + height);
    //console.log('col: ' + col + ' row: ' + row);
    
    var fits = true;
    
    // Is it to wide for the row
    if (col + width >= map[row].length + 1) {
      fits = false;
    }
    
    // Is it to high for the board
    if (row + height >= map.length + 1) {
      fits = false;
    }
    
    var freeSpace = [];
    var counter = 0;
    
    for (var i = 0; i < height; i++) {
      
      // If rows are out of bounds
      //console.log(row + i + " > " + (map.length - 1));
      if (row + i > map.length - 1) {
        continue;
      }
      
      for (var j = 0; j < width; j++) {
        
        // if col is out of bounds
        if (col + j > map[row].length - 1) {
          continue;
        }
        
        //console.log('row: ' + (row + i) + ' col: ' + (col + j));
        console.log()
        // Is the node already taken
        if (map[row + i][col + j] === 0) {
          fits = false;
          
          var value = freeSpace[counter];
          
          if (!value)
            value = { open: false, value: 0 };
          else 
            value.open = false;
          
          freeSpace[counter] = value;
          
        } else {
          var value = freeSpace[counter];
          //console.log(value);
          if (!value) {
            value = { open: true, value: 0 };
          }
          if (value.open)
            value.value += 1;
          
          freeSpace[counter] = value;
        }
      }
      
      counter++;
    }
    var a = freeSpace.map(function (el) {
      return el.value;
    });
    //console.log(freeSpace);
    var maxWidth = Math.min.apply(null, a);
    
    return { fits: fits, maxWidth: maxWidth };
  }
  
  function addElementToMap(x, y, width, height) {
    for (var i = 0; i < height; i++)
      for (var j = 0; j < width; j++)
        map[y + i][x + j] = 0;
  }
  
  function processDimensions() {
    /*{ width: 1, height: 1 }
      { width: 3, height: 2 }
      { width: 3, height: 4 }
      { width: 5, height: 1 }
      { width: 2, height: 6 }*/
    
    var sorted = {
      width: [],
      height: []
    };
    
    dimensions.forEach(function (element) {
      var widths = sorted.width[element.width];
      var heights = sorted.height[element.height];
      
      if (!widths)
        widths = [];
      
      if (!heights)
        heights = [];
      
      widths.push(element);
      heights.push(element);
      
      widths = widths.sort(function (a, b) { return a.height - b.height; });
      heights = heights.sort(function (a, b) { return a.width - b.width; });
      
      sorted.width[element.width] = widths;
      sorted.height[element.height] = heights;
    });
    
    sortedDimensions = sorted;
    
    console.log(sortedDimensions);
  }
  
})(Patchwork.Map = Patchwork.Map || {}, Patchwork.Toolbelt);