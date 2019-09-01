import React, { Component } from 'react';

class Footer extends Component {

  render() {
    return (
        <div className="content t-footer clearfix">
          <div className="container">
            <div className="t-footer-icons text-center text-warning pt-5 pb-5">
              <a href="#" target="_blank" rel="noopener noreferrer"><img className="t-footer-icon" src="../../assets/images/footer-icons.png" alt="icons" /></a>
            </div>
            <div className="t-footer-disclaimer text-center text-white pb-1"><small>Copyright &copy; 2019 T-Shirt Ecommerce by Namrata Bhuva, Inc. All rights reserved.</small></div>
          </div>
        </div>
    )
  }
}

export default Footer;