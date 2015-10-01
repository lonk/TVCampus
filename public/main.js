var socket = io();
var list = [];
var timePhoto = 5000;

socket.on('list', function(msg){
	list = msg.currentList;
});

function core(box, currentPhoto, lastSize, restarted) {
	if(list.length > 0) {

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

		setTimeout(function() { core(box+1, nextPhoto, lastSize, restarted); $("#cont"+box).fadeOut(); }, timePhoto);

	} else {
		setTimeout(function() { core(0, currentPhoto, lastSize, restarted) }, 1000);
	}

}

core(0, 0, 0, false);