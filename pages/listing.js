import Router from 'next/router';
import { withRouter } from 'next/router';
import { useContext } from 'react';
import styled from 'styled-components';
import Fade from 'react-reveal/Fade';

import Context from '~/config/Context';
import { buildings } from '~/data/buildings';
import { mediaMin } from '~/styles/MediaQueries';

import Redirect from '~/components/Redirect';
import FloorplanSection from '~/components/pages/listing/FloorplanSection';
import NonResponsiveSlider from '~/components/sliders/NonResponsiveSlider';
import ContactSection from '~/components/pages/listing/ContactSection';
import ScrollUp from '~/components/ScrollUp';
import CopyrightFooter from '~/components/CopyrightFooter';

import { addOrdinalSuffix, insertCommas } from '~/helpers/math';

const ListingWrapper = styled.div`
  margin-top: 10px;
  width: 100%;
  font-family: 'Open Sans', Helvetica, Arial, Verdana, sans-serif;
  .logo-wrapper {
    position: relative;
    display: flex;
    height: 50px;
    align-items: center;
    justify-content: space-between;
    border-bottom: 3px solid black;
    ${mediaMin.tablet`
      justify-content: flex-start;
      height: 70px;
    `}
    .floor-info-mobile {
      position: absolute;
      right: 30px;
      margin: 0;
      font-size: 16px;
      ${mediaMin.tablet`
        display: none;
      `}
    }

    img.building-logo {
      width: 40%;
      max-height: 100%;
      ${mediaMin.tablet`
        width: auto;
        height: 32px;
        margin-right: 25px;
      `}
    }
    i {
      display: block;
      font-size: 1.5rem;
      height: 25px;
      display: none;
      ${mediaMin.tablet`
        display: initial;
      `}
    }
    button {
      position: absolute;
      right: 0;
      width: 20px;
      height: 20px;
      cursor: pointer;
      background: none;
      border: none;
      ${mediaMin.tablet`
        width: 30px;
        height: 30px;
      `}
      &:hover::before,
      &:hover::after {
        background: #369bf7;
      }
      &::before,
      &::after {
        content: '';
        position: absolute;
        height: 2px;
        width: 100%;
        top: 50%;
        left: 0;
        margin-top: -1px;
        background: #000;
      }
      &::before {
        transform: rotate(45deg);
      }
      &::after {
        transform: rotate(-45deg);
      }
    }
  }
  .detail-wrapper {
    display: flex;
    flex-direction: row;
    width: 100%;
    padding: 20px 0;
    .detail-column {
      width: 50%;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      ${mediaMin.tablet`
        width: 25%;
      `} &.mobile {
        ${mediaMin.tablet`
          display: none;
        `}
      }

      &.desktop {
        display: none;
        ${mediaMin.tablet`
          display: flex;
        `}
      }

      .floor-info-desktop {
        display: none;
        margin-top: 0.5em;
        ${mediaMin.tablet`
          display: flex;
        `}
      }

      .detail-column__section {
        margin-bottom: 1em;
        p {
          font-size: 1rem;
          margin: 0;
          ${mediaMin.tablet`
            margin: 0.5em 0;
            font-size: 1.1rem;
          `}
        }
        h2 {
          margin-top: 0;
        }
      }
      img {
        display: block;
        margin: 0 auto;
        max-width: 100%;
        align-self: center;
      }
    }
  }
`;

const Spacer = styled.div`
  ${mediaMin.tablet`
    min-height: 70px;
    width: 100%;
  `}
`;

