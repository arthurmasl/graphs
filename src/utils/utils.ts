import { Node } from './types';
import { RADIUS } from '../utils/constants';

export function getRandomNumber(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function getRandomColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

export function isCirclesColliding(circle1: Node, circle2: Node) {
  const dx = circle1.x - circle2.x;
  const dy = circle1.y - circle2.y;
  const distance = Math.sqrt(dx * dx + dy * dy);

  return distance < 100;
}

export function isCirclesOverlap(circle1: Node, circle2: Node) {
  const x1 = circle1.x;
  const y1 = circle1.y;
  const radius1 = RADIUS;

  const x2 = circle2.x;
  const y2 = circle2.y;
  const radius2 = RADIUS;

  const distanceBetweenCenters = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);

  return distanceBetweenCenters < radius1 + radius2;
}
