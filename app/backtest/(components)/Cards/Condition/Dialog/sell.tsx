import { ConditionKey, useCondition } from '@/store/zustand';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { Box, Divider, Grid, IconButton } from '@mui/material';
import { Stack } from '@mui/system';
import Form from './form';
export default function Sell() {
  const { sell, removeConditionKeyValue } = useCondition();
  return (
    <Box>
      <Form keyType={ConditionKey.Sell} />
      <Stack my={2}>
        <Divider />
      </Stack>
      <Box maxHeight={'50vh'} overflow="auto">
        <Grid container>
          <Grid
            item
            xs={2}
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            Date
          </Grid>
          <Grid
            item
            xs={2}
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            parameter
          </Grid>
          <Grid
            item
            xs={2}
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            operator
          </Grid>
          <Grid
            item
            xs={2}
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            value
          </Grid>
          <Grid
            item
            xs={2}
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            Date
          </Grid>
          <Grid
            item
            xs={2}
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            Action
          </Grid>
        </Grid>
        {sell?.map((item, index) => (
          <Grid container key={index}> 
            <Grid
              item
              xs={2}
              display="flex"
              justifyContent="center"
              alignItems="center"
            >
              {item.parameter_rollback === 0
                ? '當日'
                : '前' + item.parameter_rollback + '日'}
            </Grid>
            <Grid
              item
              xs={2}
              display="flex"
              justifyContent="center"
              alignItems="center"
            >
              {item.parameter}
            </Grid>
            <Grid
              item
              xs={2}
              display="flex"
              justifyContent="center"
              alignItems="center"
            >
              {item.operator}
            </Grid>
            <Grid
              item
              xs={2}
              display="flex"
              justifyContent="center"
              alignItems="center"
            >
              {item.value}
            </Grid>
            <Grid
              item
              xs={2}
              display="flex"
              justifyContent="center"
              alignItems="center"
            >
              {item.value_rollback === 0
                ? '當日'
                : '前' + item.value_rollback + '日'}
            </Grid>
            <Grid
              item
              xs={2}
              display="flex"
              justifyContent="center"
              alignItems="center"
            >
              <IconButton
                onClick={() =>
                  removeConditionKeyValue(index, ConditionKey.Sell)
                }
              >
                <DeleteOutlineIcon />
              </IconButton>
            </Grid>
          </Grid>
        ))}
      </Box>
    </Box>
  );
}