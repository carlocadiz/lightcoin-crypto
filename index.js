class Account {

  constructor(username) {
    this.username = username;
    this.transactions = [];
    //this.balance = 0;
  }

  get balance() {
    // Calculate the balance using the transaction objects.
    let balance= 0;
    this.transactions.forEach(function(transaction){
      balance += transaction.value;
    })
    return balance;
  }

  addTransactions(transaction){
    this.transactions.push(transaction);
  }
}


class Transaction {
  constructor(amount, account){
    this.amount = amount;
    this.account = account;
  }

  isAllowed() {

    console.log(this.account.balance);
    console.log(this.value);
    return (this.account.balance + this.value  >=  0);

  }

  commit(){
    //Keep track of the time of the transaction
    this.time = new Date();
    //Add the transaction to the account
    if (this.isAllowed()){
      this.account.addTransactions(this);
    } else {
      console.log('Insufficient funds to complete transaction')
    }

  }


}


class Withdrawal extends Transaction {

  get value() {
    return -this.amount
  }

}

class Deposit extends Transaction {

  get value(){
    return this.amount;
  }
}





// DRIVER CODE BELOW
// We use the code below to "drive" the application logic above and make sure it's working as expected


const myAccount = new Account('carlo');
console.log('Starting Balance: ',myAccount.balance);

const t1 = new Deposit(120.00, myAccount);
t1.commit();

const t2 = new Withdrawal(150.00, myAccount);
t2.commit();

const t3 = new Withdrawal(100.00, myAccount);
t3.commit();

console.log('Ending Balance: ', myAccount.balance);
