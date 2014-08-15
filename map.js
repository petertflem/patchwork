(function (_this, Toolbelt) {
  var map = [];
  var singleColumnWidth = 0;
  var maxNumberOfColumns = 0;
  
  // Default options
  var options = {
    desiredColumnWidth: 250,
    desiredRowHeight: 250,
    rows: 10
  };

  _this.initialize = function(newOptions) {
    // Merge options, overwrite default ones
    for (var attrname in newOptions) {
      options[attrname] = newOptions[attrname];
    }
    
    calculateColumnWidth();
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
    
    for (var i = 0; i < options.rows; i++) {
      map[i] = Array.apply(null, new Array(maxNumberOfColumns)).map(Number.prototype.valueOf, 1);
    }
    
    for (var row = 0; row < map.length; row++) {
      for (var col = 0; col < map[row].length; col++) {
        if (elementsAdded === numberOfElements) {
          printMap();
          return queue;
        }
      
        // If this one is taken
        if (map[row][col] !== 1)
          continue;
        
        elementsAdded++;

        // If the next one is unavailable
        if (map[row][col + 1] !== 1) {

          // If it is the last row
          if ((row + 1) === options.rows) {
            // Small
            addElementToMap(col, row, 1, 1);
            queue.push({ 
              x: singleColumnWidth * col,
              y: options.desiredRowHeight * row,
              type: 'small'
            });
          } else {
            // Isnt last row; small or standing
            var s = ['o', 'I'][Toolbelt.getRandomNumber(0, 2)];

            if (s === 'o') {
              addElementToMap(col, row, 1, 1);
              queue.push({ 
                x: singleColumnWidth * col,
                y: options.desiredRowHeight * row,
                type: 'small'
              });
            }
            else {
              addElementToMap(col, row, 1, 2);
              queue.push({ 
                x: singleColumnWidth * col,
                y: options.desiredRowHeight * row,
                type: 'standing'
              });
            }

          }

          continue;
        }

        // If it is the last row, but not the last square
        if ((row + 1) === options.rows && (col + 1) !== maxNumberOfColumns) {
          // Isnt last row; small or standing
          var s = ['o', '-'][Toolbelt.getRandomNumber(0, 2)];

          if (s === 'o') {
            addElementToMap(col, row, 1, 1);
            queue.push({ 
              x: singleColumnWidth * col,
              y: options.desiredRowHeight * row,
              type: 'small'
            });
          }
          else {
            addElementToMap(col, row, 2, 1);
            queue.push({ 
              x: singleColumnWidth * col,
              y: options.desiredRowHeight * row,
              type: 'laying'
            });
          }

          continue;
        }

        var s = ['o', '-', 'I', 'O'][Toolbelt.getRandomNumber(0, 4)];

        if (s === 'o') {
          addElementToMap(col, row, 1, 1);
          queue.push({ 
            x: singleColumnWidth * col,
            y: options.desiredRowHeight * row,
            type: 'small'
          });
        } else if (s === '-') {
          addElementToMap(col, row, 2, 1);
          queue.push({ 
            x: singleColumnWidth * col,
            y: options.desiredRowHeight * row,
            type: 'laying'
          });
        } else if (s === 'I') {
          addElementToMap(col, row, 1, 2);
          queue.push({ 
            x: singleColumnWidth * col,
            y: options.desiredRowHeight * row,
            type: 'standing'
          });
        } else {
          addElementToMap(col, row, 2, 2);
          queue.push({ 
            x: singleColumnWidth * col,
            y: options.desiredRowHeight * row,
            type: 'large'
          });
        }
      }
    }
    
    printMap();
    return queue;
  };
  
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
  
  function addElementToMap(x, y, width, height) {
    for (var i = 0; i < height; i++)
      for (var j = 0; j < width; j++)
        map[y + i][x + j] = 0;
  }
  
})(Patchwork.Map = Patchwork.Map || {}, Patchwork.Toolbelt);