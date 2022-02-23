import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import TapntableApi from '../api/api';
import {
  Typography,
  Container,
  Card,
  CardActionArea,
  CardContent
} from '@mui/material';
import { clearCurrentCheck } from '../actions/currentCheck';

const ServiceBar = () => {
  console.debug('Kitchen');

  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [ isLoading, setIsLoading ] = useState(true);
  const [ orders, setOrders ] = useState([]);

  useEffect(
    () => {
      console.debug('Service Bar useEffect on Mount');

      async function fetchItem() {
        dispatch(clearCurrentCheck());

        let ordersRes = await TapntableApi.getOpenOrders();
        // filter out completed orders
        if (ordersRes !== [])
          ordersRes = ordersRes.filter((o) => !o.completedAt);
        // Get list of ordered items for order
        for (let order of ordersRes) {
          let orderItems = await TapntableApi.getOrderedItemsByOrder(order.id);
          // Filter out items with destination other than bar
          orderItems = orderItems.filter((i) => i.destinationId === 3);
          order.items = orderItems;
        }

        const filteredOrders = ordersRes.filter((o) => o.items.length !== 0);

        console.log('Order & Items', filteredOrders);
        setOrders(filteredOrders);
        setIsLoading(false);
      }
      if (isLoading) {
        fetchItem();
      }
    },
    [ dispatch, isLoading ]
  );

  const orderComplete = async (orderId) => {
    console.debug('orderComplete', orderId);
    const complete = await TapntableApi.completeOrder(orderId);
    console.log('Completed order: ', complete);
    setIsLoading(true);
  };

  return (
    <div className="Kitchen">
      <Container style={{ height: '40vh' }}>
        <Typography variant="h4" align="center">
          Open Orders
        </Typography>

        {orders.map((o) => (
          <Card
            key={o.id}
            onClick={() => orderComplete(o.id)}
            sx={{
              width: 275,
              float: 'left',
              marginBottom: '2em',
              marginRight: '1em'
            }}
          >
            <CardActionArea>
              <CardContent>
                <Typography
                  sx={{ fontSize: 14 }}
                  color="text.secondary"
                  gutterBottom
                >
                  OrderId: {o.id}
                  <span style={{ float: 'right' }}>
                    Sent: {moment(o.sentAt).format('LT')}
                  </span>
                </Typography>
                <Typography variant="h5" component="div">
                  {o.displayName}
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                  Add Table number here
                </Typography>
                {o.items.map((i) => (
                  <div key={i.id}>
                    <Typography variant="p">
                      <strong>{i.name}</strong> Seat: {i.seatNum}
                    </Typography>
                    <br />
                    <Typography variant="p">{i.itemNote}</Typography>

                    <p>Dest:{i.destinationId}</p>
                    <p>{i.count}</p>
                    <p>{i.isVoid}</p>
                  </div>
                ))}
                <Typography variant="body2">
                  Completed At:{' '}
                  {o.completedAt && moment(o.completedAt).format('LT')}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        ))}
      </Container>
    </div>
  );
};

export default ServiceBar;
