const initialState = Object.freeze({
  arePurchasesLoading: false,
  purchases: [],
  isPurchaseConfirming: false,
  isPurchaseIgnoring: false
});

export default (state = initialState, action) => {
  switch (action.type) {
    case "GET_PURCHASES_PENDING": {
      return Object.assign({}, state, {
        arePurchasesLoading: true
      });
    }
    case "GET_PURCHASES_REJECTED": {
      return Object.assign({}, state, {
        arePurchasesLoading: false
      });
    }
    case "GET_PURCHASES_FULFILLED": {
      const purchases = action.payload.transactions
        .sort((x, y) => new Date(y.date) - new Date(x.date))
        .map(transaction => {
          const purchase = action.payload.purchases.find(
            purchase => purchase.id === transaction.id
          );
          return {
            flagged: purchase,
            transaction
          };
        });
      return Object.assign({}, state, {
        arePurchasesLoading: false,
        purchases
      });
    }
    case "CONFIRM_PENDING": {
      return Object.assign({}, state, { isPurchaseConfirming: true });
    }
    case "CONFIRM_REJECTED": {
      return Object.assign({}, state, { isPurchaseConfirming: false });
    }
    case "CONFIRM_FULFILLED": {
      const purchases = state.purchases.slice();
      purchases.shift();
      return Object.assign({}, state, {
        isPurchaseConfirming: false,
        purchases
      });
    }
    case "IGNORE_PENDING": {
      return Object.assign({}, state, { isPurchaseIgnoring: true });
    }
    case "IGNORE_REJECTED": {
      return Object.assign({}, state, { isPurchaseIgnoring: false });
    }
    case "IGNORE_FULFILLED": {
      const purchases = state.purchases.slice();
      purchases.shift();
      return Object.assign({}, state, {
        isPurchaseIgnoring: false,
        purchases
      });
    }
  }

  return state;
};
