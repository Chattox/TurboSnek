// Battlesnake API

export interface Coord {
  x: number;
  y: number;
}

export interface Battlesnake {
  id: string;
  name: string;
  health: number;
  body: Coord[];
  head: Coord;
  length: number;
  latency: string;
  shout: string;
  customizations: Customizations;
}

export interface Customizations {
  color: string;
  head: string;
  tail: string;
}

export interface Board {
  height: number;
  width: number;
  food: Coord[];
  hazards: Coord[];
  snakes: Battlesnake[];
}

export interface GameState {
  game: Game;
  turn: number;
  board: Board;
  you: Battlesnake;
}

export interface Game {
  id: string;
  ruleset: Ruleset;
  map: string;
  source: string;
  timeout: number;
}

export interface RulesetSettings {
  foodSpawnChance: number;
  minimumFood: number;
  hazardDamagePerTurn: number;
}

// Response

export interface InfoResponse {
  apiversion: string;
  author?: string;
  color?: string;
  head?: string;
  tail?: string;
  version?: string;
}

export interface MoveResponse {
  move: string;
  shout?: string;
}

// Server

export interface BattlesnakeHandlers {
  info(): InfoResponse;
  start(): void;
  move(gameState: GameState): MoveResponse;
  end(): void;
}

// Utils

export interface Distances {
  distance: number;
  coord: Coord;
}

// Logic

export type MoveDirections = Record<string, boolean>;
