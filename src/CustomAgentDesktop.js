import React from 'react';
import { FlexBox, SplitContentContainer, withTheme, withTaskContext } from '@twilio/flex-ui';
import DataDipComponent from './DataDipComponent';
import styled from "react-emotion";

class CustomCRM extends React.Component {
    splitter = null;

    constructor() {
        super();
        this.state = { result: [], loading: false, url: "" };
        this.handleResize = this.handleResize.bind(this);
    }

    handleResize() {
        this.splitter.reInit();
        this.forceUpdate();
    }

    componentDidMount() {
        const { task } = this.props;
        console.log('crm mounted with', task);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        console.log('re-rendering crm');
    }

    render() {
        const { task } = this.props;
        let content;

        const SplitterSeparator = styled("div")`
    display: flex;
    border-style: solid;
    border-width: 1px 0 1px 0;
    height: 24px;
    width: 100%;
    div {
        margin: auto;
    }
    ${(props) => props.theme.AgentDesktopView.ContentSplitter}
    `;

        console.log(task);

        if (!task || !task.attributes) {
            content = (
                <Canvas>
                    <CRMContainer>
                        <h1>No task selected</h1>
                    </CRMContainer>
                </Canvas>
            );
        } else {
            content = (
                <Canvas>
                    <SplitContentContainer
                        key="splitter2"
                        ref={this.makeSplitterRef}
                        vertical={true}
                        separator={SplitterSeparator}
                        firstMinSize="200px"
                        secondMinSize="400px"
                        firstInitialSize="30%"
                        onResize={this.handleResize}
                    >
                        <DataDipComponent task={task} />
                        {this.getBottomPane(task)}
                    </SplitContentContainer>
                </Canvas>
            );
        }

        return <SplitCMS>
            <style dangerouslySetInnerHTML={{
                __html: `
              /* gross hack, not sure why this is needed.. */
              .Twilio-Splitter-Vertical { height: 100%; }
            `}} />
            {content}
        </SplitCMS>;
    }

    makeSplitterRef = (c) => {
        this.splitter = c;
        console.log('splitter', c);
        window.splitter = c;
    }

    getBottomPane(task) {
        return (
            <FlexBox overflow="hidden">
                <iframe
                    width="100%"
                    height="100%"
                    title="EIS"
                    src={`https://www.bing.com/?q=${task.sid}`}>
                </iframe>
            </FlexBox>
        );
    }
}

const SplitCMS = styled("div")`
  height: 100%;
  margin: 0px;
  display: flex;
  flex-direction: row;
  flex-grow:1;
  flex-shrink:1;
  height: auto;
  border-left-color: ${props => props.theme.AgentDesktopView.ContentSplitter.borderColor};
  border-left-width: 1px;
  border-left-style: solid;
`;

const Canvas = styled("div")`
  height: 100%;
  margin: 0px;
  text-align: center;
  display: flex;
  flex-direction: row;
  flex-grow:1;
  flex-shrink:1;
  align-items: center;
  justify-content: center;
  height: auto;
  border-left-color: ${props => props.theme.AgentDesktopView.ContentSplitter.borderColor};
  border-left-width: 1px;
  border-left-style: solid;
`;

const CRMContainer = styled("div")`
  height: 100%;
  color: #000;
  align-items: center;
  display: flex;
  flex-basis: auto;
  flex-direction: column;
  flex-grow:1;
  flex-shrink:1;
  justify-content: center;
  vertical-align:baseline;
  -webkit-box-align:center;
  -webkit-box-pack:center;
  max-width: 100%;
`;

export default withTaskContext(withTheme(CustomCRM));