import React from 'react';
import { Row, Col, Card, Icon } from 'antd';
import CountUp from 'react-countup';
import { IHomeStore } from '@/stores/tw-home';
import trumpAvator from '@/assets/image/trump-avator.png';
import { observer, inject } from 'mobx-react';
import ReactEchartsCore from 'echarts-for-react/lib/core';
import echarts from 'echarts/lib/echarts';
import { cardBody, cardTagBody } from '@/minix/UIMixin';

import './TWHome.scss';
import twitterIcon from '@/assets/image/twitter.svg';
import wordCloudFrame from '@/assets/image/word-cloud-frame.png';
import { TWEnum } from '@/models/tw-enum';

const { Meta } = Card;

interface Props {
  homeStore: IHomeStore;
}

interface States {
  isLoading?: boolean;
  annualTwitteStatChartOptions?: any;
  monthlyTwitterStatChartOptions?: any;
  hourlyTwitterStatChartOptions?: any;
  wordCloudChartOptions?: any;
  annualTwitterTotal?: number;
  annualTwitterAvg?: number;
}

@inject('homeStore')
@observer
class TWHome extends React.Component<Props, States> {
  constructor(props: Props, state: States) {
    super(props, state);
    this.state = {
      isLoading: false,
      annualTwitteStatChartOptions: {},
      monthlyTwitterStatChartOptions: {},
      hourlyTwitterStatChartOptions: {},
      wordCloudChartOptions: {},
      annualTwitterTotal: 0,
    };
  }

  public async componentDidMount() {
    const { fetchData, fetchWordCloud } = this.props.homeStore!;

    this.setState({ isLoading: true }, () => {
      fetchData();
      fetchWordCloud(TWEnum.WordCategory.Noun);
      setTimeout(() => {
        this.initAnnualTwitterStatChart();
        this.initMonthTwitterCountChart();
        this.initHourTwitterCountChart();
        this.initWordCloud();
        const total = this.getAnnualTwitterTotal();
        const avg = Math.ceil(total / 365);
        this.setState({ annualTwitterTotal: total, annualTwitterAvg: avg, isLoading: false });
      }, 1000);
    });
  }

  private initAnnualTwitterStatChart() {
    const { annualTwitterStat } = this.props.homeStore!;
    let option = {
      animation: true,
      tooltip: {
        trigger: 'axis',
        axisPointer: { type: 'line' },
        formatter: (params: any) => {
          const axisValue = params[0].axisValue;
          return axisValue == '2017' ? '大統領元年' : '';
        },
      },
      grid: { left: '5%', right: '10%', bottom: '5%', top: '10%', containLabel: true },
      xAxis: { type: 'category', name: '年度', data: annualTwitterStat.map(d => d.year) },
      yAxis: { type: 'value', name: '件数' },
      series: [
        {
          data: annualTwitterStat.map(d => d.count),
          type: 'line',
          label: { offset: [-5, -5], show: true, position: 'bottom', color: '#C23431' },
        },
      ],
    };

    this.setState({ annualTwitteStatChartOptions: option });
  }

  private initMonthTwitterCountChart() {
    const { monthlyTwitterStat } = this.props.homeStore!;
    const years = monthlyTwitterStat.map(d => d.yearWithUnit);
    const option = {
      legend: {
        data: years,
        selected: { '2015年': false, '2016年': false },
      },
      grid: { left: '5%', right: '10%', bottom: '5%', top: '20%', containLabel: true },
      xAxis: {
        type: 'category',
        name: '月度',
        data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(d => `${d}月`),
      },
      yAxis: { type: 'value', name: '件数' },
      series: monthlyTwitterStat.map(d => {
        return {
          name: d.yearWithUnit,
          data: d.data.map(v => v.count),
          type: 'bar',
          barWidth: 10,
          markLine: { data: [{ type: 'average', name: '平均值' }] },
          markPoint: {
            data: [{ type: 'max', name: '最大値' }, { type: 'min', name: '最小値' }],
          },
        };
      }),
    };

    this.setState({ monthlyTwitterStatChartOptions: option });
  }

