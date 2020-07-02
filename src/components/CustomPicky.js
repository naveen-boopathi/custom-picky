import React, { Component, Fragment } from 'react'
import { Picky } from 'react-picky'
import 'react-picky/dist/picky.css'
import CustomDropdown from './CustomDropdown'

export default class CustomPicky extends Component {
    state = {
        options: [],
        selectedItems: [],
        filteredOptions: [],
        isFiltered: false
    }
    componentDidMount() {
        if (this.props) {
            const { options, selectedItems } = this.props
            this.setState({ options, selectedItems })
        }
    }
    componentWillReceiveProps(nextProps, nextState) {
        if (this.props !== nextProps) {
            const { options, selectedItems } = nextProps
            this.setState({ options, selectedItems })
        }
    }
    handleGroupSelect = (updatedLteCoin, region, type) => {
        let { selectedItems, options, filteredOptions, isFiltered } = this.state
        let updatedFilterOptions = []
        updatedLteCoin.forEach(eachLteCoin => {
            const isPresent = selectedItems.includes(eachLteCoin.item)
            if (eachLteCoin.checked) {
                selectedItems = isPresent ? selectedItems : [...selectedItems, eachLteCoin.item]
            } else {
                selectedItems = isPresent ? selectedItems.filter((item) => item !== eachLteCoin.item) : selectedItems
            }
        })
        const updatedOptions = options.map((eachOption) => {
            if (eachOption.region === region) {
                return { ...eachOption, lteCoin: updatedLteCoin, allSelected: type }
            } else {
                return { ...eachOption }
            }
        })
        if (isFiltered) {
            updatedFilterOptions = filteredOptions.map(eachOption => {
                if (eachOption.region === region) {
                    return { ...eachOption, lteCoin: updatedLteCoin, allSelected: type }
                } else {
                    return { ...eachOption }
                }
            })
        }
        this.setState({ selectedItems, options: updatedOptions, filteredOptions: updatedFilterOptions })
    }
    customFilter = (term, key) => {
        const filteredOptions = this.state.options.filter((eachOption) => {
            return String(eachOption[key]).toLowerCase().indexOf(String(term).toLowerCase()) > -1
        })
        const isFiltered = term ? true : false
        this.setState({ filteredOptions, isFiltered })
    }
    onSelectAllClick = () => {
        let {selectedItems, options} = this.state
        let updatedOptions = [], updatedLteCoin = []
        if(this.props.totalCount === selectedItems.length) {
            selectedItems = []
            updatedOptions = options.map(eachOption => {
                updatedLteCoin = eachOption.lteCoin.map(eachLteCoin => {
                    return {...eachLteCoin, checked: false}
                })
                return {...eachOption, lteCoin: updatedLteCoin, allSelected: 'none'}
            })
        } else {
            selectedItems = []
            updatedOptions = options.map(eachOption => {
                updatedLteCoin = eachOption.lteCoin.map(eachLteCoin => {
                    selectedItems = [...selectedItems, eachLteCoin.item]
                    return {...eachLteCoin, checked: true}
                })
                return {...eachOption, lteCoin: updatedLteCoin, allSelected: 'all'}
            })
        }
        this.setState({options: updatedOptions, selectedItems})
    }
    render() {
        const { options, selectedItems, filteredOptions, isFiltered } = this.state
        return <Fragment>
            <Picky
                id="picky"
                options={options}
                value={selectedItems}
                multiple={true}
                includeSelectAll={true}
                includeFilter={true}
                labelKey={"region"}
                valueKey={"lteCoin"}
                filterTermProcessor={(term) => {
                    this.customFilter(term, 'region')
                    return ''
                }}
                onChange={(selectedItems) => this.setState({ selectedItems })}
                dropdownHeight={600}
                renderList={() => {
                    const items = isFiltered ? filteredOptions : options
                    return items.map(item =>
                        <CustomDropdown
                            item={item}
                            key={item.region}
                            onGroupSelect={this.handleGroupSelect}
                        />)
                    }
                }
                renderSelectAll={(props) => {
                    let allSelected = 'partial'
                    if(this.props.totalCount === selectedItems.length) {
                        allSelected = 'all'
                    } else if(selectedItems.length === 0) {
                        allSelected = 'none'
                    } else {
                        allSelected = 'partial'
                    }
                    return isFiltered ? <Fragment></Fragment> : <Fragment>
                        <li style={{cursor: 'pointer'}} onClick={this.onSelectAllClick}>
                            <input 
                                id='selectall' 
                                type='checkbox' 
                                className={allSelected === 'partial' ? 'regular-checkbox' : ''}
                                checked={allSelected === 'none' ? false : true}
                            />
                            <span>Select All</span>
                        </li>
                    </Fragment>
                }}
            />
        </Fragment>
    }
}