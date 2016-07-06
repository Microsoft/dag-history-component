// TODO: This file is legacy. Think about what to do with it.
const log = require('debug')('dag-history-component:components:History');
import DagGraph from 'redux-dag-history/lib/DagGraph';
import React, { PropTypes } from 'react';
import StateList from '../StateList';
import BranchList from '../BranchList';

require('./History.sass');

const History = ({
  history,
  onBranchSelect,
  onStateSelect,
}) => {
  const historyGraph = new DagGraph(history.graph);

  const {
    currentBranch,
    currentStateId,
    branches,
    maxDepth,
  } = historyGraph;
  const latestCommitOnBranch = historyGraph.latestOn(currentBranch);
  const commitPath = historyGraph.commitPath(latestCommitOnBranch);

  const stateList = commitPath.reverse().map(id => {
    const label = historyGraph.stateName(id);
    const branchType = 'current';  // TODO: figure out how to distinguish between current/legacy,
    return {
      id,
      label,
      branchType,
      continuation: {
        numContinuations: historyGraph.childrenOf(id).length,
        isSelected: false,
      },
    };
  });

  const branchList = branches.map(branch => {
    const activeStateIndex = historyGraph.depthIndexOf(branch, currentStateId);
    const startsAt = historyGraph.branchStartDepth(branch);
    const endsAt = historyGraph.branchEndDepth(branch);
    const branchType = 'current';  // TODO: figure out how to distinguish between current/legacy,
    const label = historyGraph.getBranchName(branch);
    return {
      id: branch,
      label,
      activeStateIndex,
      continuation: {
        numContinuations: 0, // TODO
        isSelected: false,
      },
      startsAt,
      endsAt,
      maxDepth,
      branchType,
    };
  });

  const onStateContinuationClick = (id) => log('state continuation clicked!', id);
  const onBranchContinuationClick = (id) => log('branch continuation clicked', id);

  log('render history',
    currentBranch,
    currentStateId,
    stateList,
    branchList,
    history
  );

  return (
    <div className="history-container">
      <div className="state-list-container">
        <StateList
          activeStateId={currentStateId}
          states={stateList}
          onStateClick={onStateSelect}
          onStateContinuationClick={onStateContinuationClick}
        />
      </div>
      <div className="branch-list-container">
        <BranchList
          activeBranch={currentBranch}
          branches={branchList}
          onBranchClick={onBranchSelect}
          onBranchContinuationClick={onBranchContinuationClick}
        />
      </div>
    </div>
  );
};

History.propTypes = {
  /**
   * The Dag-History Object
   */
  history: PropTypes.object.isRequired,

  /**
   * User Interaction Handlers
   */
  onBranchSelect: PropTypes.func.isRequired,
  onStateSelect: PropTypes.func.isRequired,
};
export default History;