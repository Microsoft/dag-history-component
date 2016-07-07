import React, { PropTypes } from 'react';
import Branch from '../Branch';
const DO_NOTHING = () => ({});

const BranchList = ({
  branches,
  onBranchClick,
  onBranchContinuationClick,
}) => {
  const branchViews = branches.map(s => (
    <Branch
      key={`branch:${s.id}`}
      label={s.label}
      activeStateIndex={s.activeStateIndex}
      continuation={s.continuation}
      startsAt={s.startsAt}
      endsAt={s.endsAt}
      maxDepth={s.maxDepth}
      branchType={s.branchType}
      currentBranchStart={s.currentBanchStart}
      currentBranchEnd={s.currentBranchEnd}
      onClick={() => (onBranchClick || DO_NOTHING)(s.id)}
      onContinuationClick={() => (onBranchContinuationClick || DO_NOTHING)(s.id)}
    />
  ));
  return (
    <div className="history-branch-list">
      {branchViews}
    </div>
  );
};

BranchList.propTypes = {
  activeBranch: PropTypes.number.isRequired,
  onBranchClick: PropTypes.func,
  onBranchContinuationClick: PropTypes.func,
  branches: PropTypes.arrayOf(React.PropTypes.shape({
    id: PropTypes.number.isRequired,
    label: PropTypes.string.isRequired,
    activeStateIndex: PropTypes.number,
    continuation: PropTypes.shape({
      numContinuations: PropTypes.number.isRequired,
      isSelected: PropTypes.bool.isRequired,
    }).isRequired,
    startsAt: PropTypes.number.isRequired,
    endsAt: PropTypes.number.isRequired,
    currentBranchStart: PropTypes.number.isRequired,
    currentBranchEnd: PropTypes.number.isRequired,
    maxDepth: PropTypes.number.isRequired,
    branchType: PropTypes.oneOf(['current', 'legacy']).isRequired,
  })).isRequired,
};

export default BranchList;
