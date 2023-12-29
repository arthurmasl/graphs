import { createGraph } from '../plugins/graphs/createGraph';
import { drawCurrent } from '../plugins/graphs/drawGraph';
import { LIST } from '../utils/store';
import { Graph } from '../utils/types';

async function breathFirstLoop(graph: Graph, source: string) {
  const queue = [source];

  while (queue.length) {
    const current = queue.shift();
    if (!current) break;
    await drawCurrent(current);

    for (const neighbor of graph.get(current)!) {
      queue.push(neighbor);
    }
  }
}

export const breathFirst = {
  init: async () => {
    createGraph();
    await breathFirstLoop(LIST, 'a');
  },
};
