import { ctx } from '../main';
import { draw } from './draw';

let lastX = 0;
let lastY = 0;
let isDragging = false;
let scale = 1.0;

export function initZoomDrag(canvas: HTMLElement) {
  canvas.addEventListener('wheel', handleZoom, {
    passive: true,
  });
  canvas.addEventListener('mousedown', handlePanStart);
  canvas.addEventListener('mousemove', handlePanMove);
  canvas.addEventListener('mouseup', handlePanEnd);
  canvas.addEventListener('mouseleave', handlePanEnd);

  canvas.addEventListener(
    'touchstart',
    (event: any) => {
      if (event.touches.length === 1) {
        handlePanStart(event.touches[0]);
      }
    },
    { passive: true },
  );

  canvas.addEventListener(
    'touchmove',
    (event: any) => {
      if (event.touches.length === 1) {
        handlePanMove(event.touches[0]);
      }
    },
    { passive: true },
  );

  canvas.addEventListener('touchend', handlePanEnd);
}

function handleZoom(event: any) {
  if (event.ctrlKey) {
    const delta = event.deltaY * -0.01;
    const zoomSensitivity = 0.3;

    const oldScale = scale;
    scale += delta * zoomSensitivity;
    scale = Math.min(Math.max(0.05, scale), 1.0);
    ctx.scale(scale / oldScale, scale / oldScale);

    draw();
  }
}

function handlePanStart(event: any) {
  isDragging = true;
  lastX = event.clientX;
  lastY = event.clientY;
}

function handlePanMove(event: any) {
  if (isDragging) {
    const deltaX = event.clientX - lastX;
    const deltaY = event.clientY - lastY;

    ctx.translate(deltaX / scale, deltaY / scale);
    lastX = event.clientX;
    lastY = event.clientY;

    draw();
  }
}

function handlePanEnd() {
  isDragging = false;
}
