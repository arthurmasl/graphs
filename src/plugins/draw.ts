import { Node } from '../utils/types';
import { LIST, NODES } from '../utils/store';
import {
  GAP,
  NODE_COLOR,
  RADIUS,
  SIZE,
  STROKE_COLOR,
} from '../utils/constants';
import { getRandomNumber, isCirclesOverlap } from '../utils/utils';
import { ctx } from '../main';

export async function draw() {
  ctx.fillStyle = '#ccc';
  ctx.fillRect(-SIZE, -SIZE, SIZE * 2, SIZE * 2);

  for (const item of LIST) {
    const node = NODES.get(item[0])!;

    for (const adjacency of item[1]) {
      const to = NODES.get(adjacency)!;
      drawEdge(node, to);
    }
    drawNode(item[0], node);
  }
}

function drawNode(name: string, node: Node) {
  ctx.beginPath();
  ctx.arc(node.x, node.y, RADIUS, 0, 2 * Math.PI);
  if (node.current) {
    ctx.fillStyle = '#326667';
  } else if (node.visited && !node.current) {
    ctx.fillStyle = '#333';
  } else {
    ctx.fillStyle = node.current ? '#0f0' : NODE_COLOR;
  }
  ctx.fill();
  ctx.stroke();

  ctx.beginPath();
  ctx.fillStyle = node.visited ? '#fff' : STROKE_COLOR;
  ctx.fillText(name, node.x, node.y + 5);
}

function drawEdge(from: Node, to: Node) {
  ctx.beginPath();
  ctx.moveTo(from.x, from.y);
  ctx.lineTo(to.x, to.y);
  ctx.stroke();
}

export function createNodes() {
  let prevPos = { x: 0, y: 0 };
  let firstCreated = false;

  for (const [item] of LIST) {
    if (!firstCreated) {
      firstCreated = true;
      createNode(item, 0, 0);
      continue;
    }

    const nodesValues = Array.from(NODES.values());
    let attempts = 0;

    while (attempts < 100) {
      attempts++;

      const randomDistance = getRandomNumber(GAP, GAP * 5);
      const randomAngle = Math.random() * 2 * Math.PI;

      const pos =
        attempts < 30
          ? {
              // x: prevPos.x + GAP * Math.cos(randomAngle),
              // y: prevPos.y + GAP * Math.sin(randomAngle),
              x: prevPos.x + GAP * getRandomNumber(-1, 1),
              y: prevPos.y + GAP * getRandomNumber(-1, 1),
            }
          : {
              x: prevPos.x + randomDistance * Math.cos(randomAngle),
              y: prevPos.y + randomDistance * Math.sin(randomAngle),
            };

      const isOverlap = nodesValues.some((pos2) =>
        isCirclesOverlap(pos as Node, pos2),
      );

      if (!isOverlap) {
        prevPos = pos;
        createNode(item, pos.x, pos.y);
        break;
      }
    }
  }
}

function createNode(
  name: string,
  x: number,
  y: number,
  current = false,
  visited = false,
) {
  const node = {
    x,
    y,
    current,
    visited,
  };

  NODES.set(name, node);
}
