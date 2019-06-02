import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import { findByTestClass } from '../../utils/utils';
import Header from '../../src/components/Nav';

describe('<Header /> component', () => { 
    let wrapper;
    let testProps;
    let mockFunc;
    beforeEach(() => {
        mockFunc = jest.fn();
        testProps = {
            onHeaderClick: mockFunc
        };
        wrapper = shallow(<Header {...testProps} />);
    });

    it('should render correctly', () => {
        const tree = renderer.create(<Header {...testProps} />);
        expect(tree.toJSON()).toMatchSnapshot();
    });

    it('should render navbar correctly and to be 1', () => {
        const component = findByTestClass(wrapper, '.navbar');
        expect(component.length).toBe(1);
    });

    it('should render nav-header correctly and to be 1', () => {
        const component = findByTestClass(wrapper, '.nav-header');
        expect(component.length).toBe(1);
    });

    it('should render brand-logo correctly and to be 1', () => {
        const component = findByTestClass(wrapper, '.brand-logo');
        expect(component.length).toBe(1);
    });

    it('brand logo click should emit callback on click event', () => {
        const button = findByTestClass(wrapper, '.brand-logo');
        button.simulate('click');
        const callback = mockFunc.mock.calls.length;
        expect(callback).toBe(1);
    });
});