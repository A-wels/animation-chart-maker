import { startIndex } from '$lib/stores.js';
export const frameIndexesOption = {
	ones: 'Ones',
	twos: 'Twos',
	threes: 'Threes',
	fours: 'Fours',
	fives: 'Fives'
};
let sIndex = 1;

startIndex.subscribe((val) => {
	sIndex = val;
});
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

export function getFrameIndex(frame, index) {
	let result = 1;
	switch (index) {
		case frameIndexesOption.ones:
			result = frame;
			break;
		case frameIndexesOption.twos:
			result = sIndex + (frame - sIndex) * 2;
			break;
		case frameIndexesOption.threes:
			result = sIndex + (frame - sIndex) * 3;
			break;
		case frameIndexesOption.fours:
			result = sIndex + (frame - sIndex) * 4;
			break;

		case frameIndexesOption.fives:
			result = sIndex + (frame - sIndex) * 5;
			break;
	}
	return result;
}
