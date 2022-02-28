export default class ItemModel {
  constructor({
    itemNo = 0,
    //upc = '',
    name = '',
    description = '',
    tags = [],
    defaultPrice = 0,
  } = {}) {
    this.itemNo = itemNo; // internal identifying number
    //this.upc = upc;
    this.name = name;
    this.description = description;
    this.tags = tags;
    this.defaultPrice = defaultPrice;
    // gonna need more

    return this;
  }
}
