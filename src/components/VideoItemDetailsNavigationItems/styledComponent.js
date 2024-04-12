import styled from 'styled-components'

export const LeftNavigationContainer = styled.div`
  width: 20%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: ${props => (props.isDark ? '#231f20' : '#f1f5f9')};
  padding-bottom: 20px;
  @media screen and (max-width: 767px) {
    display: none;
  }
  @media screen and (min-width: 992px) {
    width: 16%;
  }
`
export const NavigationItemsContainer = styled.ul`
  list-style-type: none;
  padding-left: 0;
  display: flex;
  flex-direction: column;
  margin-top: 0;
  gap: 5px;
`
export const NavItem = styled.li`
  background-color: ${props => props.bgColor};
  border: none;
  outline: none;
  width: 100%;
  display: flex;
  align-items: center;
  gap: 18px;
  padding: 0 12px;
  cursor: pointer;
`
export const NavItemText = styled.h1`
  color: ${props => (props.isDark ? '#f9f9f9' : '#231f20')};
  font-size: 13px;
  font-weight: normal;
  font-family: 'Roboto';
`
export const ContactUsSection = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 12px;
  gap: 15px;
`
export const ContactUsHeading = styled.p`
  color: ${props => (props.isDark ? '#cbd5e1' : '#1e293b')};
  font-size: 16px;
  font-weight: 500;
  font-family: 'Roboto';
  margin-bottom: 10px;
`
export const ContactLinkContainer = styled.div`
  display: flex;
  align-items: center;
  list-style-type: none;
  padding-left: 0;
  gap: 12px;
  margin-top: 0;
  margin-bottom: 0;
`
export const ContactLinkImg = styled.img`
  width: 28px;
  cursor: pointer;
`
export const ContactUsDescription = styled.p`
  color: ${props => (props.isDark ? '#cbd5e1' : '#1e293b')};
  font-size: 14px;
  font-weight: 500;
  font-family: 'Roboto';
  margin-top: 0;
`
