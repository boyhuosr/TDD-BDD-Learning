import React from 'react';
import Header from '../../components/Header';
import {shallow} from 'enzyme';
import {findTestWrapper} from '../../../../utils/testUtils'
 

describe("Header component", ()=>{
  it('render success', ()=>{
    const wrapper = shallow(<Header />)
    expect(wrapper).toMatchSnapshot() 
  }) 
  it('Header component has a input area', ()=>{
    const wrapper = shallow(<Header />)
    //const inputElem = wrapper.find("[data-test='input']")
    const inputElem = findTestWrapper(wrapper, 'input')
    expect(inputElem.length).toBe(1);
  }) 

  it('the initial content of input should be null', ()=>{
    const wrapper = shallow(<Header />)
    const inputElem = findTestWrapper(wrapper, 'input')
    expect(inputElem.prop('value')).toEqual('');
  }) 

  it('the content of input should be changed based on input', ()=>{
    const wrapper = shallow(<Header />)
    const inputElem = findTestWrapper(wrapper, 'input')
    const userInput = 'learn Jest today'
    inputElem.simulate('change', {
        target: {value: userInput}
    })
    expect(wrapper.state('value')).toEqual(userInput);

    // const newInputElem = wrapper.find("[data-test='input']")
    // expect(newInputElem.prop('value')).toBe(userInput)
  }) 

  it('if click enter, with no content in input, no response', ()=>{
      const fn  = jest.fn()
      const wrapper = shallow(<Header addUndoItem={fn}/>)
      const inputElem = findTestWrapper(wrapper, 'input')
      wrapper.setState({value: ''})
      inputElem.simulate('keyup', {keyCode: 13})
      expect(fn).not.toHaveBeenCalled();
  })

  it('if click enter, with content in input, fn should be recalled', ()=>{
    const fn  = jest.fn()
    const wrapper = shallow(<Header addUndoItem={fn}/>)
    const inputElem = findTestWrapper(wrapper, 'input')
    const userInput = 'learn React'
    wrapper.setState({value: userInput})
    inputElem.simulate('keyUp', {keyCode: 13})
    expect(fn).toHaveBeenCalled();
    expect(fn).toHaveBeenLastCalledWith(userInput)

  })
})






  