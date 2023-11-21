import { writable } from 'svelte/store';

export const distribution = writable('Equal');
export const alternate = writable(false);
export const boxCount = writable(2);
export const positions = writable([0]);
export const width = writable('500');
export const startIndex = writable(1);
export const frameIndexes = writable('Ones');
export const rotate = writable(false);
export const flip = writable(false);
