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

export function isCirclesOverlap(circle1: Node, circle2: Node) {
  const distance = Math.sqrt(
    (circle1.x - circle2.x) ** 2 + (circle1.y - circle2.y) ** 2,
  );
  return distance < RADIUS * 2;
}
