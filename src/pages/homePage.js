import React from "react";
import styled from "styled-components";
import BackgroundImage from "../images/home-background.png";
import NeoLogo from "../images/neo-tokyo-logo.png";

const PageContainer = styled.div`
  display: flex;
  height: 100%;
  flex-direction: column;
  justify-content: center;
  background-image: url(${BackgroundImage});
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
`;

const ImageContainer = styled.span`
  display: flex;
  justify-content: center;
  margin-top: 66px;
`;

const Title = styled.span`
  font-family: Orbitron;
  font-style: normal;
  font-weight: 900;
  font-size: 88px;
  line-height: 110px;
  text-align: center;
  letter-spacing: 0.06em;
  color: #ffffff;
`;

const Subtitle = styled.span`
  font-family: Roboto;
  font-style: italic;
  font-weight: normal;
  font-size: 25.8252px;
  line-height: 30px;
  text-align: center;
  color: #ffffff;
  margin-top: 8px;
  margin-bottom: 40px;
`;

const ButtonContainer = styled.span`
  display: flex;
  justify-content: center;
`;

const Logo = styled.img`
  margin-top: 10px;
`;

const LoginButton = styled.a`
  color: white;
  border: 1px solid white;
  background-color: transparent;
  width: 356px;
  height: 54px;
  font-family: Orbitron;
  font-style: normal;
  font-weight: 900;
  font-size: 16px;
  line-height: 20px;
`;

const LinksContainer = styled.div`
  display: flex;
  justify-content: center;
  margin: 20px;
`;

const Link = styled.a`
  color: white;
  margin-left: 25px;
  margin-right: 25px;
  font-family: Roboto;
  font-style: normal;
  font-weight: bold;
  font-size: 16px;
  line-height: 19px;
  text-decoration-line: underline;
`;

export default class HomePage extends React.Component {
  citizenship() {
    // if (!this.state.isAuthenticated) {
      return (
        <div>
          <ButtonContainer>
            <LoginButton
              href={`${process.env.REACT_APP_DISCORD_LINK}`}
            >
              VERIFY YOUR CITIZENSHIP
            </LoginButton>
          </ButtonContainer>
          <LinksContainer>
            <Link href="https://neotokyo.codes/">CODES →</Link>
            <Link href="https://discord.gg/4xnaJaqX">DISCORD →</Link>
            <Link href="https://twitter.com/neotokyonewstv">TWITTER →</Link>
          </LinksContainer>
        </div>
      );
    // }

    // return (
    //   <div>
    //     <ButtonContainer>
    //       <LoginButton onClick={() => this.logout()}>LOGOUT</LoginButton>
    //     </ButtonContainer>
    //     <LinksContainer>
    //       <Link href="https://neotokyo.codes/">CODES →</Link>
    //       <Link href="https://discord.gg/4xnaJaqX">DISCORD →</Link>
    //       <Link href="https://twitter.com/neotokyonewstv">TWITTER →</Link>
    //     </LinksContainer>
    //   </div>
    // );
  }

  render() {
    return (
      <PageContainer>
        <ImageContainer>
          <Logo src={NeoLogo} />
        </ImageContainer>
        <Title>NEO TOKYO NEWS</Title>
        <Subtitle>
          Data streams connecting our minds, tying Neo Tokyo together
        </Subtitle>
        {this.citizenship()}
      </PageContainer>
    );
  }
}
