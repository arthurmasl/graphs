import { createGraph } from '../plugins/graphs/createGraph';

const graph = {
  f: ['g', 'i'],
  g: ['h'],
  h: [],
  i: ['g', 'k'],
  j: ['i'],
  k: [],
};

export const hasPath = {
  init: () => {
    createGraph(graph);
  },
};
