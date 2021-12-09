import React, { useState, useRef, useEffect } from 'react';
import Dashboard from '../layouts/Dashboard/Dashboard';
import { Grid, makeStyles, Chip } from '@material-ui/core';
import { EsaFilters, EsaPaper, EsaSelect } from '../layouts/components';
import Plot from 'react-plotly.js';
import { esaAPI } from '../store/slices/api';
import { useDispatch, useSelector } from 'react-redux';

const styles = theme => ({
  fullHeight: { 
    height: '100%' 
  },
  flex: {
    display: 'flex'
  },
  justifyContentCenter: {
    justifyContent: 'center'
  },
  justifyContentSpaceEvenly: {
    justifyContent: 'space-evenly'
  },
  infoMsg: {
    paddingTop: '20%'
  },
  paper: {
    padding: theme.spacing(3)
  }
});
const useStyles = makeStyles(styles);

export default function Histogram() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [chartLayout, setChartLayout] = useState({
    width: 700,
    height: 500
  });
  const [plotData, setPlotData] = useState([]);
  const [plotReqUnsubscriptions, setPlotReqUnsubscriptions] = useState([]);

  const plotLayoutOptions = {
    bar: [
      { key: 'bar-group', value: 'group', text: 'group' },
      { key: 'bar-stack', value: 'stack', text: 'stack' }
    ],
    orientation: [
      { key: 'orientation-v', value: 'v', text: 'vertical' },
      { key: 'orientation-h', value: 'h', text: 'horizontal' }
    ]
  };
  const [plotBarValue, onChangePlotBar] = useState(plotLayoutOptions.bar[0].value);
  const [plotOrientationValue, onChangePlotOrientation] = useState(plotLayoutOptions.orientation[1].value);
  const [plotXaxisPos, setPlotXaxisPos] = useState('left');
  const [plotYaxisPos, setPlotYaxisPos] = useState('bottom');

  const plotlyGridParentRef = useRef(HTMLDivElement);

  useEffect( () => {
    return () => plotReqUnsubscriptions.map( subs => subs.unsubscribe );
  }, [ plotReqUnsubscriptions ] )

  const wellsSelections = useSelector( state => state.wells.selectedIds );

  const formatPlotReqParams = () => wellsSelections.map( id => `wellId=${ id }`).join('&');

  const calcPlot = async () => {
    //TODO: show loader based on status (if 'pending')
    const params = formatPlotReqParams();
    const plotSubscription = dispatch( esaAPI.endpoints.getPlotData.initiate(params) );
    const data = (await plotSubscription).data.map( d => ({
      x: d.x,
      y: d.y,
      xaxis: 'x',
      yaxis: 'y',
      type: 'histogram',
      showlegend: true,
      name: `wellId-${d.wellId}`
    }));

    setPlotData( data );
    onChangePlotOrientation(plotLayoutOptions.orientation[1].value);
    setPlotReqUnsubscriptions([
      ...plotReqUnsubscriptions,
      plotSubscription
    ]);
  }

  useEffect( () => {
    if ( plotlyGridParentRef.current ) {
      const { width, height } = plotlyGridParentRef.current.getBoundingClientRect();
      
      setChartLayout({ width, height })
    }
  }, [plotlyGridParentRef] );

  useEffect( () => {
    const newPlotData = plotData.map( d => ({
      ...d,
      xaxis: d.xaxis === 'x' ? 'x2' : 'x',
      yaxis: d.yaxis === 'y' ? 'y2' : 'y'
    }))
    setPlotData( newPlotData );
    setPlotXaxisPos( plotXaxisPos === 'left' ? 'bottom' : 'left' );
    setPlotYaxisPos( plotYaxisPos === 'bottom' ? 'left' : 'bottom' );
  }, [plotOrientationValue] );

  return (
    <Dashboard>
      <Grid container spacing={1} className={classes.fullHeight}>
        <Grid item xs={12} md={5} container spacing={2} className={`${ classes.fullHeight } ${ classes.justifyContentSpaceEvenly }`}>

          <Grid item xs={12} container>
            <Grid item xs={12}>
              <EsaPaper className={classes.paper}>
                <Grid container spacing={3}>
                  <Grid item xs={6}>
                    <EsaSelect
                      label="Bar Mode"
                      value={plotBarValue}
                      options={plotLayoutOptions.bar}
                      onChange={value => onChangePlotBar(value)}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <EsaSelect
                      label="Orientation"
                      value={plotOrientationValue}
                      options={plotLayoutOptions.orientation}
                      onChange={value => onChangePlotOrientation(value)}
                    />
                  </Grid>
                </Grid>
              </EsaPaper>
            </Grid>
          </Grid>

          <EsaFilters calculatePlot={calcPlot} />
        </Grid>

        <Grid item xs={12} md={7} container>
          <Grid item xs={12} container>
            <Grid item xs={12} ref={ plotlyGridParentRef }>
            { plotData.length > 0 ? (
              <Plot
                data={plotData}
                layout={{ 
                  title: 'Histogram Plot',
                  width: chartLayout.width,
                  height: chartLayout.height,
                  barmode: plotBarValue,
                  xaxis2: {
                    side: 'top',
                    overlaying: 'x',
                    autorange: 'reversed'
                  },
                  yaxis2: {
                    side: 'right',
                    overlaying: 'y',
                    autorange: 'reversed'
                  }
                }}
                config={{ responsive: true }}
              />
            ): (
              <div className={`${ classes.flex } ${ classes.fullHeight } ${ classes.justifyContentCenter } ${ classes.infoMsg }`}>
                <Chip label="No plot data yet. Try changing the filters and click on the 'show plot' button." />
              </div>
            ) }
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Dashboard>
  );
}
