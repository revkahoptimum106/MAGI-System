export type Vote = "APPROVE" | "REJECT" | "ABSTAIN";

export type MagiId = "MELCHIOR" | "BALTHASAR" | "CASPER";

export interface MagiResult {
  id: MagiId;
  number: 1 | 2 | 3;
  reasoning: string;
  vote: Vote;
  isCritical?: boolean;
  error?: string;
}

export interface DeliberationResponse {
  results: MagiResult[];
  finalVerdict: Vote | "DEADLOCK";
  topic: string;
}

export interface DeliberationRequest {
  topic: string;
  unit: MagiId;
}

export type PartialResults = Partial<Record<MagiId, MagiResult>>;
