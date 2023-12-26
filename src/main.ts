import './style.css';
import { draw } from './draw';
import { initZoomDrag } from './zoomDrag';
import { Node } from './types';
import { getRandomNumber, isCirclesColliding } from './utils';

const INTERVAL = 1000 / 60;
const GAP = 150;

let ctx: CanvasRenderingContext2D;
let lastTime = 0;
let deltaTime = 0;

const nodes = new Map<string, Node>();
const list = new Map<string, string[]>();

function init() {
  const canvas = document.createElement('canvas');
  ctx = canvas.getContext('2d') as CanvasRenderingContext2D;

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  ctx.translate(canvas.width / 2, canvas.height / 2);

  ctx.font = '20px Arial';
  ctx.lineWidth = 3;
  ctx.strokeStyle = '#333';

  list.set('A', ['B']);
  list.set('B', ['C']);
  list.set('C', ['D']);
  list.set('D', ['E']);
  list.set('E', ['F']);
  list.set('F', []);

  for (const [item] of list) {
    const nodesValues = Array.from(nodes.values());
    const pos = { x: 0, y: 0 };

    while (!nodesValues.every((pos2) => !isCirclesColliding(pos, pos2))) {
      pos.x = getRandomNumber(-GAP, GAP);
      pos.y = getRandomNumber(-GAP, GAP);
    }

    createNode(item, pos.x, pos.y);
  }

  document.body.appendChild(canvas);
  initZoomDrag(canvas, ctx);

  requestAnimationFrame(loop);
}

function loop(timeStamp: number) {
  deltaTime = timeStamp - lastTime;

  if (deltaTime > INTERVAL) {
    draw(ctx, nodes, list);
    lastTime = timeStamp - (deltaTime % INTERVAL);
  }

  requestAnimationFrame(loop);
}

function createNode(name: string, x: number, y: number) {
  const node = {
    x,
    y,
  };

  nodes.set(name, node);
}

window.onload = init;
