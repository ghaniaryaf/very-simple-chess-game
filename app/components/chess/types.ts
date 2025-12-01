export type Piece = {
  type: string;
  color: "w" | "b";
};

export type Square = Piece | null;