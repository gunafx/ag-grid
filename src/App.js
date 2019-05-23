import React, { Component } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham-dark.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'ag-grid-enterprise';
import './App.scss';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      columnDefs: [{
          headerName: "Make", 
          field: "make", 
          sortable: true, 
          filter: true, 
          checkboxSelection: true,
          rowGroup: true 
      }, {
        headerName: "Price", field: "price"
      }],
      autoGroupColumnDef: {
        headerName: "Model",
        field: "model",
        cellRenderer:'agGroupCellRenderer',
        cellRendererParams: {
          checkbox: true
        }
      }
    }
      this.onButtonClick = this.onButtonClick.bind(this);
  }
  componentDidMount() {
      fetch('https://api.myjson.com/bins/15psn9')
          .then(result => result.json())
          .then(rowData => this.setState({rowData}))
  }
  onButtonClick = e => {
    const selectedNodes = this.gridApi.getSelectedNodes()
    const selectedData = selectedNodes.map( node => node.data )
    const selectedDataStringPresentation = selectedData.map( node => node.make + ' ' + node.model);
    this.setState({selectedRows: selectedDataStringPresentation});
}

  render() {
    return (
        <div className="container mt-5">
            <h1>Ag Grid - Getting Started</h1>
            <div 
                className="ag-theme-balham-dark"
                style={{ 
                height: '400px', 
                width: '700px' }}
            >
                <AgGridReact
                    onGridReady={ params => this.gridApi = params.api }
                    rowSelection="multiple"
                    columnDefs={this.state.columnDefs}
                    groupSelectsChildren={true}
                    autoGroupColumnDef={this.state.autoGroupColumnDef}
                    rowData={this.state.rowData}>
                </AgGridReact>
            </div>
            <div className="actions mt-4">
                <button className="btn btn-large btn-primary" onClick={this.onButtonClick}>Get selected rows</button>
                
                <div className="row-val ml-5">
                    {this.state.selectedRows && this.state.selectedRows.map((v,i) => { return <div> {v} </div>})}
                </div>
            </div>
        </div>
    );
  }
}

export default App;