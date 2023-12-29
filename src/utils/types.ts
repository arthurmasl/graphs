export type Node = {
  x: number;
  y: number;
  current: boolean;
  visited: boolean;
};

export type GraphObject = Record<string, string[]>;
export type Graph = Map<string, string[]>;
