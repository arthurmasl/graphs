import { createGraph } from '../plugins/graphs/createGraph';
import { drawCurrent } from '../plugins/graphs/drawGraph';
import { LIST } from '../utils/store';
import { Graph } from '../utils/types';

export const depthFirstIterator = (graph: Graph, source: string) => ({
  [Symbol.iterator]: function* () {
    function* traverse(node: string): IterableIterator<string> {
      yield node;

      for (const neighbor of graph.get(node)!) {
        yield* traverse(neighbor);
      }
    }

    yield* traverse(source);
  },
});

export async function depthFirstLoop(graph: Graph, source: string) {
  const stack = [source];

  while (stack.length) {
    const current = stack.pop();
    if (!current) break;
    await drawCurrent(current);

    for (let neighbor of graph.get(current)!) {
      stack.push(neighbor);
    }
  }
}

export const depthFirst = {
  init: async () => {
    createGraph();
    for (const node of depthFirstIterator(LIST, 'a')) {
      await drawCurrent(node, 200);
    }
    // await depthFirstLoop(LIST, 'a');
  },
};
