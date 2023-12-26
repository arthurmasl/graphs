import { Node } from './types';

export function draw(
  ctx: CanvasRenderingContext2D,
  nodes: Map<string, Node>,
  list: Map<string, string[]>,
) {
  ctx.clearRect(-1000, -1000, 2000, 2000);
  ctx.fillStyle = '#ccc';
  ctx.fillRect(-1000, -1000, 2000, 2000);

  for (const item of list) {
    const node = nodes.get(item[0])!;

    for (const adjacency of item[1]) {
      const to = nodes.get(adjacency)!;
      drawEdge(ctx, node, to);
    }

    drawNode(ctx, item[0], node.x, node.y);
  }
}

function drawNode(
  ctx: CanvasRenderingContext2D,
  name: string,
  x: number,
  y: number,
) {
  ctx.beginPath();
  ctx.arc(x, y, 30, 0, 2 * Math.PI);
  ctx.fillStyle = '#333';
  ctx.fill();

  ctx.fillStyle = '#fff';
  ctx.textAlign = 'center';
  ctx.fillText(name, x, y + 5);
}

function drawEdge(ctx: CanvasRenderingContext2D, from: Node, to: Node) {
  ctx.beginPath();
  ctx.moveTo(from.x, from.y);
  ctx.lineTo(to.x, to.y);
  ctx.stroke();
}
