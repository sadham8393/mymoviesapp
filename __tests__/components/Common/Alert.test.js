import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import { findByTestClass } from '../../../utils/utils';
import Alert from '../../../src/components/Common/Alert';

describe('<Alert />', () => { 
    let wrapper;
    let testProps;
    let mockFunc;
    beforeEach(() => {
        mockFunc = jest.fn();
        testProps = {
            alertClass : "show info",
            alertClose : mockFunc
        };
        wrapper = shallow(<Alert {...testProps} />);
    });
    it('should render correctly', () => {
        const tree = renderer.create(<Alert {...testProps} />);
        expect(tree.toJSON()).toMatchSnapshot();
    });
    it('should expect nav-wrapper to be 1', () => {
        const component = findByTestClass(wrapper, '.nav-wrapper');
        expect(component.length).toBe(1);
    });
   
    it('should render ul left align correctly and to be 1', () => {
        const component = findByTestClass(wrapper, 'ul.left');
        expect(component.length).toBe(1);
    });

    it('should render ul right align correctly and to be 1', () => {
        const component = findByTestClass(wrapper, 'ul.right');
        expect(component.length).toBe(1);
    });

    it('should render close button correctly', () => {
        const component = findByTestClass(wrapper, '.alert-close-btn');
        expect(component.length).toBe(1);
    });

    it('Close should emit callback on click event', () => {
        const button = findByTestClass(wrapper, '.alert-close-btn');
        button.simulate('click');
        const callback = mockFunc.mock.calls.length;
        expect(callback).toBe(1);
    });
    
});