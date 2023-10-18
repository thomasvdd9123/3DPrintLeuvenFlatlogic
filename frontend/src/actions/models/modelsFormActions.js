import axios from 'axios';
import Errors from 'components/FormItems/error/errors';
import { push } from 'connected-react-router';
import { doInit } from 'actions/auth';
import { showSnackbar } from '../../components/Snackbar';

const actions = {
  doNew: () => {
    return {
      type: 'MODELS_FORM_RESET',
    };
  },

  doFind: (id) => async (dispatch) => {
    try {
      dispatch({
        type: 'MODELS_FORM_FIND_STARTED',
      });

      axios.get(`/models/${id}`).then((res) => {
        const record = res.data;

        dispatch({
          type: 'MODELS_FORM_FIND_SUCCESS',
          payload: record,
        });
      });
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: 'MODELS_FORM_FIND_ERROR',
      });

      dispatch(push('/admin/models'));
    }
  },

  doCreate: (values) => async (dispatch) => {
    try {
      dispatch({
        type: 'MODELS_FORM_CREATE_STARTED',
      });

      axios.post('/models', { data: values }).then((res) => {
        dispatch({
          type: 'MODELS_FORM_CREATE_SUCCESS',
        });
        showSnackbar({ type: 'success', message: 'Models created' });
        dispatch(push('/admin/models'));
      });
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: 'MODELS_FORM_CREATE_ERROR',
      });
    }
  },

  doUpdate: (id, values, isProfile) => async (dispatch, getState) => {
    try {
      dispatch({
        type: 'MODELS_FORM_UPDATE_STARTED',
      });

      await axios.put(`/models/${id}`, { id, data: values });

      dispatch(doInit());

      dispatch({
        type: 'MODELS_FORM_UPDATE_SUCCESS',
      });

      if (isProfile) {
        showSnackbar({ type: 'success', message: 'Profile updated' });
      } else {
        showSnackbar({ type: 'success', message: 'Models updated' });
        dispatch(push('/admin/models'));
      }
    } catch (error) {
      Errors.handle(error);
      showSnackbar({ type: 'error', message: 'Models update error' });
      dispatch({
        type: 'MODELS_FORM_UPDATE_ERROR',
      });
    }
  },
};

export default actions;
