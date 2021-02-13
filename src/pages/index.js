import React from 'react';
import ReactFullpage from '../components/react-fullpage';
import { Helmet } from "react-helmet"

import '../styles/main.scss';

const SEL = 'custom-section';
const SECTION_SEL = `.${SEL}`;

// NOTE: if using fullpage extensions/plugins put them here and pass it as props.
// This is no longer required for the scrollOverflow option.
const pluginWrapper = () => {
  /*
  * require('./fullpage.fadingEffect.min'); // Optional. Required when using the "fadingEffect" extension.
  */
};

const originalColors = ['#ff5f45', '#0798ec', '#fc6c7c', '#435b71', 'orange', 'blue', 'purple', 'yellow'];

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sectionsColor: [...originalColors],
      fullpages: [
        {
          text: 'Section 1',
        },
        {
          text: 'Section 2',
        },
        {
          text: 'Section 3',
        }
      ],
    };
  }

  componentDidMount() {
    // const parallax = new Parallax(document.getElementById('scene'))
  }

  onLeave(origin, destination, direction) {
    console.log('onLeave', { origin, destination, direction });
    // arguments are mapped in order of fullpage.js callback arguments do something
    // with the event
  }

  handleChangeColors() {
    const newColors =
      this.state.sectionsColor[0] === 'yellow'
        ? [...originalColors]
        : ['yellow', 'blue', 'white'];
    this.setState({
      sectionsColor: newColors,
    });
  }

  handleAddSection() {
    this.setState(state => {
      const { fullpages } = state;
      const { length } = fullpages;
      fullpages.push({
        text: `section ${length + 1}`,
        id: Math.random(),
      });

      return {
        fullpages: [...fullpages],
      };
    });
  }

  handleRemoveSection() {
    this.setState(state => {
      const { fullpages } = state;
      const newPages = [...fullpages];
      newPages.pop();

      return { fullpages: newPages };
    });
  }

  moveSectionDown() {
    window.fullpage_api.moveSectionDown();
  }

  render() {
    const { fullpages } = this.state;

    if (!fullpages.length) {
      return null;
    }

    const Menu = () => (
      <div
        className="menu"
        style={{
          position: 'fixed',
          top: 0,
          zIndex: 100,
        }}
      >
        <ul className="actions">
          <li id="logo">HasHackers</li>
          <li>
            <button onClick={() => this.handleAddSection()}>Add Section</button>
            <button onClick={() => this.handleRemoveSection()}>
              Remove Section
            </button>
            <button onClick={() => this.handleChangeColors()}>
              Change background colors
            </button>
            <button onClick={() => this.moveSectionDown()}>
              Move Section Down
            </button>
          </li>
        </ul>
      </div>
    );

    return (
      <div className="App">
        <Menu />
        <ReactFullpage
          autoScrolling={true}
          debug /* Debug logging */

          // Required when using extensions
          pluginWrapper={pluginWrapper}
          lockAnchors={true}

          // fullpage options
          licenseKey={'YOUR_KEY_HERE'} // Get one from https://alvarotrigo.com/fullPage/pricing/
          navigation={true}
          anchors={['firstPage', 'secondPage', 'thirdPage']}
          sectionSelector={SECTION_SEL}
          onLeave={this.onLeave.bind(this)}
          sectionsColor={this.state.sectionsColor}

          render={comp => (
            <ReactFullpage.Wrapper>
              <Helmet>
                <link rel="preconnect" href="https://fonts.gstatic.com" />
                <link href="https://fonts.googleapis.com/css2?family=Cantarell:wght@700&display=swap" rel="stylesheet" />
              </Helmet>
              <div key={'s1'} className={"section s1 " + SEL}>
                <h1>Section 1</h1>
              </div>
              <div key={'s2'} className={"section s2 " + SEL}>
                <h1>Section 2</h1>
                {/*<div className="parallax" data-z-index={2} data-parallax="scroll" data-image-src={img}></div>*/}
              </div>
              <div key={'s3'} className={"section s3 " + SEL}>
                <h1>Section 3</h1>
              </div>
            </ReactFullpage.Wrapper>
          )}
        />
      </div>
    );
  }
}

export default App;

