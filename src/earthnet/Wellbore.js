import React, { useState, useRef, useEffect } from 'react';
import Dashboard from '../layouts/Dashboard/Dashboard';
import { Grid, makeStyles, Chip } from '@material-ui/core';
import { EsaFilters } from '../layouts/components';
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
  infoMsg: {
    paddingTop: '20%'
  }
});
const useStyles = makeStyles(styles);

export default function Wellbore() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [chartLayout, setChartLayout] = useState({
    width: 700,
    height: 500
  });
  const [plotData, setPlotData] = useState([]);
  const [plotReqUnsubscriptions, setPlotReqUnsubscriptions] = useState([]);

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
      type: 'scatter',
      showlegend: true,
      name: `wellId-${d.wellId}`
    }));

    setPlotData( data );
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

  return (
    <Dashboard>
      <Grid container spacing={1} className={classes.fullHeight}>
        <Grid item xs={12} md={5} container spacing={2} className={classes.fullHeight}>
          <EsaFilters calculatePlot={calcPlot} />
        </Grid>

        <Grid item xs={12} md={7} container spacing={2}>
          <Grid item xs={12} container spacing={2}>
            <Grid item xs={12} ref={ plotlyGridParentRef }>
            { plotData.length > 0 ? (
              <Plot
                data={plotData}
                layout={{ 
                  title: 'Wells Plot',
                  width: chartLayout.width,
                  height: chartLayout.height
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
