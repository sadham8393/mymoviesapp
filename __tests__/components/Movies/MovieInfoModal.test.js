import React from 'react';
import { shallow, mount } from 'enzyme';
import EnzymeToJson from 'enzyme-to-json';
import { findByComponent } from '../../../utils/utils';
import MovieInfoModal from '../../../src/components/Movies/MovieInfoModal';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button} from 'reactstrap';

describe('<MovieInfoModal /> component', () => { 
    let wrapper;
    let testProps;
    let mockFunc;
    beforeEach(() => {
        mockFunc = jest.fn();
        testProps = {
            movie : {
                title : "Avengers", 
                name : "Avengers", 
                overview : "Avengers movie info", 
                first_air_date : "03-12-2019" , 
                release_date :"03-12-2019"
            },            
            closeInfoModal : mockFunc,
            viewInfoModalOpen : true
        };
        wrapper = shallow(<MovieInfoModal {...testProps} />);
    });

    it('should render correctly', () => {
        const component = mount(<MovieInfoModal {...testProps} />);
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

    it('should render Button correctly and to be 1', () => {
        const modal = findByComponent(wrapper, Button);
        expect(modal.length).toBe(1);
    });

    it('button should emit callback on click event', () => {
        const button = findByComponent(wrapper, Button);
        button.simulate('click');
        const callback = mockFunc.mock.calls.length;
        expect(callback).toBe(1);
    });
});


