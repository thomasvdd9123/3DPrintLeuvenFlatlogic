import { Formik } from 'formik';
import React, { Component } from 'react';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Loader from 'components/Loader';
// eslint-disable-next-line no-unused-vars
import InputFormItem from 'components/FormItems/items/InputFormItem';
// eslint-disable-next-line no-unused-vars
import SwitchFormItem from 'components/FormItems/items/SwitchFormItem';
// eslint-disable-next-line no-unused-vars
import RadioFormItem from 'components/FormItems/items/RadioFormItem';
// eslint-disable-next-line no-unused-vars
import SelectFormItem from 'components/FormItems/items/SelectFormItem';
// eslint-disable-next-line no-unused-vars
import DatePickerFormItem from 'components/FormItems/items/DatePickerFormItem';
// eslint-disable-next-line no-unused-vars
import ImagesFormItem from 'components/FormItems/items/ImagesFormItem';
// eslint-disable-next-line no-unused-vars
import FilesFormItem from 'components/FormItems/items/FilesFormItem';
// eslint-disable-next-line no-unused-vars

import modelsFields from 'pages/CRUD/Models/helpers/modelsFields';
import IniValues from 'components/FormItems/iniValues';
import PreparedValues from 'components/FormItems/preparedValues';
import FormValidations from 'components/FormItems/formValidations';
import Widget from 'components/Widget';

const ModelsForm = (props) => {
  const {
    isEditing,
    isProfile,
    findLoading,
    saveLoading,
    record,
    onSubmit,
    onCancel,
    modal,
  } = props;

  const iniValues = () => {
    return IniValues(modelsFields, record || {});
  };

  const formValidations = () => {
    return FormValidations(modelsFields, record || {});
  };

  const handleSubmit = (values) => {
    const { id, ...data } = PreparedValues(modelsFields, values || {});
    onSubmit(id, data);
  };

  const title = () => {
    if (isProfile) {
      return 'Edit My Profile';
    }
    return isEditing ? 'Edit Models' : 'Add Models';
  };

  const renderForm = () => (
    <Widget title={title()} collapse close>
      <Formik
        onSubmit={handleSubmit}
        initialValues={iniValues()}
        validationSchema={formValidations()}
      >
        {(form) => (
          <form onSubmit={form.handleSubmit}>
            <Grid container spacing={3} direction='column'>
              <Grid item>
                <FilesFormItem
                  name={'file'}
                  schema={modelsFields}
                  path={'models/file'}
                  fileProps={{
                    size: undefined,
                    formats: undefined,
                  }}
                  max={undefined}
                />
              </Grid>

              <Grid item>
                <InputFormItem name={'name'} schema={modelsFields} />
              </Grid>

              <Grid item>
                <InputFormItem name={'material'} schema={modelsFields} />
              </Grid>

              <Grid item>
                <InputFormItem name={'color'} schema={modelsFields} />
              </Grid>

              <Grid item>
                <InputFormItem name={'finish'} schema={modelsFields} />
              </Grid>

              <Grid item>
                <InputFormItem name={'scale'} schema={modelsFields} />
              </Grid>

              <Grid item>
                <InputFormItem name={'length'} schema={modelsFields} />
              </Grid>

              <Grid item>
                <InputFormItem name={'width'} schema={modelsFields} />
              </Grid>

              <Grid item>
                <InputFormItem name={'height'} schema={modelsFields} />
              </Grid>

              <Grid item>
                <InputFormItem name={'quantity'} schema={modelsFields} />
              </Grid>

              <Grid item>
                <InputFormItem name={'price'} schema={modelsFields} />
              </Grid>
            </Grid>
            <Grid container spacing={3} mt={2}>
              <Grid item>
                <Button
                  color='primary'
                  variant='contained'
                  onClick={form.handleSubmit}
                >
                  Save
                </Button>
              </Grid>
              <Grid item>
                <Button
                  color='primary'
                  variant='outlined'
                  onClick={form.handleReset}
                >
                  Reset
                </Button>
              </Grid>
              <Grid item>
                <Button
                  color='primary'
                  variant='outlined'
                  onClick={() => onCancel()}
                >
                  Cancel
                </Button>
              </Grid>
            </Grid>
          </form>
        )}
      </Formik>
    </Widget>
  );
  if (findLoading) {
    return <Loader />;
  }
  if (isEditing && !record) {
    return <Loader />;
  }
  return renderForm();
};
export default ModelsForm;
