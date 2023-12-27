import { LIST, NODES } from '../utils/store';
import { Graph } from '../utils/types';
import { draw } from './draw';

export function createGraph() {
  // const graph = {
  //   a: ['b', 'c'],
  //   b: ['d'],
  //   c: ['e'],
  //   d: ['f'],
  //   e: [],
  //   f: [],
  // };
  //
  // for (const [name, values] of Object.entries(graph)) {
  //   LIST.set(name, values);
  // }

  createRandomGraph(1000);
}

export async function drawGraph() {
  // for (const node of depthFirstIterator(LIST, 'a')) {
  //   await drawCurrent(node);
  // }
  // await depthFirstLoop(LIST, 'a');
  await breathFirstLoop(LIST, '0');
}

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

export async function drawCurrent(current: string) {
  for (const v of NODES.values()) {
    v.current = false;
  }

  const node = NODES.get(current);
  if (node) {
    node.visited = true;
    node.current = true;
  }

  return new Promise((resolve) => setTimeout(() => resolve(draw()), 10));
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
