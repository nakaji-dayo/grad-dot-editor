(function() {
    var CELL_SIZE=8;
    var MARGIN=11;
    var canvas;
    var text;
    var cx;
    var color1, color2;
    var list;
    var buttonSave;
    var buttonWriteFile;
    var load = function() {
        canvas = document.getElementById('canvas');
        text = document.getElementById('text');
        color1 = document.getElementById('color1');
        color2 = document.getElementById('color2');
        cx = canvas.getContext('2d');
        list = document.getElementById('list');
        buttonSave = document.getElementById('buttonSave');
        buttonWriteFile = document.getElementById('buttonWriteFile');

        text.value = '';
        for(var i=0;i<12; i++) {
            text.value += "111111111111\n";
        }
        color1.value='#000000';
        color2.value='#ffffff';

        buttonSave.addEventListener('click', save);
        buttonWriteFile.addEventListener('click', writeFile);

        draw();
        setInterval(draw, 3000);

        updateList();
    };
    var draw = function() {
        cx.save();
        cx.setTransform(1, 0, 0, 1, 0, 0);
        cx.clearRect(0, 0, canvas.width, canvas.height);
        cx.restore();

        var lines = text.value.split("\n");
        for(var y=0;y<lines.length;y++) {
            var line = lines[y];
            for(var x=0;x<line.length;x++) {
                var c = line.charAt(x);
                if(c=='1') {
                    cx.beginPath();

                    var dx = x*CELL_SIZE+x+MARGIN;
                    var dy = y*CELL_SIZE+y+MARGIN;
                    var grad = cx.createLinearGradient(dx, dy, dx+CELL_SIZE, dy+CELL_SIZE);
                    grad.addColorStop(0,color1.value);
                    grad.addColorStop(1,color2.value);
                    cx.fillStyle = grad;

                    cx.rect(dx, dy, CELL_SIZE, CELL_SIZE);
                    cx.fill();
                }
            }
        }
    };
    var save = function() {
        var data = {};
        data.text = text.value;
        data.color1 = color1.value;
        data.color2 = color2.value;
        var id = prompt('id');
        localStorage.setItem(id, JSON.stringify(data));
        updateList();
    };
    var updateList = function() {
        while(list.firstChild){
            list.removeChild(list.firstChild);
        }
        for (var k in localStorage) {
            var div = document.createElement('div');
            div.appendChild(document.createTextNode(k));
            div.dataKey = k;
            div.addEventListener('click', function(){loadData(this.dataKey);});
            list.appendChild(div);
        }
    };
    var loadData = function(key) {
        var data = JSON.parse(localStorage.getItem(key));
        text.value = data.text;
        color1.value = data.color1;
        color2.value = data.color2;
    };
    var writeFile = function() {
        location.href = canvas.toDataURL('image/png');
    };
    window.addEventListener('load', load);
})();