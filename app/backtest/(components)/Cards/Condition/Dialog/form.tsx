import useConditionGenerator from '@/app/backtest/(hooks)/useConditionGenerator';
import { ConditionKey } from '@/store/zustand';
import {
  Autocomplete,
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
} from '@mui/material';
import { Field, Form as ReactFinalForm } from 'react-final-form';
import {
  FormFieldType,
  FormOperatorFieldType,
  FormRollbackFieldType,
} from './types';

interface FormValues {
  operator: string;
  parameter: string;
  value: string;
  parameter_rollback: string;
  value_rollback: string;
}

interface FormErrorValues {
  operator?: string;
  parameter?: string;
  value?: string;
  rollback?: string;
  parameter_rollback?: string;
  value_rollback?: string;
}

const validate = (values: FormValues) => {
  const errors: FormErrorValues = {};
  if (!values.parameter) {
    errors.parameter = 'Parameter is required';
  }
  if (!values.operator) {
    errors.operator = 'Operator is required';
  }
  if (!values.value) {
    errors.value = 'Value is required';
  }
  if (!values.parameter_rollback) {
    errors.parameter_rollback = 'Parameter Rollback  is required';
  }
  if (!values.value_rollback) {
    errors.value_rollback = 'Value Rollback is required';
  }
  return errors;
};

const initialValues = {
  operator: '>',
  parameter: 'c',
  parameter_rollback: '0',
  value_rollback: '0',
};

function Form({ keyType }: { keyType: ConditionKey }) {
  const { handleConditionValue } = useConditionGenerator();
  const onSubmit = (values: FormValues) => {
    // values.value屬於number
    let value: FormFieldType | number;
    if (!isNaN(Number(values.value))) {
      value = parseInt(values.value);
    } else {
      value = values.value as FormFieldType;
    }

    handleConditionValue(
      {
        parameter: values.parameter as FormFieldType,
        operator: values.operator as FormOperatorFieldType,
        value,
        parameter_rollback: parseInt(values.parameter_rollback),
        value_rollback: parseInt(values.value_rollback),
      },
      keyType,
    );
  };

  return (
    <Box>
      <ReactFinalForm
        onSubmit={onSubmit}
        validate={validate}
        initialValues={initialValues}
        render={({ handleSubmit, submitting }) => (
          <form onSubmit={handleSubmit} noValidate>
            <Stack direction="row" gap={1}>
              <Field name="parameter_rollback">
                {({ input, meta }) => (
                  <FormControl fullWidth>
                    <InputLabel>Parameter Rollback</InputLabel>
                    <Select
                      {...input}
                      size="small"
                      label="Parameter Rollback"
                      error={meta.touched && meta.error ? true : false}
                    >
                      {Object.entries(FormRollbackFieldType).map(
                        ([key, value], index) => (
                          <MenuItem key={index} value={value}>
                            {key}
                          </MenuItem>
                        ),
                      )}
                    </Select>
                  </FormControl>
                )}
              </Field>
              <Field name="parameter">
                {({ input, meta }) => (
                  <FormControl fullWidth>
                    <InputLabel>Parameter</InputLabel>
                    <Select
                      {...input}
                      size="small"
                      defaultValue={'c'}
                      label="Parameter"
                      error={meta.touched && meta.error ? true : false}
                    >
                      {Object.entries(FormFieldType).map(
                        ([key, value], index) => (
                          <MenuItem key={index} value={value}>
                            {key}
                          </MenuItem>
                        ),
                      )}
                    </Select>
                  </FormControl>
                )}
              </Field>
              <Field name="operator">
                {({ input, meta }) => (
                  <FormControl fullWidth>
                    <InputLabel>Operator</InputLabel>
                    <Select
                      {...input}
                      size="small"
                      defaultValue={'>'}
                      label="Operator"
                      error={meta.touched && meta.error ? true : false}
                    >
                      {Object.entries(FormOperatorFieldType).map(
                        ([key, value], index) => (
                          <MenuItem key={index} value={value}>
                            {key}
                          </MenuItem>
                        ),
                      )}
                    </Select>
                  </FormControl>
                )}
              </Field>
              <Field name="value">
                {({ input, meta }) => (
                  <Autocomplete
                    value={input.value}
                    freeSolo
                    fullWidth
                    onChange={(_, value) => {
                      input.onChange(value);
                    }}
                    options={Object.entries(FormFieldType).map(
                      ([key, value]) => value,
                    )}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        onChange={input.onChange}
                        label="Value"
                        size="small"
                        error={meta.touched && meta.error ? true : false}
                        helperText={
                          meta.touched && meta.error ? meta.error : ''
                        }
                      />
                    )}
                  />
                )}
              </Field>
              <Field name="value_rollback">
                {({ input, meta }) => (
                  <FormControl fullWidth>
                    <InputLabel>Value Rollback</InputLabel>
                    <Select
                      {...input}
                      size="small"
                      label="Value Rollback"
                      error={meta.touched && meta.error ? true : false}
                    >
                      {Object.entries(FormRollbackFieldType).map(
                        ([key, value], index) => (
                          <MenuItem key={index} value={value}>
                            {key}
                          </MenuItem>
                        ),
                      )}
                    </Select>
                  </FormControl>
                )}
              </Field>

              <Button
                variant="contained"
                color="primary"
                type="submit"
                disabled={submitting}
              >
                Submit
              </Button>
            </Stack>
          </form>
        )}
      />
    </Box>
  );
}

export default Form;
