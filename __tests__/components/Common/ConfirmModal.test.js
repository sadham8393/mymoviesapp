import React from "react";
import { shallow, mount } from 'enzyme';
import EnzymeToJson from 'enzyme-to-json';
import { findByComponent, findByTestClass } from '../../../utils/utils';
import ConfirmModal  from "../../../src/components/Common/ConfirmModal";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button} from 'reactstrap';

describe("ConfirmModal component", () => {
    describe('Renders correctly', () => {
        let wrapper;
        let mockFunc;
        let props;
        beforeEach(() => {
            mockFunc = jest.fn();
            props = {
                confirmModalOpen: true,
                title : "Avengers",
                confirmMessage : "Do you want to continue?",
                onYesClick : mockFunc,
                onNoClick : mockFunc
            };
            wrapper = shallow(<ConfirmModal {...props} />);
        });

        it('should render correctly', () => {
            const component = mount(<ConfirmModal {...props} />);
            expect(EnzymeToJson(component)).toMatchSnapshot();
        });

        it('should render Modal correctly and to be 1', () => {
            const modal = findByComponent(wrapper, Modal);
            expect(modal.length).toBe(1);
        });
    
        it('should render ModalHeader correctly and to be 1', () => {
            const modal = findByComponent(wrapper, ModalHeader);
            expect(modal.length).toBe(1);
        });
    
        it('should render ModalBody correctly and to be 1', () => {
            const modal = findByComponent(wrapper, ModalBody);
            expect(modal.length).toBe(1);
        });
    
        it('should render ModalFooter correctly and to be 1', () => {
            const modal = findByComponent(wrapper, ModalFooter);
            expect(modal.length).toBe(1);
        });

        it('should render Button correctly and to be 2', () => {
            const modal = findByComponent(wrapper, Button);
            expect(modal.length).toBe(2);
        });
    
        it('yes button should emit callback on click event', () => {
            const button = findByTestClass(wrapper, ".confirm-yes");
            button.simulate('click');
            const callback = mockFunc.mock.calls.length;
            expect(callback).toBe(1);
        });

        it('no button should emit callback on click event', () => {
            const button = findByTestClass(wrapper, ".confirm-no");
            button.simulate('click');
            const callback = mockFunc.mock.calls.length;
            expect(callback).toBe(1);
        });
    })
});