import React, { Component } from 'react';
import Context from '../config/Context';

const devArticle = {
  title: 'Hudson Square Properties presents the brand-new rooftop at 75 Varick Street to tenants',
  body:
    'From January 22-24, Hudson Square Properties presented the brand-new rooftop of 75 Varick Street to our tenants with a multi-day activation.<br/><br/>During the three-day activation, Hudson Square Properties provided attendees with a variety of experiences to welcome tenants into their new amenity space, where tenant employees can relax, do work, or participate in the complimentary fitness program we offer!<br/><br/>On the first day, 725 attendees showed up and could enjoy a health and wellness workshop, make their own Acai bowl, and book a 10-minute chair massage. On the second day, 875 attendees came to meet coffee artists, get Glazed & Confused hand-crafted donuts, get a Theragun massage, or book an appointment for a 20-minute NuCalm sleep treatment. Day 3 saw 925 attendees who enjoyed the VR bike simulators, Theragun massagers, bagels and a variety of spreads and fresh pressed juices. All of the events were captured by the over 2,000 attendees in a fun, graphic photobooth.<br/><br/>Hudson Square Properties also provides health & wellness driven amenities to tenants with Fitspot Wellness—our exclusive amenities provider, creating an engaging and community-focused work environment—and also offer eight weekly complimentary fitness classes for our tenants!<br/><br/>To see all the fun, check out this video!<br/><br/><iframe src="https://player.vimeo.com/video/390527143" width="100%" height="802" frameborder="0" allow="autoplay; fullscreen" allowfullscreen></iframe><p><a href="https://vimeo.com/390527143">75 Varick Rooftop Grand Opening</a> from <a href="https://vimeo.com/user108485424">Hudson Square</a> on <a href="https://vimeo.com">Vimeo</a>.</p>',
  image_1: {
    ID: 1421,
    id: 1421,
    title: 'Hudson_Square_Canvas1',
    filename: 'Hudson_Square_Canvas1.jpg',
    filesize: 1726932,
    url: 'https://eblasts.s3.amazonaws.com/misc/HSP/temp.jpg',
    link: 'https://cms.dbox.com/hsp_news/vivvi-coming-to-75-varick-street/vivvi_01/',
    alt: 'Reception desk at Vivvi, with Vivvi logo displayed on background wall'
  },
  image_2: false,
  image_3: false,
  image_4: false,
  image_5: false,
  preview_image: '1'
};

class ContextProvider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      windowDimensions: {
        height: null,
        width: ''
      },
      navigation: {
        mobileNavActive: false,
        desktopNavActive: false,
        buildingNavActive: false,
        activeSubNav: ''
      },
      appData: {
        browserName: '',
        availabilityData: [],
        newsData: [],
        pressData: [],
        contactData: []
      }
    };
  }
  componentDidMount() {
    this.updateWindowDimensions();
    this.addInitialDataToState();
    window.addEventListener('resize', this.updateWindowDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }

  addInitialDataToState() {
    const { browserName, availabilityData, fullAvailabilityData, contactData, newsData, pressData } = this.props;

    newsData.unshift(devArticle);

    const dataObj = {
      browserName,
      availabilityData,
      contactData,
      newsData,
      pressData,
      fullAvailabilityData
    };

    this.setState({ appData: dataObj });
  }

  updateWindowDimensions = () => {
    const height = window.innerHeight || Math.max(document.documentElement.clientHeight, document.body.clientHeight);
    const width = window.innerWidth || Math.max(document.documentElement.clientWidth, document.body.clientWidth);
    {
      /* eslint-disable */
    }
    console.log(height, width);
    this.setState({
      windowDimensions: {
        height,
        width
      }
    });
  };

  render() {
    return (
      <Context.Provider
        value={{
          ...this.props,
          state: this.state,
          openMobileNav: () =>
            this.setState({
              navigation: {
                ...this.state.navigation,
                mobileNavActive: true
              }
            }),
          closeMobileNav: () =>
            this.setState({
              navigation: {
                ...this.state.navigation,
                mobileNavActive: false
              }
            }),
          toggleDesktopNav: () =>
            this.setState({
              navigation: {
                ...this.state.navigation,
                desktopNavActive: !this.state.navigation.desktopNavActive
              }
            }),
          toggleBuildingNav: (boolean = undefined) =>
            this.setState({
              navigation: {
                ...this.state.navigation,
                buildingNavActive: boolean || !this.state.navigation.buildingNavActive
              }
            }),
          toggleSubNav: section => {
            let activeSection = this.state.navigation.activeSubNav === section ? false : section;
            this.setState({
              navigation: {
                ...this.state.navigation,
                activeSubNav: activeSection
              }
            });
          }
        }}
      >
        {this.props.children}
      </Context.Provider>
    );
  }
}

export default ContextProvider;
