import React, { Component } from 'react';
import Context from '../config/Context';

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
      }
    };
  }
  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }

  updateWindowDimensions = () => {
    this.setState({
      windowDimensions: {
        height: window.innerHeight,
        width: window.innerWidth
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
