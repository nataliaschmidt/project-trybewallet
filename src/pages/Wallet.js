import React from 'react';
import { connect } from 'react-redux';
import { BsFillMoonFill, BsFillSunFill } from 'react-icons/bs';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Table from '../components/Table';
import WalletForm from '../components/WalletForm';
import { toggleThemeAction } from '../redux/actions';
import '../style/Wallet.css';

class Wallet extends React.Component {
  render() {
    const { dispatch, theme } = this.props;
    return (
      <>
        <div className="container-top">
          <button
            data-testid="theme-button"
            type="button"
            onClick={ () => dispatch(toggleThemeAction()) }
            className="theme-button"
          >
            {
              theme === 'light' ? <BsFillMoonFill className="icon-theme-dark" />
                : <BsFillSunFill className="icon-theme-light" />

            }

          </button>
          <Header />
          <WalletForm />
        </div>
        <Table />
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  theme: state.toggleTheme.theme,
});

Wallet.propTypes = {
  theme: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect(mapStateToProps)(Wallet);
