import React from 'react';

const SingleListItem = (props) => {
  return (
    <div>
      <h4>{props.groceryList.listName}</h4>
    </div>
  );
}

SingleListItem.propTypes = {
  groceryList: React.PropTypes.object.isRequired
}

export default SingleListItem;