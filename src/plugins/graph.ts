import { LIST, NODES } from '../utils/store';
import { draw } from './draw';

export function createGraph() {
  const graph = {
    a: ['b', 'c'],
    b: ['d'],
    c: ['e'],
    d: ['f'],
    e: [],
    f: [],
  };

  for (const [name, values] of Object.entries(graph)) {
    LIST.set(name, values);
  }
}

export const depthFirstIterator = (
  graph: Map<string, string[]>,
  source: string,
) => ({
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

export async function depthFirstLoop(
  graph: Map<string, string[]>,
  source: string,
) {
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

  return new Promise((resolve) => setTimeout(() => resolve(draw()), 300));
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
