import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Grid, List, ListItem, ListItemText, makeStyles, Tooltip } from '@material-ui/core';
import {
  Portlet,
  PortletHeader,
  PortletLabel,
  PortletContent,
  EsaButton,
  EsaList
} from '../index';

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
  const [selectedOptions, setSelect] = useState([]);

  const handleSelect = value => {
    const currentIndex = selectedOptions.indexOf(value);
    const newSelectedOptions = [...selectedOptions];
    if (currentIndex === -1) {
      newSelectedOptions.push(value);
    } else {
      newSelectedOptions.splice(currentIndex, 1);
    }
    setSelect(newSelectedOptions);
  };

  // const isFiltersButtonDisabled = () => (
  //   selectedOptions.some( key => key.includes('') )
  // )

  const isFiltersButtonDisabled = () => true;

  const plotButton = (
    <EsaButton fullWidth className={classes.button} disabled={isFiltersButtonDisabled()} onClick={() => { console.log('btn clicked') }}>
      Show plot
    </EsaButton>
  );

  const isSelected = value => selectedOptions.includes(value);

  return (
    <Grid item xs={12} container spacing={2} className={`${ classes.flexColumn } ${ classes.fullHeight }`} {...props}>

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
  className: PropTypes.string
};

export default EsaFilters;
