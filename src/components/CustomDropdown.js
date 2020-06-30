import React, { Component, Fragment } from 'react'

export default class CustomDropdown extends Component {
    state = {
        allSelected: 'none',
        lteCoin: [],
        region: ''
    }
    componentDidMount() {
        if (this.props.item) {
            const { lteCoin, region, allSelected } = this.props.item
            this.setState({ lteCoin, region, allSelected })
        }
    }
    componentWillReceiveProps(nextProps, nextState) {
        if (this.props.item !== nextProps.item && this.state.region === nextProps.changedRegion) {
            const { lteCoin, region, allSelected } = nextProps.item
            this.setState({ lteCoin, region, allSelected })
        }
    }
    shouldComponentUpdate(nextProps, nextState) {
        if (this.state.lteCoin !== nextState.lteCoin) {
            return true
        } else if (this.state.region !== nextProps.changedRegion) {
            return false
        }
        return true
    }
    selectAllClick = () => {
        const { lteCoin, region, allSelected } = this.state
        this.props.onGroupSelect(lteCoin, region, allSelected === 'all' ? 'none' : 'all')
    }
    selectValue = (selectedItem) => {
        this.setState((prevState) => {
            const length = prevState.lteCoin.length
            let count = 0
            const updatedItems = prevState.lteCoin.map(eachItem => {
                if (eachItem.item === selectedItem.item) {
                    this.props.selectValue(selectedItem.item)
                    return { ...eachItem, checked: !selectedItem.checked }
                }
                return { ...eachItem }
            })
            updatedItems.forEach((eachItem) => {
                if (eachItem.checked) {
                    count = count + 1
                }
            })
            if (count === length) {
                return { allSelected: 'all', lteCoin: updatedItems }
            } else if (count === 0) {
                return { allSelected: 'none', lteCoin: updatedItems }
            } else {
                return { allSelected: 'partial', lteCoin: updatedItems }
            }
        })
    }
    render() {
        let { allSelected, lteCoin, region } = this.state
        return <Fragment>
            <li
                style={{ ...this.props.style, listStyleType: "none" }}
                onClick={this.selectAllClick}
            >
                <input type='checkbox' className={allSelected === "partial" ? "regular-checkbox" : ""} checked={allSelected === 'none' ? false : true} readOnly />
                <span style={{ fontSize: '30px', marginLeft: '5px' }}>{region}</span>
            </li>
            {lteCoin.map((eachItem) => <li
                style={{ ...this.props.style, listStyleType: "none", marginLeft: '20px' }}
                onClick={() => this.selectValue(eachItem)}>
                <input type='checkbox' checked={eachItem.checked} readOnly />
                <span style={{ fontSize: '30px', marginLeft: '5px' }}>{eachItem.item}</span>
            </li>)}
        </Fragment>
    }
}