import { LIST } from '../../utils/store';
import { GraphObject } from '../../utils/types';
import { createNodes, draw } from '../draw';

const defaultGraph: GraphObject = {
  a: ['b', 'c'],
  b: ['d'],
  c: ['e'],
  d: ['f'],
  e: [],
  f: [],
};

export function createGraph(graph = defaultGraph) {
  for (const [name, values] of Object.entries(graph)) {
    LIST.set(name, values);
  }

  createNodes();
  draw();
}

export function createRandomGraph(listLength: number) {
  for (let i = 0; i <= listLength; i++) {
    if (i === listLength) {
      LIST.set(`${i}`, []);
      break;
    }

    LIST.set(`${i}`, [`${i + 1}`]);
  }

  createNodes();
  draw();
}
