import {Component} from 'react'

import Cookies from 'js-cookie'
import {Link} from 'react-router-dom'
import Loader from 'react-loader-spinner'
import {formatDistanceToNow} from 'date-fns'

import {MdClose} from 'react-icons/md'
import {BsSearch, BsDot} from 'react-icons/bs'

import Header from '../Header'
import ThemeContext from '../../context/ThemeContext'
import NavigationItems from '../NavigationItems'
import ApiFailureView from '../ApiFailureView'

import './index.css'

import {
  HomeMainContainer,
  HomeContentContainer,
  RightContainer,
  PrimeMemberContainer,
  PrimePlansContainer,
  PrimeWebsiteLogo,
  PrimePlanDescription,
  CloseBannerBtn,
  GetItNowBtn,
  HomeVideoListMainContainer,
  SearchButtonContainer,
  SearchBox,
  SearchButton,
  VideoItemListsContainer,
  VideoItemContainer,
  ThumbnailImage,
  VideoDescriptionContainer,
  ChannelLogo,
  VideoDetailsContainer,
  VideoTitleText,
  VideoChannelName,
  ViewsContainer,
  VideoViews,
  FailureContainer,
  FailureImage,
  FailureHeading,
  FailureDescription,
  RetryButton,
} from './styledComponent'

const apiStatusConstant = {
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN PROGRESS',
  initial: 'INITIAL',
}

class HomeRoute extends Component {
  state = {
    searchInput: '',
    videoLists: [],
    apiStatus: apiStatusConstant.initial,
    primeIsVisible: true,
  }

  componentDidMount() {
    this.getVideoListsData()
  }

  // Home Videos Data API Call Start -->
  getVideoListsData = async () => {
    this.setState({apiStatus: apiStatusConstant.inProgress})

    const {searchInput} = this.state
    const token = Cookies.get('jwt_token')
    const homeVideosApiUrl = `https://apis.ccbp.in/videos/all?search=${searchInput}`
    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      method: 'GET',
    }
    const response = await fetch(homeVideosApiUrl, options)

