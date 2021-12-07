import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { List, ListItem, ListItemText, makeStyles } from '@material-ui/core';
import {
  Portlet,
  PortletHeader,
  PortletLabel,
  PortletContent
} from '../index';
import { esaAPI } from '../../../store/slices/api';
import { useDispatch } from 'react-redux';
import { updateWells } from '../../../store/slices/wells';
import { updateLogs } from '../../../store/slices/logs';
import { updateFormations } from '../../../store/slices/formations';

const styles = theme => ({
  flexGrow: {
    position: 'relative',
    flexGrow: 1
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
  }
});
const useStyles = makeStyles(styles);

const listConfig = {
  get: {
    wells: esaAPI.endpoints.getWells.initiate,
    logs: esaAPI.endpoints.getLogs.initiate,
    formations: esaAPI.endpoints.getFormations.initiate
  },
  update: {
    wells: updateWells,
    logs: updateLogs,
    formations: updateFormations
  },
  displayField: {
    wells: 'name',
    logs: 'log',
    formations: 'name'
  }
}

const EsaList = props => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [options, setOptions] = useState([]);
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

  const isSelected = value => selectedOptions.includes(value);

  const { title, listType, ...rest } = props;

  useEffect( async () => {
    const listSubscription = await dispatch( listConfig.get[listType]() );
    dispatch( listConfig.update[listType]( listSubscription.data ) );
    setOptions( listSubscription.data );

    return listSubscription.unsubscribe;
  }, [] )


  return (
    <Portlet className={classes.flexGrow} {...rest}>
      <PortletHeader className={classes.header}>
        <PortletLabel title={title} />
      </PortletHeader>
      <PortletContent className={classes.portletContent} noPadding>
        <List>
          {options.map(
            option => (
              <ListItem
                key={`${ listType }-item-${ option.id }`}
                className={classes.listItem}
                selected={isSelected(option)}
                onClick={() => handleSelect(option)}
              >
                <ListItemText primary={option[ listConfig.displayField[listType] ]} />
              </ListItem>
            )
          )}
        </List>
      </PortletContent>
    </Portlet>
  )
};

EsaList.propTypes = {
  children: PropTypes.node,
  title: PropTypes.string,
  listType: PropTypes.oneOf([ 'wells', 'logs', 'formations' ])
};

export default EsaList;
