import styled from 'styled-components';
import Fade from 'react-reveal/Fade';

import CopyrightFooter from '~/components/CopyrightFooter';
import Layout from '~/components/layouts/default';
import ImageSlider from '~/components/sliders/Slider';
import ScrollUp from '~/components/ScrollUp';
import { mediaMin } from '~/styles/MediaQueries';
import variables from '~/styles/Variables';

const imageArray = [
  {
    imgUrl: '/static/images/events/1_Landing_Carousel/435_hudson_street',
    imgAlt: '435 Hudson Street - Roof Deck'
  },
  {
    imgUrl: '/static/images/events/1_Landing_Carousel/375_hudson_street',
    imgAlt: '375 Hudson Street'
  },
  {
    imgUrl: '/static/images/events/1_Landing_Carousel/160_varick_street',
    imgAlt: '160 Varick Street'
  },
  {
    imgUrl: '/static/images/events/1_Landing_Carousel/100_aoa',
    imgAlt: '100 Avenue of the Americas'
  },
  {
    imgUrl: '/static/images/events/1_Landing_Carousel/75_varick_street',
    imgAlt: '75 Varick Street - Roof Deck'
  }
];

const PaddingCol = styled.div`
  box-sizing: border-box;
  padding: 0 15px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  ${mediaMin.tabletLandscape`
    padding: 0 40px;
  `}
`;

const Heading = styled.h2`
  font-size: 28px;
  padding: 0 15px 15px;
  font-weight: ${props => (props.bold ? '600' : '500')};
  line-height: 44px;
  letter-spacing: 1px;
  text-align: center;
  margin-bottom: 0;
  ${mediaMin.tabletLandscape`
    font-size: 34px;
    line-height: 30px;
    padding: 40px 15% 0 15%;
  `}
`;
const SubHeading = styled.h3`
  margin-top: 0;
  line-height: 24px;
  padding: 0 15px 15px;
  text-align: left;
  font-weight: 400;
  font-size: 20px;
  text-align: center;
  ${mediaMin.tabletLandscape`
    line-height: 24px;
    padding: 40px 25px 20px 25px;
    width: 50%;
  `}
`;

const EventLink = styled.a`
  text-transform: uppercase;
  line-height: 25px;
  padding: 0 15px 15px;
  text-align: left;
  font-weight: 400;
  font-size: 24px;
  color: ${variables.colors.babyBlue};
  &:visited {
    color: ${variables.colors.babyBlue};
  }
  ${mediaMin.tabletLandscape`
      line-height: 42px;
      text-align: center;
      width: 50%;
    `}
`;

const EventsPage = () => (
  <Layout title="Events">
    <Fade>
      <ImageSlider imgArray={imageArray} showQuotes autoPlay />
    </Fade>
    <Fade>
      <PaddingCol>
        <Heading bold>The Hudson Collective</Heading>
        <SubHeading>
          The Hudson Collective is NYC&apos;s exclusive new combination of six white box, rooftop, and high-end amenity
          spaces offering premier options for all of your event and experiential needs.
        </SubHeading>
        <EventLink href="https://www.hudsoncollective.co/" target="_blank" rel="noopener noreferrer">
          BOOK YOUR NEXT EVENT
        </EventLink>
      </PaddingCol>
    </Fade>
    <ScrollUp />
    <CopyrightFooter />
  </Layout>
);

export default EventsPage;
