import React from 'react';
import UndoList from '../../components/UndoList';
import {shallow} from 'enzyme';
import {findTestWrapper} from '../../../../utils/testUtils'
 


it('Header component render success', ()=>{
  const wrapper = shallow(<UndoList list={[]}/>)
  expect(wrapper).toMatchSnapshot()
}) 

it('For the undo list, when the data is null, the number of count is zero and nothing in the list', ()=>{
    const wrapper = shallow(<UndoList list={[]}/>)
    const countElem = findTestWrapper(wrapper, "count")
    const listItems = findTestWrapper(wrapper, "list-item")
    expect(countElem.text()).toEqual("0")
    expect(listItems.length).toEqual(0)
})

it('For the undo list, when the data exists, the number of count is the length of the list', ()=>{
    const listData = [
        {status: 'div', value: 'learn TDD'},
        {status: 'div', value: 'learn jest'},
        {status: 'div', value: 'learn BDD'},
    ]
    const wrapper = shallow(<UndoList list={listData}/>)
    const countElem = findTestWrapper(wrapper, "count")
    const listItems = findTestWrapper(wrapper, "list-item")
    expect(countElem.text()).toEqual("3")
    expect(listItems.length).toEqual(3)
})

it('when the undolist exists, there are delete buttons.', ()=>{
    const listData = [
        {status: 'div', value: 'learn TDD'},
        {status: 'div', value: 'learn jest'},
        {status: 'div', value: 'learn BDD'},
    ]
    const wrapper = shallow(<UndoList list={listData}/>)
    const deleteItems = findTestWrapper(wrapper, "delete-item")
    expect(deleteItems.length).toEqual(3)
})

it(' When click a delete button, it will recall delete method', ()=>{
    const listData = [
        {status: 'div', value: 'learn TDD'},
        {status: 'div', value: 'learn jest'},
        {status: 'div', value: 'learn BDD'},
    ]
    const fn = jest.fn()
    const index = 1;
    const wrapper = shallow(<UndoList deleteItem={fn} list={listData}/>)
    const deleteItems = findTestWrapper(wrapper, "delete-item")
    deleteItems.at(index).simulate('click')
    expect(fn).toHaveBeenLastCalledWith(index)
})

it(' When click a item, it will recall changeStatus method', ()=>{
    const listData = [
        {status: 'div', value: 'learn TDD'},
        {status: 'div', value: 'learn jest'},
        {status: 'div', value: 'learn BDD'},
    ]
    const fn = jest.fn()
    const index = 1;
    const wrapper = shallow(<UndoList changeStatus={fn} list={listData}/>)
    const deleteItems = findTestWrapper(wrapper, "list-item")
    deleteItems.at(index).simulate('click')
    expect(fn).toHaveBeenLastCalledWith(index)
})

it(' When one status is input, show input area', ()=>{
    const listData = [
        {status: 'input', value: 'learn TDD'},
        {status: 'div', value: 'learn jest'},
        {status: 'div', value: 'learn BDD'},
    ]
    const wrapper = shallow(<UndoList list={listData}/>)
    const inputItems = findTestWrapper(wrapper, "input")
    expect(inputItems.length).toBe(1)
})

it(' When lose focus on a input area, execute handleBlur', ()=>{
    const listData = [
        {status: 'input', value: 'learn TDD'},
        {status: 'div', value: 'learn jest'},
        {status: 'div', value: 'learn BDD'},
    ]
    const fn = jest.fn()
    const index = 0;
    const wrapper = shallow(<UndoList handleBlur={fn} list={listData}/>)
    const inputElem = findTestWrapper(wrapper, "input")
    inputElem.simulate('blur')
    expect(fn).toHaveBeenLastCalledWith(index)
})

it(' When an input area changes, execute valueChange', ()=>{
    const listData = [
        {status: 'input', value: 'learn TDD'}
    ]
    const value='learn Jest'
    const fn = jest.fn()
    const wrapper = shallow(<UndoList valueChange={fn} list={listData}/>)
    const inputElem = findTestWrapper(wrapper, "input")
    inputElem.simulate('change', {
        target: {value}
    })
    expect(fn).toHaveBeenLastCalledWith(0, value)
})