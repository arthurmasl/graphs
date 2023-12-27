import { LIST } from '../utils/store';

export function createGraph() {
  LIST.set('A', ['B', 'C']);
  LIST.set('B', ['C', 'D']);
  LIST.set('C', ['E']);
  LIST.set('D', []);
  LIST.set('E', ['B']);
  LIST.set('F', ['D']);
}

function createRandomGraph(listLength: number) {
  for (let i = 0; i <= listLength; i++) {
    if (i === listLength) {
      LIST.set(`${i}`, []);
      break;
    }

    LIST.set(`${i}`, [`${i + 1}`]);
  }
}
