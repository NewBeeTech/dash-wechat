/**
 * @flow
 */
import React, { PropTypes } from 'react';
import * as Immutable from 'immutable';
import * as styles from './../assets/stylesheets/bash.css'

class SignUpButton extends React.PureComponent {
  static propTypes = {
    buttonText: PropTypes.string.isRequired,
    status: PropTypes.bool.isRequired,
    returnAction: PropTypes.func,
    paymentAction: PropTypes.func,
  };
  render() {
    return (
      <div className={styles.SignUpButton}>
          <div className={styles.returnButton}
             onClick={() => this.props.returnAction()}
          >
              <img src={'../assets/images/return.png'} style={{ marginLeft: '15vw' }}/>
          </div>
          <div className={this.props.status ? styles.buttonIsOk : styles.buttonIsNo}
              onClick={() => this.props.paymentAction()}
          >
             <div className={styles.buttonText}>{this.props.buttonText}</div>
          </div>
      </div>
    );
  }
}

export default SignUpButton;
