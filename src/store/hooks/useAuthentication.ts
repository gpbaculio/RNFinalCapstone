import {useMemo} from 'react';

import {useDispatch, useSelector} from 'react-redux';
import {bindActionCreators} from 'redux';

import * as authenticationActions from '../authentication/actions';
import {AppReducerType} from '../index';

const useAuthentication = () => {
  const dispatch = useDispatch();

  const state = useSelector(
    ({authentication}: AppReducerType) => authentication,
  );

  const actions = useMemo(
    () => bindActionCreators(authenticationActions, dispatch),
    [dispatch],
  );

  return {state, actions};
};

export default useAuthentication;
