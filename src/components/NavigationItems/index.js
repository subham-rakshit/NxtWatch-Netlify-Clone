import {Link, withRouter} from 'react-router-dom'

import {
  FacebookShareButton,
  TwitterShareButton,
  LinkedinShareButton,
} from 'react-share'

import {AiFillHome} from 'react-icons/ai'
import {HiFire} from 'react-icons/hi'
import {SiYoutubegaming} from 'react-icons/si'
import {MdPlaylistAdd} from 'react-icons/md'

import ThemeContext from '../../context/ThemeContext'

import './index.css'

import {
  LeftNavigationContainer,
  NavigationItemsContainer,
  NavItem,
  NavItemText,
  ContactUsSection,
  ContactUsHeading,
  ContactLinkContainer,
  ContactLinkImg,
  ContactUsDescription,
} from './styledComponent'

// ContactUs Section Start -->
const renderContactUsSection = isDark => (
  <ContactUsSection>
    <ContactUsHeading isDark={isDark}>CONTACT US</ContactUsHeading>
    <ContactLinkContainer>
      <li>
        <FacebookShareButton url="https://subhamnxtwatchapp.netlify.app/">
          <ContactLinkImg
            src="https://assets.ccbp.in/frontend/react-js/nxt-watch-facebook-logo-img.png"
            alt="facebook logo"
          />
        </FacebookShareButton>
      </li>
      <li>
        <TwitterShareButton url="https://subhamnxtwatchapp.netlify.app/">
          <ContactLinkImg
            src="https://assets.ccbp.in/frontend/react-js/nxt-watch-twitter-logo-img.png"
            alt="twitter logo"
          />
        </TwitterShareButton>
      </li>
      <li>
        <LinkedinShareButton url="https://subhamnxtwatchapp.netlify.app/">
          <ContactLinkImg
            src="https://assets.ccbp.in/frontend/react-js/nxt-watch-linked-in-logo-img.png"
            alt="linked in logo"
          />
        </LinkedinShareButton>
      </li>
    </ContactLinkContainer>
    <ContactUsDescription isDark={isDark}>
      Enjoy! Now to see your channels and recommendations!
    </ContactUsDescription>
  </ContactUsSection>
)
// ContactUs Section End -->

// Navigation Item Tabs Start -->
const renderNavigationItemsContainer = () => (
  <ThemeContext.Consumer>
    {value => {
      const {isDark, activeTab, changeTab} = value
      const activeTabBg = isDark ? '#313131' : '#e2e8f0'

      const onClickedHomeTab = () => {
        changeTab('Home')
      }

      const onClickedTrendingTab = () => {
        changeTab('Trending')
      }

      const onClickedGamingTab = () => {
        changeTab('Gaming')
      }

      const onClickedSavedTab = () => {
        changeTab('Saved')
      }

      return (
        <NavigationItemsContainer>
          <Link to="/" className="link">
            <NavItem
              onClick={onClickedHomeTab}
              key="home"
              bgColor={activeTab === 'Home' ? activeTabBg : 'none'}
            >
              <AiFillHome
                size="18"
                color={activeTab === 'Home' ? '#ff0000' : '#909090'}
              />
              <NavItemText
                isDark={isDark}
                fontWeight={activeTab === 'Home' ? 'bold' : 'normal'}
              >
                Home
              </NavItemText>
            </NavItem>
          </Link>

          <Link to="/trending" className="link">
            <NavItem
              onClick={onClickedTrendingTab}
              key="trending"
              bgColor={activeTab === 'Trending' ? activeTabBg : 'none'}
            >
              <HiFire
                size="18"
                color={activeTab === 'Trending' ? '#ff0000' : '#909090'}
              />
              <NavItemText
                isDark={isDark}
                fontWeight={activeTab === 'Trending' ? 'bold' : 'normal'}
              >
                Trending
              </NavItemText>
            </NavItem>
          </Link>

          <Link to="/gaming" className="link">
            <NavItem
              onClick={onClickedGamingTab}
              key="gaming"
              bgColor={activeTab === 'Gaming' ? activeTabBg : 'none'}
            >
              <SiYoutubegaming
                size="18"
                color={activeTab === 'Gaming' ? '#ff0000' : '#909090'}
              />
              <NavItemText
                isDark={isDark}
                fontWeight={activeTab === 'Gaming' ? 'bold' : 'normal'}
              >
                Gaming
              </NavItemText>
            </NavItem>
          </Link>

          <Link to="/saved-videos" className="link">
            <NavItem
              onClick={onClickedSavedTab}
              key="saved"
              bgColor={activeTab === 'Saved' ? activeTabBg : 'none'}
            >
              <MdPlaylistAdd
                size="18"
                color={activeTab === 'Saved' ? '#ff0000' : '#909090'}
              />
              <NavItemText
                isDark={isDark}
                fontWeight={activeTab === 'Saved' ? 'bold' : 'normal'}
              >
                Saved videos
              </NavItemText>
            </NavItem>
          </Link>
        </NavigationItemsContainer>
      )
    }}
  </ThemeContext.Consumer>
)
// Navigation Item Tabs End -->

const NavigationItems = () => (
  <ThemeContext.Consumer>
    {value => {
      const {isDark} = value

      return (
        <LeftNavigationContainer isDark={isDark}>
          {renderNavigationItemsContainer()}
          {renderContactUsSection(isDark)}
        </LeftNavigationContainer>
      )
    }}
  </ThemeContext.Consumer>
)

export default withRouter(NavigationItems)
