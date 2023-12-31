import html2canvas from 'html2canvas';

export function saveChart() {
	let el = document.querySelector('#chart');
	html2canvas(el, { backgroundColor: null }).then((canvas) => {
		saveAs(canvas.toDataURL(), 'chart.png');
	});
}

function saveAs(uri, filename) {
	var link = document.createElement('a');

	if (typeof link.download === 'string') {
		link.href = uri;
		link.download = filename;

		//Firefox requires the link to be in the body
		document.body.appendChild(link);

		//simulate click
		link.click();

		//remove the link when done
		document.body.removeChild(link);
	} else {
		window.open(uri);
	}
}
