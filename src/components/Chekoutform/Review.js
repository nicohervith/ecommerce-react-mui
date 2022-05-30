import { List, ListItem, ListItemText, Typography } from '@material-ui/core'
import React from 'react'
import { useStateValue } from '../../StateProvider';
import { getBasketTotal } from '../../reducer';
import accounting from 'accounting'

const Review = () => {
  const [{basket}, dispatch] = useStateValue();
  return (
    <>
      <Typography variant="h6" gutterBottom>
        Order summary
      </Typography>
      <List disablePadding>
        {basket?.map((product) => (
          <ListItem key={product.name}>
            <ListItemText primary={product.name} /*secondary={1}*/ />
            <Typography variant="body2">
              {accounting.formatMoney(product.price, "USD $")}
            </Typography>
          </ListItem>
        ))}
        <ListItem>
          <ListItemText primary="Total" />
          <Typography variant="subtitle1">
            {accounting.formatMoney(getBasketTotal(basket), "USD $")}
          </Typography>
        </ListItem>
      </List>
    </>
  );
}

export default Review