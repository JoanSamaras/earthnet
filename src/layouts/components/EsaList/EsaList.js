import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { List, ListItem, ListItemText, makeStyles } from '@material-ui/core';
import {
  Portlet,
  PortletHeader,
  PortletLabel,
  PortletContent
} from '../index';
import { useDispatch, useSelector } from 'react-redux';
import { updateSelections as updateWellSelections } from '../../../store/slices/wells';
import { updateSelections as updateLogSelections } from '../../../store/slices/logs';
import { updateSelections as updateFormationSelections } from '../../../store/slices/formations';

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
  update: {
    wells: updateWellSelections,
    logs: updateLogSelections,
    formations: updateFormationSelections
  },
  displayField: {
    wells: 'name',
    logs: 'log',
    formations: 'name'
  }
}

const EsaList = props => {
  const { title, listType, ...rest } = props;

  const classes = useStyles();
  const dispatch = useDispatch();
  const selectedOptions = useSelector( state => state[listType].selectedIds );
  const [selections, setSelect] = useState([]);

  const handleSelect = value => {
    const currentIndex = selectedOptions.indexOf(value.id);
    const newSelectedOptions = [...selectedOptions];
    
    if (currentIndex === -1) {
      newSelectedOptions.push(value.id);
    } else {
      newSelectedOptions.splice(currentIndex, 1);
    }
    
    setSelect(newSelectedOptions);
    dispatch( listConfig.update[listType]({ selections: newSelectedOptions }) );
  };
  
  const isSelected = value => selectedOptions.includes(value.id);

  const options = useSelector( state => state[listType].data );

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
