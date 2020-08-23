import React from 'react';
import TodoList from '../../index';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
 
Enzyme.configure({ adapter: new Adapter() });

it('TodoList initial as null', ()=>{
  const wrapper = shallow(<TodoList />)
  expect(wrapper.state('undoList')).toEqual([])
}) 

it('TodoList should pass a method to Header', ()=>{
    const wrapper = shallow(<TodoList />)
    const Header = wrapper.find('Header')
    expect(Header.prop('addUndoItem')).toBe(wrapper.instance().addUndoItem)
})

it('when addUndoItem execute, undoList should add content', ()=>{
    const wrapper = shallow(<TodoList />)
    const Header = wrapper.find('Header')
    const addFunc = Header.prop('addUndoItem')
    addFunc('learn React')
    expect(wrapper.state('undoList').length).toBe(1)
    expect(wrapper.state('undoList')[0]).toBe('learn React')
    addFunc('learn React 2')
    expect(wrapper.state('undoList').length).toBe(2)

})

it('TodoList should pass a method and a state to UndoList', ()=>{
  const wrapper = shallow(<TodoList />)
  const UndoList = wrapper.find('UndoList')
  expect(UndoList.prop('list')).toBeTruthy()
  expect(UndoList.prop('deleteItem')).toBeTruthy()
})

it('when deleteItem execute, undoList should delete content', ()=>{
  const wrapper = shallow(<TodoList />)
  wrapper.setState({
    undoList: ['learn React', 'dell', 'lee']
  })
  wrapper.instance().deleteItem(1);
  expect(wrapper.state('undoList')).toEqual(['learn React', 'lee'])

})