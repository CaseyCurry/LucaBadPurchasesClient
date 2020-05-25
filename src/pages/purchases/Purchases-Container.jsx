import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import actions from "./actions";
import Purchases from "./components/Purchases";

class PurchasesContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.onGetPurchases();
  }

  render() {
    return (
      <Purchases
        arePurchasesLoading={this.props.arePurchasesLoading}
        purchases={this.props.purchases}
        onConfirm={this.props.onConfirm}
        onIgnore={this.props.onIgnore}
        isPurchaseConfirming={this.props.isPurchaseConfirming}
        isPurchaseIgnoring={this.props.isPurchaseIgnoring}
      />
    );
  }
}

PurchasesContainer.propTypes = {
  arePurchasesLoading: PropTypes.bool.isRequired,
  purchases: PropTypes.array.isRequired,
  onGetPurchases: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
  onIgnore: PropTypes.func.isRequired,
  isPurchaseConfirming: PropTypes.bool.isRequired,
  isPurchaseIgnoring: PropTypes.bool.isRequired
};

const mapStateToProps = state => {
  return state.purchases;
};

const mapDispatchToProps = dispatch => {
  return {
    onGetPurchases: () => {
      dispatch(actions.getPurchases());
    },
    onConfirm: purchase => {
      dispatch(actions.confirm(purchase));
    },
    onIgnore: purchase => {
      dispatch(actions.ignore(purchase));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PurchasesContainer);
