import React from 'react';
import UndoList from '../../components/UndoList';
import {shallow} from 'enzyme';
import {findTestWrapper} from '../../../../utils/testUtils'
 


// it('Header component render success', ()=>{
//   const wrapper = shallow(<Header />)
//   expect(wrapper).toMatchSnapshot() 
// }) 

it('For the undo list, when the data is null, the number of count is zero and nothing in the list', ()=>{
    const wrapper = shallow(<UndoList list={[]}/>)
    const countElem = findTestWrapper(wrapper, "count")
    const listItems = findTestWrapper(wrapper, "list-item")
    expect(countElem.text()).toEqual("0")
    expect(listItems.length).toEqual(0)
})

it('For the undo list, when the data exists, the number of count is the length of the list', ()=>{
    const listData = ['learn jest', 'learn TDD', 'learn BDD']
    const wrapper = shallow(<UndoList list={listData}/>)
    const countElem = findTestWrapper(wrapper, "count")
    const listItems = findTestWrapper(wrapper, "list-item")
    expect(countElem.text()).toEqual("3")
    expect(listItems.length).toEqual(3)
})

it('when the undolist exists, there are delete buttons.', ()=>{
    const listData = ['learn jest', 'learn TDD', 'learn BDD']
    const wrapper = shallow(<UndoList list={listData}/>)
    const deleteItems = findTestWrapper(wrapper, "delete-item")
    expect(deleteItems.length).toEqual(3)
})

it(' When click a delete button, it will recall delete method', ()=>{
    const listData = ['learn jest', 'learn TDD', 'learn BDD']
    const fn = jest.fn()
    const index = 1;
    const wrapper = shallow(<UndoList deleteItem={fn} list={listData}/>)
    const deleteItems = findTestWrapper(wrapper, "delete-item")
    deleteItems.at(index).simulate('click')
    expect(fn).toHaveBeenLastCalledWith(index)
})
