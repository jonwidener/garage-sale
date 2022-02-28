export default class AccountModel {
  constructor({ accountNo = 0, name = '', description = '' } = {}) {
    this.accountNo = accountNo; // internal identifying number
    this.name = name;
    this.description = description;
    // more?

    return this;
  }
}
