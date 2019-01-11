import React from 'react';
import { Row, Col, Card } from 'antd';
import echarts from 'echarts/lib/echarts';
import { IEmotionStore } from '@/stores/tw-emotion';
import { inject, observer } from 'mobx-react';
import ReactEchartsCore from 'echarts-for-react/lib/core';
import { cardBody } from '@/minix/UIMixin';

interface Props {
  emotionStore: IEmotionStore;
  fetchData: () => void;
}

interface States {
  isLoading?: boolean;
  sentimentIntensityOption?: any;
}

@inject('emotionStore')
@observer
class TWEmotion extends React.Component<Props, States> {
  constructor(props: Props, state: States) {
    super(props, state);
    this.state = {
      isLoading: false,
      sentimentIntensityOption: {},
    };
  }

  public async componentDidMount() {
    const { fetchData } = this.props.emotionStore!;
    this.setState({ isLoading: true }, () => {
      fetchData();
      setTimeout(() => {
        this.initSentimentIntensityChart();
        this.setState({ isLoading: false });
      }, 1000);
    });
  }

  private initSentimentIntensityChart() {
    const { emotion } = this.props.emotionStore!;

    let option = {
      grid: { left: '5%', right: '10%', bottom: '5%', top: '20%', containLabel: true },
      series: [
        {
          name: 'Positive',
          type: 'gauge',
          z: 3,
          center: ['48%', '40%'],
          min: 0,
          max: 100,
          splitNumber: 5,
          radius: '50%',
          axisLine: { lineStyle: { width: 5 } },
          axisTick: { length: 15, lineStyle: { color: 'auto' } },
          splitLine: { length: 10, lineStyle: { color: 'auto' } },
          data: [{ value: emotion.positive, name: 'Positive' }],
        },
        {
          name: 'Negative',
          type: 'gauge',
          center: ['15%', '40%'],
          min: 0,
          max: 100,
          splitNumber: 5,
          radius: '35%',
          axisLine: { lineStyle: { width: 5 } },
          axisTick: { length: 15, lineStyle: { color: 'auto' } },
          splitLine: { length: 10, lineStyle: { color: 'auto' } },
          data: [{ value: emotion.negative, name: 'Negative' }],
        },
        {
          name: 'Neutral',
          type: 'gauge',
          center: ['80%', '40%'],
          min: 0,
          max: 100,
          splitNumber: 5,
          radius: '35%',
          axisLine: { lineStyle: { width: 5 } },
          axisTick: { length: 15, lineStyle: { color: 'auto' } },
          splitLine: { length: 10, lineStyle: { color: 'auto' } },
          data: [{ value: emotion.neutral, name: 'Neutral' }],
        },
      ],
    };
    this.setState({ sentimentIntensityOption: option });
  }

  public render() {
    return (
      <div>
        <Row gutter={16}>
          <Col span={8}>
            <Card loading={this.state.isLoading} title="感情分析" bodyStyle={cardBody}>
              <ReactEchartsCore echarts={echarts} option={this.state.sentimentIntensityOption} />
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default TWEmotion;
