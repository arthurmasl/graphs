import { createGraph } from '../plugins/graphs/createGraph';
import { drawCurrent } from '../plugins/graphs/drawGraph';
import { LIST } from '../utils/store';
import { Graph } from '../utils/types';

const graph = {
  f: ['g', 'i'],
  g: ['h'],
  h: [],
  i: ['g', 'k'],
  j: ['i'],
  k: [],
};

const hasPathDepth = async (graph: Graph, src: string, dst: string) => {
  await drawCurrent(src);
  if (src === dst) return true;

  for (const neighbor of graph.get(src)!) {
    if ((await hasPathDepth(graph, neighbor, dst)) === true) {
      return true;
    }
  }

  return false;
};

const hasPathBreath = async (graph: Graph, src: string, dst: string) => {
  const queue = [src];

  while (queue.length) {
    const current = queue.shift()!;
    await drawCurrent(current);

    if (current === dst) return true;

    for (const neighbor of graph.get(current)!) {
      queue.push(neighbor);
    }
  }

  return false;
};

export const hasPath = {
  init: async () => {
    createGraph(graph);
    // const res = await hasPathDepth(LIST, 'f', 'k');
    await hasPathBreath(LIST, 'f', 'k');
  },
};
