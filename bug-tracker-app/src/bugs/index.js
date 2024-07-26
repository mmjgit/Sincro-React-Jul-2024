import {useSelector, useDispatch} from 'react-redux';

import './index.css';

import BugStats from "./views/bugStats";
import BugEdit from "./views/bugEdit";
import BugSort from "./views/bugSort";
import BugList from "./views/bugList";
import * as bugActionCreators from './actions';
import { bindActionCreators } from 'redux';

function Bugs() {
  const bugs = useSelector(storeState => storeState.bugsState);
  const dispatch = useDispatch() // => store.dispatch
  const bugActionDispatchers = bindActionCreators(bugActionCreators, dispatch);
  const {createNew, toggle, remove, removeClosed} = bugActionDispatchers;

  const closedCount = bugs.reduce(
    (prevResult, bug) => (bug.isClosed ? prevResult + 1 : prevResult),
    0
  );
  return (
    <>
      <h3>Bugs</h3>
      <BugStats count={bugs.length} closedCount={closedCount} />
      <BugEdit createNew={createNew} />
      <BugSort />
      <BugList {...{ bugs, toggle, remove, removeClosed }} />
    </>
  );
}
export default Bugs;