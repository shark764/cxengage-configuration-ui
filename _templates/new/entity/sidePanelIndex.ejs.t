---
to: src/containers/SidePanelDetails/<%= Name %>/index.js
---
/*
 * Copyright © 2015-2019 Serenova, LLC. All rights reserved.
 */

import { connect } from 'react-redux';
import <%= Name %>DetailsPanel from './layout';

//
// Erase 'mapStateToProps' if no custom props are needed
// You'll probably use it for sidePanelTables props
//
// export function mapStateToProps(state, props) {
//   return {
//     anyUsedProp: anySelector(state),
//   };
// }

export default connect(/*mapStateToProps*/)(<%= Name %>DetailsPanel);