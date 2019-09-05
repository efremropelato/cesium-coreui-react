import React from 'react';
import PivotTableUI from 'react-pivottable/PivotTableUI';
import 'react-pivottable/pivottable.css';
import TableRenderers from 'react-pivottable/TableRenderers';
import Plot from 'react-plotly.js';
import createPlotlyRenderers from 'react-pivottable/PlotlyRenderers';

import axios from 'axios';
import _ from 'lodash';

// create Plotly renderers via dependency injection
const PlotlyRenderers = createPlotlyRenderers(Plot);

// see documentation for supported input formats

class Data extends React.Component {
  constructor(props) {
    super(props);
    this.state = {pivotState: {...props, vals: ['value']},
                  data: [['attribute', 'attribute2'], ['value1', 'value2']]
                };
    }

    componentDidMount(){
      const _this = this;
      axios.get('http://localhost:8080/api/Demographies')
      .then(function (response) {
        const newData = _.map(response.data, (d)=>{ return {...d, value: parseInt(d.Valori)}})
        _this.setState({data: newData});
      })
      .catch(function (error) {
        console.error(error);
      })
      .finally(function () {
        console.log('Data loaded');
      });
    }

    render() {
        return (
            <PivotTableUI
                data={this.state.data}
                onChange={s => this.setState({pivotState:s})}
                renderers={Object.assign({}, TableRenderers, PlotlyRenderers)}
                {...this.state.pivotState}
            />
        );
    }
}
  export default Data;