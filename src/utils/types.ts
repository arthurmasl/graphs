export type Node = {
  x: number;
  y: number;
  current: boolean;
  visited: boolean;
};

export type Graph = Map<string, string[]>;
