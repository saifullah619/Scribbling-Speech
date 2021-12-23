import './App.css';
import logo from './Scribbling_speech_logo_.png';

function Loading() {
    window.onload = function() {
		move();
	};
	function move() {
		var i = 0;
		if (i == 0) {
			i = 1;
			var elem = document.getElementById("myBar");
			var width = 1;
			var id = setInterval(frame, 20);
			function frame() {
				if (width >= 100) {
					clearInterval(id);
					i = 0;
				} else {
					width++;
					elem.style.width = width + "%";
				}
			}
		}
	}
    return (
        <div>
            <div class="center">
                <img src={logo}/>
            </div>
            <div id="myProgress">
                <div id="myBar"></div>
            </div>
        </div>
    );
}

export default Loading;