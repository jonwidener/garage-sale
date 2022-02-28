export const CONDITION = {
  EXCELLENT: 0,
  GOOD: 1,
  FAIR: 2,
  POOR: 3,
};
export const CONDITION_STRING = ['Excellent', 'Good', 'Fair', 'Poor'];
export const CONDITION_BADGE = [
  'badge-success',
  'badge-info',
  'badge-warning',
  'badge-error',
];

export default class ControlUnitModel {
  constructor({
    controlNo = 0,
    itemNo = 0,
    condition = CONDITION.EXCELLENT,
    //cost = 0,
    price = 0,
  } = {}) {
    this.controlNo = controlNo;
    this.itemNo = itemNo;
    this.condition = condition;
    // this.cost = cost;
    this.price = price;
    // probably more
    return this;
  }
}

export function conditionString(quality) {
  return CONDITION_STRING[quality];
}
