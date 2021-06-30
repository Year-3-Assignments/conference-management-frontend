import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getPayments } from '../../../actions/paymentActions';
import Payment from '../../../components/payment/payment';

class UserPayments extends Component {
  constructor(props) {
    super(props);
    this.state = {
      paymentDetails: []
    }
  }

  componentDidMount() {
    if (localStorage.getItem('token') !== null && 
      localStorage.getItem('role') === 'ROLE_ADMIN') {
      this.props.getPayments();
    }
  }

  componentWillReceiveProps = nextProps => {
    if (this.props.payments !== nextProps.payments) {
      this.setState({ paymentDetails: nextProps.payments });
    }
  }

  render() {
    return (
      <div className="card p-3">
        <h3 className="payment-title">Recent Payments</h3>
        {this.state.paymentDetails && this.state.paymentDetails.length > 0 ?
          <div>
            {this.state.paymentDetails.slice(0, 5).map((payment, index) => (
              <div key={index}>
                <Payment 
                  image={payment.attendee.imageurl} 
                  firstName={payment.attendee.firstname}
                  lastName={payment.attendee.lastname}
                  amount={payment.amount}
                  date={payment.createdAt}
                />
              </div>
            ))}
          </div>
        :
          null
        }
      </div>
    );
  }
}

const mapStateToProps = state =>({
  payments: state.paymentReducer.getallpayments
});

const mapDispatchToProps = dispatch =>({
  getPayments: () => {
    dispatch(getPayments());
  }
});

export default connect(mapStateToProps,mapDispatchToProps)(UserPayments);