const Listing = () => {
  const context = useContext(Context);
  const { pageProps } = context;

  const fullAvailabilityData = context.fullAvailabilityData || context.state.appData.fullAvailabilityData;
  const contactData = context.contactData || context.state.appData.contactData;

  const { building, building_slug, suite_floor_slug } = pageProps;

  let listing = fullAvailabilityData.find(obj => {
    return building_slug === obj.acf.building_slug && suite_floor_slug === obj.acf.suite_floor_slug;
  });

  if (listing) {
    let listingID = listing.id;
    listing = listing.acf;

    const listingSliderArray = [listing.photo_1, listing.photo_2, listing.photo_3, listing.photo_4, listing.photo_5]
      .filter(obj => obj)
      .map(obj => {
        return {
          imgUrl: obj.url,
          imgAlt: obj.alt
        };
      });

    const filteredContactData = contactData
      .map(contact => {
        const { full_name, phone_number, email_address } = contact;
        const idArray = [];

        const { associated_listings } = contact;
        associated_listings.length > 0 && associated_listings.forEach(listing => idArray.push(listing.ID));

        return {
          full_name,
          phone_number,
          email_address,
          idArray
        };
      })
      .filter(contact => contact.idArray.includes(listingID));

    const { availability, neighborhood, axon, floor, suite, sqft, views } = listing;

    return (
      <ListingWrapper className="container">
        <Fade>
          <div className="logo-wrapper">
            <img
              className="building-logo"
              src={building.header.headerLogoBlack}
              alt={`Logo for building ${building.navTitle}`}
            />
            <i className="fas fa-map-marker-alt" />
            <h3 className="floor-info-mobile">
              {suite} {floor && `${addOrdinalSuffix(floor)} Floor`}
            </h3>
            <button
              onClick={() => Router.back()}
              aria-label={`Back to building page: ${building.title}`}
              title="Go Back"
            />
          </div>
        </Fade>
        <Fade>
          <div className="detail-wrapper">
            <div className="detail-column mobile">
              <div className="detail-column__section">
                <p>Type: {listing.type}</p>
              </div>
              <div className="detail-column__section">
                <p>Availability:</p>
                <p> {availability}</p>
              </div>
              <div className="detail-column__section">
                <p>Sq. Ft:</p>
                <p> {insertCommas(sqft)} SF</p>
              </div>
              <div className="detail-column__section">
                <p>Neighborhood:</p>
                <p> {neighborhood}</p>
              </div>
              <div className="detail-column__section">
                <p>Views:</p>
                <p> {views}</p>
              </div>
            </div>
            <div className="detail-column desktop">
              <div className="detail-column__section">
                <h2 className="floor-info-desktop">
                  {suite} {floor && `${addOrdinalSuffix(floor)} Floor`}
                </h2>
                <p>Type: {listing.type}</p>
              </div>
              <div className="detail-column__section" />
            </div>
            <div className="detail-column desktop">
              <div className="detail-column__section">
                <p>Availability:</p>
                <p> {availability}</p>
              </div>
              <div className="detail-column__section">
                <p>Sq. Ft:</p>
                <p> {insertCommas(sqft)} SF</p>
              </div>
            </div>
            <div className="detail-column desktop">
              <div className="detail-column__section">
                <p>Neighborhood:</p>
                <p> {neighborhood}</p>
              </div>
              <div className="detail-column__section">
                <p>Views:</p>
                <p> {views}</p>
              </div>
            </div>
            <div className="detail-column">
              <img src={axon} alt={`Axon for ${suite} in ${building.navTitle}`} />
            </div>
          </div>
        </Fade>
        <Fade>
          <FloorplanSection listing={listing} />
        </Fade>
        {listingSliderArray.length > 0 && (
          <Fade>
            <NonResponsiveSlider imgArray={listingSliderArray} />
          </Fade>
        )}
        <Fade>
          <ContactSection contactData={filteredContactData} />
        </Fade>
        <Spacer />
        <ScrollUp />
        <CopyrightFooter />
      </ListingWrapper>
    );
  } else {
    return <Redirect redirectPath="/availabilities" customMsg="Listing does not exist. Redirecting..." />;
  }
};

Listing.getInitialProps = async function(ctx) {
  const { building_slug, suite_floor_slug } = ctx.query;
  const building = buildings.find(building => building.slug === building_slug);

  return {
    building,
    building_slug,
    suite_floor_slug
  };
};

export default withRouter(Listing);
