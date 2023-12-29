import './utils/style.css';
import { NODE_COLOR, STROKE_COLOR } from './utils/constants';
import { initZoomDrag } from './plugins/zoomDrag';
import { hasPath } from './problems/03_hasPath';

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

  document.body.appendChild(canvas);

  initZoomDrag(canvas);

  const problems = [
    // depthFirst,
    // breathFirst,
    hasPath,
  ];

  problems[0].init();
}

window.onload = init;
