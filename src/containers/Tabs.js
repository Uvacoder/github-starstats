import React, { useState } from 'react';
import styled from 'styled-components';
import { Icon as LegacyIcon } from '@ant-design/compatible';
import { Spin, Tabs, Progress } from 'antd';
import ChartBars from '../components/Recharts/Bars';
import ChartLines from '../components/Recharts/Lines';
import ChartPie from '../components/Recharts/Pie';
import ChartArea from '../components/Recharts/Area';
import Download from '../components/DownloadSVG';
import Placeholder from '../components/ChartPlaceholder';
import { getChartData, getPercent } from '../utils';

const StyledTabs = styled(Tabs)`
  &.ant-tabs {
    margin: 0 auto;
    padding: 0 2rem;
    max-width: 44rem;
    min-height: 70vh;

    .recharts-responsive-container {
      overflow: hidden;
    }
  }
  .tips {
    display: flex;
    &.pc {
      justify-content: flex-end;
      padding: 0 1rem;
    }
    .divide {
      width: 0.5rem;
    }
  }
`;
const { TabPane } = Tabs;
const ChartWrapper = styled.section`
  width: 100%;
  height: 100%;
`;

const getTabPanes = data => {
  const charts = [
    {
      title: 'Bar',
      icon: 'bar-chart',
      chart: <ChartBars data={getChartData(data)} />
    },
    {
      title: 'Line',
      icon: 'line-chart',
      chart: <ChartLines data={getChartData(data)} />
    },
    {
      title: 'Area',
      icon: 'area-chart',
      chart: <ChartArea data={getChartData(data)} />
    },
    {
      title: 'Pie',
      icon: 'pie-chart',
      chart: <ChartPie data={getChartData(data)} />
    }
  ];

  return charts.map((item, idx) => {
    const { title, icon, chart } = item;
    return (
      <TabPane
        tab={
          <span>
            <LegacyIcon type={icon} />
            {title}
          </span>
        }
        key={idx + 1}
      >
        {data ? <ChartWrapper>{chart}</ChartWrapper> : <Placeholder />}
      </TabPane>
    );
  });
};
const svgQuery = '.ant-tabs .ant-tabs-tabpane-active svg.recharts-surface';
export default function TabsContainer({ loading, activeTab = 1, data, repo }) {
  const [active, setActive] = useState(null);
  const percent = getPercent(data);
  console.log({ percent });
  const isMobile = window.innerWidth < 751 ? true : false;

  const DownloadBtn = (
    <div className={`tips ${isMobile ? '' : 'pc'}`}>
      {!(percent == 0 || percent == 100) ? (
        <Progress
          type="circle"
          status={'active'}
          format={() => null}
          percent={percent}
          width={25}
        />
      ) : null}
      <div className="divide"></div>
      {percent == 100 ? <Download title={`${repo.owner}/${repo.name}`} svg={svgQuery} /> : null}
    </div>
  );
  return (
    <Spin spinning={loading && !data} size="large" tip={'Loading...'}>
      <StyledTabs
        onChange={tabKey => {
          setActive(tabKey);
        }}
        activeKey={`${active || activeTab}`}
        tabBarExtraContent={DownloadBtn}
        tabPosition={isMobile ? 'top' : 'left'}
      >
        {getTabPanes(data)}
      </StyledTabs>
    </Spin>
  );
}
