import Fade from 'react-reveal/Fade';

import Context from '~/config/Context';

import ClickSlider from '~/components/sliders/ClickSlider';
import ScrollUp from '~/components/ScrollUp';
import CopyrightFooter from '~/components/CopyrightFooter';
import BrandSpinner from '~/components/pages/buildings/BrandSpinner';
import { buildingsSlider } from '~/data/buildings';
import styled from 'styled-components';
import ResponsiveImage from '~/components/images/ResponsiveImage';
import { mediaMin } from '~/styles/MediaQueries';
import Map from '~/components/Map';

const BuildingsCol = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const PaddingCol = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 0 15px;
  min-height: 1px;
  ${mediaMin.tabletLandscape`
    padding: 0 40px;
  `}
  .responsive-image {
    width: 75%;
    height: 100%;
    max-width: 100%;
    max-height: 100%;
  }
  .react-reveal {
    display: flex;
    justify-content: center;
    min-height: 1px;
  }
`;

const SectionHeader = styled.span`
  line-height: 30px;
  font-size: 20px;
  font-weight: 500;
  width: 100%;
  padding: 12px 0;
  border-bottom: 3px solid black;
  margin-bottom: 30px;
  ${mediaMin.tabletLandscape`
    font-size: 24px;
    line-height: 24px;
    padding: 20px 0;
  `}
`;

const MapContainer = styled.div`
  height: 550px;
  width: 100%;
  margin-top: 30px;
`;

const Buildings = () => (
  <Context.Consumer>
    {context => {
      const width = context.state.windowDimensions.width;
      return (
        <BuildingsCol>
          {width < 1024 ? (
            <PaddingCol>
              <SectionHeader>Buildings</SectionHeader>
            </PaddingCol>
          ) : null}
          <Fade>
            <ClickSlider
              imgArray={buildingsSlider}
              autoPlay={true}
              windowWidth={context.state.windowDimensions.width}
            />
          </Fade>
          <PaddingCol>
            <MapContainer>
              <Map activeFilter="Our Buildings" />
            </MapContainer>
            <Fade>
              <SectionHeader>Our Tenants</SectionHeader>
              <BrandSpinner />
            </Fade>
            <Fade>
              <SectionHeader>Ofice Tenants by Industry</SectionHeader>
              {width > 1024 ? (
                <ResponsiveImage srcPath="static/images/buildings/DesktopTenantChart" imgAlt="Tenants" />
              ) : (
                <ResponsiveImage srcPath="static/images/buildings/MobileTenantChart" imgAlt="Tenants" />
              )}
            </Fade>
          </PaddingCol>
          <ScrollUp />
          <CopyrightFooter />
        </BuildingsCol>
      );
    }}
  </Context.Consumer>
);

export default Buildings;
