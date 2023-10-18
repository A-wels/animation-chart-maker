import { writable } from 'svelte/store';

export const distribution = writable('Equal');
export const alternate = writable(false);
export const boxCount = writable(2);
export const positions = writable([0]);
export const width = writable('500');
