import {Component} from 'react'

import Cookies from 'js-cookie'
import {Link} from 'react-router-dom'
import Loader from 'react-loader-spinner'
import {formatDistanceToNow} from 'date-fns'

import {HiFire} from 'react-icons/hi'
import {BsDot} from 'react-icons/bs'

import Header from '../Header'
import ThemeContext from '../../context/ThemeContext'
import NavigationItems from '../NavigationItems'
import ApiFailureView from '../ApiFailureView'

import './index.css'

import {
  TrendingMainContainer,
  TrendingContentContainer,
  TrendingVideosRightContainer,
  TrendingVideoHeader,
  HeaderContentArea,
  LogoContainer,
  HeaderText,
  TrendingVideoListsContainer,
  TrendingVideoItemContainer,
  TrendingVideoThumbnailImg,
  TrendingVideoDetailsContainer,
  TrendingVideoTitle,
  TrendingVideoChannelName,
  TrendingVideoViewsContainer,
  TrendingVideoViews,
  ChannelLogoInMobile,
} from './styledComponent'

const apiStatusConstant = {
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN PROGRESS',
  initial: 'INITIAL',
}

class TrendingRoute extends Component {
  state = {trendingVideosData: [], apiStatus: apiStatusConstant.initial}

  componentDidMount() {
    this.getTrendingVideosData()
  }

  // Trending Videos Data API Call Start -->
  getTrendingVideosData = async () => {
    this.setState({apiStatus: apiStatusConstant.inProgress})

    const token = Cookies.get('jwt_token')
    const trendingVideosApiUrl = `https://apis.ccbp.in/videos/trending`
    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      method: 'GET',
    }

    const response = await fetch(trendingVideosApiUrl, options)

    if (response.ok) {
      const data = await response.json()
      const updatedTrendingVideosData = data.videos.map(eachVideoDetails => ({
        name: eachVideoDetails.channel.name,
        profileImageUrl: eachVideoDetails.channel.profile_image_url,
        id: eachVideoDetails.id,
        publishedAt: eachVideoDetails.published_at,
        thumbnailUrl: eachVideoDetails.thumbnail_url,
        title: eachVideoDetails.title,
        viewCount: eachVideoDetails.view_count,
      }))
      //   console.log(updatedTrendingVideosData)
      this.setState({
        trendingVideosData: updatedTrendingVideosData,
        apiStatus: apiStatusConstant.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstant.failure})
    }
  }
  // Trending Videos Data API Call End -->

  render() {
    const {trendingVideosData, apiStatus} = this.state
    const isApiStatusFailure = apiStatus === apiStatusConstant.failure
    return (
      <ThemeContext.Consumer>
        {value => {
          const {isDark} = value

          // After Data fetch Trending Video UI Failure View Start -->
          const onClickedAPIRetry = () => {
            this.getTrendingVideosData()
          }

          const renderTrendingVideoFailureView = () => (
            <ApiFailureView onClickedAPIRetry={onClickedAPIRetry} />
          )
          // After Data fetch Trending Video UI Failure View End -->

          // After Data fetch Trending Video UI Loading View Start -->
          const renderTrendingVideoContentInProgressView = () => (
            <div className="loader-container" data-testid="loader">
              <Loader
                type="ThreeDots"
                color={isDark ? '#f8fafc' : '#1e293b'}
                height="40"
                width="50"
              />
            </div>
          )
          // After Data fetch Trending Video UI Loading View End -->

          // After Data fetch Trending Video UI Success View Start -->
          const renderTrendingVideosSuccessView = () => (
            <TrendingVideoListsContainer>
              {trendingVideosData.map(eachItem => {
                const formatTimeDistance = formatDistanceToNow(
                  new Date(eachItem.publishedAt),
                )

                const timeList = formatTimeDistance.split(' ')

                const formatTime = `${timeList[1]} ${timeList[2]} ago`

                return (
                  <Link
                    to={`/videos/${eachItem.id}`}
                    className="trending-video-link"
                    key={eachItem.id}
                  >
                    <TrendingVideoItemContainer>
                      <TrendingVideoThumbnailImg
                        src={eachItem.thumbnailUrl}
                        alt="video thumbnail"
                      />

                      {/* Video Details ---> */}
                      <TrendingVideoDetailsContainer>
                        <ChannelLogoInMobile
                          src={eachItem.profileImageUrl}
                          alt="channel logo"
                        />
                        <div>
                          <TrendingVideoTitle isDark={isDark}>
                            {eachItem.title}
                          </TrendingVideoTitle>
                          <TrendingVideoChannelName isDark={isDark}>
                            {eachItem.name}
                          </TrendingVideoChannelName>
                          <TrendingVideoViewsContainer>
                            <TrendingVideoViews isDark={isDark}>
                              {eachItem.viewCount} views
                            </TrendingVideoViews>
                            <BsDot
                              size="20"
                              color={isDark ? '#94a3b8' : '#64748b'}
                            />
                            <TrendingVideoViews>
                              {formatTime}
                            </TrendingVideoViews>
                          </TrendingVideoViewsContainer>
                        </div>
                      </TrendingVideoDetailsContainer>
                    </TrendingVideoItemContainer>
                  </Link>
                )
              })}
            </TrendingVideoListsContainer>
          )
          // After Data fetch Trending Video UI Success View End -->

          const renderListOfTrendingVideos = () => {
            switch (apiStatus) {
              case apiStatusConstant.success:
                return renderTrendingVideosSuccessView()
              case apiStatusConstant.inProgress:
                return renderTrendingVideoContentInProgressView()
              case apiStatusConstant.failure:
                return renderTrendingVideoFailureView()
              default:
                return null
            }
          }

          return (
            <TrendingMainContainer>
              <Header />
              <TrendingContentContainer>
                <NavigationItems />
                <TrendingVideosRightContainer
                  isDark={isDark}
                  data-testid="trending"
                >
                  <TrendingVideoHeader
                    isDark={isDark}
                    isApiStatusFailure={isApiStatusFailure}
                  >
                    <HeaderContentArea>
                      <LogoContainer isDark={isDark}>
                        <HiFire size="28" color="#ff0000" />
                      </LogoContainer>
                      <HeaderText isDark={isDark}>Trending</HeaderText>
                    </HeaderContentArea>
                  </TrendingVideoHeader>
                  {renderListOfTrendingVideos()}
                </TrendingVideosRightContainer>
              </TrendingContentContainer>
            </TrendingMainContainer>
          )
        }}
      </ThemeContext.Consumer>
    )
  }
}

export default TrendingRoute
