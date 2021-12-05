import React, { useState } from 'react';
import Dashboard from '../layouts/Dashboard/Dashboard';
import { Typography, Grid, List, ListItem, ListItemText, makeStyles } from '@material-ui/core';
import {
  Portlet,
  PortletHeader,
  PortletLabel,
  PortletContent,
  EsaButton
} from '../layouts/components';

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
  portletContent: {
    height: 0,
    minHeight: 400,
    display: 'flex',
    flexDirection: 'column'
  },
  header: {
    padding: theme.spacing(0, 1, 0, 2),
    background: theme.palette.default.dark,
    color: theme.palette.default.contrastText
  },
  headerLabel: {
    '& .MuiTypography-root': {
      fontSize: '12px',
      fontWeight: 800
    }
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

export default function Wellbore() {
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

  const isSelected = value => selectedOptions.includes(value);

  return (
    <Dashboard>
      <Grid container spacing={1} className={classes.fullHeight}>
        <Grid item xs={12} md={5} container spacing={2} className={classes.fullHeight}>
          <Grid item xs={12} container spacing={2} className={`${ classes.flexColumn } ${ classes.fullHeight }`}>

            <Grid item xs={12} className={classes.flex}>
              <Portlet className={classes.flexGrow}>
                <PortletHeader className={classes.header}>
                  <PortletLabel title="Title" />
                </PortletHeader>
                <PortletContent className={classes.portletContent} noPadding>
                  <List>
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20].map(
                      option => (
                        <ListItem
                          key={option}
                          className={classes.listItem}
                          selected={isSelected(option)}
                          onClick={() => handleSelect(option)}
                        >
                          <ListItemText primary={`item-${option}`} />
                        </ListItem>
                      )
                    )}
                  </List>
                </PortletContent>
              </Portlet>
            </Grid>

            <Grid item xs={12} className={classes.flex}>
              <Portlet className={classes.flexGrow}>
                <PortletHeader className={classes.header}>
                  <PortletLabel title="Title" />
                </PortletHeader>
                <PortletContent className={classes.portletContent} noPadding>
                  <List>
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20].map(
                      option => (
                        <ListItem
                          key={option}
                          className={classes.listItem}
                          selected={isSelected(option)}
                          onClick={() => handleSelect(option)}
                        >
                          <ListItemText primary={`item-${option}`} />
                        </ListItem>
                      )
                    )}
                  </List>
                </PortletContent>
              </Portlet>
            </Grid>

            <Grid item xs={12} className={classes.flexColumn}>
              <Portlet className={classes.flexGrow}>
                <PortletHeader className={classes.header}>
                  <PortletLabel title="Title" />
                </PortletHeader>
                <PortletContent className={classes.portletContent} noPadding>
                  <List>
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20].map(
                      option => (
                        <ListItem
                          key={option}
                          className={classes.listItem}
                          selected={isSelected(option)}
                          onClick={() => handleSelect(option)}
                        >
                          <ListItemText primary={`item-${option}`} />
                        </ListItem>
                      )
                    )}
                  </List>
                </PortletContent>
              </Portlet>
              
              <EsaButton fullWidth className={classes.button}>
                Click me
              </EsaButton>
            </Grid>


          </Grid>
        </Grid>

        <Grid item xs={12} md={7} container spacing={2}>
          <Grid item xs={12} container spacing={2}>
            <Grid item xs={12}>

              <Typography variant="h2">Wellbore 2.</Typography>

            </Grid>
          </Grid>
        </Grid>
      </Grid>

    </Dashboard>
  );
}
