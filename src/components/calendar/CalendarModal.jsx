import React, { useEffect, useState } from 'react';
import { useForm } from '../../hooks/useForm/useForm';

import Modal from 'react-modal';
import DateTimePicker from 'react-datetime-picker';
import moment from 'moment';
import Swal from 'sweetalert2';
import { uiCloseModal } from '../../actions/ui';
import { useDispatch, useSelector } from 'react-redux';
import { eventStartAddNew, eventClearModalActive, startEventUpdate } from '../../actions/event';

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
};

Modal.setAppElement('#root');

const now = moment().minutes(0).add(1, 'hours');
const endNow = now.clone().minutes(0).add(2, 'hours');

const InitEvent = {
    title: '',
    notes: '',
    start: now.toDate(),
    end: endNow.toDate()
}


export const CalendarModal = () => {

    const dispatch = useDispatch();
    const {activeEvent} = useSelector(state => state.calendar);

    const { modalOpen } = useSelector(state => state.ui);
    const [startDate, setStartDate] = useState(now.toDate());
    const [endDate, setEndDate] = useState(endNow.toDate());
    const [validTittle, setValidTitle] = useState(true);

    
    const [ formValues, handleChange, , setFormValues ] = useForm(InitEvent);
    
    useEffect(() => {
        (activeEvent) ? setFormValues(activeEvent): setFormValues(InitEvent);
    }, [activeEvent, setFormValues]);

    const { notes, title, start, end } = formValues;   
    

    const closeModal = () => {

        setFormValues(InitEvent);
        dispatch(uiCloseModal());
        dispatch(eventClearModalActive());
    };
    
    const handleStartDateChange = (e) => {
        
        setStartDate(e);
        setFormValues({
            ...formValues,
            start: e
        })
        
    };
    
    
    const handleEndDateChange = (e) => {
        
        setEndDate(e);
        setFormValues({
            ...formValues,
            end: e
        })
    };

    const handleSubmitForm = (e) => {
        e.preventDefault();

        const momentStart = moment(start);
        const momentEnd = moment(end);

        if (momentStart.isSameOrAfter(momentEnd)) {
            return Swal.fire('Error', 'End Date should be set after Start Date!', 'error');
        }

        if (title.trim().length < 2 ) {
            return setValidTitle(false);
        }

        if (activeEvent) {
            
            dispatch(startEventUpdate(formValues))

        } else {
            
            dispatch( eventStartAddNew(formValues));
        }

        setValidTitle(true);
        closeModal();
        
    }

    return (
        <Modal
            isOpen={ modalOpen }
            onRequestClose={ closeModal }
            style={customStyles}
            closeTimeoutMS={200}
            className='modal'
            overlayClassName='modal-fondo'
        >
            <h1> {(activeEvent) ? 'Edit Event' : 'New Event'} </h1>
            <hr />
            <form className="container" onSubmit={ handleSubmitForm }>

                <div className="form-group">
                    <label>Start Date and Time</label>

                    <DateTimePicker 
                        onChange={ handleStartDateChange }
                        value={ startDate }
                        className='form-control'
                    />
                </div>

                <div className="form-group">
                    <label>End Date and Time</label>

                    <DateTimePicker 
                        onChange={ handleEndDateChange }
                        value={ endDate }
                        minDate={ startDate }
                        className='form-control'
                    />
                </div>

                <hr />
                <div className="form-group">
                    <label>Titles and Notes</label>
                    <input
                        type="text"
                        className={`form-control ${ !validTittle && 'is-invalid' }` }
                        placeholder="Event Title"
                        name="title"
                        autoComplete="off"
                        value={title}
                        onChange={handleChange}
                    />
                    <small id="emailHelp" className="form-text text-muted">A Short Description</small>
                </div>

                <div className="form-group">
                    <textarea
                        type="text"
                        className="form-control"
                        placeholder="Notes"
                        rows="5"
                        name="notes"
                        value={notes}
                        onChange={handleChange}
                    ></textarea>
                    <small id="emailHelp" className="form-text text-muted">More Info</small>
                </div>

                <button
                    type="submit"
                    className="btn btn-outline-primary btn-block"
                >
                    <i className="far fa-save"></i>
                    <span> Save </span>
                </button>

            </form>
        </Modal>
    )
}
