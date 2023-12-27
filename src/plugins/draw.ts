import { Node } from '../utils/types';
import { LIST, NODES } from '../utils/store';
import {
  GAP,
  NODE_COLOR,
  RADIUS,
  SIZE,
  STROKE_COLOR,
} from '../utils/constants';

export function draw(ctx: CanvasRenderingContext2D) {
  ctx.fillStyle = '#ccc';
  ctx.fillRect(-SIZE, -SIZE, SIZE * 2, SIZE * 2);

  for (const item of LIST) {
    const node = NODES.get(item[0])!;

    for (const adjacency of item[1]) {
      const to = NODES.get(adjacency)!;
      drawEdge(ctx, node, to);
    }
    drawNode(ctx, item[0], node);
  }
}

function drawNode(ctx: CanvasRenderingContext2D, name: string, node: Node) {
  ctx.beginPath();
  ctx.arc(node.x, node.y, RADIUS, 0, 2 * Math.PI);
  ctx.fillStyle = NODE_COLOR;
  ctx.fill();
  ctx.stroke();

  ctx.beginPath();
  ctx.fillStyle = STROKE_COLOR;
  ctx.fillText(name, node.x, node.y + 5);
}

function drawEdge(ctx: CanvasRenderingContext2D, from: Node, to: Node) {
  ctx.beginPath();
  ctx.moveTo(from.x, from.y);
  ctx.lineTo(to.x, to.y);
  ctx.stroke();
}

export function createNodes() {
  let prevPos = { x: 0, y: 0 };

  for (const [item] of LIST) {
    const pos = { x: 0, y: 0 };
    const randomDistance = GAP / 2;
    const randomAngle = Math.random() * 2 * Math.PI;

    pos.x = prevPos.x + randomDistance * Math.cos(randomAngle);
    pos.y = prevPos.y + randomDistance * Math.sin(randomAngle);

    prevPos = pos;
    createNode(item, pos.x, pos.y);
  }
}

function createNode(name: string, x: number, y: number) {
  const node = {
    x,
    y,
  };

  NODES.set(name, node);
}