  private initHourTwitterCountChart() {
    const { hourlyTwitterStat } = this.props.homeStore!;
    let timeline = [];
    for (let i = 0; i <= 23; i++) {
      timeline.push(`${i}時`);
    }
    const option = {
      baseOption: {
        title: { text: 'Trump一日最初の打ち合わせは午前11時より' },
        timeline: {
          axisType: 'category',
          autoPlay: true,
          playInterval: 5000,
          data: hourlyTwitterStat.map(d => `${d.year}年`),
          symbol: `image://${twitterIcon}`,
          symbolSize: 15,
        },
        // backgroundColor: '#1b1b1b',
        grid: { left: '2%', right: '2%', bottom: '15%', top: '10%', containLabel: true },
        tooltip: { trigger: 'axis' },
        xAxis: [
          {
            type: 'category',
            data: timeline,
            nameTextStyle: { color: '#fff' },
            axisLabel: { textStyle: { fontSize: 12 }, interval: 0 },
            axisLine: { lineStyle: { color: '#56617b' } },
            splitLine: { show: true, lineStyle: { color: '#2e3547' } },
          },
        ],
        yAxis: [
          {
            type: 'value',
            name: '',
            splitNumber: 8,
            nameTextStyle: { color: '#56617b' },
            axisLine: { lineStyle: { color: '#56617b' } },
            axisLabel: { formatter: '{value}' },
            // splitLine: { show: true, lineStyle: { color: '#56617b' } },
          },
        ],
        series: [
          {
            type: 'bar',
            barWidth: '20%',
            itemStyle: {
              normal: {
                color: function(params: any) {
                  // build a color map as your need.
                  var colorList = [
                    '#eb4848',
                    '#eb6449',
                    '#eb7f49',
                    '#eb9a49',
                    '#ebb549',
                    '#ebd049',
                    '#ebeb49',
                    '#d0eb49',
                    '#b5eb49',
                    '#9aeb49',
                    '#7feb49',
                    '#64eb49',
                    '#49eb49',
                    '#49eb64',
                    '#49eb7f',
                    '#49eb9a',
                    '#49ebb5',
                    '#49ebd0',
                    '#49ebeb',
                    '#49d0eb',
                    '#49b5eb',
                    '#499aeb',
                    '#497feb',
                    '#4964eb',
                    '#4949eb',
                    '#6449eb',
                    '#7f49eb',
                    '#9a49eb',
                    '#b549eb',
                    '#d049eb',
                    '#eb49eb',
                    '#eb49d0',
                  ];
                  return colorList[params.dataIndex];
                },
              },
            },
          },
        ],
      },
      options: hourlyTwitterStat.map(d => {
        return { series: { data: d.data.map(v => v.count) } };
      }),
    };

    this.setState({ hourlyTwitterStatChartOptions: option });
  }

  private initWordCloud() {
    const { wordCloud } = this.props.homeStore!;
    var maskImage = new Image();

    maskImage.onload = e => {
      const option = {
        series: [
          {
            type: 'wordCloud',
            sizeRange: [10, 100],
            rotationRange: [-90, 90],
            rotationStep: 45,
            gridSize: 1,
            width: '100%',
            height: '100%',
            maskImage: e.target,
            shape: 'pentagon',
            textStyle: {
              normal: {
                color: function() {
                  return (
                    'rgb(' +
                    [
                      Math.round(Math.random() * 160),
                      Math.round(Math.random() * 160),
                      Math.round(Math.random() * 160),
                    ].join(',') +
                    ')'
                  );
                },
              },
            },
            data: wordCloud.map(d => {
              return { name: d.word, value: d.value };
            }),
          },
        ],
      };

      this.setState({ wordCloudChartOptions: option });
    };

    maskImage.src = wordCloudFrame;
  }

  private getAnnualTwitterTotal(): number {
    const { annualTwitterStat } = this.props.homeStore!;
    if (annualTwitterStat) {
      const index = annualTwitterStat.findIndex(d => d.year === 2018);
      if (index > -1) {
        return annualTwitterStat[index].count;
      }
    }
    return 0;
  }

  public render() {
    return (
      <div>
        <Row gutter={16} className="row-spacing">
          <Col span={6}>
            <Card loading={this.state.isLoading} className="card-tag" hoverable={true} bodyStyle={cardTagBody}>
              <h4>2018年</h4>
              <p className="annual-twitter-count">
                <CountUp start={0} end={this.state.annualTwitterTotal} duration={2} separator="," />件
              </p>
              <p className="annual-twitter-count-avg">
                <span>一日あたり {this.state.annualTwitterAvg} 件</span>
              </p>
              <Icon type="twitter" />
            </Card>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={8} className="row-spacing">
            <Card
              hoverable={true}
              bodyStyle={{ height: '115px' }}
              cover={
                <img alt="trump" src={trumpAvator} style={{ height: '300px', borderBottom: '1px solid silver' }} />
              }
            >
              <Meta
                title="Donald J. Trump"
                description={
                  <div style={{ height: '60px' }}>
                    <a target="_blank" href="https://twitter.com/realDonaldTrump">
                      The 45th and current President of the United States.
                    </a>
                  </div>
                }
              />
            </Card>
          </Col>

          <Col span={8} className="row-spacing">
            <Card title="年度別Twitter数" loading={this.state.isLoading} bodyStyle={cardBody}>
              <ReactEchartsCore echarts={echarts} option={this.state.annualTwitteStatChartOptions} />
            </Card>
          </Col>

          <Col span={8} className="row-spacing">
            <Card title="トランプが何を言った" loading={this.state.isLoading} bodyStyle={cardBody}>
              <ReactEchartsCore echarts={echarts} option={this.state.wordCloudChartOptions} />
            </Card>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Card title="月度別Twitter数" loading={this.state.isLoading} bodyStyle={cardBody}>
              <ReactEchartsCore echarts={echarts} option={this.state.monthlyTwitterStatChartOptions} />
            </Card>
          </Col>
          <Col span={12}>
            <Card title="時間別Twitter数" loading={this.state.isLoading} bodyStyle={cardBody}>
              <ReactEchartsCore echarts={echarts} option={this.state.hourlyTwitterStatChartOptions} />
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default TWHome;
