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

it('when header enter, undoList should add content', ()=>{
    const wrapper = shallow(<TodoList />)
    const Header = wrapper.find('Header')
    const addFunc = Header.prop('addUndoItem')
    addFunc('learn React')
    expect(wrapper.state('undoList').length).toBe(1)
    expect(wrapper.state('undoList')[0]).toBe('learn React')
    addFunc('learn React 2')
    expect(wrapper.state('undoList').length).toBe(2)

})
