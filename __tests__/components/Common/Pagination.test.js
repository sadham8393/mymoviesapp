import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import { findByTestClass } from '../../../utils/utils';
import PaginationComponent from '../../../src/components/Common/Pagination';


describe('<PaginationComponent />', () => { 
    let wrapper;
    let testProps;
    let mockFunc;
    beforeEach(() => {
        mockFunc = jest.fn();
        testProps = {
            currentPage : 1,
            nextPage : mockFunc,
            totalCount : 1
        };
        wrapper = shallow(<PaginationComponent {...testProps} />);
    });

    it('should render correctly', () => {
        const tree = renderer.create(<PaginationComponent {...testProps} />);
        expect(tree.toJSON()).toMatchSnapshot();
    });

    it('Should Render a container length to be 1', () => {
        const component = findByTestClass(wrapper, '.container');
        expect(component.length).toBe(1);
    });

    it('Should Render a container length to be 1', () => {
        const component = findByTestClass(wrapper, '.container');
        expect(component.length).toBe(1);
    });

    it('Should Render a row div length to be 1', () => {
        const component = findByTestClass(wrapper, '.row');
        expect(component.length).toBe(1);
    });

    it('Should Render a col div length to be 1', () => {
        const component = findByTestClass(wrapper, '.col');
        expect(component.length).toBe(1);
    });

});