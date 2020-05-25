import React from "react";
import PropTypes from "prop-types";
import Loader from "../../../controls/Loader";

class Purchases extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    if (this.props.arePurchasesLoading) {
      return (
        <div className="page">
          <Loader />
        </div>
      );
    }
    return (
      <div className="purchases page">
        {!this.props.purchases.length && (
          <div>You do not have any bad purchases to review!</div>
        )}
        {this.props.purchases.length == true && (
          <div>
            <div className="hidden">{this.props.purchases[0].flagged.id}</div>
            <div>
              {new Date(
                this.props.purchases[0].transaction.date
              ).toLocaleDateString("en", {
                year: "numeric",
                month: "short",
                day: "numeric"
              })}
            </div>
            <div title={this.props.purchases[0].transaction.description}>
              {this.props.purchases[0].transaction.description}
            </div>
            <div>
              {this.props.purchases[0].transaction.categorization.category}
            </div>
            <div>
              {this.props.purchases[0].transaction.categorization.subcategory}
            </div>
            <div>
              ${this.props.purchases[0].transaction.amount.toLocaleString()}
            </div>
            <div className="buttons">
              {this.props.isPurchaseConfirming && (
                <button>
                  confirming
                  <Loader />
                </button>
              )}
              {!this.props.isPurchaseConfirming && (
                <button
                  onClick={e => {
                    this.props.onConfirm(this.props.purchases[0].flagged);
                    e.stopPropagation();
                  }}
                >
                  confirm
                </button>
              )}
              {this.props.isPurchaseIgnoring && (
                <button>
                  ignoring
                  <Loader />
                </button>
              )}
              {!this.props.isPurchaseIgnoring && (
                <button
                  onClick={e => {
                    this.props.onIgnore(this.props.purchases[0].flagged);
                    e.stopPropagation();
                  }}
                >
                  ignore
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    );
  }
}

Purchases.propTypes = {
  arePurchasesLoading: PropTypes.bool.isRequired,
  purchases: PropTypes.array.isRequired,
  onConfirm: PropTypes.func.isRequired,
  onIgnore: PropTypes.func.isRequired,
  isPurchaseConfirming: PropTypes.bool.isRequired,
  isPurchaseIgnoring: PropTypes.bool.isRequired
};

export default Purchases;
