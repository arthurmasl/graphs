import { LIST_LENGTH } from '../utils/constants';
import { LIST } from '../utils/store';

export function createGraph() {
  for (let i = 0; i <= LIST_LENGTH; i++) {
    if (i === LIST_LENGTH) {
      LIST.set(`${i}`, []);
      break;
    }

    LIST.set(`${i}`, [`${i + 1}`]);
  }
}
