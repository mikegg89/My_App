import React, { Component } from 'react';
import './topNavBar.css';
import { ThemeProvider } from '@rmwc/theme';
import {
  TopAppBar,
  TopAppBarRow,
  TopAppBarSection,
  TopAppBarNavigationIcon,
  TopAppBarActionItem,
  TopAppBarTitle
} from '@rmwc/top-app-bar';
import '@material/top-app-bar/dist/mdc.top-app-bar.css';

class TopNavBar extends Component {

  constructor(props) {
    super(props);

    this.state = {
        user_name: '',
        first_name: '',
        last_name: '',
      };
  }

  componentDidMount() {
    fetch('/api/profile')
      .then(res => res.json())
      .then((users) => {
        const user_name = (users[0].user_name[0].toUpperCase() + users[0].user_name.slice(1));
        const first_name = (users[0].first_name[0].toUpperCase() + users[0].first_name.slice(1));
        const last_name = (users[0].last_name[0].toUpperCase() + users[0].last_name.slice(1));
        this.setState({ user_name, first_name, last_name });
        }
      ).catch((error) => console.error('no user found'));
  }

  render() {
    return(
      <div className="topNavBar">
        <ThemeProvider options={{
          primary: '#213482',
          secondary: '#7B85AD',
          onPrimary: '#7B85AD',
        }}>
          <TopAppBar>
            <TopAppBarRow>
              <TopAppBarSection alignStart>
                <TopAppBarNavigationIcon icon="menu" />
                <TopAppBarTitle>{this.state.user_name}</TopAppBarTitle>
              </TopAppBarSection>
              <TopAppBarSection alignEnd>
                {(!this.state.user_name) ?
                  <TopAppBarActionItem> Login / Register </TopAppBarActionItem>
                  : <TopAppBarActionItem> Logout </TopAppBarActionItem>
                }
              </TopAppBarSection>
            </TopAppBarRow>
          </TopAppBar>
        </ThemeProvider>
      </div>
    )
  }

}

export default TopNavBar;
