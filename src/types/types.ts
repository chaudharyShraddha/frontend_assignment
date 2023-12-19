export type Player = {
  name: string;
  age: number;
};

export type Team = {
  team_name: string;
  players: Player[];
};

export type Game = {
  game: string;
  teams: Team[];
};
