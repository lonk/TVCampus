var socket = io();
var list = [];
var nbImages = 3;
var nbVideos = 2;
var timePhoto = 2000;

var videos = ['A Vine about How to export a Vine clip to mp4 video movie file.mp4'];

socket.on('list', function(msg){
	list = msg.currentList;
});

function core(i, box, currentPhoto, lastSize, restarted) {
	if(list.length > 0) {
		console.log(i);
		if(i == nbImages+nbVideos) next = 1;
		else next = i+1;

		if(i > nbImages) {
			var cont = document.createElement("video");
			cont.className = 'cont';
			cont.id = 'cont'+box;
			cont.src = 'video/'+videos[0];
			document.body.appendChild(cont);
			$("#cont"+box).hide();
			$("#cont"+box).fadeIn();



			setTimeout(function() { core(next, box+1, currentPhoto, lastSize, restarted); $("#cont"+box).fadeOut();}, 1000);
		} else {
			var cont = document.createElement("div");
			cont.className = 'cont';
			cont.id = 'cont'+box;
			cont.style.backgroundImage = 'url("'+list[currentPhoto]+'")';
			document.body.appendChild(cont);
			$("#cont"+box).hide();
			$("#cont"+box).fadeIn();

			if(lastSize == 0) lastSize = list.length;
			if(lastSize > list.length) {
				if(currentPhoto+1 < list.length) nextPhoto = currentPhoto+1;
				else nextPhoto = 0;
				lastSize = list.length;
			}
			else if(lastSize < list.length && restarted) {
				nextPhoto = lastSize;
				restarted = false;

				console.log('GOTO');

				lastSize = list.length;
			} else if(currentPhoto+1 < list.length) nextPhoto = currentPhoto+1;
			else { 
				nextPhoto = 0;
				restarted = true;
			}

			if(restarted) console.log('Go ?');

			setTimeout(function() { core(next, box+1, nextPhoto, lastSize, restarted); $("#cont"+box).fadeOut(); }, timePhoto);
		}

	} else {
		setTimeout(function() { core(1, 0, currentPhoto, lastSize, restarted) }, 1000);
	}

}

core(1, 0, 0, 0, false);