    if (response.ok) {
      const data = await response.json()

      const updatedData = data.videos.map(video => ({
        channel: {
          name: video.channel.name,
          profileImageUrl: video.channel.profile_image_url,
        },
        id: video.id,
        publishedAt: video.published_at,
        thumbnailUrl: video.thumbnail_url,
        title: video.title,
        viewCount: video.view_count,
      }))
      this.setState({
        videoLists: updatedData,
        apiStatus: apiStatusConstant.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstant.failure})
    }
  }
  // Home Videos Data API Call End -->

  // Prime Deal Section Start -->
  removePrimeDealSection = () => {
    this.setState({primeIsVisible: false})
  }

  renderHomeContentPrimeDealSection = () => {
    const {primeIsVisible} = this.state

    return (
      <>
        {primeIsVisible && (
          <PrimeMemberContainer data-testid="banner">
            <PrimePlansContainer>
              <PrimeWebsiteLogo
                src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
                alt="nxt watch logo"
              />
              <PrimePlanDescription>
                Buy Nxt Watch Premium prepaid plans with UPI
              </PrimePlanDescription>
              <GetItNowBtn type="button">GET IT NOW</GetItNowBtn>
            </PrimePlansContainer>
            <CloseBannerBtn
              type="button"
              onClick={this.removePrimeDealSection}
              data-testid="close"
              aria-label="button"
            >
              <MdClose size="20" color="#475569" cursor="pointer" />
            </CloseBannerBtn>
          </PrimeMemberContainer>
        )}
      </>
    )
  }
  // Prime Deal Section End -->

  // Home Search Box Start -->
  updateSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  getSearchVideoItems = () => {
    this.getVideoListsData()
  }

  renderSearchBoxElement = () => {
    const {searchInput} = this.state

    return (
      <ThemeContext.Consumer>
        {value => {
          const {isDark} = value
          return (
            <SearchButtonContainer>
              <SearchBox
                type="search"
                placeholder="Search"
                onChange={this.updateSearchInput}
                value={searchInput}
                isDark={isDark}
              />
              <SearchButton
                type="button"
                aria-label="search-button"
                isDark={isDark}
                onClick={this.getSearchVideoItems}
                data-testid="searchButton"
              >
                <BsSearch size="12" color="#64748b" />
              </SearchButton>
            </SearchButtonContainer>
          )
        }}
      </ThemeContext.Consumer>
    )
  }
  // Home Search Box End -->

  // After Data fetch Home Videos Success View Start -->
  renderHomeVideosContentSuccessView = () => {
    const {videoLists} = this.state

    return (
      <ThemeContext.Consumer>
        {value => {
          const {isDark} = value

          const onClickedRetry = () => {
            this.setState({searchInput: ''}, this.getVideoListsData)
          }

          return (
            <>
              {videoLists.length > 0 ? (
                <VideoItemListsContainer>
                  {videoLists.map(video => {
                    const formatTimeDistance = formatDistanceToNow(
                      new Date(video.publishedAt),
                    )

                    const timeList = formatTimeDistance.split(' ')

                    const formatTime = `${timeList[1]} ${timeList[2]} ago`

                    return (
                      <Link
                        to={`/videos/${video.id}`}
                        className="home-link"
                        key={video.id}
                      >
                        <VideoItemContainer>
                          <ThumbnailImage
                            src={video.thumbnailUrl}
                            alt="video thumbnail"
                          />
                          <VideoDescriptionContainer>
                            <ChannelLogo
                              src={video.channel.profileImageUrl}
                              alt="channel logo"
                            />
                            <VideoDetailsContainer>
                              <VideoTitleText isDark={isDark}>
                                {video.title}
                              </VideoTitleText>
                              <VideoChannelName isDark={isDark}>
                                {video.channel.name}
                              </VideoChannelName>
                              <ViewsContainer>
                                <VideoViews isDark={isDark}>
                                  {video.viewCount} views
                                </VideoViews>
                                <BsDot
                                  size="20"
                                  color={isDark ? '#94a3b8' : '#64748b'}
                                />
                                <VideoViews isDark={isDark}>
                                  {formatTime}
                                </VideoViews>
                              </ViewsContainer>
                            </VideoDetailsContainer>
                          </VideoDescriptionContainer>
                        </VideoItemContainer>
                      </Link>
                    )
                  })}
                </VideoItemListsContainer>
              ) : (
                <FailureContainer>
                  <FailureImage
                    src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-search-results-img.png"
                    alt="no videos"
                  />
                  <FailureHeading isDark={isDark}>
                    No Search results found
                  </FailureHeading>
                  <FailureDescription isDark={isDark}>
                    Try different key words or remove search filter
                  </FailureDescription>
                  <RetryButton type="button" onClick={onClickedRetry}>
                    Retry
                  </RetryButton>
                </FailureContainer>
              )}
            </>
          )
        }}
      </ThemeContext.Consumer>
    )
  }
  // After Data fetch Home Videos Success View End -->

  // After Data fetch Home Videos Failure View Start -->
  onClickedAPIRetry = () => {
    this.getVideoListsData()
  }

  renderHomeVideosContentFailureView = () => (
    <ApiFailureView onClickedAPIRetry={this.onClickedAPIRetry} />
  )
  // After Data fetch Home Videos Failure View End -->

  // After Data fetch Home Videos Loading View Start -->
  renderHomeVideoContentInProgressView = () => (
    <ThemeContext.Consumer>
      {value => {
        const {isDark} = value

        return (
          <div className="loader-container" data-testid="loader">
            <Loader
              type="ThreeDots"
              color={isDark ? '#f8fafc' : '#1e293b'}
              height="40"
              width="50"
            />
          </div>
        )
      }}
    </ThemeContext.Consumer>
  )
  // After Data fetch Home Videos Loading View End -->

  // After Data fetch showcasing Home Videos Views by switch cases -->
  renderHomeVideoListsContentViews = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstant.success:
        return this.renderHomeVideosContentSuccessView()
      case apiStatusConstant.failure:
        return this.renderHomeVideosContentFailureView()
      case apiStatusConstant.inProgress:
        return this.renderHomeVideoContentInProgressView()
      default:
        return null
    }
  }

  render() {
    return (
      <ThemeContext.Consumer>
        {value => {
          const {isDark} = value
          return (
            <HomeMainContainer>
              <Header />
              <HomeContentContainer>
                <NavigationItems />

                <RightContainer isDark={isDark} data-testid="home">
                  {this.renderHomeContentPrimeDealSection()}
                  <HomeVideoListMainContainer>
                    {this.renderSearchBoxElement()}
                    {this.renderHomeVideoListsContentViews()}
                  </HomeVideoListMainContainer>
                </RightContainer>
              </HomeContentContainer>
            </HomeMainContainer>
          )
        }}
      </ThemeContext.Consumer>
    )
  }
}

export default HomeRoute
