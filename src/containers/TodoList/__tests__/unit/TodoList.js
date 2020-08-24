import React from 'react';
import TodoList from '../../index';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
 
Enzyme.configure({ adapter: new Adapter() });

describe('TodoList component', ()=>{
  it('TodoList initial as null', ()=>{
    const wrapper = shallow(<TodoList />)
    expect(wrapper.state('undoList')).toEqual([])
  }) 

  it('TodoList should pass a method to Header', ()=>{
      const wrapper = shallow(<TodoList />)
      const Header = wrapper.find('Header')
      // expect(Header.prop('addUndoItem')).toBe(wrapper.instance().addUndoItem)
      expect(Header.prop('addUndoItem')).toBeTruthy()
  })

  it('when addUndoItem execute, undoList should add content', ()=>{
      const wrapper = shallow(<TodoList />)
      const {addUndoItem} = wrapper.instance();
      const content = 'learn React';
      addUndoItem(content)
      
      expect(wrapper.state('undoList').length).toBe(1)
      expect(wrapper.state('undoList')[0]).toEqual({
        status: 'div',
        value: content
      })
      addUndoItem(content)
      expect(wrapper.state('undoList').length).toBe(2)

  })

  it('TodoList should pass four methods and a state to UndoList', ()=>{
    const wrapper = shallow(<TodoList />)
    const UndoList = wrapper.find('UndoList')
    expect(UndoList.prop('list')).toBeTruthy()
    expect(UndoList.prop('deleteItem')).toBeTruthy()
    expect(UndoList.prop('changeStatus')).toBeTruthy()
    expect(UndoList.prop('handleBlur')).toBeTruthy()
    expect(UndoList.prop('valueChange')).toBeTruthy()
  })

  it('when deleteItem execute, undoList should delete content', ()=>{
    const wrapper = shallow(<TodoList />)
    const data = [
      {status: 'div', value: 'learn TDD'},
      {status: 'div', value: 'learn jest'},
      {status: 'div', value: 'learn BDD'},
  ]
    wrapper.setState({
      undoList: data
    })
    wrapper.instance().deleteItem(1);
    expect(wrapper.state('undoList')).toEqual([data[0], data[2]])

  })

  it('when changeStatus execute, undoList should change content', ()=>{
    const wrapper = shallow(<TodoList />)
    const data = [
      {status: 'div', value: 'learn TDD'},
      {status: 'div', value: 'learn jest'},
      {status: 'div', value: 'learn BDD'},
  ]
    wrapper.setState({undoList: data})
    wrapper.instance().changeStatus(1);
    expect(wrapper.state('undoList')[1]).toEqual({
      ...data[1],
      status: 'input'
    })

  })

  it('when handleBlur execute, undoList should change status', ()=>{
    const wrapper = shallow(<TodoList />)
    const data = [
      {status: 'input', value: 'learn TDD'},
      {status: 'div', value: 'learn jest'},
      {status: 'div', value: 'learn BDD'},
    ]
    wrapper.setState({undoList: data})
    wrapper.instance().handleBlur(0);
    expect(wrapper.state('undoList')[0]).toEqual({
      ...data[0],
      status: 'div'
    })

  })

  it('when changeValue execute, undoList should change value', ()=>{
    const wrapper = shallow(<TodoList />)
    const data = [
      {status: 'input', value: 'learn TDD'},
    ]
    const value = 'learn Jest'
    wrapper.setState({undoList: data})
    wrapper.instance().valueChange(0, value);
    expect(wrapper.state('undoList')[0]).toEqual({
      ...data[0],
      value
    })

  })
})

