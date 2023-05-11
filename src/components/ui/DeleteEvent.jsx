import React from 'react'
import { useDispatch } from 'react-redux'
import { startEventDelete } from '../../actions/event';

export const DeleteEvent = () => {

    const dispatch = useDispatch();

    const handleDelete = () => {
        dispatch(startEventDelete())
    }
  return (
    <button 
        className='btn btn-danger fab-danger'
        onClick={handleDelete}
    >
        <i className='fas fa-trash'></i>
        <span> Delete Event </span>
    </button>
  )
}
