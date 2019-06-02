import React from "react";
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';
import { findByTestClass } from '../../../utils/utils';
import DeleteButton  from "../../../src/components/Common/DeleteButton";

describe("Delete Button component", () => {
    describe('Renders correctly', () => {
        let wrapper;
        let mockFunc;
        let props;
        beforeEach(() => {
            mockFunc = jest.fn();
            props = {
                movie:{ title : "Avengers"} ,
                onDeleteClick : mockFunc
            };
            wrapper = shallow(<DeleteButton {...props} />);
        });

        it('should render correctly', () => {
            const props = {
                movie:{ title : "Avengers"},
                onDeleteClick : mockFunc
            };
            const tree = renderer.create(<DeleteButton {...props} />);
            expect(tree.toJSON()).toMatchSnapshot();
        });

        it('Should Render a button length to be 1', () => {
            const button = findByTestClass(wrapper, '.deleteBtn');
            expect(button.length).toBe(1);
        });

        it('Should emit callback on click event', () => {
            const button = findByTestClass(wrapper, '.deleteBtn');
            button.simulate('click');
            const callback = mockFunc.mock.calls.length;
            expect(callback).toBe(1);
        });
    })
});