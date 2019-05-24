import React, { Component } from "react";

export default class Donate extends Component {
  render() {
    return (
      <div>
        <div className="row">
          <div className="col mt-5">
            <h1>Donate</h1>
            {/* <h3></h3> */}
            <p className="my-2">
              The Prophet (Peace be upon him) tells us "Whosoever shares in
              building a masjid for Allaah, even if it is as small as a bird's
              nest, Allaah (All praises belong to him) will build for him a
              house in Paradise."
            </p>
            <p className="my-2">
              We use Access ACS for online donations. This allows us to reduce a
              lot of paperwork and donation is directly credited to the cause
              that you specify when you donate.
            </p>
            <p className="my-2">
              The very first time you donate, you will be required to create a
              username and password. Then you can login using the newly created
              username and password to donate using any credit card. You can
              even specify recurring donations using your credit card.
            </p>
            <p className="my-2">
              <a
                href="https://secure.accessacs.com/access/oglogin.aspx?sn=146089"
                className=""
              >
                Donate using Access ACS
              </a>{" "}
              |{" "}
              <a
                href="https://secure.accessacs.com/access/memberlogin.aspx?sn=146089"
                className=""
              >
                Manage your donation account
              </a>
            </p>
            <p className="my-2">
              If you have any questions about donating using Access ACS, please
              contact us via email{" "}
              <a href="fundraising@islam1.org">fundraising@islam1.org</a>.
            </p>
            <p className="my-2">
              You can also fill out a a{" "}
              <a href="https://raleighmasjid.org/files/Updated%20Donor%20Form%202016mIGRATION.pdf">
                pledge form
              </a>{" "}
              for recurring or one time donations
            </p>
            <p className="my-2">
              The Finance and Fundraising team can be contacted at 919 834-9572
              ext 1344
            </p>
            <p className="font-weight-bold my-2">
              May Allah reward you for your generous donation
            </p>
            <p className="font-weight-light my-2">
              The Islamic Center of Raleigh is a non-profit organization with a
              tax exempt 501(c)(3) status
            </p>
          </div>
        </div>
      </div>
    );
  }
}
