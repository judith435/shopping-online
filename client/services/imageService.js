shoppingApp.service("imageService", function() {
    var self = this;
    var canvasSize = {
        regular: [80, 100],  
        small: [40, 50],
        // adminAside: [48, 60],
        // schoolAside: [33, 42]   
    };
    
    this.setCanvas = function (canvas, imgPath, size) {
            var context = canvas.getContext("2d");
            context.clearRect(0, 0, canvas.width, canvas.height);
            var imageObj = new Image();
            imageObj.onload = function() {
                context.drawImage(imageObj, 0, 0, canvasSize[size][0], canvasSize[size][1]);
            };
            imageObj.src = imgPath + ".jpg?" + new Date().getTime();
    };

    this.loadCanvasList = function (items, canvasID , imagePath, size) {
        items.forEach(function (item) {
            var drawingCanvas = document.getElementById(canvasID + item.id);
            self.setCanvas(drawingCanvas, imagePath + item.id, size);
        });
    };

    this.clearCanvasList = function (items, canvasID) {
        items.forEach(function (item) {
            var drawingCanvas = document.getElementById(canvasID + item.id);
            self.clearImage(drawingCanvas);
        });
    };

    this.uploadImage = function (canvas, imageFile) {
        self.clearImage(canvas);
        if (imageFile) {
              var fileRDR  = new FileReader();
              fileRDR .onload = function(e) {
                    var context = canvas.getContext("2d");
                    var img = new Image();
                    img.addEventListener("load", function() {
                          context.drawImage(img, 0, 0, 80, 100); //for uploads canvas size is fixed
                    });
                    img.src = e.target.result;
              };       
              fileRDR .readAsDataURL(imageFile);
        }
    };

    this.clearImage = function (canvas) {
        var context = canvas.getContext("2d");
        context.clearRect(0, 0, canvas.width, canvas.height);
    };

});

