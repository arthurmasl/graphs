import { NODES } from '../../utils/store';
import { draw } from '../draw';

export async function drawCurrent(current: string, delay = 200) {
  for (const v of NODES.values()) {
    v.current = false;
  }

  const node = NODES.get(current);
  if (node) {
    node.visited = true;
    node.current = true;
  }

  return new Promise((resolve) => setTimeout(() => resolve(draw()), delay));
}
