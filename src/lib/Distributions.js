export function equalDistribution(boxCount) {
	// calculate positions: boxCount boxes with equal distance on positions 0-100. Boxcount includes start and end. If boxCount = 2 -> only start and end box
	let pos = [];
	let step = 100 / (boxCount - 1);
	for (let i = 0; i < boxCount; i++) {
		pos.push(step * i);
	}
	// remove first and last element -> always on the line
	pos.shift();
	pos.pop();
	return pos;
}
export function slowInDist(boxCount) {
	let posList = [50];

	for (let i = 1; i < boxCount - 2; i++) {
		posList.unshift(posList[0] / 2);
	}
	return posList;
}

export function slowOutDist(boxCount) {
	let posList = [50];
	for (let i = 1; i < boxCount - 2; i++) {
		posList.push(50 + posList[posList.length - 1] / 2);
	}
	return posList;
}

export function slowInOutDist(boxCount) {
	let pos = [50];
	for (let i = 0; i < boxCount - 3; i++) {
		if (i % 2 === 0) {
			pos.unshift(pos[0] / 2);
		} else {
			pos.push(50 + pos[pos.length - 1] / 2);
		}
	}
	return pos;
}
