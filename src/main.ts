import './utils/style.css';
import { NODE_COLOR, STROKE_COLOR } from './utils/constants';
import { createNodes, draw } from './plugins/draw';
import { initZoomDrag } from './plugins/zoomDrag';
import {
  createGraph,
  depthFirst,
  depthFirstIterator,
  drawCurrent,
} from './plugins/graph';
import { LIST } from './utils/store';

export let ctx: CanvasRenderingContext2D;

async function init() {
  const canvas = document.createElement('canvas');
  ctx = canvas.getContext('2d', {
    alpha: false,
  }) as CanvasRenderingContext2D;

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  ctx.translate(canvas.width / 2, canvas.height / 2);
  ctx.textAlign = 'center';
  ctx.font = '20px Arial';
  ctx.lineWidth = 3;
  ctx.fillStyle = NODE_COLOR;
  ctx.strokeStyle = STROKE_COLOR;

  createGraph();
  createNodes();

  document.body.appendChild(canvas);

  initZoomDrag(canvas);
  draw();

  for (const node of depthFirstIterator(LIST, 'a')) {
    await drawCurrent(node);
  }
}

window.onload = init;
