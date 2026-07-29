export type LogicCellType = {
  t: boolean,
  f: boolean,
  c: boolean,
};

export type LogicRodType = LogicCellType[];

export type OrGateValueType = 'none' | 'set' | 'reset'

export type LogicRodGroupType = {
  orGateValue: OrGateValueType,
  reset: LogicRodType,
  set: LogicRodType
};

export type FlipFlopType = (0 | 1);

export type DigiCompType = {
  width: number,
  height: number,
  flipFlops: FlipFlopType[],
  rodGroups: LogicRodGroupType[]
};