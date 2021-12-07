import React, { useState, useRef, useEffect } from 'react';
import Dashboard from '../layouts/Dashboard/Dashboard';
import { Grid, makeStyles } from '@material-ui/core';
import { EsaFilters } from '../layouts/components';
import Plot from 'react-plotly.js';
import { esaAPI } from '../store/slices/api';
import { useDispatch } from 'react-redux';

const styles = theme => ({
  fullHeight: { 
    height: '100%' 
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
  const [wellsList, setWellsList] = useState([]);

  const plotlyGridParentRef = useRef(HTMLDivElement);

  useEffect( async () => {
    const test = await dispatch( esaAPI.endpoints.getWells.initiate() );
    setWellsList( test.data );

    return test.unsubscribe;
  }, [] )

  useEffect( () => {
    console.log('wells', wellsList)
  }, [wellsList] )

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
          <EsaFilters />
        </Grid>

        <Grid item xs={12} md={7} container spacing={2}>
          <Grid item xs={12} container spacing={2}>
            <Grid item xs={12} ref={ plotlyGridParentRef }>
            <Plot
              data={[
                {
                  x: [1, 2, 3],
                  y: [2, 6, 3],
                  type: 'scatter',
                  marker: {color: 'cyan'},
                }
              ]}
              layout={{ 
                title: 'Wells Plot',
                width: chartLayout.width,
                height: chartLayout.height
              }}
              config={{ responsive: true }}
            />
            </Grid>
          </Grid>
        </Grid>
      </Grid>

    </Dashboard>
  );
}
