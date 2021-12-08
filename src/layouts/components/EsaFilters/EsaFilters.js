import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Grid, makeStyles, Tooltip } from '@material-ui/core';
import {
  EsaButton,
  EsaList
} from '../index';
import { esaAPI } from '../../../store/slices/api';
import { updateWells } from '../../../store/slices/wells';
import { updateLogs } from '../../../store/slices/logs';
import { updateFormations } from '../../../store/slices/formations';
import { useDispatch, useSelector } from 'react-redux';

const styles = theme => ({
  flex: {
    display: 'flex'
  },
  flexColumn: {
    display: 'flex',
    flexDirection: 'column'
  },
  flexGrow: {
    position: 'relative',
    flexGrow: 1
  },
  fullHeight: { 
    height: '100%' 
  },
  button: { 
    marginTop: theme.spacing(3) 
  },
  header: {
    padding: theme.spacing(0, 1, 0, 2),
    background: theme.palette.default.dark,
    color: theme.palette.default.contrastText
  },
  portletContent: {
    height: 0,
    minHeight: 400,
    display: 'flex',
    flexDirection: 'column'
  },
  listItem: {
    cursor: 'pointer',
    justifyContent: ' space-between',
    '&.Mui-selected.haveData,&.Mui-selected.haveData:hover': {
      backgroundColor: 'rgba(41, 150, 243, .3)'
    },
    '&:hover, &.Mui-selected,&.Mui-selected:hover': {
      backgroundColor: theme.palette.default.light
    },
    '&::selection': { backgroundColor: 'transparent' }
  },
  infoTooltip: {
    cursor: 'help'
  }
});
const useStyles = makeStyles(styles);

const EsaFilters = props => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { calculatePlot, ...rest } = props;

  //TODO: get the status and if pending, show loader

  const wellsSelections = useSelector( state => state.wells.selectedIds );
  const logsSelections = useSelector( state => state.logs.selectedIds );
  const formationsSelections = useSelector( state => state.formations.selectedIds );

  const isFiltersButtonDisabled = () => (
    wellsSelections.length < 1 || logsSelections.length < 1 || formationsSelections.length < 1
  )

  const plotButton = (
    <EsaButton fullWidth className={classes.button} disabled={isFiltersButtonDisabled()} onClick={() => calculatePlot()}>
      Show plot
    </EsaButton>
  );

  useEffect( async () => {
    //TODO: add try-catch to handle the error
    const listSubscriptionArr = [];
    listSubscriptionArr.push({
      getList: esaAPI.endpoints.getWells.initiate,
      updateState: updateWells
    });
    listSubscriptionArr.push({
      getList: esaAPI.endpoints.getLogs.initiate,
      updateState: updateLogs
    });
    listSubscriptionArr.push({
      getList: esaAPI.endpoints.getFormations.initiate,
      updateState: updateFormations
    });
    
    const unsubscriptions = [];

    listSubscriptionArr.forEach( async subs => {
      const listSubscription = dispatch( subs.getList() );
      const data = (await listSubscription).data;
      dispatch( subs.updateState( data ) );

      unsubscriptions.push( listSubscription );
    })

    return () => unsubscriptions.map( subs => subs.unsubscribe );
  }, [] )

  return (
    <Grid item xs={12} container spacing={2} className={`${ classes.flexColumn } ${ classes.fullHeight }`} {...rest}>

      <Grid item xs={12} className={classes.flex}>
        <EsaList
          title='Wells'
          listType='wells'
        />
      </Grid>

      <Grid item xs={12} className={classes.flex}>
        <EsaList
          title='Logs'
          listType='logs'
        />
      </Grid>

      <Grid item xs={12} className={classes.flexColumn}>
        <EsaList
          title='Formations'
          listType='formations'
        />
        
        { isFiltersButtonDisabled() ? (
          <Tooltip title="At least one Well, one Log and one Formation should be selected">
            <div className={classes.infoTooltip}>{ plotButton }</div>
          </Tooltip>
        ) : (
          plotButton
        ) }
      </Grid>
    </Grid>
  )
};

EsaFilters.propTypes = {
  children: PropTypes.node,
  calculatePlot: PropTypes.func
};

export default EsaFilters;
