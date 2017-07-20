import React, {Component} from 'react';
import './App.css';

import {css} from 'glamor';
import moment from 'moment';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import { ComboBox } from 'office-ui-fabric-react/lib/ComboBox';
import {
    CompoundButton
} from 'office-ui-fabric-react/lib/Button';

class App extends Component {
    constructor(props) {
        super(props);
        var compoundSearchMap = {
            "Cosentyx MB": ["Cosentyx", "Enbrel", "Humira", "Taltz", "Stelaza", "Otelza", "Simponi", "Cimzia", "Remicade"],
            "Extavia Beta 1B": ["Extavia", "Betaseron"],
            "Extavia MB": ["Extavia", "Betaseron", "Predrigy", "Avonex", "Rebif", "Aubagio", "Tecfidera"],
            "Gilenya MB": ["Extavia", "Betaseron", "Predrigy", "Avonex", "Rebif", "Aubagio", "Tecfidera"]
        };
        var simpleSearchMap = ["Cosentyx", "Ciprodex", "Entresto", "Extavia", "Gilenya", "Moxeza"];
        var compoundSearchTerms = Object.keys(compoundSearchMap).map(function (value) {
            return {
                "key": value.split(' ').join('_'),
                "text": value
            }
        });
        var simpleSearchTerms = simpleSearchMap.map(function (value) {
            return {
                "key": value,
                "text": value
            }
        });
        this.state = {
            _compoundSearchMap: compoundSearchMap,
            _simpleSearchMap: simpleSearchMap,
            textCriteria: "",
            _simpleSearchTerms: simpleSearchTerms,
            _compoundSearchTerms: compoundSearchTerms,
            _selectedOption: {}
        }

    }
    addSearchTerm(searchType){
        var selectedValue = (searchType === "Compound") ? (this.state._compoundSearchMap[this.state._selectedOption.text]).join(',') : this.state._selectedOption.text;
        var valueToSet = (this.state.textCriteria === "") ? selectedValue : this.state.textCriteria.concat(",").concat(selectedValue);
        console.log("In the add search term ", searchType, valueToSet);

        this.setState({
            textCriteria: valueToSet
        })
    }
    _onCriteriaChanged(option)
    {
        this.setState({
            _selectedOption: option
        })
    }
    render() {
      let dateString = moment(new Date()).format('MMMM Do YYYY, h:mm:ss a');

      return (
      <div className="ms-Grid">
          <div className="ms-Grid-row" { ...css({
              backgroundColor: '#2488d8',
              boxShadow: '0 0 20px rgba(192, 192, 192, .3)',
              padding: 20
          }) }>
              <div className="ms-Grid-col ms-u-sm10 ms-u-md10 ms-u-lg10">
                        <span className="ms-font-su ms-fontColor-white">
                          Good Morning !
                        </span>
                  <br/>
                  <span className="ms-font-xs ms-fontColor-white">{ dateString }</span>
              </div>
          </div>
          <div className="ms-Grid-row">
              <div className="ms-Grid-col ms-u-sm12 ms-u-md12 ms-u-lg12" { ...css({
                  paddingLeft: 20,
                  paddingTop: 20,
                  fontFamily: "Segoe UI WestEuropean,Segoe UI,-apple-system,BlinkMacSystemFont,Roboto,Helvetica Neue,sans-serif"
              }) }>
                  <div className="ms-borderBox">
                    <TextField  label='Choose files to upload' type="file" multiple required={ true }/>
                  </div>
                  <div className="ms-borderBox">
                      <div className="ms-Grid-row">
                          <div className="ms-Grid-col ms-u-sm6 ms-u-md6 ms-u-lg6">
                              <h3 className="ComponentPage-doSection">Simple Search</h3>
                              <ComboBox
                                  defaultSelectedKey='C'
                                  label='Simple search options'
                                  id='simpleSearchDropdown'
                                  ariaLabel='Simple search options'
                                  allowFreeform={ true }
                                  autoComplete={ true }
                                  options={ this.state._simpleSearchTerms }
                                  onChanged={ this._onCriteriaChanged.bind(this) }
                              />
                              <CompoundButton description='Add this term to search criteria' disabled={ false } onClick={this.addSearchTerm.bind(this, "Simple")}>
                                  Add term
                              </CompoundButton>
                          </div>
                          <div className="ms-Grid-col ms-u-sm6 ms-u-md6 ms-u-lg6">
                              <h3 className="ComponentPage-doSection">Compound Search</h3>
                              <ComboBox
                                  defaultSelectedKey='C'
                                  label='Compound search options'
                                  id='compoundSearchDropdown'
                                  ariaLabel='Compound search options'
                                  allowFreeform={ true }
                                  autoComplete={ true }
                                  options={ this.state._compoundSearchTerms }
                                  onChanged={ this._onCriteriaChanged.bind(this) }
                              />
                              <CompoundButton description='Add this term to search criteria' disabled={ false } onClick={this.addSearchTerm.bind(this, "Compound")}>
                                  Add term
                              </CompoundButton>
                          </div>
                      </div>
                  </div>
                  <div className="ms-borderBox">
                      <TextField label='Search criteria' multiline rows={ 4 } iconProps={ { iconName: 'Search' } } disabled={ true } value={this.state.textCriteria}/>
                  </div>
              </div>
          </div>

      </div>) ;
  }
}

export default App;
