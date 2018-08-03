/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const React = require('react');

const CompLibrary = require('../../core/CompLibrary.js');
const MarkdownBlock = CompLibrary.MarkdownBlock; /* Used to read markdown */
const Container = CompLibrary.Container;
const GridBlock = CompLibrary.GridBlock;

const siteConfig = require(process.cwd() + '/siteConfig.js');

function imgUrl(img) {
  return siteConfig.baseUrl + 'img/' + img;
}

function docUrl(doc, language) {
  return siteConfig.baseUrl + 'docs/' + (language ? language + '/' : '') + doc;
}

function pageUrl(page, language) {
  return siteConfig.baseUrl + (language ? language + '/' : '') + page;
}

class Button extends React.Component {
  render() {
    return (
      <div className="pluginWrapper buttonWrapper">
        <a className="button" href={this.props.href} target={this.props.target}>
          {this.props.children}
        </a>
      </div>
    );
  }
}

Button.defaultProps = {
  target: '_self',
};

const SplashContainer = props => (
  <div className="homeContainer">
    <div className="homeSplashFade">
      <div className="wrapper homeWrapper">{props.children}</div>
    </div>
  </div>
);

const Logo = props => (
  <div className="projectLogo">
    <img src={props.img_src} />
  </div>
);

const ProjectTitle = props => (
  <h2 className="projectTitle">
    <img src={"img/ihmc-logo-black.png"} />
    <small>{siteConfig.tagline}</small>
  </h2>
);

const PromoSection = props => (
  <div className="section promoSection">
    <div className="promoRow">
      <div className="pluginRowBlock">{props.children}</div>
    </div>
  </div>
);

class HomeSplash extends React.Component {
  render() {
    let language = this.props.language || '';
    return (
      <SplashContainer>
      <div className="inner">
        <ProjectTitle />
        <PromoSection>
            <Button href={docUrl('https://github.com/ihmcrobotics', language)}>Github</Button>
        </PromoSection>
        </div>
      </SplashContainer>
    );
  }
}

const Block = props => (
  <Container
    padding={['bottom', 'top']}
    id={props.id}
    background={props.background}>
    <GridBlock align="center" contents={props.children} layout={props.layout} />
  </Container>
);

const TryOut = props => (
  <Block id="try">
    {[
      {
        content: (
        'Our  [GitHub repository](https://github.com/ihmcrobotics) is part of the IHMC Robotics Open Source '
        +'initiative which consists of providing open access to resources and '
        +'knowledge that we have developed over the years for our fellow researchers, '
        +'scientists, engineers, and hobbyists in an effort to advance the field of '
        +'robotics.'
        ),
        image: imgUrl('ihmc-atlas.jpg'),
        imageAlign: 'left',
        title: 'Try it Out',
      },
    ]}
  </Block>
);

const LearnHow = props => (
  <Block background="light">
    {[
      {
        content: 'Our tools and algorithms are targeted at the many research labs' +
         ' that are interested in perception and planning, high level control, '+
          'operator interfaces, and other research areas, but do not have expertise '+
           'in bipedal walking and whole body control. But also to control experts '+
           'that are interested in developing robot simulations in java in a user '+
           'friendly environment. [Get started](https://ihmcroboticsdocs.github.io/docs/quickstarthome.html) or view our [documentation](https://ihmcrobotics.github.io/docs/docshome.html) to learn ' +
           'more about our software.',
        image: imgUrl('ihmc-software.png'),
        imageAlign: 'right',
        title: 'Learn How',
      },
    ]}
  </Block>
);


class Index extends React.Component {
  render() {
    let language = this.props.language || '';

    return (
      <div>
        <HomeSplash language={language} />
        <div className="mainContainer">
        <LearnHow />
          <TryOut/>
        </div>
      </div>
    );
  }
}

module.exports = Index;
